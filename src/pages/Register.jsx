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

            navigate("/")
        } catch (err) {
            alert(err.response?.data?.message || "Register failed")
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="p-6 shadow-lg rounded-xl w-80">
                <h2 className="text-xl mb-4">Register</h2>

                <input name="name" placeholder="Name" onChange={handleChange} className="w-full mb-2 p-2 border" />
                <input name="email" placeholder="Email" onChange={handleChange} className="w-full mb-2 p-2 border" />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full mb-2 p-2 border" />
                <input name="businessName" placeholder="Business Name" onChange={handleChange} className="w-full mb-2 p-2 border" />

                <button className="w-full bg-blue-500 text-white p-2 mt-2 rounded-lg cursor-pointer hover:bg-blue-600">
                    Register
                </button>

                <p className="text-sm text-center mt-4">
                    Already have an account?
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className=" border border-blue-500 text-blue-500 p-2 mt-2  rounded-lg mx-auto block text-center hover:bg-blue-300 hover:text-white transition-colors cursor-pointer"
                >
                    Login
                </button>
            </form>
        </div>
    )
}