import { useEffect, useState } from "react"
import API from "../api/axios"
import { useNavigate } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"

export default function InvoiceList() {
    const [invoices, setInvoices] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const res = await API.get("/invoices/my")
                setInvoices(res.data)
            } catch (err) {
                console.error(err)
            }
        }

        fetchInvoices()
    }, [])

    return (
        <MainLayout>
            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">All Invoices</h2>

                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th>Invoice No</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {invoices.map(inv => (
                            <tr key={inv._id} className="text-center border-t">
                                <td>{inv.invoiceNumber}</td>
                                <td>{inv.customer?.name}</td>
                                <td>₹{inv.grandTotal}</td>
                                <td>{new Date(inv.createdAt).toLocaleDateString()}</td>

                                <td>
                                    <button
                                        onClick={() => navigate(`/invoice/${inv._id}`)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </MainLayout>
    )
}