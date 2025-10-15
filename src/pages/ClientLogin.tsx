import { useState } from 'react';
import { Shield, Lock, Mail, AlertCircle, Sparkles, Info } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function ClientLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
        return;
      }

      if (data.user) {
        window.location.href = '/client-dashboard';
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,217,255,0.08),transparent)]"></div>
      <div className="absolute top-20 left-10 w-64 h-64 bg-aqua-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-aqua-400/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-md relative">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden relative z-10">
          <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 px-6 sm:px-8 py-10 sm:py-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,217,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_ease-in-out_infinite]"></div>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-aqua-500 to-aqua-400 rounded-2xl mb-6 shadow-lg icon-glow relative">
              <Shield className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 relative">Client Portal</h1>
            <p className="text-aqua-300 relative flex items-center justify-center gap-2 text-sm sm:text-base">
              <Sparkles className="w-4 h-4" strokeWidth={2} />
              Your business runs smoothly and automatically
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-8 sm:py-10">
            <div className="mb-6 p-4 bg-aqua-50 border-l-4 border-aqua-500 rounded-r-lg flex items-start gap-3">
              <Info className="w-5 h-5 text-aqua-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-aqua-800">
                <p className="font-semibold mb-1">Demo Credentials</p>
                <p className="mb-1"><strong>Email:</strong> demo@client.com</p>
                <p><strong>Password:</strong> demo123</p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-aqua-500" strokeWidth={1.5} />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 outline-none transition-all text-slate-900 placeholder-slate-400"
                    placeholder="your.email@company.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-aqua-500" strokeWidth={1.5} />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 outline-none transition-all text-slate-900 placeholder-slate-400"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-slate-300 rounded text-aqua-500 focus:ring-2 focus:ring-aqua-500"
                  />
                  <span className="text-slate-600">Remember me</span>
                </label>
                <a href="#" className="text-aqua-600 hover:text-aqua-700 font-medium transition-colors">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-aqua-500 to-aqua-400 hover:from-aqua-600 hover:to-aqua-500 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <span className="relative z-10">{isLoading ? 'Signing in...' : 'Sign In to Portal'}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </button>
            </div>
          </form>

          <div className="px-6 sm:px-8 pb-8 pt-0">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">Need help?</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Questions? Contact your account manager or email{' '}
                <a href="mailto:support@agency.com" className="text-aqua-600 font-semibold hover:underline">
                  support@agency.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-aqua-400/80 flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" strokeWidth={1.5} />
            Your business runs smoothly and securely
          </p>
        </div>
      </div>
    </div>
  );
}
