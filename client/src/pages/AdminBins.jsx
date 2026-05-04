import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function AdminBins() {
  const { token } = useAuth();
  const [bins, setBins] = useState([]);
  const [form, setForm] = useState({ binId: '', location: '', zone: '', wasteType: 'Recyclable' });
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(true);

  const fetchBins = () => api('/admin/bins', {}, token).then(setBins).finally(() => setLoading(false));
  useEffect(() => { fetchBins(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.binId || !form.location || !form.zone) return setMsg({ text: 'All fields required', type: 'error' });
    try {
      await api('/admin/bins', { method: 'POST', body: JSON.stringify(form) }, token);
      setMsg({ text: 'Bin added!', type: 'success' });
      setForm({ binId: '', location: '', zone: '', wasteType: 'Recyclable' });
      fetchBins();
    } catch (err) {
      setMsg({ text: err.message, type: 'error' });
    }
  };

  if (loading) return <div className="p-10 text-center font-bold text-gray-500">Loading Bins...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Manage Bins</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1 bg-white shadow rounded-lg p-6 h-fit">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Bin</h3>
            {msg.text && (
              <div className={`mb-4 p-3 rounded flex items-center gap-2 text-sm font-bold ${msg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                {msg.type === 'success' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                {msg.text}
              </div>
            )}
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Bin ID</label>
                <input name="binId" required value={form.binId} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Zone</label>
                <input name="zone" required value={form.zone} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input name="location" required value={form.location} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
              </div>
              <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition-colors">Add Bin</button>
            </form>
          </div>

          {/* Table */}
          <div className="lg:col-span-2 bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Registered Bins</h3>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fill %</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bins.map(b => (
                  <tr key={b._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{b.binId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{b.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{b.fillLevel}%</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${b.status === 'Full' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
