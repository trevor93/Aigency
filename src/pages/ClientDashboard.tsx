import { useEffect, useState } from 'react';
import { Shield, LogOut, CreditCard, Calendar, Building2, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ClientData {
  name: string;
  email: string;
  company: string;
  subscription_tier: string;
  status: string;
  payment_status: string;
  monthly_recurring_revenue: number;
  next_payment_date: string;
}

export function ClientDashboard() {
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClientData();
  }, []);

  const loadClientData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from('clients')
          .select('*')
          .eq('email', user.email)
          .maybeSingle();

        if (data) {
          setClientData(data);
        }
      }
    } catch (error) {
      console.error('Error loading client data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/client-login';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center">
        <div className="text-aqua-400 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
      <nav className="bg-navy-800/50 backdrop-blur-sm border-b border-aqua-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-aqua-400" strokeWidth={1.5} />
              <h1 className="text-xl font-bold text-white">Client Portal</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-aqua-500/10 hover:bg-aqua-500/20 text-aqua-400 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back, {clientData?.name}!</h2>
          <p className="text-aqua-300">Your business is running smoothly and automatically</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-navy-800/50 backdrop-blur-sm border border-aqua-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-aqua-500/10 rounded-lg">
                <User className="w-6 h-6 text-aqua-400" />
              </div>
              <h3 className="text-sm font-semibold text-aqua-300">Account Status</h3>
            </div>
            <p className="text-2xl font-bold text-white capitalize">{clientData?.status}</p>
          </div>

          <div className="bg-navy-800/50 backdrop-blur-sm border border-aqua-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-aqua-500/10 rounded-lg">
                <CreditCard className="w-6 h-6 text-aqua-400" />
              </div>
              <h3 className="text-sm font-semibold text-aqua-300">Payment Status</h3>
            </div>
            <p className="text-2xl font-bold text-white capitalize">{clientData?.payment_status}</p>
          </div>

          <div className="bg-navy-800/50 backdrop-blur-sm border border-aqua-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-aqua-500/10 rounded-lg">
                <Building2 className="w-6 h-6 text-aqua-400" />
              </div>
              <h3 className="text-sm font-semibold text-aqua-300">Subscription</h3>
            </div>
            <p className="text-2xl font-bold text-white capitalize">{clientData?.subscription_tier}</p>
          </div>

          <div className="bg-navy-800/50 backdrop-blur-sm border border-aqua-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-aqua-500/10 rounded-lg">
                <Calendar className="w-6 h-6 text-aqua-400" />
              </div>
              <h3 className="text-sm font-semibold text-aqua-300">Next Payment</h3>
            </div>
            <p className="text-2xl font-bold text-white">
              {clientData?.next_payment_date ? new Date(clientData.next_payment_date).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>

        <div className="bg-navy-800/50 backdrop-blur-sm border border-aqua-500/20 rounded-xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">Account Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-aqua-300 mb-2 block">Email</label>
              <p className="text-white">{clientData?.email}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-aqua-300 mb-2 block">Company</label>
              <p className="text-white">{clientData?.company || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-aqua-300 mb-2 block">Monthly Recurring Revenue</label>
              <p className="text-white">${clientData?.monthly_recurring_revenue?.toFixed(2) || '0.00'}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-aqua-300 mb-2 block">Subscription Tier</label>
              <p className="text-white capitalize">{clientData?.subscription_tier}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
