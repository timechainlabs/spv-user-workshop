import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { address } = await req.json();
    if (!address) {
      return NextResponse.json({ error: "Missing address parameter" }, { status: 400 });
    }

    const response = await axios.post(
      "https://api.neucron.io/v1/feemanager/stas",
      [{ to: address, satoshis: 100 }],
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.status === 200) {
      console.log(`Successfully funded ${address} with 100 satoshis.`);
      return NextResponse.json({ success: true });
    } else {
      console.warn(`Unexpected response while funding ${address}:`, response.data);
      return NextResponse.json({ error: "Funding failed" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error funding wallet:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
