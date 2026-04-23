
import { useState } from "react"
import API from "../api/axios"
import { useNavigate } from "react-router-dom"

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        businessName: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await API.post("/auth/register", form)

            localStorage.setItem("token", res.data.token)
            localStorage.setItem("businessId", res.data.user.id)

            navigate("/dashboard")
        } catch (err) {
            alert(err.response?.data?.message || "Register failed")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">

            <form
                onSubmit={handleSubmit}
                className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-sm border"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create Account
                </h2>

                <div className="space-y-3">
                    <input
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        name="businessName"
                        placeholder="Business Name"
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 mt-5 rounded-xl font-semibold shadow-md transition duration-300"
                >
                    Register
                </button>

                <p className="text-sm text-center text-gray-500 mt-5">
                    Already have an account?
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="w-full border border-blue-500 text-blue-500 p-3 mt-3 rounded-xl hover:bg-blue-500 hover:text-white transition duration-300"
                >
                    Login
                </button>
            </form>
        </div>
    )
}