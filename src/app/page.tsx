"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RegistrationForm from "@/components/registration-form";

export default function Home() {
  const [xpub, setXpub] = useState("");
  const [activeTab, setActiveTab] = useState("enterXpub");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (xpub) {
      router.push(`/${xpub}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded-md ${activeTab === "enterXpub" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          onClick={() => setActiveTab("enterXpub")}
        >
          Enter xPub
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === "createWallet" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          onClick={() => setActiveTab("createWallet")}
        >
          Create Wallet
        </button>
      </div>

      {activeTab === "enterXpub" ? (
        <>
          <h1 className="text-3xl font-bold mb-4">Enter Your xPub</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={xpub}
              onChange={(e) => setXpub(e.target.value)}
              placeholder="Enter your xPub"
              className="border p-2 rounded-md w-80"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Submit
            </button>
          </form>
        </>
      ) : (
        <RegistrationForm />
      )}
    </div>
  );
}
