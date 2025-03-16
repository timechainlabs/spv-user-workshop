import { useState } from 'react';
import { createTransaction } from '../lib/wallet';

interface SendFormProps {
  xpriv?: string;
}

export default function SendForm({ xpriv }: SendFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recipient, setRecipient] = useState(''); // Paymail address
  const [amount, setAmount] = useState(''); // Amount in satoshis
  const [transactionId, setTransactionId] = useState('');
  const [userXpriv, setUserXpriv] = useState(xpriv || ''); // Store user-provided xpriv

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (!userXpriv) {
      setError('Please provide your xpriv key.');
      setIsLoading(false);
      return;
    }

    try {
      const satoshis = parseInt(amount, 10);

      if (isNaN(satoshis) || satoshis <= 0) {
        throw new Error('Invalid amount. Please enter a positive integer value in satoshis.');
      }

      const recipients = [
        {
          to: recipient,
          satoshis: satoshis,
        },
      ];

      const transaction = await createTransaction(userXpriv, recipients, {});
      setTransactionId(transaction.id);
      setSuccess('Transaction created successfully!');

      // Reset form
      setRecipient('');
      setAmount('');
    } catch (err) {
      console.error('Failed to create transaction:', err);
      setError('Failed to create transaction. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Send Bitcoin</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p>{success}</p>
          <p className="text-sm mt-1">
            Transaction ID: <span className="font-mono">{transactionId}</span>
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Ask for xpriv if not provided */}
        {!userXpriv && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="xpriv">
              xPriv Key
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="xpriv"
              type="password"
              placeholder="Enter your xpriv key"
              value={userXpriv}
              onChange={(e) => setUserXpriv(e.target.value)}
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipient">
            Recipient Paymail Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="recipient"
            type="email"
            placeholder="recipient@example.com"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount (Satoshis)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            type="number"
            min="1"
            placeholder="100000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <p className="text-gray-500 text-xs mt-1">
            Enter the amount in satoshis (1 BSV = 100,000,000 satoshis).
          </p>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Bitcoin'}
          </button>
        </div>
      </form>
    </div>
  );
}
