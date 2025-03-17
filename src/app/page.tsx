"use client"; // ✅ Ensures this is a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Correct import for App Router

export default function Home() {
  const [xpub, setXpub] = useState("");
  const router = useRouter(); // ✅ Now works correctly

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (xpub) {
      router.push(`/${xpub}`); // ✅ Redirect to /{xpub}
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
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
    </div>
  );
}
