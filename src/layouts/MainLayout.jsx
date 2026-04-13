import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import API from "../api/axios"
import InstallButton from "../components/InstallButton"

export default function MainLayout({ children }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkBusiness = async () => {
      try {
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

  if (loading) return <p className="p-6">Loading...</p>

  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <div className="w-60 bg-gray-900 text-white pr-25 pl-2 h-screen overflow-y-auto">
        <h1 className="text-xl mb-6">BillNest</h1>

        <nav className="flex flex-col gap-3">
          <Link to="/">Dashboard</Link>
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


        <div className="p-6">
          {children}
        </div>
      </div>

    </div>
  )
}