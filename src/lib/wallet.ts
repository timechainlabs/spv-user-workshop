
import { SPVWalletAdminAPI, SPVWalletUserAPI } from '@bsv/spv-wallet-js-client'
import nextConfig from '../../next.config';

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



export {
  initUserWallet,
  getWalletInfo,
  getTransactions,
  createTransaction,
  getUtxos,
};