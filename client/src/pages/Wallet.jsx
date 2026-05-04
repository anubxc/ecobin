import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';
import { Wallet as WalletIcon, CheckCircle2, XCircle } from 'lucide-react';

const OFFERS = [
  { id: 1, name: '5% Off Grocery', cost: 50 },
  { id: 2, name: 'Bus Pass Discount', cost: 80 },
  { id: 3, name: 'Plant a Tree', cost: 30 },
  { id: 4, name: 'Free Coffee', cost: 40 },
];

export default function Wallet() {
  const { token, updateBalance } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [redeeming, setRedeeming] = useState(null);

  const fetchWallet = () => {
    api('/tokens/wallet', {}, token).then(setWallet).finally(() => setLoading(false));
  };

  useEffect(() => { fetchWallet(); }, [token]);

  const handleRedeem = async (offer) => {
    setMsg({ text: '', type: '' });
    setRedeeming(offer.id);
    try {
      const data = await api('/tokens/redeem', {
        method: 'POST',
        body: JSON.stringify({ amount: offer.cost, offer: offer.name }),
      }, token);
      setMsg({ text: `"${offer.name}" redeemed!`, type: 'success' });
      updateBalance(data.newBalance);
      fetchWallet();
    } catch (err) {
      setMsg({ text: err.message, type: 'error' });
    } finally {
      setRedeeming(null);
    }
  };

  if (loading) return <div className="p-10 text-center font-bold text-gray-500">Loading Wallet...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <WalletIcon className="text-green-600" /> Green Token Wallet
        </h2>

        <div className="bg-white shadow rounded-lg p-8 mb-8 text-center">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Available Balance</p>
          <p className="mt-2 text-5xl font-extrabold text-green-600">{wallet?.balance ?? 0} Tokens</p>
        </div>

        {msg.text && (
          <div className={`mb-8 p-4 rounded border flex items-center gap-3 ${msg.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-600'}`}>
            {msg.type === 'success' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
            {msg.text}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-8">
          {OFFERS.map(offer => (
            <div key={offer.id} className="bg-white shadow rounded-lg p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{offer.name}</h3>
                <p className="text-sm text-gray-500">{offer.cost} Tokens</p>
              </div>
              <button
                onClick={() => handleRedeem(offer)}
                disabled={wallet?.balance < offer.cost || redeeming === offer.id}
                className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 disabled:opacity-50"
              >
                {redeeming === offer.id ? 'Processing...' : 'Redeem'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
