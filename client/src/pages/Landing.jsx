import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Truck, Coins, BarChart3, MessageSquare, Send, Star } from 'lucide-react';
import { api } from '../api';

export default function Landing() {
  const { user } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });
  const [loading, setLoading] = useState(false);

  const fetchFeedbacks = () => {
    api('/feedback').then(setFeedbacks).catch(console.error);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    setLoading(true);
    try {
      await api('/feedback', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setForm({ name: '', message: '' });
      fetchFeedbacks();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Sticky V2 Coming Soon Strip */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-green-600 to-emerald-600 py-3 text-center">
        <p className="text-white font-semibold text-sm md:text-base flex items-center justify-center gap-2"><Star size={18} /> V2 is Coming Soon with More Enhanced UI and More Features! <Star size={18} /></p>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <Link to="/" className="text-2xl font-bold text-green-600">EcoBin</Link>
              <select 
                className="text-xs font-medium bg-green-50 border border-green-200 text-green-700 rounded-md py-1 pl-2 pr-6 focus:outline-none focus:ring-1 focus:ring-green-500 appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2316a34a' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.2rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                onChange={(e) => {
                  if (e.target.value === 'v2') {
                    alert('v2 is coming soon with more enhanced UI and more features!');
                    e.target.value = 'v1';
                  }
                }}
              >
                <option value="v1">v1</option>
                <option value="v2">v2</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700">Dashboard</Link>
              ) : (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium">Login</Link>
                  <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700">Get Started</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Smart Waste Management <br />
            <span className="text-green-600">For a Cleaner Future</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Digitalizing the waste management value chain. Connect with collectors, track your impact, and earn rewards.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/login" className="bg-green-600 text-white px-8 py-3 rounded-md text-lg font-bold hover:bg-green-700">Request Pickup</Link>
            <a href="#features" className="bg-white text-green-600 border border-green-600 px-8 py-3 rounded-md text-lg font-bold hover:bg-green-50">Learn More</a>
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-8 border border-gray-100 rounded-xl shadow-sm bg-white">
              <div className="text-green-600 mb-4"><Truck size={32} /></div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Easy Pickup</h3>
              <p className="text-gray-600">Schedule waste collection from your doorstep with just a few clicks.</p>
            </div>
            <div className="p-8 border border-gray-100 rounded-xl shadow-sm bg-white">
              <div className="text-green-600 mb-4"><Coins size={32} /></div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Earn Rewards</h3>
              <p className="text-gray-600">Get points for every kilogram of waste recycled and redeem them for vouchers.</p>
            </div>
            <div className="p-8 border border-gray-100 rounded-xl shadow-sm bg-white">
              <div className="text-green-600 mb-4"><BarChart3 size={32} /></div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Track Impact</h3>
              <p className="text-gray-600">Monitor your contribution to environmental sustainability with real-time data.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Form */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative z-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <MessageSquare className="text-green-600" /> Community Feedback
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    placeholder="e.g. Rahul Sharma"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea 
                    required 
                    rows={4}
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    placeholder="Tell us what you think about EcoBin..."
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  <Send size={18} /> {loading ? 'Posting...' : 'Post Feedback'}
                </button>
              </form>
            </div>

            {/* List with Auto-Scroll */}
            <div className="relative h-[500px] overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-50 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent z-10" />
              
              <div className={`space-y-4 ${feedbacks.length > 2 ? 'animate-marquee-vertical' : ''}`}>
                {/* Original Feedbacks */}
                {feedbacks.map(fb => (
                  <div key={fb._id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-gray-900">{fb.name}</span>
                      <span className="text-xs text-gray-400">{new Date(fb.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{fb.message}</p>
                  </div>
                ))}
                
                {/* Duplicate Feedbacks for seamless scroll */}
                {feedbacks.length > 2 && feedbacks.map(fb => (
                  <div key={`${fb._id}-dup`} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-gray-900">{fb.name}</span>
                      <span className="text-xs text-gray-400">{new Date(fb.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{fb.message}</p>
                  </div>
                ))}
                
                {feedbacks.length === 0 && (
                  <p className="text-gray-500 italic text-center pt-20">No feedback yet. Be the first!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-2xl font-bold mb-4">EcoBin</p>
          <p className="text-gray-400">© 2026 EcoBin Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
