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

            navigate("/")
        } catch (err) {
            alert(err.response?.data?.message || "Login failed")
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="p-6 shadow-lg rounded-xl w-80">
                <h2 className="text-xl mb-4">Login</h2>

                <input name="email" placeholder="Email" onChange={handleChange} className="w-full mb-2 p-2 border" />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full mb-2 p-2 border" />

                <button className="w-full bg-green-500 text-white p-2 mt-2">
                    Login
                </button>

                <p className="text-sm text-center mt-4">
                    Don't have an account?
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="w-full border border-green-500 text-green-500 p-2 mt-2"
                >
                    Register
                </button>
            </form>
        </div>
    )
}