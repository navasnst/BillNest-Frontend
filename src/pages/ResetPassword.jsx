import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API from "../api/axios"

export default function ResetPassword() {
    const [password, setPassword] = useState("")
    const { token } = useParams()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await API.post(`/auth/reset-password/${token}`, { password })
            alert("Password reset successful")
            navigate("/login")
        } catch (err) {
            alert(err.response?.data?.message || "Error")
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="p-6 shadow-lg rounded-xl w-80">
                <h2 className="text-xl mb-4">Reset Password</h2>

                <input
                    type="password"
                    placeholder="New Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-2 p-2 border"
                />

                <button className="w-full bg-green-500 text-white p-2">
                    Reset Password
                </button>
            </form>
        </div>
    )
}