import React, { useEffect, useState } from "react";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";

export default function Supplier() {
    const [suppliers, setSuppliers] = useState([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const businessId = localStorage.getItem("businessId");

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const res = await api.get(`/suppliers/${businessId}`);
            setSuppliers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async () => {
        if (!name) return alert("Supplier name required");

        try {
            await api.post("/suppliers", {
                businessId,
                name,
                phone,
                email,
                address,
            });

            alert("Supplier added");
            setName("");
            setPhone("");
            setEmail("");
            setAddress("");
            fetchSuppliers();
        } catch (err) {
            console.error(err);
            alert("Error adding supplier");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete supplier?")) return;

        try {
            await api.delete(`/suppliers/${id}`);
            fetchSuppliers();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <MainLayout>
            <div className="p-6 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Suppliers</h2>

                {/* FORM */}
                <div className="bg-white p-4 rounded-2xl shadow mb-6">
                    <h3 className="text-lg font-semibold mb-4">Add Supplier</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Supplier Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border p-2 rounded-xl"
                        />

                        <input
                            type="text"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="border p-2 rounded-xl"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border p-2 rounded-xl"
                        />

                        <input
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="border p-2 rounded-xl"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-6 py-2 rounded-xl mt-4"
                    >
                        Add Supplier
                    </button>
                </div>

                {/* LIST */}
                <div className="bg-white p-4 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold mb-4">Supplier List</h3>

                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2">Name</th>
                                <th className="p-2">Phone</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Address</th>
                                <th className="p-2">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {suppliers.map((s) => (
                                <tr key={s._id} className="border-b">
                                    <td className="p-2">{s.name}</td>
                                    <td className="p-2">{s.phone}</td>
                                    <td className="p-2">{s.email}</td>
                                    <td className="p-2">{s.address}</td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => handleDelete(s._id)}
                                            className="text-red-500"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {suppliers.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center p-4 text-gray-500">
                                        No suppliers yet
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
