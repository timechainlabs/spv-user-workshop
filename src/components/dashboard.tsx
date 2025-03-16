import { useState, useEffect } from 'react';
import { getWalletInfo } from '../lib/wallet';

interface WalletInfo {
  id: string;
  createdAt: string;
  currentBalance: number;
}

interface DashboardProps {
  xpub: string;
}

export default function Dashboard({ xpub }: DashboardProps) {
  const [xpriv, setXpriv] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);

  useEffect(() => {
    if (xpriv) {
      fetchWalletData();
    }
  }, [xpriv, xpub]);

  const fetchWalletData = async () => {
    setIsLoading(true);
    setError(null);
  
    try {
      console.log("Fetching wallet info...");
      const walletData: WalletInfo = await getWalletInfo(xpriv!);
      console.log("Wallet info:", walletData);
  
      setWalletInfo(walletData);
    } catch (err) {
      console.error('Failed to fetch wallet data:', err);
      setError('Failed to fetch wallet data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  

  const formatSatoshis = (satoshis: number): string => {
    return (satoshis / 100000000).toFixed(8); // Convert satoshis to BSV
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Ask for xpriv if not provided */}
      {!xpriv && (
        <div className="mb-4 p-4 border border-yellow-500 bg-yellow-100 rounded">
          <p className="text-yellow-800">Please enter your xpriv to fetch wallet details:</p>
          <input
            type="password"
            className="mt-2 w-full px-3 py-2 border rounded"
            placeholder="Enter xpriv"
            onChange={(e) => setXpriv(e.target.value)}
          />
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-4">Loading wallet information...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {/* Wallet Overview */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Wallet Overview</h2>

            <div className="mb-4">
              <p className="text-sm text-gray-600">Wallet ID</p>
              <p className="font-mono text-sm break-all">{walletInfo?.id || 'N/A'}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">Network</p>
              <p>{process.env.SPV_WALLET_NETWORK || 'mainnet'}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">Created</p>
              <p>{walletInfo?.createdAt ? new Date(walletInfo.createdAt).toLocaleString() : '-'}</p>
            </div>
          </div>

          {/* Wallet Balance */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Balance</h2>

            <div className="text-2xl font-bold text-green-600">
              {walletInfo ? formatSatoshis(walletInfo.currentBalance) : '0.00000000'} BSV
            </div>

            <p className="text-sm text-gray-500">
              {walletInfo?.currentBalance || 0} Satoshis
            </p>

            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={fetchWalletData}
              disabled={!xpriv} // Disable button if xpriv is not provided
            >
              Refresh Balance
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
