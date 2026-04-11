// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import MainLayout from "../layouts/MainLayout";

// export default function PurchaseReturn() {
//     const [purchases, setPurchases] = useState([]);
//     const [selectedPurchase, setSelectedPurchase] = useState(null);
//     const [items, setItems] = useState([]);
//     const [reason, setReason] = useState("");

//     const businessId = localStorage.getItem("businessId");

//     useEffect(() => {
//         fetchPurchases();
//     }, []);

//     const fetchPurchases = async () => {
//         try {
//             const res = await api.get(`/purchases/${businessId}`);
//             setPurchases(res.data);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const handleSelectPurchase = (purchaseId) => {
//         const purchase = purchases.find((p) => p._id === purchaseId);
//         setSelectedPurchase(purchase);

//         const mappedItems = purchase.items.map((item) => ({
//             productId: item.product,
//             name: item.name,
//             price: item.price,
//             quantity: 0,
//             maxQty: item.quantity,
//         }));

//         setItems(mappedItems);
//     };

//     const handleQtyChange = (index, value) => {
//         const updated = [...items];

//         if (value > updated[index].maxQty) {
//             alert("Cannot return more than purchased quantity");
//             return;
//         }

//         updated[index].quantity = value;
//         setItems(updated);
//     };

//     const calculateTotals = () => {
//         let subtotal = 0;

//         items.forEach((item) => {
//             subtotal += item.quantity * item.price;
//         });

//         const gst = subtotal * 0.18;
//         const total = subtotal + gst;

//         return { subtotal, gst, total };
//     };

//     const { subtotal, gst, total } = calculateTotals();

//     const handleSubmit = async () => {
//         const returnItems = items.filter((i) => i.quantity > 0);

//         if (!selectedPurchase || returnItems.length === 0) {
//             return alert("Select purchase and enter return qty");
//         }

//         try {
//             await api.post("/purchaseReturn", {
//                 purchaseId: selectedPurchase._id,
//                 items: returnItems,
//                 reason,
//             });

//             alert("Purchase Return Created");
//             setSelectedPurchase(null);
//             setItems([]);
//             setReason("");
//         } catch (err) {
//             console.error(err);
//             alert("Error creating return");
//         }
//     };

//     return (
//         <MainLayout>
//             <div className="p-6 max-w-6xl mx-auto">
//                 <h2 className="text-3xl font-bold mb-6">Purchase Return</h2>

//                 {/* Select Purchase */}
//                 <div className="bg-white p-4 rounded-2xl shadow mb-6">
//                     <label className="block mb-2 font-medium">Select Purchase</label>
//                     <select
//                         onChange={(e) => handleSelectPurchase(e.target.value)}
//                         className="border p-2 w-full rounded-xl"
//                     >
//                         <option value="">Select</option>
//                         {purchases.map((p) => (
//                             <option key={p._id} value={p._id}>
//                                 {p.purchaseNumber} - {p.supplierName}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Items */}
//                 {selectedPurchase && (
//                     <div className="bg-white p-4 rounded-2xl shadow">
//                         <h3 className="text-lg font-semibold mb-4">Return Items</h3>

//                         <table className="w-full">
//                             <thead>
//                                 <tr className="border-b">
//                                     <th className="p-2">Product</th>
//                                     <th className="p-2">Purchased</th>
//                                     <th className="p-2">Return Qty</th>
//                                     <th className="p-2">Price</th>
//                                     <th className="p-2">Total</th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 {items.map((item, index) => (
//                                     <tr key={index} className="border-b">
//                                         <td className="p-2">{item.name}</td>
//                                         <td className="p-2">{item.maxQty}</td>
//                                         <td className="p-2">
//                                             <input
//                                                 type="number"
//                                                 value={item.quantity}
//                                                 onChange={(e) =>
//                                                     handleQtyChange(index, Number(e.target.value))
//                                                 }
//                                                 className="border p-2 rounded w-full"
//                                             />
//                                         </td>
//                                         <td className="p-2">₹ {item.price}</td>
//                                         <td className="p-2">
//                                             ₹ {item.quantity * item.price}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}

//                 {/* Reason */}
//                 <div className="bg-white p-4 rounded-2xl shadow mt-6">
//                     <label className="block mb-2 font-medium">Reason</label>
//                     <input
//                         type="text"
//                         value={reason}
//                         onChange={(e) => setReason(e.target.value)}
//                         className="border p-2 w-full rounded-xl"
//                     />
//                 </div>

//                 {/* Summary */}
//                 <div className="bg-white p-4 rounded-2xl shadow mt-6">
//                     <div className="flex justify-between mb-2">
//                         <span>Subtotal</span>
//                         <span>₹ {subtotal.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between mb-2">
//                         <span>GST</span>
//                         <span>₹ {gst.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between font-bold text-lg">
//                         <span>Total</span>
//                         <span>₹ {total.toFixed(2)}</span>
//                     </div>
//                 </div>

//                 <button
//                     onClick={handleSubmit}
//                     className="bg-red-600 text-white px-6 py-3 rounded-2xl mt-6 w-full"
//                 >
//                     Save Return
//                 </button>
//             </div>
//         </MainLayout>
//     );
// }





import React, { useEffect, useState } from "react";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";

export default function PurchaseReturn() {
    const [purchases, setPurchases] = useState([]);
    const [selectedPurchase, setSelectedPurchase] = useState(null);
    const [items, setItems] = useState([]);
    const [reason, setReason] = useState("");

    const businessId = localStorage.getItem("businessId");

    useEffect(() => {
        fetchPurchases();
    }, []);

    const fetchPurchases = async () => {
        try {
            const res = await api.get(`/purchases/${businessId}`);
            setPurchases(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSelectPurchase = (purchaseId) => {
        const purchase = purchases.find((p) => p._id === purchaseId);
        setSelectedPurchase(purchase);

        const mappedItems = purchase.items.map((item) => ({
            productId: item.product,
            name: item.name,
            price: item.price,
            gstRate: item.gstRate, // ✅ important
            quantity: 0,
            maxQty: item.quantity,
        }));

        setItems(mappedItems);
    };

    const handleQtyChange = (index, value) => {
        const updated = [...items];

        if (value > updated[index].maxQty) {
            alert("Cannot return more than purchased quantity");
            return;
        }

        updated[index].quantity = value;
        setItems(updated);
    };

    // ✅ FIXED GST CALCULATION
    const calculateTotals = () => {
        let subtotal = 0;
        let totalGST = 0;

        items.forEach((item) => {
            const base = item.quantity * item.price;
            const gstAmount = (base * item.gstRate) / 100;

            subtotal += base;
            totalGST += gstAmount;
        });

        const total = subtotal + totalGST;

        return { subtotal, gst: totalGST, total };
    };

    const { subtotal, gst, total } = calculateTotals();

    const handleSubmit = async () => {
        const returnItems = items.filter((i) => i.quantity > 0);

        if (!selectedPurchase || returnItems.length === 0) {
            return alert("Select purchase and enter return qty");
        }

        try {
            await api.post("/purchaseReturn", {
                purchaseId: selectedPurchase._id,
                items: returnItems,
                reason,
            });

            alert("Purchase Return Created");
            setSelectedPurchase(null);
            setItems([]);
            setReason("");
        } catch (err) {
            console.error(err);
            alert("Error creating return");
        }
    };

    return (
        <MainLayout>
            <div className="p-6 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Purchase Return</h2>

                {/* Select Purchase */}
                <div className="bg-white p-4 rounded-2xl shadow mb-6">
                    <label className="block mb-2 font-medium">Select Purchase</label>
                    <select
                        onChange={(e) => handleSelectPurchase(e.target.value)}
                        className="border p-2 w-full rounded-xl"
                    >
                        <option value="">Select</option>
                        {purchases.map((p) => (
                            <option key={p._id} value={p._id}>
                                {p.purchaseNumber} - {p.supplierName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Items */}
                {selectedPurchase && (
                    <div className="bg-white p-4 rounded-2xl shadow">
                        <h3 className="text-lg font-semibold mb-4">Return Items</h3>

                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-2">Product</th>
                                    <th className="p-2">Purchased</th>
                                    <th className="p-2">Return Qty</th>
                                    <th className="p-2">Price</th>
                                    <th className="p-2">Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-2">{item.name}</td>
                                        <td className="p-2">{item.maxQty}</td>
                                        <td className="p-2">
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    handleQtyChange(index, Number(e.target.value))
                                                }
                                                className="border p-2 rounded w-full"
                                            />
                                        </td>
                                        <td className="p-2">₹ {item.price}</td>
                                        <td className="p-2">
                                            ₹ {(item.quantity * item.price).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Reason */}
                <div className="bg-white p-4 rounded-2xl shadow mt-6">
                    <label className="block mb-2 font-medium">Reason</label>
                    <input
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="border p-2 w-full rounded-xl"
                    />
                </div>

                {/* Summary */}
                <div className="bg-white p-4 rounded-2xl shadow mt-6">
                    <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>₹ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>GST</span>
                        <span>₹ {gst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₹ {total.toFixed(2)}</span>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-red-600 text-white px-6 py-3 rounded-2xl mt-6 w-full"
                >
                    Save Return
                </button>
            </div>
        </MainLayout>
    );
}