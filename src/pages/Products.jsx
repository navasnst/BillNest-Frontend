import { useEffect, useState } from "react"
import MainLayout from "../layouts/MainLayout"
import API from "../api/axios"

export default function Products() {
    const [products, setProducts] = useState([])
    const [editId, setEditId] = useState(null)
    const [form, setForm] = useState({
        name: "",
        hsnCode: "",
        price: "",
        gstRate: "",
        stock: ""
    })

    const businessId = localStorage.getItem("businessId")

    // 🔹 Fetch products
    const fetchProducts = async () => {
        try {
            const res = await API.get(`/products/${businessId}`)
            setProducts(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    // 🔹 Handle input
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleEdit = (product) => {
        setForm({
            name: product.name,
            hsnCode: product.hsnCode,
            price: product.price,
            gstRate: product.gstRate,
            stock: product.stock
        })

        setEditId(product._id)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (editId) {
                //Edit product
                await API.put(`/products/${editId}`, { ...form, businessId })

            } else {
                //Add product
                await API.post("/products", { ...form, businessId })
            }

            setForm({ name: "", hsnCode: "", price: "", gstRate: "", stock: "" })
            setEditId(null)
            fetchProducts()

        } catch (err) {
            alert("Error saving product")
        }


    }
    // 🔹 Delete product
    const handleDelete = async (id) => {
        try {
            await API.delete(`/products/${id}`)
            fetchProducts()
        } catch (err) {
            alert("Delete failed")
        }
    }

    return (
        <MainLayout>

            {/* 🔹 Add Product Form */}
            <div className="bg-white p-4 rounded-xl shadow mb-6">
                <h2 className="text-lg font-semibold mb-4">Add Product</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-4 gap-3">

                    <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="p-2 border" />

                    <input name="hsnCode" placeholder="hsnCode" value={form.hsnCode} onChange={handleChange} className="p-2 border" />

                    <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="p-2 border" />

                    <input name="gstRate" type="number" placeholder="GST %" value={form.gstRate} onChange={handleChange} className="p-2 border" />

                    <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} className="p-2 border" />

                    <button className="bg-blue-500 text-white p-2 col-span-2 md:col-span-4 hover:bg-blue-400 rounded cursor-pointer">
                        {editId ? "Update Product" : "Add Product"}
                    </button>

                </form>
            </div>

            {/* 🔹 Product List */}
            <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4">Products</h2>

                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th>Name</th>
                            <th>HSN Code</th>
                            <th>Price</th>
                            <th>GST</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((p) => (
                            <tr key={p._id} className="border-b">
                                <td>{p.name}</td>
                                <td>{p.hsnCode}</td>
                                <td>₹ {p.price}</td>
                                <td>{p.gstRate}%</td>
                                <td>{p.stock}</td>
                                <td>
                                    <button
                                        onClick={() => handleEdit(p)}
                                        className="text-blue-500 mr-2 cursor-pointer hover:text-blue-700 pr-20"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(p._id)}
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