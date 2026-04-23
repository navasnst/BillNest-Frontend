import { useNavigate } from "react-router-dom";
import { User, Shield } from "lucide-react";

export default function RoleSelect() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">

            <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-xl text-center">

                <h1 className="text-3xl font-bold mb-2 text-gray-800">
                    Welcome to BillNest
                </h1>
                <p className="text-gray-500 mb-8">
                    Choose your role to continue
                </p>

                {/* 👇 Changed layout here */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* User Card */}
                    <div
                        onClick={() => navigate("/login")}
                        className="cursor-pointer p-6 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                    >
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="bg-blue-500 p-4 rounded-2xl text-white">
                                <User size={28} />
                            </div>
                            <div>
                                <h2 className="font-semibold text-lg text-gray-800">
                                    User Login
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Access your dashboard
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Admin Card */}
                    <div
                        onClick={() => navigate("/admin/login")}
                        className="cursor-pointer p-6 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200 shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                    >
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="bg-purple-500 p-4 rounded-2xl text-white">
                                <Shield size={28} />
                            </div>
                            <div>
                                <h2 className="font-semibold text-lg text-gray-800">
                                    Admin Login
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Manage system & users
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                <p className="text-xs text-gray-400 mt-8">
                    BillNest System © 2026
                </p>
            </div>
        </div>
    );
}