// import { useEffect, useState } from "react"
// import MainLayout from "../layouts/MainLayout"
// import API from "../api/axios"
// import { useNavigate } from "react-router-dom"

// export default function Invoices() {
//     const [customers, setCustomers] = useState([])
//     const [products, setProducts] = useState([])
//     const [items, setItems] = useState([])

//     const [customerId, setCustomerId] = useState("")
//     const [paymentMode, setPaymentMode] = useState("Cash")
//     const [paidAmount, setPaidAmount] = useState(0)

//     const businessId = localStorage.getItem("businessId")
//     const navigate = useNavigate()

//     // 🔹 Load data
//     useEffect(() => {
//         const fetchData = async () => {
//             const c = await API.get(`/customers/${businessId}`)
//             const p = await API.get(`/products/${businessId}`)

//             setCustomers(c.data)
//             setProducts(p.data)
//         }

//         fetchData()
//     }, [])

//     // 🔹 Add item
//     const addItem = () => {
//         setItems([...items, { productId: "", quantity: 1 }])
//     }

//     // 🔹 Change item
//     const handleItemChange = (index, field, value) => {
//         const updated = [...items]
//         updated[index][field] = value
//         setItems(updated)
//     }

//     // 🔹 Remove item
//     const removeItem = (index) => {
//         setItems(items.filter((_, i) => i !== index))
//     }

//     // 🔹 Calculate total (preview only)
//     const calculateTotal = () => {
//         let total = 0

//         items.forEach(item => {
//             const product = products.find(p => p._id === item.productId)
//             if (product) {
//                 const base = product.price * item.quantity
//                 const gst = (base * product.gstRate) / 100
//                 total += base + gst
//             }
//         })

//         return total
//     }

//     const grandTotal = calculateTotal()
//     const dueAmount = grandTotal - paidAmount

//     // 🔹 Submit
//     const handleSubmit = async () => {
//         console.log("businessId:", businessId)
//         console.log("customerId:", customerId)
//         console.log("items:", items)
//         try {
//           const res =  await API.post("/invoices", {
//                 businessId,
//                 customerId,
//                 items,
//                 paymentMode,
//                 paidAmount
//             })

//             alert("Invoice Created ✅")

//             navigate(`/invoice/${res.data._id}`)

//             // Reset
//             setItems([])
//             setCustomerId("")
//             setPaidAmount(0)

//         } catch (err) {
//             alert(err.response?.data?.message || "Error creating invoice")
//         }
//     }


//     return (
//         <MainLayout>

//             <div className="bg-white p-6 rounded-xl shadow">

//                 <h2 className="text-xl font-semibold mb-4">Create Invoice</h2>

//                 {/* 🔹 Customer */}
//                 <select
//                     value={customerId}
//                     onChange={(e) => setCustomerId(e.target.value)}
//                     className="p-2 border w-full mb-4"
//                 >
//                     <option value="">Select Customer</option>
//                     {customers.map(c => (
//                         <option key={c._id} value={c._id}>
//                             {c.name}
//                         </option>
//                     ))}
//                 </select>

//                 {/* 🔹 Items */}
//                 {items.map((item, index) => (
//                     <div key={index} className="grid grid-cols-3 gap-3 mb-2">

//                         <select
//                             value={item.productId}
//                             onChange={(e) =>
//                                 handleItemChange(index, "productId", e.target.value)
//                             }
//                             className="p-2 border"
//                         >
//                             <option value="">Select Product</option>
//                             {products.map(p => (
//                                 <option key={p._id} value={p._id}>
//                                     {p.name}
//                                 </option>
//                             ))}
//                         </select>

//                         <input
//                             type="number"
//                             value={item.quantity}
//                             onChange={(e) =>
//                                 handleItemChange(index, "quantity", Number(e.target.value))
//                             }
//                             className="p-2 border"
//                         />

//                         <button
//                             onClick={() => removeItem(index)}
//                             className="text-red-500"
//                         >
//                             Remove
//                         </button>

//                     </div>
//                 ))}

//                 <button
//                     onClick={addItem}
//                     className="bg-gray-200 px-3 py-2 mb-4"
//                 >
//                     + Add Product
//                 </button>

//                 {/* 🔹 Payment Section */}
//                 <div className="grid grid-cols-2 gap-4 mb-4">

//                     <select
//                         value={paymentMode}
//                         onChange={(e) => setPaymentMode(e.target.value)}
//                         className="p-2 border"
//                     >
//                         <option>Cash</option>
//                         <option>Bank</option>
//                         <option>UPI</option>
//                         <option>Credit</option>
//                     </select>

//                     <input
//                         type="number"
//                         placeholder="Paid Amount"
//                         value={paidAmount}
//                         onChange={(e) => setPaidAmount(Number(e.target.value))}
//                         className="p-2 border"
//                     />

//                 </div>

//                 {/* 🔹 Totals */}
//                 <div className="mb-4 space-y-1">
//                     <p><strong>Grand Total:</strong> ₹ {grandTotal}</p>
//                     <p><strong>Paid:</strong> ₹ {paidAmount}</p>
//                     <p className="text-red-500"><strong>Due:</strong> ₹ {dueAmount}</p>
//                 </div>

//                 {/* 🔹 Submit */}
//                 <button
//                     onClick={handleSubmit}
//                     className="bg-green-500 text-white p-2 w-full"
//                 >
//                     Create Invoice
//                 </button>

//             </div>

//         </MainLayout>
//     )
// }






import { useEffect, useState } from "react"
import MainLayout from "../layouts/MainLayout"
import API from "../api/axios"
import { useNavigate } from "react-router-dom"

export default function Invoices() {
    const [customers, setCustomers] = useState([])
    const [products, setProducts] = useState([])
    const [items, setItems] = useState([])

    const [customerId, setCustomerId] = useState("")
    const [paymentMode, setPaymentMode] = useState("Cash")
    const [paidAmount, setPaidAmount] = useState(0)

    const businessId = localStorage.getItem("businessId")
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const c = await API.get(`/customers/${businessId}`)
            const p = await API.get(`/products/${businessId}`)

            setCustomers(c.data)
            setProducts(p.data)
        }

        fetchData()
    }, [])

    const addItem = () => {
        setItems([...items, { productId: "", quantity: 1 }])
    }

    const handleItemChange = (index, field, value) => {
        const updated = [...items]
        updated[index][field] = value
        setItems(updated)
    }

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index))
    }

    const calculateTotal = () => {
        let total = 0

        items.forEach(item => {
            const product = products.find(p => p._id === item.productId)
            if (product) {
                const base = product.price * item.quantity
                const gst = (base * product.gstRate) / 100
                total += base + gst
            }
        })

        return total
    }

    const grandTotal = calculateTotal()
    const dueAmount = grandTotal - paidAmount

    const handleSubmit = async () => {
        // ✅ FRONTEND VALIDATION
        if (!customerId) {
            return alert("Select customer")
        }

        if (items.length === 0) {
            return alert("Add at least one product")
        }

        // ❌ invalid items
        const invalidItem = items.find(i => !i.productId || i.quantity <= 0)
        if (invalidItem) {
            return alert("Select valid products and quantity")
        }

        // ❌ over payment
        if (paidAmount > grandTotal) {
            return alert("Paid amount cannot exceed total")
        }

        // ✅ CREDIT AUTO FIX
        let finalPaid = paidAmount
        if (paymentMode === "Credit") {
            finalPaid = 0
        }

        try {
            const res = await API.post("/invoices", {
                businessId,
                customerId,
                items,
                paymentMode,
                paidAmount: finalPaid
            })

            alert("Invoice Created ✅")

            navigate(`/invoice/${res.data._id}`)

            setItems([])
            setCustomerId("")
            setPaidAmount(0)

        } catch (err) {
            console.error(err)
            alert(err.response?.data?.message || "Error creating invoice")
        }
    }

    return (
        <MainLayout>
            <div className="bg-white p-6 rounded-xl shadow">

                <h2 className="text-xl font-semibold mb-4">Create Invoice</h2>

                {/* Customer */}
                <select
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    className="p-2 border w-full mb-4"
                >
                    <option value="">Select Customer</option>
                    {customers.map(c => (
                        <option key={c._id} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                {/* Items */}
                {items.map((item, index) => (
                    <div key={index} className="grid grid-cols-3 gap-3 mb-2">

                        <select
                            value={item.productId}
                            onChange={(e) =>
                                handleItemChange(index, "productId", e.target.value)
                            }
                            className="p-2 border"
                        >
                            <option value="">Select Product</option>
                            {products.map(p => (
                                <option key={p._id} value={p._id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>

                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                                handleItemChange(index, "quantity", Number(e.target.value))
                            }
                            className="p-2 border"
                        />

                        <button
                            onClick={() => removeItem(index)}
                            className="text-red-500"
                        >
                            Remove
                        </button>

                    </div>
                ))}

                <button
                    onClick={addItem}
                    className="bg-gray-200 px-3 py-2 mb-4"
                >
                    + Add Product
                </button>

                {/* Payment */}
                <div className="grid grid-cols-2 gap-4 mb-4">

                    <select
                        value={paymentMode}
                        onChange={(e) => setPaymentMode(e.target.value)}
                        className="p-2 border"
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
                        className="p-2 border"
                        disabled={paymentMode === "Credit"} // ✅ UX FIX
                    />

                </div>

                {/* Totals */}
                <div className="mb-4 space-y-1">
                    <p><strong>Grand Total:</strong> ₹ {grandTotal}</p>
                    <p><strong>Paid:</strong> ₹ {paymentMode === "Credit" ? 0 : paidAmount}</p>
                    <p className="text-red-500">
                        <strong>Due:</strong> ₹ {paymentMode === "Credit" ? grandTotal : dueAmount}
                    </p>
                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white p-2 w-full"
                >
                    Create Invoice
                </button>

            </div>
        </MainLayout>
    )
}