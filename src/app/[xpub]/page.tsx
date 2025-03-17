"use client";  // ✅ Required for client-side components

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";  
import Layout from "@/app/layout";
import UserActions from "@/components/user-actions";
import Dashboard from "@/components/dashboard";
import SendForm from "@/components/send-form"; 

export default function UserPage() {
  const params = useParams();  
  const xpub = Array.isArray(params.xpub) ? params.xpub[0] : params.xpub ?? "";  // ✅ Ensures xpub is always a string

  const [activeTab, setActiveTab] = useState("dashboard");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (xpub) {
      console.log("User xpub:", xpub);  // ✅ Debugging xpub
    }
  }, [xpub]);

  if (!xpub) {
    return (
      <Layout>
        <div className="text-center py-8">Loading wallet information...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{userName ? userName + "'s " : ""}Wallet</h1>
          <p className="text-gray-600 text-sm mt-1">
            <span className="font-semibold">xpub:</span> <span className="font-mono">{xpub}</span>
          </p>
        </div>

        <UserActions xpub={xpub} activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "dashboard" && <Dashboard xpub={xpub} />}
        {activeTab === "send" && <SendForm />}
      </div>
    </Layout>
  );
}
