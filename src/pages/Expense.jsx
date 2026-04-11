import React, { useEffect, useState } from "react";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";

export default function Expense() {
    const [expenses, setExpenses] = useState([]);
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [date, setDate] = useState("");
    const [paymentMode, setPaymentMode] = useState("Cash");

    const businessId = localStorage.getItem("businessId");

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const res = await api.get(`/expense/${businessId}`);
            setExpenses(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async () => {
        if (!category || !amount) {
            return alert("Category and Amount required");
        }

        try {
            await api.post("/expense", {
                businessId,
                category,
                amount: Number(amount),
                note,
                date: date || undefined,
                paymentMode,
            });

            alert("Expense Added");
            setCategory("");
            setAmount("");
            setNote("");
            setDate("");
            setPaymentMode("Cash");
            fetchExpenses();
        } catch (err) {
            console.error(err);
            alert("Error adding expense");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this expense?")) return;

        try {
            await api.delete(`/expense/${id}`);
            fetchExpenses();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <MainLayout>
            <div className="p-6 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Expense</h2>

                {/* Form */}
                <div className="bg-white p-4 rounded-2xl shadow mb-6">
                    <h3 className="text-lg font-semibold mb-4">Add Expense</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Category (eg: Rent, Salary, Electricity)"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border p-2 rounded-xl"
                        />

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
                        </select>

                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="border p-2 rounded-xl"
                        />

                        <input
                            type="text"
                            placeholder="Note (optional)"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="border p-2 rounded-xl md:col-span-2"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="bg-red-600 text-white px-6 py-2 rounded-xl mt-4"
                    >
                        Add Expense
                    </button>
                </div>

                {/* List */}
                <div className="bg-white p-4 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold mb-4">Expense List</h3>

                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2">Date</th>
                                <th className="p-2">Category</th>
                                <th className="p-2">Amount</th>
                                <th className="p-2">Note</th>
                                <th className="p-2">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {expenses.map((exp) => (
                                <tr key={exp._id} className="border-b">
                                    <td className="p-2">
                                        {new Date(exp.date).toLocaleDateString()}
                                    </td>
                                    <td className="p-2">{exp.category}</td>
                                    <td className="p-2">₹ {exp.amount}</td>
                                    <td className="p-2">{exp.note}</td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => handleDelete(exp._id)}
                                            className="text-red-500"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {expenses.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center p-4 text-gray-500">
                                        No expense records
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
