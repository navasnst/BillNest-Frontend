
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";

export default function Payment() {
    const [payments, setPayments] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [supplier, setSupplier] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentMode, setPaymentMode] = useState("Cash");
    const [note, setNote] = useState("");

    const businessId = localStorage.getItem("businessId");

    useEffect(() => {
        fetchPayments();
        fetchSuppliers();
    }, []);

    const fetchPayments = async () => {
        try {
            const res = await api.get(`/payments/${businessId}`);
            setPayments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchSuppliers = async () => {
        try {
            const res = await api.get(`/suppliers/${businessId}`);
            setSuppliers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async () => {
        if (!supplier || !amount) {
            return alert("Fill all fields");
        }

        const numericAmount = Number(amount); // ✅ FIX

        if (numericAmount <= 0) { // ✅ FIX
            return alert("Enter valid amount");
        }

        try {
            await api.post("/payments", { // ✅ FIX
                businessId,
                supplier,
                amount: numericAmount, // ✅ FIX
                paymentMode,
                note,
            });

            alert("Payment saved");
            setSupplier("");
            setAmount("");
            setPaymentMode("Cash");
            setNote("");
            fetchPayments();
        } catch (err) {
            console.error(err);
            alert("Error saving payment");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this payment?")) return;

        try {
            await api.delete(`/payments/${id}`); // ✅ FIX
            fetchPayments();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <MainLayout>
            <div className="p-6 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Supplier Payment</h2>

                {/* FORM */}
                <div className="bg-white p-4 rounded-2xl shadow mb-6">
                    <h3 className="text-lg font-semibold mb-4">Make Payment</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        <select
                            value={supplier}
                            onChange={(e) => setSupplier(e.target.value)}
                            className="border p-2 rounded-xl"
                        >
                            <option value="">Select Supplier</option>
                            {suppliers.map((s) => (
                                <option key={s._id} value={s._id}>
                                    {s.name}
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

                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-6 py-2 rounded-xl mt-4"
                    >
                        Save Payment
                    </button>
                </div>

                {/* LIST */}
                <div className="bg-white p-4 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold mb-4">Payment List</h3>

                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2">Date</th>
                                <th className="p-2">Supplier</th>
                                <th className="p-2">Amount</th>
                                <th className="p-2">Mode</th>
                                <th className="p-2">Note</th>
                                <th className="p-2">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {payments.map((p) => (
                                <tr key={p._id} className="border-b">
                                    <td className="p-2">
                                        {new Date(p.date).toLocaleDateString()}
                                    </td>
                                    <td className="p-2">{p.supplier?.name}</td>
                                    <td className="p-2">₹ {p.amount}</td>
                                    <td className="p-2">{p.paymentMode}</td>
                                    <td className="p-2">{p.note || "-"}</td> {/* ✅ FIX */}
                                    <td className="p-2">
                                        <button
                                            onClick={() => handleDelete(p._id)}
                                            className="text-red-500"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {payments.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center p-4 text-gray-500">
                                        No payments yet
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