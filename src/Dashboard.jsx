// src/Dashboard.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  HiMoon,
  HiSun,
  HiHome,
  HiUser,
} from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";
import jsPDF from "jspdf";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [transactions, setTransactions] = useState([
    { id: 1, to: "John Doe", amount: 250, status: "Completed" },
    { id: 2, to: "Binance Wallet", amount: 1200, status: "Processing" },
    { id: 3, to: "Stripe Payout", amount: 500, status: "Failed" },
  ]);

  const [showTransfer, setShowTransfer] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const [form, setForm] = useState({ to: "", amount: "", currency: "USD" });
  const [activeTx, setActiveTx] = useState(null);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Generate PDF Receipt
  const downloadReceipt = (tx) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Bingtellar Transfer Receipt", 20, 20);
    doc.setFont("helvetica", "normal");
    doc.text(`Transaction ID: #${tx.id}`, 20, 40);
    doc.text(`Recipient: ${tx.to}`, 20, 55);
    doc.text(`Amount: $${tx.amount}`, 20, 70);
    doc.text(`Status: ${tx.status}`, 20, 85);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 100);
    doc.text("Thank you for using Bingtellar.", 20, 130);
    doc.save(`receipt-${tx.id}.pdf`);
  };

  const handleTransfer = () => {
    setShowTransfer(false);
    setShowPin(true);
  };

  const confirmPin = () => {
    setShowPin(false);
    setShowSuccess(true);

    const newTx = {
      id: transactions.length + 1,
      to: form.to,
      amount: parseFloat(form.amount),
      status: "Completed",
    };
    setTransactions([newTx, ...transactions]);
    setActiveTx(newTx);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white p-8 transition-colors pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, Pelvin Nero 👋</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:opacity-80"
          >
            {darkMode ? <HiSun /> : <HiMoon />}
          </button>
          <button
            onClick={() => setShowTransfer(true)}
            className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 text-white"
          >
            New Transfer
          </button>
        </div>
      </div>

      {/* Balance Card */}
      <motion.div
        className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-6 mb-8 shadow-lg text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg">Total Balance</h2>
        <p className="text-3xl font-bold mt-2">$12,450.00</p>
      </motion.div>

      {/* Savings Card */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-semibold mb-2">Your Savings</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Compared to banks & Western Union, you’ve saved:
        </p>
        <p className="text-2xl font-bold text-green-600 mt-2">
          $328.50 this month 🎉
        </p>
      </motion.div>

      {/* Pipeline Visualization */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Transaction Pipeline</h2>
        <div className="flex gap-4">
          {["Initiated", "Processing", "Settled"].map((step, i) => (
            <motion.div
              key={step}
              className="flex-1 bg-gray-200 dark:bg-gray-800 p-4 rounded-lg text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.3 }}
            >
              {step}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg flex justify-between items-center cursor-pointer"
              onClick={() => {
                setActiveTx(tx);
                setShowReceipt(true);
              }}
            >
              <div>
                <p className="font-medium">{tx.to}</p>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ${tx.amount.toLocaleString()}
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  tx.status === "Completed"
                    ? "bg-green-600 text-white"
                    : tx.status === "Processing"
                    ? "bg-yellow-500 text-black"
                    : "bg-red-600 text-white"
                }`}
              >
                {tx.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* -------- Transfer Modal -------- */}
      {showTransfer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <motion.div
            className="bg-white dark:bg-gray-900 p-8 rounded-xl w-full max-w-md shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-xl font-bold mb-4">New Transfer</h2>
            <input
              type="text"
              placeholder="Recipient Name"
              value={form.to}
              onChange={(e) => setForm({ ...form, to: e.target.value })}
              className="w-full p-3 mb-3 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-white placeholder-gray-500"
            />
            <input
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="w-full p-3 mb-3 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-white placeholder-gray-500"
            />
            <select
              value={form.currency}
              onChange={(e) => setForm({ ...form, currency: e.target.value })}
              className="w-full p-3 mb-3 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-white"
            >
              <option>USD</option>
              <option>EUR</option>
              <option>NGN</option>
              <option>GBP</option>
            </select>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowTransfer(false)}
                className="px-4 py-2 bg-gray-400 dark:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleTransfer}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Continue
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* -------- PIN Modal -------- */}
      {showPin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <motion.div
            className="bg-white dark:bg-gray-900 p-8 rounded-xl w-full max-w-md shadow-lg text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-xl font-bold mb-4">Enter PIN</h2>
            <input
              type="password"
              maxLength={4}
              placeholder="****"
              className="w-32 text-center text-2xl tracking-widest p-3 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-white placeholder-gray-500"
            />
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => setShowPin(false)}
                className="px-4 py-2 bg-gray-400 dark:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmPin}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* -------- Success Modal -------- */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <motion.div
            className="bg-white dark:bg-gray-900 p-8 rounded-xl w-full max-w-md shadow-lg text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-xl font-bold mb-2">✅ Transfer Successful!</h2>
            <p className="mb-4">Your transfer to {form.to} was completed.</p>
            <button
              onClick={() => setShowSuccess(false)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}

      {/* -------- Receipt Modal -------- */}
      {showReceipt && activeTx && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <motion.div
            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl p-8 shadow-lg max-w-md w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-xl font-bold mb-4">Transaction Receipt</h2>
            <p><strong>ID:</strong> #{activeTx.id}</p>
            <p><strong>To:</strong> {activeTx.to}</p>
            <p><strong>Amount:</strong> ${activeTx.amount}</p>
            <p><strong>Status:</strong> {activeTx.status}</p>
            <p><strong>Date:</strong> {new Date().toLocaleString()}</p>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => downloadReceipt(activeTx)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Download PDF
              </button>
              <button
                onClick={() => setShowReceipt(false)}
                className="px-4 py-2 bg-gray-400 text-black dark:bg-gray-700 dark:text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* -------- Mobile Navbar -------- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg flex justify-around py-3 md:hidden">
        <button className="flex flex-col items-center text-indigo-600">
          <HiHome className="text-2xl" />
          <span className="text-xs">Home</span>
        </button>
        <button
          onClick={() => setShowTransfer(true)}
          className="flex flex-col items-center text-indigo-600"
        >
          <FaPaperPlane className="text-2xl" />
          <span className="text-xs">Transfer</span>
        </button>
        <button className="flex flex-col items-center text-indigo-600">
          <HiUser className="text-2xl" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
}
