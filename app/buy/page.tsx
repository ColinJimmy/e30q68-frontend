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

    // Extract numeric value from selectedPlan (e.g., "50 Tokens" → 50)
    const tokenCount = parseInt(selectedPlan.match(/\d+/)?.[0] || "0", 10);

    if (tokenCount > 0) {
        localStorage.setItem("messageCount", (-1 * tokenCount).toString());
    }

    alert(`Payment successful for ${selectedPlan} plan!`);
    router.push("/chat");
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-6">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-center text-3xl font-bold text-white">Choose Your Payment Plan</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Long-term Subscription */}
          <div className="rounded-lg bg-white p-6 shadow-lg transition hover:scale-105">
            <h2 className="mb-2 text-xl font-bold text-gray-800">💎 Long-Term Subscription</h2>
            <p className="mb-4 text-gray-600">
              Enjoy unlimited tokens with a subscription plan. Best for regular users who want uninterrupted access.
            </p>
            <button
              onClick={() => handlePayment("Long-term Subscription")}
              className="w-full rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
            >
              Subscribe Now
            </button>
          </div>

          {/* Short-term Purchase */}
          <div className="rounded-lg bg-white p-6 shadow-lg transition hover:scale-105">
            <h2 className="mb-2 text-xl font-bold text-gray-800">⏳ Short-Term Token Purchase</h2>
            <p className="mb-4 text-gray-600">
              Buy tokens as you need with flexible pricing. Ideal for occasional users.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => handlePayment("50 Tokens")}
                className="w-full rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
              >
                Buy 50 Tokens - $5
              </button>
              <button
                onClick={() => handlePayment("100 Tokens")}
                className="w-full rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
              >
                Buy 100 Tokens - $9
              </button>
              <button
                onClick={() => handlePayment("250 Tokens")}
                className="w-full rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
              >
                Buy 250 Tokens - $20
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg animate-fadeIn">
            <h2 className="mb-2 text-xl font-bold text-gray-800">Enter Payment Details</h2>
            <p className="mb-4 text-gray-600">You're purchasing the <strong>{selectedPlan}</strong> plan.</p>
            
            <input type="text" placeholder="Card Number" className="mb-2 w-full rounded border p-2 focus:border-blue-500" />
            <input type="text" placeholder="MM/YY" className="mb-2 w-full rounded border p-2 focus:border-blue-500" />
            <input type="text" placeholder="CVV" className="mb-4 w-full rounded border p-2 focus:border-blue-500" />
            
            <div className="flex justify-between">
              <button onClick={() => setShowModal(false)} className="rounded bg-gray-400 px-4 py-2 text-white transition hover:bg-gray-500">
                Cancel
              </button>
              <button onClick={processPayment} className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
