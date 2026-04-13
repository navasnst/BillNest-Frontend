
import { useEffect, useState } from "react"
import API from "../api/axios"
import MainLayout from "../layouts/MainLayout"

export default function Ledger() {
    const [summary, setSummary] = useState({})
    const [transactions, setTransactions] = useState([])
    const businessId = localStorage.getItem("businessId")

    useEffect(() => {
        fetchSummary()
        fetchTransactions()
    }, [])

    const fetchSummary = async () => {
        const res = await API.get(`/ledger/full-summary/${businessId}`)
        setSummary(res.data)
    }

    const fetchTransactions = async () => {
        const res = await API.get(`/ledger/${businessId}`)
        setTransactions(res.data)
    }

    // ✅ Better labels
    const sourceLabel = {
        Invoice: "Sales",
        Purchase: "Purchase",
        Income: "Income",
        Expense: "Expense",
        Receipt: "Receipt",
        Payment: "Payment",
        Capital: "Capital"
    }

    return (
        <MainLayout>
            <div className="p-6 bg-gray-50 min-h-screen space-y-6">
                <h1 className="text-2xl font-bold">Ledger</h1>

                {/* SUMMARY */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        ["Sales", summary.sales],
                        ["Purchase", summary.purchase],
                        ["Income", summary.income],
                        ["Expense", summary.expense],
                        ["Cash", summary.cash],
                        ["Bank", summary.bank],
                        ["Receipt", summary.receipt],
                        ["Payment", summary.payment],
                        ["Profit", summary.profit] // ❌ GST removed
                    ].map(([label, value], i) => (
                        <div key={i} className="bg-white p-4 rounded-xl shadow">
                            <p className="text-gray-500 text-sm">{label}</p>
                            <h2 className="text-lg font-semibold">₹ {value || 0}</h2>
                        </div>
                    ))}
                </div>

                {/* TRANSACTIONS */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Transactions</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-left">
                                    <th className="p-2">Date</th>
                                    <th className="p-2">Source</th>
                                    <th className="p-2">Account</th>
                                    <th className="p-2">IN</th>
                                    <th className="p-2">OUT</th>
                                    <th className="p-2">Note</th>
                                </tr>
                            </thead>

                            <tbody>
                                {transactions.map((t) => (
                                    <tr key={t._id} className="border-b">
                                        <td className="p-2">
                                            {new Date(t.date).toLocaleDateString()}
                                        </td>

                                        {/* ✅ Proper source label */}
                                        <td className="p-2">
                                            {sourceLabel[t.source] || t.source}
                                        </td>

                                        {/* ✅ Better Cash/Bank display */}
                                        <td className="p-2">
                                            {t.type === "Cash" ? "💵 Cash" : "🏦 Bank"}
                                        </td>

                                        <td className="p-2 text-green-600 font-medium">
                                            {t.transactionType === "IN" ? `₹ ${t.amount}` : "-"}
                                        </td>

                                        <td className="p-2 text-red-600 font-medium">
                                            {t.transactionType === "OUT" ? `₹ ${t.amount}` : "-"}
                                        </td>

                                        <td className="p-2">{t.note || "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}