import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Invoices from "./pages/Invoices";
import Business from "./pages/Business";
import InvoicePreview from "./pages/InvoicePreview";
import InvoiceList from "./pages/InvoiceList";
import Purchase from "./pages/Purchase";
import PurchaseList from "./pages/PurchaseList";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import SalesReturn from "./pages/SalesReturn";
import PurchaseReturn from "./pages/PurchaseReturn";
import Receipts from "./pages/Receipts";
import Payment from "./pages/Payment";
import Supplier from "./pages/Supplier";
import Ledger from "./pages/Ledger";
import Report from "./pages/Report";
import Capital from "./pages/Capital";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";






export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/products" element={<ProtectedRoute> <Products /> </ProtectedRoute>} />
                <Route path="/customers" element={<ProtectedRoute> <Customers /> </ProtectedRoute>} />
                <Route path="/invoices" element={<ProtectedRoute> <Invoices /> </ProtectedRoute>} />
                <Route path="/invoice/:id" element={<ProtectedRoute> <InvoicePreview /> </ProtectedRoute>} />
                <Route path="/invoice-list" element={<ProtectedRoute> <InvoiceList /> </ProtectedRoute>} />
                <Route path="/purchase" element={<ProtectedRoute> <Purchase /> </ProtectedRoute>} />
                <Route path="/purchase-list" element={<ProtectedRoute> <PurchaseList /> </ProtectedRoute>} />
                <Route path="/income" element={<ProtectedRoute> <Income /> </ProtectedRoute>} />
                <Route path="/expense" element={<ProtectedRoute> <Expense /> </ProtectedRoute>} />
                <Route path="/sales-return" element={<ProtectedRoute> <SalesReturn /> </ProtectedRoute>} />
                <Route path="/purchase-return" element={<ProtectedRoute> <PurchaseReturn /> </ProtectedRoute>} />
                <Route path="/receipts" element={<ProtectedRoute> <Receipts /> </ProtectedRoute>} />
                <Route path="/payments" element={<ProtectedRoute> <Payment /> </ProtectedRoute>} />
                <Route path="/suppliers" element={<ProtectedRoute> <Supplier /> </ProtectedRoute>} />
                <Route path="/business" element={<ProtectedRoute> <Business /> </ProtectedRoute>} />
                <Route path="/ledger" element={<ProtectedRoute> <Ledger /> </ProtectedRoute>} />
                <Route path="/reports" element={<ProtectedRoute> <Report /> </ProtectedRoute>} />
                <Route path="/capital" element={<ProtectedRoute> <Capital /> </ProtectedRoute>} />




            </Routes>
        </BrowserRouter>
    )
}
