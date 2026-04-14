import { useState } from "react"
import API from "../api/axios"

export default function ForgotPassword() {
    const [email, setEmail] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await API.post("/auth/forgot-password", { email })
            alert("Reset link sent to your email")
        } catch (err) {
            alert(err.response?.data?.message || "Error")
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="p-6 shadow-lg rounded-xl w-80">
                <h2 className="text-xl mb-4">Forgot Password</h2>

                <input
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-2 p-2 border"
                />

                <button className="w-full bg-blue-500 text-white p-2">
                    Send Reset Link
                </button>
            </form>
        </div>
    )
}