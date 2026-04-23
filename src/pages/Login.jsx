
import { useState } from "react"
import API from "../api/axios"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await API.post("/auth/login", form)

            localStorage.setItem("token", res.data.token)
            localStorage.setItem("businessId", res.data.user.id)

            navigate("/dashboard")
        } catch (err) {
            alert(err.response?.data?.message || "Login failed")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-4">

            <form
                onSubmit={handleSubmit}
                className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-sm border"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Welcome Back
                </h2>

                <div className="space-y-3">
                    <input
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-400"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>

                <button
                    className="w-full bg-green-500 hover:bg-green-600 text-white p-3 mt-5 rounded-xl font-semibold shadow-md transition duration-300"
                >
                    Login
                </button>

                <p className="text-sm text-center text-gray-500 mt-5">
                    Don't have an account?
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="w-full border border-green-500 text-green-500 p-3 mt-3 rounded-xl hover:bg-green-500 hover:text-white transition duration-300"
                >
                    Register
                </button>

                <p
                    className="text-sm text-center text-blue-500 cursor-pointer mt-4 hover:underline"
                    onClick={() => navigate("/forgot-password")}
                >
                    Forgot Password?
                </p>
            </form>
        </div>
    )
}