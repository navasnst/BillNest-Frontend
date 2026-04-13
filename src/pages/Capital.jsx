
import { useState } from "react"
import MainLayout from "../layouts/MainLayout"
import API from "../api/axios"

export default function Capital() {


    const [amount, setAmount] = useState("")
    const [type, setType] = useState("Cash")
    const [note, setNote] = useState("")

    const businessId = localStorage.getItem("businessId")

    const handleSubmit = async () => {
        if (!amount) return alert("Enter amount")

        try {
            await API.post("/capital", {
                businessId,
                amount,
                type,
                note
            })

            alert("Capital added successfully ✅")

            setAmount("")
            setNote("")

        } catch (err) {
            alert(err.response?.data?.message || "Error")
        }
    }

    return (
        <MainLayout>
            <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow">

                <h2 className="text-xl font-semibold mb-4">
                    Add Capital / Opening Balance
                </h2>

                {/* Amount */}
                <input
                    type="number"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-2 border mb-4"
                />

                {/* Type */}
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full p-2 border mb-4"
                >
                    <option value="Cash">Cash</option>
                    <option value="Bank">Bank</option>
                </select>

                {/* Note */}
                <input
                    type="text"
                    placeholder="Note (optional)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full p-2 border mb-4"
                />

                {/* Submit */}
                <button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white w-full p-2 rounded"
                >
                    Add Capital
                </button>

            </div>
        </MainLayout>
    )

}

