import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';

const TOKEN_RATES = { Wet: 2, Dry: 3, Recyclable: 5 };

export default function AddWaste() {
  const { token, updateBalance } = useAuth();
  const [bins, setBins] = useState([]);
  const [form, setForm] = useState({ binId: '', wasteType: 'Recyclable', weight: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [binsLoading, setBinsLoading] = useState(true);

  useEffect(() => {
    const fetchBins = async () => {
      try {
        const data = await api('/waste/bins', {}, token);
        setBins(data);
        if (data.length > 0) {
          setForm(prev => ({ ...prev, binId: data[0].binId }));
        }
      } catch (err) {
        console.error('Failed to fetch bins:', err);
      } finally {
        setBinsLoading(false);
      }
    };
    fetchBins();
  }, [token]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setResult(null);
    setError('');
  };

  const preview = form.weight ? Math.round(TOKEN_RATES[form.wasteType] * parseFloat(form.weight)) : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.weight || parseFloat(form.weight) <= 0) return setError('Enter a valid weight');
    setLoading(true);
    try {
      const data = await api('/waste/add', {
        method: 'POST',
        body: JSON.stringify({ ...form, weight: parseFloat(form.weight) }),
      }, token);
      setResult(data);
      if (data.newBalance !== undefined) {
        updateBalance(data.newBalance);
      }
      setForm({ binId: 'BIN-001', wasteType: 'Recyclable', weight: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Request Pickup</h2>
        
        <div className="bg-white shadow rounded-lg p-8">
          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded border border-red-200">{error}</div>}
          {result && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 rounded border border-green-200">
              {result.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Bin</label>
              {binsLoading ? (
                <div className="mt-1 block w-full px-3 py-2 text-gray-500 text-sm">Loading bins...</div>
              ) : (
                <select name="binId" value={form.binId} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md">
                  {bins.map(b => (
                    <option key={b._id} value={b.binId}>{b.binId} - {b.location}</option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Waste Type</label>
              <select name="wasteType" value={form.wasteType} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md">
                <option value="Wet">Wet Waste (2 pts/kg)</option>
                <option value="Dry">Dry Waste (3 pts/kg)</option>
                <option value="Recyclable">Recyclable (5 pts/kg)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
              <input
                name="weight"
                type="number"
                min="0.1"
                step="0.1"
                required
                value={form.weight}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>

            {form.weight && (
              <div className="text-sm font-medium text-green-600">
                Estimated points: {preview}
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50">
              {loading ? 'Processing...' : 'Submit Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
