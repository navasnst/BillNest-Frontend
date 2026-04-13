
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";

export default function Purchase() {
    const [products, setProducts] = useState([]);
    const [items, setItems] = useState([]);
    const [supplierName, setSupplierName] = useState("");

    // ✅ NEW
    const [paymentMode, setPaymentMode] = useState("Cash");
    const [paidAmount, setPaidAmount] = useState(0);

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        gstRate: ""
    });

    const businessId = localStorage.getItem("businessId");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get(`/products/${businessId}`);
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const addItem = () => {
        setItems([...items, { productId: "", quantity: 1, price: 0 }]);
    };

    const handleChange = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value;

        if (field === "productId") {
            const product = products.find((p) => p._id === value);
            if (product) {
                updated[index].price = product.price || 0;
            }
        }

        setItems(updated);
    };

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const calculateTotals = () => {
        let subtotal = 0;

        items.forEach((item) => {
            subtotal += item.quantity * item.price;
        });

        const gst = subtotal * 0.18; // preview only
        const total = subtotal + gst;

        return { subtotal, gst, total };
    };

    const { subtotal, gst, total } = calculateTotals();

    // ✅ NEW
    const dueAmount = total - paidAmount;

    const handleSubmit = async () => {
        if (!supplierName || items.length === 0) {
            return alert("Fill all fields");
        }

        try {
            await api.post("/purchases", {
                businessId,
                supplierName,
                items,
                paymentMode,     // ✅ added
                paidAmount       // ✅ added
            });

            alert("Purchase Created Successfully");
            setItems([]);
            setSupplierName("");
            setPaidAmount(0);

        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Error creating purchase");
        }
    };

    const createNewProduct = async (index) => {
        try {
            const res = await api.post("/products", {
                name: newProduct.name,
                price: Number(newProduct.price),
                gstRate: Number(newProduct.gstRate),
                businessId: businessId
            });

            const created = res.data;

            setProducts([...products, created]);

            const updated = [...items];
            updated[index].productId = created._id;
            updated[index].price = created.price;

            setItems(updated);

            setNewProduct({ name: "", price: "", gstRate: "" });

        } catch (err) {
            console.error(err);
            alert("Failed to create product");
        }
    };

    return (
        <MainLayout>
            <div className="p-6 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Purchase Entry</h2>

                {/* Supplier */}
                <div className="bg-white shadow rounded-2xl p-4 mb-6">
                    <label className="block mb-2 font-medium">Supplier Name</label>
                    <input
                        type="text"
                        value={supplierName}
                        onChange={(e) => setSupplierName(e.target.value)}
                        className="border p-2 w-full rounded-xl"
                    />
                </div>

                {/* Items Table */}
                <div className="bg-white shadow rounded-2xl p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Items</h3>
                        <button
                            onClick={addItem}
                            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                        >
                            + Add Item
                        </button>
                    </div>

                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2">Product</th>
                                <th className="p-2">Qty</th>
                                <th className="p-2">Price</th>
                                <th className="p-2">Total</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((item, index) => (
                                <React.Fragment key={index}>
                                    <tr className="border-b">
                                        <td className="p-2">
                                            <select
                                                value={item.productId}
                                                onChange={(e) =>
                                                    handleChange(index, "productId", e.target.value)
                                                }
                                                className="border p-2 rounded-xl w-full"
                                            >
                                                <option value="">Select</option>
                                                {products.map((p) => (
                                                    <option key={p._id} value={p._id}>
                                                        {p.name}
                                                    </option>
                                                ))}
                                                <option value="new">+ Add New Product</option>
                                            </select>
                                        </td>

                                        <td className="p-2">
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    handleChange(index, "quantity", Number(e.target.value))
                                                }
                                                className="border p-2 rounded-xl w-full"
                                            />
                                        </td>

                                        <td className="p-2">
                                            <input
                                                type="number"
                                                value={item.price}
                                                onChange={(e) =>
                                                    handleChange(index, "price", Number(e.target.value))
                                                }
                                                className="border p-2 rounded-xl w-full"
                                            />
                                        </td>

                                        <td className="p-2">
                                            ₹ {item.quantity * item.price}
                                        </td>

                                        <td className="p-2">
                                            <button
                                                onClick={() => removeItem(index)}
                                                className="text-red-500"
                                            >
                                                ✕
                                            </button>
                                        </td>
                                    </tr>

                                    {item.productId === "new" && (
                                        <tr>
                                            <td colSpan="5" className="p-3 bg-gray-50">
                                                <div className="flex gap-2 flex-wrap">
                                                    <input
                                                        type="text"
                                                        placeholder="Product Name"
                                                        value={newProduct.name}
                                                        onChange={(e) =>
                                                            setNewProduct({ ...newProduct, name: e.target.value })
                                                        }
                                                        className="border p-2 rounded"
                                                    />

                                                    <input
                                                        type="number"
                                                        placeholder="Price"
                                                        value={newProduct.price}
                                                        onChange={(e) =>
                                                            setNewProduct({ ...newProduct, price: e.target.value })
                                                        }
                                                        className="border p-2 rounded"
                                                    />

                                                    <input
                                                        type="number"
                                                        placeholder="GST %"
                                                        value={newProduct.gstRate}
                                                        onChange={(e) =>
                                                            setNewProduct({ ...newProduct, gstRate: e.target.value })
                                                        }
                                                        className="border p-2 rounded"
                                                    />

                                                    <button
                                                        onClick={() => createNewProduct(index)}
                                                        className="bg-green-600 text-white px-3 py-1 rounded"
                                                    >
                                                        Save Product
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Summary */}
                <div className="bg-white shadow rounded-2xl p-4 mt-6">
                    <h3 className="text-lg font-semibold mb-3">Summary</h3>

                    <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>₹ {subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between mb-2">
                        <span>GST (Preview)</span>
                        <span>₹ {gst.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between mb-2 font-bold">
                        <span>Total</span>
                        <span>₹ {total.toFixed(2)}</span>
                    </div>

                    {/* ✅ NEW PAYMENT SECTION */}
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <select
                            value={paymentMode}
                            onChange={(e) => setPaymentMode(e.target.value)}
                            className="border p-2 rounded-xl"
                        >
                            <option>Cash</option>
                            <option>Bank</option>
                            <option>UPI</option>
                            <option>Credit</option>
                        </select>

                        <input
                            type="number"
                            placeholder="Paid Amount"
                            value={paidAmount}
                            onChange={(e) => setPaidAmount(Number(e.target.value))}
                            className="border p-2 rounded-xl"
                        />
                    </div>

                    <div className="flex justify-between mt-2 text-red-500 font-semibold">
                        <span>Due</span>
                        <span>₹ {dueAmount.toFixed(2)}</span>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-green-600 text-white px-6 py-3 rounded-2xl mt-6 w-full text-lg"
                >
                    Save Purchase
                </button>
            </div>
        </MainLayout>
    );
}