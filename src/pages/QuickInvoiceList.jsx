import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Trash2, Printer } from "lucide-react";
import MainLayout from "../layouts/MainLayout";

export default function QuickInvoiceList() {
    const [invoices, setInvoices] = useState([]);

    const fetchInvoices = async () => {
        try {
            const res = await api.get("/invoice/quick");
            setInvoices(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Delete this invoice?")) return;

        try {
            await api.delete(`/invoice/quick/${id}`);
            fetchInvoices();
        } catch (err) {
            console.error(err);
        }
    };

    const handlePrint = (invoice) => {
        const printWindow = window.open("", "_blank");

        const html = `
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body {
              font-family: monospace;
              width: 280px;
              margin: auto;
              padding: 10px;
            }
            .center { text-align: center; }
            .line { border-top: 1px dashed #000; margin: 6px 0; }
            table { width: 100%; font-size: 12px; }
            td { padding: 2px 0; }
            .right { text-align: right; }
            .bold { font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="center bold">BillNest</div>
          <div class="center">Quick Invoice</div>

          <div class="line"></div>

          <div>Inv: ${invoice.invoiceNumber}</div>
          <div>Date: ${invoice.date}</div>
          <div>Cust: ${invoice.customerName || "Walk-in"}</div>

          <div class="line"></div>

          <table>
            <thead>
              <tr>
                <td>Item</td>
                <td class="right">Qty</td>
                <td class="right">Amt</td>
              </tr>
            </thead>
            <tbody>
              ${invoice.items
                .map(
                    (item) => `
                    <tr>
                      <td>${item.name}</td>
                      <td class="right">${item.qty}</td>
                      <td class="right">${item.total}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>

          <div class="line"></div>

          <div class="right bold">Total: ₹${invoice.totalAmount}</div>

          <div class="line"></div>

          <div class="center">Thank you!</div>
          <div class="center">Visit again</div>
        </body>
      </html>
    `;

        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <MainLayout>
            <div className="p-6 max-w-6xl mx-auto">
                <h1 className="text-2xl font-semibold mb-4">Quick Invoice History</h1>

                <div className="grid gap-4">
                    {invoices.map((inv) => (
                        <div
                            key={inv._id}
                            className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center"
                        >
                            <div>
                                <p className="font-semibold">{inv.invoiceNumber}</p>
                                <p className="text-sm text-gray-500">{inv.date}</p>
                                <p className="text-sm">₹{inv.totalAmount}</p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handlePrint(inv)}
                                    className="border px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-gray-100"
                                >
                                    <Printer size={16} />
                                </button>

                                <button
                                    onClick={() => handleDelete(inv._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-red-600"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
