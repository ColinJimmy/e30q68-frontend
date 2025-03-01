"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const router = useRouter();

  const handlePayment = (plan: string) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const processPayment = () => {
    setShowModal(false);
    const tokenCount = parseInt(selectedPlan.match(/\d+/)?.[0] || "0", 10);

    if (tokenCount > 0) {
      localStorage.setItem("messageCount", (-1 * tokenCount).toString());
    }

    alert(`Payment successful for ${selectedPlan} plan!`);
    router.push("/chat");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 p-6 text-white">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-center text-3xl font-bold text-white">Choose Your Payment Plan</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-gray-800 p-6 shadow-lg transition hover:scale-105">
            <h2 className="mb-2 text-xl font-bold text-white">💎 Long-Term Subscription</h2>
            <p className="mb-4 text-gray-400">Unlimited tokens with a subscription plan. Best for regular users.</p>
            <button
              onClick={() => handlePayment("Long-term Subscription")}
              className="w-full rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              Subscribe Now
            </button>
          </div>

          <div className="rounded-lg bg-gray-800 p-6 shadow-lg transition hover:scale-105">
            <h2 className="mb-2 text-xl font-bold text-white">⏳ Short-Term Token Purchase</h2>
            <p className="mb-4 text-gray-400">Buy tokens as needed with flexible pricing.</p>
            <div className="space-y-2">
              {["50 Tokens", "100 Tokens", "250 Tokens"].map((plan, index) => (
                <button
                  key={index}
                  onClick={() => handlePayment(plan)}
                  className="w-full rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                >
                  Buy {plan} - ${index === 0 ? "5" : index === 1 ? "9" : "20"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-lg bg-gray-900 p-6 shadow-lg animate-fadeIn text-white">
            <h2 className="mb-2 text-xl font-bold">Enter Payment Details</h2>
            <p className="mb-4 text-gray-400">You're purchasing the <strong>{selectedPlan}</strong> plan.</p>
            
            <input type="text" placeholder="Card Number" className="mb-2 w-full rounded bg-gray-800 p-2 border border-gray-600 focus:border-blue-500 focus:ring" />
            <input type="text" placeholder="MM/YY" className="mb-2 w-full rounded bg-gray-800 p-2 border border-gray-600 focus:border-blue-500 focus:ring" />
            <input type="text" placeholder="CVV" className="mb-4 w-full rounded bg-gray-800 p-2 border border-gray-600 focus:border-blue-500 focus:ring" />
            
            <div className="flex justify-between">
              <button onClick={() => setShowModal(false)} className="rounded bg-gray-600 px-4 py-2 transition hover:bg-gray-700">
                Cancel
              </button>
              <button onClick={processPayment} className="rounded bg-blue-600 px-4 py-2 transition hover:bg-blue-700">
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
