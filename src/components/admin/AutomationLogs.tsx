import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import {
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Bell,
  BarChart,
  AlertTriangle,
  RefreshCw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface AutomationLog {
  id: string;
  client_id: string;
  automation_type: string;
  status: string;
  message: string;
  metadata: any;
  created_at: string;
  client?: {
    name: string;
    email: string;
  };
}

export function AutomationLogs({ limit }: { limit?: number }) {
  const [logs, setLogs] = useState<AutomationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('automation_logs')
        .select(`
          *,
          client:clients(name, email)
        `)
        .order('created_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error loading automation logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAutomationIcon = (type: string) => {
    const icons = {
      payment_reminder: Mail,
      suspension: AlertTriangle,
      reactivation: CheckCircle,
      report: BarChart,
      notification: Bell,
    };
    return icons[type as keyof typeof icons] || Activity;
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      success: {
        icon: CheckCircle,
        color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
        label: 'Success'
      },
      failed: {
        icon: XCircle,
        color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
        label: 'Failed'
      },
      pending: {
        icon: Clock,
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
        label: 'Pending'
      }
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  const filteredLogs = logs.filter(log => {
    if (filterType !== 'all' && log.automation_type !== filterType) return false;
    if (filterStatus !== 'all' && log.status !== filterStatus) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center py-8" role="status" aria-live="polite">
          <RefreshCw className="w-6 h-6 animate-spin text-blue-600" aria-hidden="true" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading automation logs...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5" aria-hidden="true" />
              Automation Logs
            </h3>

            {!limit && (
              <div className="flex gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-1.5 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                  aria-label="Filter by automation type"
                >
                  <option value="all">All Types</option>
                  <option value="payment_reminder">Payment Reminders</option>
                  <option value="suspension">Suspensions</option>
                  <option value="reactivation">Reactivations</option>
                  <option value="report">Reports</option>
                  <option value="notification">Notifications</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-1.5 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                  aria-label="Filter by status"
                >
                  <option value="all">All Status</option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredLogs.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
              No automation logs found
            </div>
          ) : (
            filteredLogs.map((log) => {
              const Icon = getAutomationIcon(log.automation_type);
              const statusConfig = getStatusConfig(log.status);
              const StatusIcon = statusConfig.icon;
              const isExpanded = expandedLog === log.id;

              return (
                <div key={log.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                              {log.automation_type.replace(/_/g, ' ')}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
                              <StatusIcon className="w-3 h-3" aria-hidden="true" />
                              {statusConfig.label}
                            </span>
                          </div>

                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {log.message}
                          </p>

                          {log.client && (
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                              <span className="font-medium">{log.client.name}</span>
                              <span>•</span>
                              <span>{log.client.email}</span>
                            </div>
                          )}

                          {log.metadata && Object.keys(log.metadata).length > 0 && (
                            <button
                              onClick={() => setExpandedLog(isExpanded ? null : log.id)}
                              className="mt-2 flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
                              aria-expanded={isExpanded}
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp className="w-3 h-3" aria-hidden="true" />
                                  Hide Details
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-3 h-3" aria-hidden="true" />
                                  Show Details
                                </>
                              )}
                            </button>
                          )}

                          {isExpanded && log.metadata && (
                            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <pre className="text-xs text-gray-700 dark:text-gray-300 overflow-x-auto">
                                {JSON.stringify(log.metadata, null, 2)}
                              </pre>
                            </div>
                          )}
                        </div>

                        <div className="flex-shrink-0 text-xs text-gray-500 dark:text-gray-500">
                          <time dateTime={log.created_at}>
                            {new Date(log.created_at).toLocaleString()}
                          </time>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {limit && logs.length > 0 && (
          <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                window.history.pushState({}, '', '/admin-dashboard');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
            >
              View all logs →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
