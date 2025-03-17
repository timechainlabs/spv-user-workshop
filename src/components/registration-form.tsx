"use client"; // ✅ Ensure this file is treated as a client component

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Correct import for App Router
import { createUserWallet } from "../lib/wallet";

export default function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [xpub, setXpub] = useState("");
  const [name, setName] = useState("");
  const [paymail, setPaymail] = useState("");
  const [publicName, setPublicName] = useState("");

  const router = useRouter(); // ✅ No issues after marking as client component

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await createUserWallet(xpub, paymail, publicName);

      if (response) {
        router.push(`/${xpub}`);
      } else {
        throw new Error("Wallet creation failed");
      }
    } catch (err) {
      console.error("Failed to register user:", err);
      setError("Failed to register. Please check your inputs and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6">Register Your Wallet</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Your Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymail">
            Paymail
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="paymail"
            type="email"
            placeholder="Enter your paymail"
            value={paymail}
            onChange={(e) => setPaymail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publicName">
            Public Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="publicName"
            type="text"
            placeholder="Public Display Name"
            value={publicName}
            onChange={(e) => setPublicName(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="xpub">
            Extended Public Key (xpub)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="xpub"
            type="text"
            placeholder="Your extended public key"
            value={xpub}
            onChange={(e) => setXpub(e.target.value)}
            required
          />
          <p className="text-gray-500 text-xs mt-1">
            Your xpub will be used to access your wallet. Keep it safe and secure.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isLoading ? "opacity-50" : ""
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}
