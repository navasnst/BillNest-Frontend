
import { useEffect, useState } from "react";
import API from "../api/axios";
import { Eye, Pencil, Trash2, Search } from "lucide-react";

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [mode, setMode] = useState(""); // "view" | "edit"

    // ✅ Fetch users
    const fetchUsers = async () => {
        try {
            const res = await API.get("/admin/users");
            setUsers(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // ✅ Delete user
    const deleteUser = async (id) => {
        const confirmDelete = window.confirm("Delete this user?");
        if (!confirmDelete) return;

        await API.delete(`/admin/users/${id}`);
        setUsers(users.filter((u) => u._id !== id));
    };

    // ✅ Update user
    const updateUser = async () => {
        try {
            const res = await API.put(
                `/admin/users/${selectedUser._id}`,
                selectedUser
            );

            setUsers(
                users.map((u) =>
                    u._id === selectedUser._id ? res.data : u
                )
            );

            setSelectedUser(null);
        } catch (err) {
            alert("Update failed");
        }
    };

    // ✅ Search filter
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
    };

    const getDaysLeft = (date) => {
        if (!date) return 0;

        const diff = new Date(date) - new Date();
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                <div>
                    <h2 className="text-3xl font-bold text-gray-800">
                        Admin Dashboard
                    </h2>
                    <p className="text-gray-500">
                        Manage all registered users
                    </p>
                </div>

                <div className="flex items-center gap-3">

                    {/* Search */}
                    <div className="flex items-center bg-white border rounded-xl px-3 py-2 shadow-sm">
                        <Search size={18} className="text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="outline-none text-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Total */}
                    <div className="bg-white shadow rounded-xl px-4 py-2">
                        <p className="text-sm text-gray-500">Total Users</p>
                        <p className="text-lg font-bold text-blue-600 text-center">
                            {filteredUsers.length}
                        </p>
                    </div>

                    {/* 🔥 Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow"
                    >
                        Logout
                    </button>

                </div>
            </div>

            {/* Users Grid */}
            {filteredUsers.length === 0 ? (
                <p className="text-gray-500">No users found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {filteredUsers.map((user) => (
                        <div
                            key={user._id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 border"
                        >
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {user.name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {user.email}
                                </p>

                                {/* ✅ STATUS BADGE */}
                                <div className="mt-2">

                                    {!user.isApproved && (
                                        getDaysLeft(user.trialExpiresAt) > 0 ? (
                                            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                                                Trial: {getDaysLeft(user.trialExpiresAt)} days left
                                            </span>
                                        ) : (
                                            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-100 text-red-700">
                                                Trial Expired
                                            </span>
                                        )
                                    )}

                                    {user.isApproved && (
                                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">
                                            Active till: {new Date(user.subscriptionExpiresAt).toLocaleDateString()}
                                        </span>
                                    )}

                                </div>
                            </div>

                            <div className="flex justify-between items-center gap-2">

                                {/* View */}
                                <button
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setMode("view");
                                    }}
                                    className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                                >
                                    <Eye size={16} /> View
                                </button>

                                {/* Edit */}
                                <button
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setMode("edit");
                                    }}
                                    className="flex items-center gap-1 px-3 py-1.5 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                                >
                                    <Pencil size={16} /> Edit
                                </button>

                                {/* Delete */}
                                <button
                                    onClick={() => deleteUser(user._id)}
                                    className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg"
                                >
                                    <Trash2 size={16} /> Delete
                                </button>

                            </div>
                        </div>
                    ))}

                </div>
            )}

            {/* Modal */}
            {selectedUser && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">

                        {mode === "view" && (
                            <>
                                <h2 className="text-xl font-bold mb-4">
                                    User Details
                                </h2>
                                <p><strong>Name:</strong> {selectedUser.name}</p>
                                <p><strong>Email:</strong> {selectedUser.email}</p>
                                <p><strong>Business:</strong> {selectedUser.businessName}</p>
                            </>
                        )}

                        {mode === "edit" && (
                            <>
                                <h2 className="text-xl font-bold mb-4">
                                    Edit User
                                </h2>

                                <input
                                    className="w-full mb-3 p-2 border rounded-lg"
                                    value={selectedUser.name}
                                    onChange={(e) =>
                                        setSelectedUser({
                                            ...selectedUser,
                                            name: e.target.value
                                        })
                                    }
                                />

                                <input
                                    className="w-full mb-3 p-2 border rounded-lg"
                                    value={selectedUser.email}
                                    onChange={(e) =>
                                        setSelectedUser({
                                            ...selectedUser,
                                            email: e.target.value
                                        })
                                    }
                                />

                                <input
                                    className="w-full mb-3 p-2 border rounded-lg"
                                    value={selectedUser.businessName}
                                    onChange={(e) =>
                                        setSelectedUser({
                                            ...selectedUser,
                                            businessName: e.target.value
                                        })
                                    }
                                />

                                <button
                                    onClick={updateUser}
                                    className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg"
                                >
                                    Update
                                </button>
                            </>
                        )}

                        <button
                            onClick={() => setSelectedUser(null)}
                            className="mt-4 text-sm text-gray-500 hover:underline"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}