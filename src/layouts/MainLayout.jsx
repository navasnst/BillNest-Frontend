import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import API from "../api/axios"
import InstallButton from "../components/InstallButton"

export default function MainLayout({ children }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkBusiness = async () => {
      try {
        const res2 = await API.get("/auth/me")
        setUser(res2.data)
        const res = await API.get("/business")

        if (res.data.length === 0) {
          // ❌ No business → redirect
          navigate("/business")
        } else {
          // ✅ Save correct businessId
          localStorage.setItem("businessId", res.data[0]._id)
        }

      } catch (err) {
        console.error(err)

        navigate("/business")

      } finally {
        setLoading(false)
      }
    }

    checkBusiness()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("businessId")
    navigate("/login")
  }

  const getDaysLeft = (date) => {
    const now = new Date();
    const expiry = new Date(date);
    const diff = expiry - now;

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const handleRequestAccess = async () => {
    try {
      await API.post("/auth/request-access");
      alert("Request sent to admin");
    } catch (err) {
      alert("Failed to send request");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-60 bg-gray-900 text-white pr-25 pl-5 pt-5 pb-5 h-screen overflow-y-auto">
        <h1 className="text-xl mb-6 text-blue-300 font-serif italic">BillNest</h1>


        <nav className="flex flex-col gap-3 italic">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/quick-bill">Quick Bill</Link>
          <Link to="/quick-invoices">Quick Invoice List</Link>
          <Link to="/products">Products</Link>
          <Link to="/customers">Customers</Link>
          <Link to="/invoices">Invoices</Link>
          <Link to="/invoice-list">Invoice List</Link>
          <Link to="/purchase">Purchase</Link>
          <Link to="/purchase-list">Purchase List</Link>
          <Link to="/income">Income</Link>
          <Link to="/expense">Expense</Link>
          <Link to="/sales-return">Sales Return</Link>
          <Link to="/purchase-return">Purchase Return</Link>
          <Link to="/receipts">Receipts</Link>
          <Link to="/payments">Payments</Link>
          <Link to="/suppliers">Suppliers</Link>
          <Link to="/ledger">Ledger</Link>
          <Link to="/capital">Capital</Link>
          <Link to="/reports">Reports</Link>
          <InstallButton />
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 bg-gray-100">
        {/* Navbar */}
        <button
          onClick={() => navigate("/login")}
          className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-4"
        >
          ← Back to Login
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded gap-2 mt-4 ml-4 items-center"
        >
          Logout
        </button>

        {user && (
          <div className="mb-4 p-4 rounded-xl shadow bg-white mx-5 text-center mt-5">

            {!user.isApproved && (
              getDaysLeft(user.trialExpiresAt) > 0 ? (
                <p className="text-green-600 font-semibold">
                  🟢 Trial active: {getDaysLeft(user.trialExpiresAt)} days left
                </p>
              ) : (
                <p className="text-red-600 font-semibold">
                  🔴 Trial expired. Please make payment to continue.
                </p>
              )
            )}

            {user.isApproved && (
              <p className="text-blue-600 font-semibold">
                🔵 Subscription active till:{" "}
                {new Date(user.subscriptionExpiresAt).toLocaleDateString()}
              </p>
            )}

          </div>
        )}

        {user && getDaysLeft(user.trialExpiresAt) <= 0 && !user.isApproved && (
          <div className="text-center">
            <p className="text-red-600 font-semibold mb-2">
              Trial expired. Request access to continue.
            </p>

            {/* 💰 Payment Info */}
            <p className="text-sm text-gray-600 mt-2">
              Pay via UPI: <strong>yourupi@bank</strong>
            </p>
            <p className="text-xs text-gray-400 mb-3">
              After payment, click "Request Access"
            </p>

            <button
              onClick={handleRequestAccess}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Request Access
            </button>
          </div>
        )}

        <div className="p-6">
          {children}
        </div>
      </div>

    </div>
  )
}