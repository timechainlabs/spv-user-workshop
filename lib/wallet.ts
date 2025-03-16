
import { SPVWalletAdminAPI, SPVWalletUserAPI } from '@bsv/spv-wallet-js-client'


const initAdminWallet = async () => {
    const adminKey = process.env.SPV_WALLET_ADMIN_KEY;
    if (!adminKey) {
      throw new Error('SPV_WALLET_ADMIN_KEY environment variable is not set');
    }
    const walletClient = new SPVWalletAdminAPI('', { adminKey });
    return walletClient;
};


const initUserWallet = async (xpriv: string) => {
  const walletClient = new SPVWalletUserAPI('', {
    xPriv: xpriv,
  });
  return walletClient;
};


const createUserWallet = async (xpub: string, paymail: string, publicName: string) => {
  const adminClient = await initAdminWallet();
  const wallet = await adminClient.createXPub(xpub, {});
  const paymailRes = await adminClient.createPaymail(xpub, paymail, publicName, '', {})
  return paymailRes;
};


const getWalletBalance = async (xpub: string) => {
  const walletClient = await initUserWallet(xpub);
  const balance = (await walletClient.xPub()).currentBalance;
  return balance;
};


const getWalletInfo = async (xpub: string) => {
    const walletClient = await initUserWallet(xpub);
    const info = (await walletClient.xPub());
    return info;
  };

const getTransactions = async (xpub: string) => {
  const walletClient = await initUserWallet(xpub);
  const transactions = await walletClient.transactions({},{},{});
  return transactions;
};


const createTransaction = async (xpub: string, recipient: string, options = {}) => {
  const walletClient = await initUserWallet(xpub);
  const transaction = await walletClient.sendToRecipients({
    outputs: [
      {
        to: recipient,
        satoshis: 1,
      },
    ],
  }, options);
  return transaction;
};


const getUtxos = async (xpub: string, options = {}) => {
  const walletClient = await initUserWallet(xpub);
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
  getWalletBalance,
  getTransactions,
  createTransaction,
  getUtxos,
  getNewAddress,
};