import React, { useState } from "react";
import { Trash2, Plus, Printer } from "lucide-react";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";

export default function QuickBill() {
    const [items, setItems] = useState([
        { name: "", qty: 1, price: 0, total: 0 }
    ]);
    const [customerName, setCustomerName] = useState("");
    const [loading, setLoading] = useState(false);

    const invoiceNumber = `QB-${Date.now()}`;
    const date = new Date().toLocaleString();

    const handleChange = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = field === "name" ? value : Number(value);
        updated[index].total = updated[index].qty * updated[index].price;
        setItems(updated);
    };

    const addItem = () => {
        setItems([...items, { name: "", qty: 1, price: 0, total: 0 }]);
    };

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

    const validate = () => {
        return items.every(
            (item) => item.name && item.qty > 0 && item.price > 0
        );
    };

    const handleSave = async () => {
        if (!validate()) {
            return alert("Please fill all item details correctly");
        }

        try {
            setLoading(true);

            const payload = {
                invoiceNumber,
                date,
                customerName,
                items,
                totalAmount: grandTotal,
                type: "quick"
            };

            await api.post("/invoice/quick", payload);

            alert("Quick Invoice Saved ✅");

            setItems([{ name: "", qty: 1, price: 0, total: 0 }]);
            setCustomerName("");
        } catch (err) {
            console.error(err);
            alert("Error saving invoice ❌");
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <MainLayout>
            <div className="p-6 max-w-5xl mx-auto">
                <div className="shadow-xl rounded-2xl p-6 bg-white">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-semibold">Quick Bill</h1>
                        <div className="text-sm text-right">
                            <p>{invoiceNumber}</p>
                            <p>{date}</p>
                        </div>
                    </div>

                    {/* Customer */}
                    <input
                        className="w-full border p-2 rounded mb-4"
                        placeholder="Customer Name (optional)"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />

                    {/* Table Head */}
                    <div className="grid grid-cols-5 gap-3 font-medium mb-2 border-b pb-2">
                        <span>Item</span>
                        <span>Qty</span>
                        <span>Price</span>
                        <span>Total</span>
                        <span>Action</span>
                    </div>

                    {/* Items */}
                    {items.map((item, index) => (
                        <div key={index} className="grid grid-cols-5 gap-3 mb-2">
                            <input
                                className="border p-2 rounded"
                                placeholder="Item name"
                                value={item.name}
                                onChange={(e) =>
                                    handleChange(index, "name", e.target.value)
                                }
                            />

                            <input
                                type="number"
                                className="border p-2 rounded"
                                value={item.qty}
                                onChange={(e) =>
                                    handleChange(index, "qty", e.target.value)
                                }
                            />

                            <input
                                type="number"
                                className="border p-2 rounded"
                                value={item.price}
                                onChange={(e) =>
                                    handleChange(index, "price", e.target.value)
                                }
                            />

                            <input
                                className="border p-2 rounded bg-gray-100"
                                value={item.total}
                                readOnly
                            />

                            <button
                                onClick={() => removeItem(index)}
                                className="bg-red-500 text-white rounded p-2 flex justify-center cursor-pointer"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}

                    {/* Add Item */}
                    <button
                        onClick={addItem}
                        className="mt-4 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
                    >
                        <Plus size={16} /> Add Item
                    </button>

                    {/* Total */}
                    <div className="mt-6 text-right text-xl font-semibold">
                        Total: ₹{grandTotal}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="bg-black text-white px-4 py-2 rounded cursor-pointer"
                        >
                            {loading ? "Saving..." : "Save Invoice"}
                        </button>

                        <button
                            onClick={handlePrint}
                            className="border px-4 py-2 rounded flex items-center gap-2 cursor-pointer"
                        >
                            <Printer size={16} /> Print
                        </button>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}