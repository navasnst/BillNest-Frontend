import { useState } from "react"
import API from "../api/axios"
import { useNavigate } from "react-router-dom"
import { Building2, Phone, MapPin, FileText } from "lucide-react"

export default function Business() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        businessName: "",
        gstNumber: "",
        phone: "",
        address: "",
        state: ""
    })

    const [error, setError] = useState("")

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {

        if (!form.businessName || !form.phone || !form.state) {
            return setError("Business name, phone, and state are required")
        }

        try {
            const res = await API.post("/business", form)

            // ✅ SAVE BUSINESS ID
            localStorage.setItem("businessId", res.data.business._id)

            alert("Business Created ✅")

            navigate("/dashboard")

        } catch (err) {
            alert(err.response?.data?.error || "Error creating business")
        }
    }

    return (
         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Your Business
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <div className="space-y-4">

          {/* Business Name */}
          <div className="flex items-center border rounded-lg px-3">
            <Building2 className="text-gray-400 mr-2" size={18} />
            <input
              name="businessName"
              onChange={handleChange}
              placeholder="Business Name"
              className="w-full p-3 outline-none"
            />
          </div>

          {/* GST */}
          <div className="flex items-center border rounded-lg px-3">
            <FileText className="text-gray-400 mr-2" size={18} />
            <input
              name="gstNumber"
              onChange={handleChange}
              placeholder="GST Number (15 characters)"
              className="w-full p-3 outline-none"
            />
          </div>

          {/* Phone */}
          <div className="flex items-center border rounded-lg px-3">
            <Phone className="text-gray-400 mr-2" size={18} />
            <input
              name="phone"
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-3 outline-none"
            />
          </div>

          {/* Address */}
          <div className="flex items-center border rounded-lg px-3">
            <MapPin className="text-gray-400 mr-2" size={18} />
            <input
              name="address"
              onChange={handleChange}
              placeholder="Address"
              className="w-full p-3 outline-none"
            />
          </div>

          {/* State */}
          <input
            name="state"
            onChange={handleChange}
            placeholder="State"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
          >
            Create Business
          </button>

        </div>
      </div>
    </div>
    )
}