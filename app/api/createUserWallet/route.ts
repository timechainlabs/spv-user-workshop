// app/src/api/createUserWallet/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createUserWallet } from '../../../src/lib/wallet'; // Import your function

export async function POST(req: NextRequest) {
  const { xpub, paymail, publicName } = await req.json();

  // Validate input fields
  if (!xpub || !paymail || !publicName) {
    return NextResponse.json(
      { error: 'Missing required fields: xpub, paymail, or publicName' },
      { status: 400 }
    );
  }

  try {
    // Call your function to create the wallet
    const result = await createUserWallet(xpub, paymail, publicName);

    if (!result) {
      return NextResponse.json({ error: 'Failed to create user wallet' }, { status: 500 });
    }

    // Respond with success
    return NextResponse.json({ message: 'User wallet created successfully', result }, { status: 200 });
  } catch (error) {
    console.error('Error creating user wallet:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
