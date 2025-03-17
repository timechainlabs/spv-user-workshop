
import { SPVWalletAdminAPI, SPVWalletUserAPI } from '@bsv/spv-wallet-js-client'
import nextConfig from '../../next.config';


const initAdminWallet = async () => {

  const adminKey = nextConfig.env?.NEXT_PUBLIC_SPV_WALLET_ADMIN_KEY;

  console.log('admin key',adminKey)
  if (!adminKey) {
    throw new Error('SPV_WALLET_ADMIN_KEY environment variable is not set');
  }

  const serverUrl = nextConfig.env?.NEXT_PUBLIC_SPV_WALLET_BASE_URL;
  if (!serverUrl) {
    throw new Error('SPV_WALLET_BASE_URL environment variable is not set');
  }

  console.log("serverUrl : ", serverUrl)

  const walletClient = new SPVWalletAdminAPI(serverUrl, { adminKey });
  console.log("Wallet Client Initialized:", walletClient);
  return walletClient;
};



const initUserWallet = async (xpriv: string) => {
  const serverUrl = nextConfig.env?.NEXT_PUBLIC_SPV_WALLET_BASE_URL;
    if (!serverUrl) {
      throw new Error('SPV_WALLET_BASE_URL environment variable is not set');
    }
  const walletClient = new SPVWalletUserAPI(serverUrl, {
    xPriv: xpriv,
  });
  return walletClient;
};

const initUserReadableWallet = async (xpub: string) => {
  const serverUrl = nextConfig.env?.NEXT_PUBLIC_SPV_WALLET_BASE_URL;
    if (!serverUrl) {
      throw new Error('SPV_WALLET_BASE_URL environment variable is not set');
    }
  const walletClient = new SPVWalletUserAPI(serverUrl, {
    xPub: xpub,
  });
  return walletClient;
};


// src/api/registerUser.js

const createUserWallet = async (xpub: string, paymail: string, publicName: string) => {
  try {
    if (!xpub || !paymail || !publicName) {
      throw new Error('Missing required fields: xpub, paymail, or publicName');
    }

    console.log('Initializing admin wallet...');
    const adminClient = await initAdminWallet();

    console.log('Creating xPub...');
    const wallet = await adminClient.createXPub(xpub, {});

    console.log('Creating paymail...');
    const paymailRes = await adminClient.createPaymail(xpub, paymail, publicName, '', {});

    console.log('Paymail response:', paymailRes, 'Wallet response:', wallet);

    return paymailRes;
  } catch (error) {
    console.error('Error creating user wallet:', error);
    return null;
  }
};


interface WalletInfo {
  id: string;
  createdAt: string;
  currentBalance: number;
}


const getWalletInfo = async (xpriv: string): Promise<WalletInfo> => {
  const walletClient = await initUserWallet(xpriv);
  const info = await walletClient.xPub();

  return {
    id: info.id,
    createdAt: info.createdAt ? new Date(info.createdAt).toISOString() : "",
    currentBalance: info.currentBalance || 0,
  };
};


const getTransactions = async (xpub: string) => {
  const walletClient = await initUserReadableWallet(xpub);
  const transactions = await walletClient.transactions({},{},{});
  return transactions;
};

const createTransaction = async (xpriv: string, recipients: { to: string; satoshis: number; }[], options = {}) => {
  const walletClient = await initUserWallet(xpriv);
  const transaction = await walletClient.sendToRecipients({
    outputs: recipients 
  }, options);
  const tx = await walletClient.transaction(transaction.id)
  return tx;
};


const getUtxos = async (xpub: string) => {
  const walletClient = await initUserReadableWallet(xpub);
  const utxos = await walletClient.utxos({},{},{});
  return utxos;
};


const getNewAddress = async (xpub: string, paymail: string, publicName: string) => {
  const adminClient = await initAdminWallet();
  const paymailRes = await adminClient.createPaymail(xpub, paymail, publicName, '', {})
  return paymailRes;
};



export {
  initAdminWallet,
  initUserWallet,
  createUserWallet,
  getWalletInfo,
  getTransactions,
  createTransaction,
  getUtxos,
  getNewAddress,
};