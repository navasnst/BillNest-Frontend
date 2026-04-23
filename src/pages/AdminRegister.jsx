import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

export default function AdminRegister() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/admin/register", form);
            alert("Admin registered");
            navigate("/admin/login");
        } catch (err) {
            alert(err.response?.data?.message || "Error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">

            <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">

                {/* Header */}
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-blue-500 text-white p-3 rounded-xl mb-3">
                        <UserPlus size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Admin Register
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Create a new admin account
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        placeholder="Name"
                        required
                        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                    <button
                        type="submit"
                        className="w-full p-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition duration-300"
                    >
                        Register
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/admin/login")}
                        className="text-blue-600 font-semibold cursor-pointer hover:underline"
                    >
                        Login
                    </span>
                </p>

            </div>
        </div>
    );
}