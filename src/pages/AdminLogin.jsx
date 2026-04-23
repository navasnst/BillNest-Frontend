import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";

export default function AdminLogin() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/admin/login", form);
            localStorage.setItem("adminToken", res.data.token);
            navigate("/admin/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || "Login error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 p-4">

            <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">

                {/* Header */}
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-purple-500 text-white p-3 rounded-xl mb-3">
                        <Shield size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Admin Login
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Access the admin dashboard
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">

                    <input
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                    <button
                        type="submit"
                        className="w-full p-3 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-semibold transition duration-300"
                    >
                        Login
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Not registered? You are not admin!{" "}
                </p>
                <p className="text-center text-sm text-gray-400 mt-2">
                    <span
                        onClick={() => navigate("/login")}
                        className="text-purple-600 font-semibold cursor-pointer hover:underline"
                    >
                        Login as User
                    </span>
                </p>

            </div>
        </div>
    );
}