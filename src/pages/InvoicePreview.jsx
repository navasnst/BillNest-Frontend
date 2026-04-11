import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../api/axios"
import html2pdf from "html2pdf.js"
import logo from "../assets/BillNest.png"

export default function InvoicePreview() {
    const { id } = useParams()
    const [invoice, setInvoice] = useState(null)

    useEffect(() => {
        const fetchInvoice = async () => {
            const res = await API.get(`/invoices/${id}`)
            setInvoice(res.data)
        }
        fetchInvoice()
    }, [])

    if (!invoice) return <p>Loading...</p>

    const downloadPDF = () => {
        const element = document.getElementById("invoice")

        html2pdf().set({
            margin: 5,
            filename: `invoice-${invoice.invoiceNumber}.pdf`,
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
        }).from(element).save()
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString()
    }

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString()
    }

    const sharePDF = async () => {
        const element = document.getElementById("invoice")

        const opt = {
            margin: 10,
            filename: "invoice.pdf",
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
        }

        // Generate PDF as blob
        const pdfBlob = await html2pdf().set(opt).from(element).outputPdf("blob")

        const file = new File([pdfBlob], "invoice.pdf", {
            type: "application/pdf"
        })

        if (navigator.share) {
            await navigator.share({
                title: "Invoice",
                files: [file]
            })
        } else {
            alert("Sharing not supported on this device")
        }
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            {/* ACTIONS */}
            <div className="mb-4 flex gap-3">
                <button
                    onClick={() => window.print()}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Print
                </button>

                <button
                    onClick={sharePDF}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Share
                </button>

                <button
                    onClick={downloadPDF}
                    className="bg-purple-500 text-white px-4 py-2 rounded"
                >
                    Download PDF
                </button>
            </div>

            {/* ✅ THIS IS IMPORTANT */}
            <div id="invoice" className="bg-white p-6 rounded shadow max-w-md mx-auto">

                {/* HEADER */}
                <div className="flex justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold">
                            {invoice.business.businessName}
                        </h2>
                        <p>{invoice.business.address}</p>
                        <p>{invoice.business.state}</p>
                        <p>Ph: {invoice.business.phone}</p>
                        <p>GST IN: {invoice.business.gstNumber}</p>
                    </div>

                    <div className="text-right">
                        <h3 className="font-semibold">Customer</h3>
                        <p>{invoice.customer.name}</p>
                        <p>{invoice.customer.phone}</p>
                        <p>{invoice.customer.address}</p>
                        <p>{invoice.customer.state}</p>
                        <p>{invoice.customer.gstNumber}</p>
                    </div>

                </div>
                <div className="mt-3 text-sm">
                    <p><strong>Invoice No:</strong> {invoice.invoiceNumber}</p>
                    <p><strong>Date:</strong> {formatDate(invoice.createdAt)}</p>
                    <p><strong>Time:</strong> {formatTime(invoice.createdAt)}</p>
                </div>

                {/* ITEMS */}
                <table className="w-full border mb-5 mt-5">
                    <thead>
                        {/* <tr className="bg-gray-200"> */}
                        <tr className="bg-white">
                            <th>Name</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.items.map((item, i) => (
                            <tr key={i} className="text-center border-t">
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>{item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* TOTALS */}
                <div className="text-right space-y-1">
                    <p>Subtotal: ₹{invoice.subtotal}</p>

                    {invoice.cgst > 0 && <p>CGST: ₹{invoice.cgst}</p>}
                    {invoice.sgst > 0 && <p>SGST: ₹{invoice.sgst}</p>}
                    {invoice.igst > 0 && <p>IGST: ₹{invoice.igst}</p>}

                    <h3 className="font-bold">Total: ₹{invoice.grandTotal}</h3>
                </div>

                <p><strong>Payment Mode:</strong> {invoice.paymentMode}</p>

                {/* <p>
                    <strong>Status:</strong>{" "}
                    <span className={invoice.paymentStatus === "Paid" ? "text-black-500" : "text-black-500"}>
                        {invoice.paymentStatus}
                    </span>
                </p> */}

                {/* FOOTER */}
                {/* <div className="mt-10 pt-4 border-t text-center text-gray-500 text-sm flex flex-col items-center gap-2"> */}
                <div className="mt-10 pt-4 border-t text-center text-black text-sm flex flex-col items-center gap-2">
                    <img src={logo} alt="BillNest Logo" className="h-15" />
                    <p>Powered by <span className="font-semibold">BillNest</span></p>
                </div>

            </div>
        </div>
    )

}