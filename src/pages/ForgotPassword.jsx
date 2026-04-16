import { useState } from "react"
import API from "../api/axios"

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)  // ✅ start loading

        try {
            await API.post("/auth/forgot-password", { email })
            alert("Reset link sent")
        } catch (err) {
            alert(err.response?.data?.message || "Error")
        } finally {
            setLoading(false)  // ✅ stop loading
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

                <button
                    disabled={loading}
                    className={`w-full p-2 mt-2 text-white ${loading ? "bg-gray-400" : "bg-blue-500"
                        }`}
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
        </div>
    )
}