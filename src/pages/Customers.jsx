import { useEffect, useState } from "react"
import MainLayout from "../layouts/MainLayout"
import API from "../api/axios"

export default function Customers() {
    const [customers, setCustomers] = useState([])
    const [editId, setEditId] = useState(null)

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        gstNumber: "",
        address: "",
        state: ""
    })

    const businessId = localStorage.getItem("businessId")

    // 🔹 Fetch
    const fetchCustomers = async () => {
        const res = await API.get(`/customers/${businessId}`)
        setCustomers(res.data)
    }

    useEffect(() => {
        fetchCustomers()
    }, [])

    // 🔹 Input
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    // 🔹 Submit (Add + Edit)
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (editId) {
                // UPDATE
                await API.put(`/customers/${editId}`, form)
                setEditId(null)
            } else {
                // CREATE
                await API.post("/customers", {
                    ...form,
                    businessId
                })
            }

            setForm({ name: "", phone: "", email: "", gstNumber: "", address: "", state: "" })
            fetchCustomers()

        } catch (err) {
            alert("Error saving customer")
        }
    }

    // 🔹 Delete
    const handleDelete = async (id) => {
        await API.delete(`/customers/${id}`)
        fetchCustomers()
    }

    // 🔹 Edit click
    const handleEdit = (customer) => {
        setForm({
            name: customer.name,
            phone: customer.phone,
            email: customer.email,
            gstNumber: customer.gstNumber,
            address: customer.address,
            state: customer.state
        })
        setEditId(customer._id)
    }

    return (
        <MainLayout>

            {/* 🔹 Form */}
            <div className="bg-white p-4 rounded-xl shadow mb-6">
                <h2 className="text-lg font-semibold mb-4">
                    {editId ? "Edit Customer" : "Add Customer"}
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-4 gap-3">

                    <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="p-2 border" />
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="p-2 border" />
                    <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="p-2 border" />
                    <input name="gstNumber" value={form.gstNumber} onChange={handleChange} placeholder="GST Number" className="p-2 border" />
                    <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="p-2 border" />
                    <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="p-2 border" />

                    <button className="bg-blue-500 text-white p-2 col-span-2 md:col-span-4 hover:bg-blue-400 rounded cursor-pointer">
                        {editId ? "Update Customer" : "Add Customer"}
                    </button>

                </form>
            </div>

            {/* 🔹 Table */}
            <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4">Customers</h2>

                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>GST Number</th>
                            <th>State</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {customers.map((c) => (
                            <tr key={c._id} className="border-b">
                                <td>{c.name}</td>
                                <td>{c.phone}</td>
                                <td>{c.email}</td>
                                <td>{c.gstNumber}</td>
                                <td>{c.state}</td>
                                <td>{c.address}</td>
                                <td className="space-x-2">

                                    <button
                                        onClick={() => handleEdit(c)}
                                        className="text-blue-500 mr-2 cursor-pointer hover:text-blue-700 pr-20"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(c._id)}
                                        className="text-red-500 cursor-pointer hover:text-red-700"
                                    >
                                        Delete
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