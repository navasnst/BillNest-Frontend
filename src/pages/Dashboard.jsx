// import { useEffect, useState } from "react"
// import MainLayout from "../layouts/MainLayout"
// import API from "../api/axios"

// import {
//     LineChart,
//     Line,
//     BarChart,
//     Bar,
//     PieChart,
//     Pie,
//     Cell,
//     XAxis,
//     YAxis,
//     Tooltip,
//     ResponsiveContainer
// } from "recharts"



// export default function Dashboard() {
//     const [data, setData] = useState(null)
//     const [chartData, setChartData] = useState([])

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const businessId = localStorage.getItem("businessId")

//                 // Dashboard stats
//                 const res = await API.get(`/report/dashboard/${businessId}`)
//                 setData(res.data)

//                 // Daily chart data
//                 const res2 = await API.get(`/report/daily/${businessId}`)
//                 setChartData(res2.data)

//             } catch (err) {
//                 console.error(err)
//             }
//         }

//         fetchData()
//     }, [])

//     if (!data) return <div className="p-6">Loading...</div>


//     const performanceData = [
//         { name: "Sales", value: Math.abs(data.totalSales || 0) },
//         { name: "Purchase", value: Math.abs(data.totalPurchase || 0) },
//         { name: "Profit", value: Math.abs(data.profit || 0) },
//         { name: "GST", value: Math.abs(data.netGST || 0) },
//         { name: "Expense", value: Math.abs(data.totalExpense || 0) },
//         { name: "Income", value: Math.abs(data.totalOtherIncome || 0) }
//     ]

//     const COLORS = [
//         "#0088FE", // Sales
//         "#FF8042", // Purchase
//         "#00C49F", // Profit
//         "#FFBB28", // GST
//         "#FF4444", // Expense
//         "#AA66CC"  // Income
//     ]

//     return (
//         <MainLayout>
//             {/* 🔹 Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

//                 <div className="bg-white p-4 rounded-xl shadow">
//                     <h3 className="text-gray-500">Total Sales</h3>
//                     <p className="text-2xl font-semibold mt-2">₹ {data.totalSales}</p>
//                 </div>

//                 <div className="bg-white p-4 rounded-xl shadow">
//                     <h3 className="text-gray-500">Total Purchase</h3>
//                     <p className="text-2xl font-semibold mt-2">₹ {data.totalPurchase}</p>
//                 </div>

//                 <div className="bg-white p-4 rounded-xl shadow">
//                     <h3 className="text-gray-500">Profit</h3>
//                     <p className="text-2xl font-semibold mt-2">₹ {data.profit}</p>
//                 </div>

//                 <div className="bg-white p-4 rounded-xl shadow">
//                     <h3 className="text-gray-500">GST Payable</h3>
//                     <p className="text-2xl font-semibold mt-2">₹ {data.netGST}</p>
//                 </div>

//                 <div className="bg-white p-4 rounded-xl shadow">
//                     <h3 className="text-gray-500">Expenses</h3>
//                     <p className="text-2xl font-semibold mt-2">₹ {data.totalExpense}</p>
//                 </div>

//                 <div className="bg-white p-4 rounded-xl shadow">
//                     <h3 className="text-gray-500">Other Income</h3>
//                     <p className="text-2xl font-semibold mt-2">₹ {data.totalOtherIncome}</p>
//                 </div>

//             </div>

//             {/* 🔹 Chart */}
//             <div className="bg-white p-4 rounded-xl shadow mt-6">
//                 <h3 className="mb-4 text-lg font-semibold">Sales Trend</h3>

//                 <ResponsiveContainer width="100%" height={300}>
//                     <LineChart data={chartData}>
//                         <XAxis dataKey="_id" />
//                         <YAxis />
//                         <Tooltip />
//                         <Line type="monotone" dataKey="totalSales" />
//                     </LineChart>
//                 </ResponsiveContainer>
//             </div>



//             <div className="bg-white p-4 rounded-xl shadow mt-6">
//                 <h3 className="mb-4 text-lg font-semibold">Total Performance</h3>

//                 <ResponsiveContainer width="100%" height={300}>
//                     <PieChart>
//                         <Pie
//                             data={performanceData}
//                             dataKey="value"
//                             nameKey="name"
//                             cx="50%"
//                             cy="50%"
//                             outerRadius={100}
//                             label
//                         >
//                             {performanceData.map((entry, index) => (
//                                 <Cell key={index} fill={COLORS[index]} />
//                             ))}
//                         </Pie>
//                         <Tooltip />
//                     </PieChart>
//                 </ResponsiveContainer>

//                 {/* ✅ Legend */}
//                 <div className="flex flex-wrap gap-4 mt-4">
//                     {performanceData.map((item, index) => (
//                         <div key={index} className="flex items-center gap-2">
//                             <div
//                                 className="w-3 h-3 rounded"
//                                 style={{ backgroundColor: COLORS[index] }}
//                             ></div>
//                             <span className="text-sm">{item.name}</span>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//         </MainLayout>
//     )
// }






import { useEffect, useState } from "react"
import MainLayout from "../layouts/MainLayout"
import API from "../api/axios"

import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts"

export default function Dashboard() {
    const [data, setData] = useState(null)
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const businessId = localStorage.getItem("businessId")

                const res = await API.get(`/report/dashboard/${businessId}`)
                setData(res.data || {})

                const res2 = await API.get(`/report/daily/${businessId}`)
                setChartData(res2.data || [])

            } catch (err) {
                console.error(err)
            }
        }

        fetchData()
    }, [])

    if (!data) return <div className="p-6">Loading...</div>

    const performanceData = [
        { name: "Sales", value: Math.abs(data.totalSales || 0) },
        { name: "Purchase", value: Math.abs(data.totalPurchase || 0) },
        { name: "Profit", value: Math.abs(data.profit || 0) },
        { name: "GST", value: Math.abs(data.netGST || 0) },
        { name: "Expense", value: Math.abs(data.totalExpense || 0) },
        { name: "Income", value: Math.abs(data.totalOtherIncome || 0) }
    ]

    const COLORS = [
        "#0088FE",
        "#FF8042",
        "#00C49F",
        "#FFBB28",
        "#FF4444",
        "#AA66CC"
    ]

    return (
        <MainLayout>

            {/* 🔹 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="bg-white p-4 rounded-xl shadow">
                    <h3 className="text-gray-500">Total Sales</h3>
                    <p className="text-2xl font-semibold mt-2">₹ {data.totalSales || 0}</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow">
                    <h3 className="text-gray-500">Total Purchase</h3>
                    <p className="text-2xl font-semibold mt-2">₹ {data.totalPurchase || 0}</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow">
                    <h3 className="text-gray-500">Profit</h3>
                    <p className="text-2xl font-semibold mt-2">₹ {data.profit || 0}</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow">
                    <h3 className="text-gray-500">GST Payable</h3>
                    <p className="text-2xl font-semibold mt-2">₹ {data.netGST || 0}</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow">
                    <h3 className="text-gray-500">Expenses</h3>
                    <p className="text-2xl font-semibold mt-2">₹ {data.totalExpense || 0}</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow">
                    <h3 className="text-gray-500">Other Income</h3>
                    <p className="text-2xl font-semibold mt-2">₹ {data.totalOtherIncome || 0}</p>
                </div>

            </div>

            {/* 🔹 Sales Trend */}
            <div className="bg-white p-4 rounded-xl shadow mt-6">
                <h3 className="mb-4 text-lg font-semibold">Sales Trend</h3>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="totalSales" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* 🔹 Performance Pie */}
            <div className="bg-white p-4 rounded-xl shadow mt-6">
                <h3 className="mb-4 text-lg font-semibold">Total Performance</h3>

                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={performanceData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {performanceData.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-4">
                    {performanceData.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded"
                                style={{ backgroundColor: COLORS[index] }}
                            ></div>
                            <span className="text-sm">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

        </MainLayout>
    )
}