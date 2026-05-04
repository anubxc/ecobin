import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';
import { Users, Truck, AlertTriangle, Leaf } from 'lucide-react';

export default function AdminDashboard() {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [pendingWaste, setPendingWaste] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    Promise.all([
      api('/admin/dashboard', {}, token),
      api('/admin/waste/pending', {}, token)
    ])
    .then(([dashboardData, pendingData]) => {
      setData(dashboardData);
      setPendingWaste(pendingData);
    })
    .catch(console.error)
    .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleCollect = async (binId) => {
    await api(`/admin/bins/${binId}/collect`, { method: 'PATCH' }, token);
    fetchData();
  };

  const handleApprove = async (id) => {
    await api(`/admin/waste/${id}/approve`, { method: 'PATCH' }, token);
    fetchData();
  };

  const handleReject = async (id) => {
    await api(`/admin/waste/${id}/reject`, { method: 'PATCH' }, token);
    fetchData();
  };

  const overview = useMemo(() => [
    { label: 'Total Users', value: data?.totalUsers ?? 0, icon: <Users className="text-blue-600" /> },
    { label: 'Total Pickups', value: data?.totalLogs ?? 0, icon: <Truck className="text-green-600" /> },
    { label: 'Full Bins', value: data?.fullBins ?? 0, icon: <AlertTriangle className="text-red-600" /> },
    { label: 'Recyclables (kg)', value: (data?.wasteStats?.Recyclable ?? 0).toFixed(0), icon: <Leaf className="text-green-600" /> },
  ], [data]);

  if (loading) return <div className="p-10 text-center font-bold text-gray-500">Loading Admin Center...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900">Admin Operations</h2>
          </div>
          <div className="mt-4 flex space-x-3 md:mt-0 md:ml-4">
            <Link to="/admin/users" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">View Users</Link>
            <Link to="/admin/bins" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">Manage Bins</Link>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-8">
          {overview.map((stat, i) => (
            <div key={i} className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-500 truncate">{stat.label}</div>
                <div>{stat.icon}</div>
              </div>
              <div className="mt-1 text-3xl font-bold text-gray-900">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Bins Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Bin Status Monitor</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bin ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fill Level</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.bins?.map((bin) => (
                  <tr key={bin._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{bin.binId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bin.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div className={`h-2.5 rounded-full ${bin.fillLevel >= 80 ? 'bg-red-600' : 'bg-green-600'}`} style={{ width: `${bin.fillLevel}%` }}></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{bin.fillLevel}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleCollect(bin.binId)}
                        className="text-green-600 hover:text-green-900 font-bold"
                      >
                        Collect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Approvals Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden mt-8">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Pending Waste Approvals</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bin ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waste Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (kg)</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingWaste.length === 0 ? (
                  <tr><td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No pending approvals.</td></tr>
                ) : (
                  pendingWaste.map((log) => (
                    <tr key={log._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.userId?.name || 'Unknown'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.binId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.wasteType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.weight}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                        <button 
                          onClick={() => handleApprove(log._id)}
                          className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md transition-colors"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleReject(log._id)}
                          className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md transition-colors"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
