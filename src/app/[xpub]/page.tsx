"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";  
import UserActions from "@/components/user-actions";
import Dashboard from "@/components/dashboard";
import SendForm from "@/components/send-form"; 
import OpReturnForm from "@/components/inscribe-text";

export default function UserPage() {
  const params = useParams();  
  const xpub = Array.isArray(params.xpub) ? params.xpub[0] : params.xpub ?? "";

  const [activeTab, setActiveTab] = useState("dashboard");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (xpub) {
      console.log("User xpub:", xpub); 
    }
  }, [xpub]);

  if (!xpub) {
    return (
        <div className="text-center py-8">Loading wallet information...</div>
    );
  }

  return (
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
        {activeTab === "inscribe" && <OpReturnForm />}
        
      </div>
  );
}
