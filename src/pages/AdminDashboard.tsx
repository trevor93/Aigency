import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
  Users,
  DollarSign,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  LogOut,
  RefreshCw
} from 'lucide-react';
import { ClientsTable } from '../components/admin/ClientsTable';
import { AutomationLogs } from '../components/admin/AutomationLogs';
import { PaymentOverview } from '../components/admin/PaymentOverview';

interface DashboardStats {
  totalClients: number;
  activeClients: number;
  suspendedClients: number;
  monthlyRevenue: number;
  overduePayments: number;
  recentAutomations: number;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    activeClients: 0,
    suspendedClients: 0,
    monthlyRevenue: 0,
    overduePayments: 0,
    recentAutomations: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'clients' | 'payments' | 'logs'>('overview');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
    loadDashboardData();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.history.pushState({}, '', '/admin-login');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    setUser(user);
  };

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const { data: clients } = await supabase
        .from('clients')
        .select('*');

      const { data: logs } = await supabase
        .from('automation_logs')
        .select('*')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

      if (clients) {
        const activeClients = clients.filter(c => c.status === 'active').length;
        const suspendedClients = clients.filter(c => c.status === 'suspended').length;
        const monthlyRevenue = clients
          .filter(c => c.status === 'active')
          .reduce((sum, c) => sum + (Number(c.monthly_recurring_revenue) || 0), 0);
        const overduePayments = clients.filter(c => c.payment_status === 'overdue').length;

        setStats({
          totalClients: clients.length,
          activeClients,
          suspendedClients,
          monthlyRevenue,
          overduePayments,
          recentAutomations: logs?.length || 0,
        });
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.history.pushState({}, '', '/admin-login');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const StatCard = ({
    icon: Icon,
    label,
    value,
    trend,
    color = 'blue'
  }: {
    icon: any;
    label: string;
    value: string | number;
    trend?: string;
    color?: string;
  }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400" id={`stat-${label.toLowerCase().replace(/\s/g, '-')}`}>
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white" aria-labelledby={`stat-${label.toLowerCase().replace(/\s/g, '-')}`}>
            {value}
          </p>
          {trend && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" aria-hidden="true" />
              <span>{trend}</span>
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-100 dark:bg-${color}-900/20`}>
          <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`} aria-hidden="true" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-3" role="status" aria-live="polite">
          <RefreshCw className="w-6 h-6 animate-spin text-blue-600" aria-hidden="true" />
          <span className="text-lg text-gray-700 dark:text-gray-300">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Welcome back, {user?.email}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Sign out of admin dashboard"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700" role="navigation" aria-label="Dashboard navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            {(['overview', 'clients', 'payments', 'logs'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-medium border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
                aria-current={activeTab === tab ? 'page' : undefined}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <section aria-labelledby="stats-heading">
              <h2 id="stats-heading" className="sr-only">Dashboard statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                  icon={Users}
                  label="Total Clients"
                  value={stats.totalClients}
                  color="blue"
                />
                <StatCard
                  icon={CheckCircle}
                  label="Active Clients"
                  value={stats.activeClients}
                  trend={`${((stats.activeClients / stats.totalClients) * 100).toFixed(0)}% of total`}
                  color="green"
                />
                <StatCard
                  icon={AlertCircle}
                  label="Suspended Clients"
                  value={stats.suspendedClients}
                  color="red"
                />
                <StatCard
                  icon={DollarSign}
                  label="Monthly Revenue"
                  value={`$${stats.monthlyRevenue.toLocaleString()}`}
                  color="green"
                />
                <StatCard
                  icon={Clock}
                  label="Overdue Payments"
                  value={stats.overduePayments}
                  color="orange"
                />
                <StatCard
                  icon={Activity}
                  label="Recent Automations"
                  value={stats.recentAutomations}
                  trend="Last 24 hours"
                  color="purple"
                />
              </div>
            </section>

            <section aria-labelledby="quick-overview-heading">
              <h2 id="quick-overview-heading" className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Quick Overview
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PaymentOverview />
                <AutomationLogs limit={5} />
              </div>
            </section>
          </div>
        )}

        {activeTab === 'clients' && <ClientsTable />}
        {activeTab === 'payments' && <PaymentOverview detailed />}
        {activeTab === 'logs' && <AutomationLogs />}
      </main>
    </div>
  );
}
