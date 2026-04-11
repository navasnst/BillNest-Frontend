// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import MainLayout from "../layouts/MainLayout";

// export default function Receipts() {
//     const [invoices, setInvoices] = useState([]);
//     const [receipts, setReceipts] = useState([]);
//     const [selectedInvoice, setSelectedInvoice] = useState(null);
//     const [amount, setAmount] = useState("");
//     const [paymentMode, setPaymentMode] = useState("Cash");
//     const [note, setNote] = useState("");

//     const businessId = localStorage.getItem("businessId");

//     useEffect(() => {
//         fetchInvoices();
//         fetchReceipts();
//     }, []);

//     const fetchInvoices = async () => {
//         try {
//             const res = await api.get(`/invoices/${businessId}`);
//             // show only unpaid / partial
//             const filtered = res.data.filter(inv => inv.dueAmount > 0);
//             setInvoices(filtered);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const fetchReceipts = async () => {
//         try {
//             const res = await api.get(`/receipts/${businessId}`);
//             setReceipts(res.data);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const handleSelectInvoice = (id) => {
//         const inv = invoices.find(i => i._id === id);
//         setSelectedInvoice(inv);
//         setAmount(inv?.dueAmount || "");
//     };

//     const handleSubmit = async () => {
//         if (!selectedInvoice || !amount) {
//             return alert("Select invoice and enter amount");
//         }

//         if (amount > selectedInvoice.dueAmount) {
//             return alert("Amount exceeds due");
//         }

//         try {
//             await api.post("/receipts", {
//                 invoiceId: selectedInvoice._id,
//                 amount: Number(amount),
//                 paymentMode,
//                 note
//             });

//             alert("Payment received");
//             setSelectedInvoice(null);
//             setAmount("");
//             setPaymentMode("Cash");
//             setNote("");
//             fetchInvoices();
//             fetchReceipts();
//         } catch (err) {
//             console.error(err);
//             alert("Error creating receipt");
//         }
//     };

//     return (
//         <MainLayout>
//             <div className="p-6 max-w-6xl mx-auto">
//                 <h2 className="text-3xl font-bold mb-6">Receipts</h2>

//                 {/* FORM */}
//                 <div className="bg-white p-4 rounded-2xl shadow mb-6">
//                     <h3 className="text-lg font-semibold mb-4">Receive Payment</h3>

//                     <div className="grid md:grid-cols-2 gap-4">
//                         <select
//                             onChange={(e) => handleSelectInvoice(e.target.value)}
//                             className="border p-2 rounded-xl"
//                         >
//                             <option value="">Select Invoice</option>
//                             {invoices.map(inv => (
//                                 <option key={inv._id} value={inv._id}>
//                                     {inv.invoiceNumber} - {inv.customer?.name} (Due: ₹{inv.dueAmount})
//                                 </option>
//                             ))}
//                         </select>

//                         <input
//                             type="number"
//                             placeholder="Amount"
//                             value={amount}
//                             onChange={(e) => setAmount(e.target.value)}
//                             className="border p-2 rounded-xl"
//                         />

//                         <select
//                             value={paymentMode}
//                             onChange={(e) => setPaymentMode(e.target.value)}
//                             className="border p-2 rounded-xl"
//                         >
//                             <option value="Cash">Cash</option>
//                             <option value="Bank">Bank</option>
//                             <option value="UPI">UPI</option>
//                         </select>

//                         <input
//                             type="text"
//                             placeholder="Note"
//                             value={note}
//                             onChange={(e) => setNote(e.target.value)}
//                             className="border p-2 rounded-xl"
//                         />
//                     </div>

//                     {selectedInvoice && (
//                         <div className="mt-4 text-sm text-gray-600">
//                             Due Amount: ₹{selectedInvoice.dueAmount}
//                         </div>
//                     )}

//                     <button
//                         onClick={handleSubmit}
//                         className="bg-green-600 text-white px-6 py-2 rounded-xl mt-4"
//                     >
//                         Save Receipt
//                     </button>
//                 </div>

//                 {/* LIST */}
//                 <div className="bg-white p-4 rounded-2xl shadow">
//                     <h3 className="text-lg font-semibold mb-4">Receipt List</h3>

//                     <table className="w-full text-left">
//                         <thead>
//                             <tr className="border-b">
//                                 <th className="p-2">Date</th>
//                                 <th className="p-2">Invoice</th>
//                                 <th className="p-2">Customer</th>
//                                 <th className="p-2">Amount</th>
//                                 <th className="p-2">Mode</th>
//                                 <th className="p-2">Note</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {receipts.map(r => (
//                                 <tr key={r._id} className="border-b">
//                                     <td className="p-2">{new Date(r.date).toLocaleDateString()}</td>
//                                     <td className="p-2">{r.invoice?.invoiceNumber}</td>
//                                     <td className="p-2">{r.customer?.name}</td>
//                                     <td className="p-2">₹ {r.amount}</td>
//                                     <td className="p-2">{r.paymentMode}</td>
//                                     <td className="p-2">{r.note}</td>
//                                 </tr>
//                             ))}

//                             {receipts.length === 0 && (
//                                 <tr>
//                                     <td colSpan="6" className="text-center p-4 text-gray-500">
//                                         No receipts yet
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </MainLayout>
//     );
// }




import React, { useEffect, useState } from "react";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";

export default function Receipts() {
    const [invoices, setInvoices] = useState([]);
    const [receipts, setReceipts] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(""); // ✅ NEW
    const [amount, setAmount] = useState("");
    const [paymentMode, setPaymentMode] = useState("Cash");
    const [note, setNote] = useState("");

    const businessId = localStorage.getItem("businessId");

    useEffect(() => {
        fetchInvoices();
        fetchReceipts();
    }, []);

    const fetchInvoices = async () => {
        try {
            const res = await api.get(`/invoices/business/${businessId}`);
            const filtered = res.data.filter(inv => inv.dueAmount > 0);
            setInvoices(filtered);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchReceipts = async () => {
        try {
            const res = await api.get(`/receipts/${businessId}`);
            setReceipts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSelectInvoice = (id) => {
        setSelectedInvoiceId(id); // ✅ FIX
        const inv = invoices.find(i => i._id === id);
        setSelectedInvoice(inv);
        setAmount(inv?.dueAmount || "");
    };

    const handleSubmit = async () => {
        if (!selectedInvoice || !amount) {
            return alert("Select invoice and enter amount");
        }

        const numericAmount = Number(amount); // ✅ FIX

        if (numericAmount <= 0) {
            return alert("Enter valid amount");
        }

        if (numericAmount > selectedInvoice.dueAmount) {
            return alert("Amount exceeds due");
        }

        try {
            await api.post("/receipts", {
                invoiceId: selectedInvoice._id,
                amount: numericAmount, // ✅ FIX
                paymentMode,
                note
            });

            alert("Payment received");

            // ✅ RESET
            setSelectedInvoice(null);
            setSelectedInvoiceId(""); // ✅ FIX
            setAmount("");
            setPaymentMode("Cash");
            setNote("");

            fetchInvoices();
            fetchReceipts();

        } catch (err) {
            console.error(err);
            alert("Error creating receipt");
        }
    };

    return (
        <MainLayout>
            <div className="p-6 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Receipts</h2>

                {/* FORM */}
                <div className="bg-white p-4 rounded-2xl shadow mb-6">
                    <h3 className="text-lg font-semibold mb-4">Receive Payment</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        <select
                            value={selectedInvoiceId} // ✅ FIX
                            onChange={(e) => handleSelectInvoice(e.target.value)}
                            className="border p-2 rounded-xl"
                        >
                            <option value="">Select Invoice</option>
                            {invoices.map(inv => (
                                <option key={inv._id} value={inv._id}>
                                    {inv.invoiceNumber} - {inv.customer?.name} (Due: ₹{inv.dueAmount})
                                </option>
                            ))}
                        </select>

                        <input
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="border p-2 rounded-xl"
                        />

                        <select
                            value={paymentMode}
                            onChange={(e) => setPaymentMode(e.target.value)}
                            className="border p-2 rounded-xl"
                        >
                            <option value="Cash">Cash</option>
                            <option value="Bank">Bank</option>
                            <option value="UPI">UPI</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Note"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="border p-2 rounded-xl"
                        />
                    </div>

                    {selectedInvoice && (
                        <div className="mt-4 text-sm text-gray-600">
                            Due Amount: ₹{selectedInvoice.dueAmount}
                        </div>
                    )}

                    <button
                        onClick={handleSubmit}
                        className="bg-green-600 text-white px-6 py-2 rounded-xl mt-4"
                    >
                        Save Receipt
                    </button>
                </div>

                {/* LIST */}
                <div className="bg-white p-4 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold mb-4">Receipt List</h3>

                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2">Date</th>
                                <th className="p-2">Invoice</th>
                                <th className="p-2">Customer</th>
                                <th className="p-2">Amount</th>
                                <th className="p-2">Mode</th>
                                <th className="p-2">Note</th>
                            </tr>
                        </thead>

                        <tbody>
                            {receipts.map(r => (
                                <tr key={r._id} className="border-b">
                                    <td className="p-2">{new Date(r.date).toLocaleDateString()}</td>
                                    <td className="p-2">{r.invoice?.invoiceNumber}</td>
                                    <td className="p-2">{r.customer?.name}</td>
                                    <td className="p-2">₹ {r.amount}</td>
                                    <td className="p-2">{r.paymentMode}</td>
                                    <td className="p-2">{r.note || "-"}</td>
                                </tr>
                            ))}

                            {receipts.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center p-4 text-gray-500">
                                        No receipts yet
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
}
