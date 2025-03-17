// pages/index.js
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [xpub, setXpub] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (xpub) {
      router.push(`/${xpub}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Enter Your xPub</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        <input
          type="text"
          value={xpub}
          onChange={(e) => setXpub(e.target.value)}
          placeholder="Enter xPub"
          className="border p-2 w-full rounded-md"
        />
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 w-full rounded-md hover:bg-blue-600"
        >
          Proceed
        </button>
      </form>
    </div>
  );
}
