
import { useEffect, useState } from "react"
import API from "../api/axios"
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    BarChart, Bar, CartesianGrid
} from "recharts"
import MainLayout from "../layouts/MainLayout"

export default function Report() {
    const [dashboard, setDashboard] = useState({})
    const [pl, setPL] = useState({})
    const [gst, setGST] = useState({})
    const [balance, setBalance] = useState({})
    const [liabilities, setLiabilities] = useState({}) // ✅ NEW
    const [monthly, setMonthly] = useState([])

    const businessId = localStorage.getItem("businessId")

    useEffect(() => {
        fetchAll()
    }, [])

    const fetchAll = async () => {
        try {
            const [d, p, g, b, m] = await Promise.all([
                API.get(`/report/dashboard/${businessId}`),
                API.get(`/report/pl/${businessId}`),
                API.get(`/report/gst/${businessId}`),
                API.get(`/report/balanceSheet/${businessId}`),
                API.get(`/report/monthly/${businessId}`)
            ])

            setDashboard(d.data)
            setPL(p.data)
            setGST(g.data)
            setBalance(b.data.assets || {})
            setLiabilities(b.data.liabilities || {}) 
            setMonthly(m.data || [])
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <MainLayout>
            <div className="min-w-[300px] bg-white p-6 rounded-xl shadow">
                <h1 className="text-3xl font-bold">Advanced Reports</h1>

                {/* SUMMARY CARDS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        ["Sales", dashboard.totalSales],
                        ["Purchase", dashboard.totalPurchase],
                        ["Expense", dashboard.totalExpense],
                        ["Income", dashboard.totalOtherIncome],
                        ["Profit", dashboard.profit],
                        ["GST", dashboard.netGST]
                    ].map(([label, value], i) => (
                        <div key={i} className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                            <p className="text-gray-500 text-sm">{label}</p>
                            <h2 className="text-xl font-semibold mt-1">₹ {value || 0}</h2>
                        </div>
                    ))}
                </div>

                {/* CHARTS */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="font-semibold mb-4">Monthly Sales Trend</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthly}>
                                <XAxis dataKey="_id" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="totalSales" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="font-semibold mb-4 text-lg">Invoice Count</h2>

                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthly}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="_id" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="totalInvoices" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* PROFIT & LOSS */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Profit & Loss</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <p>Sales: ₹ {pl.totalSales || 0}</p>
                        <p>Purchase: ₹ {pl.totalPurchase || 0}</p>
                        <p>Expense: ₹ {pl.totalExpense || 0}</p>
                        <p>Income: ₹ {pl.totalIncome || 0}</p>
                    </div>
                    <p className="mt-4 font-semibold">Net Profit: ₹ {pl.profit || 0}</p>
                </div>

                {/* GST */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-lg font-semibold mb-4">GST Report</h2>

                    <div className="text-sm space-y-2">
                        <p>
                            Output GST: ₹ {
                                (gst.outputGST?.cgst || 0) +
                                (gst.outputGST?.sgst || 0) +
                                (gst.outputGST?.igst || 0)
                            }
                        </p>

                        <p>
                            Input GST: ₹ {
                                (gst.inputGST?.cgst || 0) +
                                (gst.inputGST?.sgst || 0) +
                                (gst.inputGST?.igst || 0)
                            }
                        </p>

                        <p className="font-semibold">
                            Net GST: ₹ {gst.netGST || 0}
                        </p>
                    </div>
                </div>

                {/* BALANCE SHEET */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Balance Sheet</h2>

                    <div className="grid md:grid-cols-2 gap-6 text-sm">

                        {/* ASSETS */}
                        <div>
                            <h3 className="font-semibold mb-2">Assets</h3>
                            <p>Cash: ₹ {balance.cash || 0}</p>
                            <p>Bank: ₹ {balance.bank || 0}</p>
                            <p>Receivables: ₹ {balance.receivables || 0}</p>
                            <p className="font-semibold mt-2">
                                Total Assets: ₹ {balance.totalAssets || 0}
                            </p>
                        </div>

                        {/* LIABILITIES ✅ NEW */}
                        <div>
                            <h3 className="font-semibold mb-2">Liabilities</h3>
                            <p>Payables: ₹ {liabilities.payables || 0}</p>
                            <p className="font-semibold mt-2">
                                Total Liabilities: ₹ {liabilities.totalLiabilities || 0}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </MainLayout>
    )
}