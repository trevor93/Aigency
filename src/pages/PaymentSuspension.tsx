import { AlertCircle, CreditCard, Mail, Phone, Calendar, DollarSign, Zap } from 'lucide-react';

export function PaymentSuspension() {
  const clientName = "Acme Corporation";
  const serviceName = "Premium Website Hosting & Maintenance";
  const amountDue = 297.00;
  const dueDate = "March 15, 2025";
  const invoiceNumber = "INV-2025-0347";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 sm:px-8 py-6 sm:py-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] opacity-20"></div>
            <div className="flex flex-col sm:flex-row items-start gap-4 relative z-10">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <AlertCircle className="w-8 h-8 text-orange-500" strokeWidth={2} />
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Your Monthly Subscription is Past Due
                </h1>
                <p className="text-amber-50 text-base sm:text-lg">
                  Action required to restore your automated services
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 sm:px-8 py-6 sm:py-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Account Status</h2>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl">
                <p className="text-slate-800 leading-relaxed">
                  Hello <span className="font-semibold">{clientName}</span>, your subscription payment for <span className="font-semibold">{serviceName}</span> was due on {dueDate} and has not been received. To keep your business running smoothly and automatically, please submit payment as soon as possible.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 sm:p-6 mb-8 border-2 border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-slate-700" strokeWidth={2} />
                Payment Details
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-4 border-b border-slate-200">
                  <span className="text-slate-600">Service</span>
                  <span className="font-medium text-slate-900 sm:text-right">{serviceName}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-4 border-b border-slate-200">
                  <span className="text-slate-600">Invoice Number</span>
                  <span className="font-mono text-slate-900">{invoiceNumber}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-4 border-b border-slate-200">
                  <span className="text-slate-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4" strokeWidth={2} />
                    Due Date
                  </span>
                  <span className="font-medium text-slate-900">{dueDate}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pt-2">
                  <span className="text-lg font-semibold text-slate-800">Amount Due</span>
                  <span className="text-3xl sm:text-4xl font-bold text-orange-600">${amountDue.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-5 px-6 sm:px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-base sm:text-lg relative overflow-hidden group">
                <CreditCard className="w-6 h-6 relative z-10" strokeWidth={2} />
                <span className="relative z-10">Pay ${amountDue.toFixed(2)} Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </button>
              <p className="text-center text-sm text-slate-500 mt-3 flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" strokeWidth={2} />
                Secure payment processing — restore access instantly
              </p>
            </div>

            <div className="bg-aqua-50 border-2 border-aqua-200 rounded-xl p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Need Assistance?</h3>
              <p className="text-slate-700 mb-5 leading-relaxed">
                We understand that circumstances can change. If you're experiencing difficulties or have questions about your subscription, our support team is here to help keep your business running smoothly.
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:billing@agency.com"
                  className="flex items-center gap-3 text-slate-700 hover:text-slate-900 transition-colors group"
                >
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
                    <Mail className="w-5 h-5 text-aqua-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="font-semibold">Email Support</div>
                    <div className="text-sm text-slate-600">billing@agency.com</div>
                  </div>
                </a>
                <a
                  href="tel:+18005551234"
                  className="flex items-center gap-3 text-slate-700 hover:text-slate-900 transition-colors group"
                >
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
                    <Phone className="w-5 h-5 text-aqua-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="font-semibold">Call Us</div>
                    <div className="text-sm text-slate-600">1-800-555-1234</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 px-6 sm:px-8 py-5 sm:py-6 border-t border-slate-200">
            <div className="text-center text-sm text-slate-600">
              <p className="mb-2">
                Questions about this notice? Contact your account manager.
              </p>
              <p className="text-xs text-slate-500">
                This is an automated notice for invoice {invoiceNumber}. Your service access may be limited until payment is received.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a href="/login" className="text-aqua-600 hover:text-aqua-700 text-sm font-medium transition-colors inline-flex items-center gap-2">
            Return to Client Portal
          </a>
        </div>
      </div>
    </div>
  );
}
