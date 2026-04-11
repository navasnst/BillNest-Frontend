import React, { useEffect, useState } from "react";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";

export default function PurchaseList() {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    const businessId = localStorage.getItem("businessId");

    useEffect(() => {
        fetchPurchases();
    }, []);

    const fetchPurchases = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/purchases/${businessId}`);
            setPurchases(res.data);
        } catch (err) {
            console.error(err);
            alert("Failed to load purchases");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Delete this purchase?");
        if (!confirmDelete) return;

        try {
            await api.delete(`/purchases/${id}`);
            setPurchases((prev) => prev.filter((p) => p._id !== id));
        } catch (err) {
            console.error(err);
            alert("Failed to delete purchase");
        }
    };

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <MainLayout>

            <div className="p-6 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Purchase List</h2>

                <div className="bg-white shadow rounded-2xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3">Purchase No</th>
                                <th className="p-3">Supplier</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Items</th>
                                <th className="p-3">Total</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {purchases.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center p-6">
                                        No purchases found
                                    </td>
                                </tr>
                            ) : (
                                purchases.map((p) => (
                                    <tr key={p._id} className="border-t hover:bg-gray-50">
                                        <td className="p-3 font-medium">{p.purchaseNumber}</td>
                                        <td className="p-3">{p.supplierName || "-"}</td>
                                        <td className="p-3">
                                            {new Date(p.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-3">{p.items.length}</td>
                                        <td className="p-3 font-semibold">₹ {p.grandTotal}</td>
                                        <td className="p-3 text-center space-x-2">
                                            <button
                                                onClick={() => handleDelete(p._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded-lg"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
}
