import React, { useEffect, useState } from "react";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";

export default function Income() {
    const [incomes, setIncomes] = useState([]);
    const [source, setSource] = useState("");
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [date, setDate] = useState("");

    const businessId = localStorage.getItem("businessId");

    useEffect(() => {
        fetchIncome();
    }, []);

    const fetchIncome = async () => {
        try {
            const res = await api.get(`/income/${businessId}`);
            setIncomes(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async () => {
        if (!source || !amount) {
            return alert("Source and Amount required");
        }

        try {
            await api.post("/income", {
                businessId,
                source,
                amount: Number(amount),
                note,
                date: date || undefined,
            });

            alert("Income Added");
            setSource("");
            setAmount("");
            setNote("");
            setDate("");
            fetchIncome();
        } catch (err) {
            console.error(err);
            alert("Error adding income");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this income?")) return;

        try {
            await api.delete(`/income/${id}`);
            fetchIncome();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <MainLayout>

            <div className="p-6 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Income</h2>

                {/* Form */}
                <div className="bg-white p-4 rounded-2xl shadow mb-6">
                    <h3 className="text-lg font-semibold mb-4">Add Income</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Source (eg: Interest, Other Income)"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            className="border p-2 rounded-xl"
                        />

                        <input
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="border p-2 rounded-xl"
                        />

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
                            className="border p-2 rounded-xl"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="bg-green-600 text-white px-6 py-2 rounded-xl mt-4"
                    >
                        Add Income
                    </button>
                </div>

                {/* List */}
                <div className="bg-white p-4 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold mb-4">Income List</h3>

                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2">Date</th>
                                <th className="p-2">Source</th>
                                <th className="p-2">Amount</th>
                                <th className="p-2">Note</th>
                                <th className="p-2">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {incomes.map((inc) => (
                                <tr key={inc._id} className="border-b">
                                    <td className="p-2">
                                        {new Date(inc.date).toLocaleDateString()}
                                    </td>
                                    <td className="p-2">{inc.source}</td>
                                    <td className="p-2">₹ {inc.amount}</td>
                                    <td className="p-2">{inc.note}</td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => handleDelete(inc._id)}
                                            className="text-red-500"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {incomes.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center p-4 text-gray-500">
                                        No income records
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
