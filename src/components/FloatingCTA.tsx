import { useState, FormEvent } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    serviceInterest: 'Automation'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          message: formData.message,
          service_interest: formData.serviceInterest,
          submission_type: 'chat_widget'
        }]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '', serviceInterest: 'Automation' });

      setTimeout(() => {
        setSubmitStatus('idle');
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] z-50 animate-slide-up">
          <div className="bg-navy-700 backdrop-blur-lg rounded-2xl shadow-2xl border border-aqua-500/20 overflow-hidden">
            <div className="bg-gradient-to-r from-aqua-500 to-cyan-500 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Get Automation Ideas</h3>
                  <p className="text-xs text-white/80">We'll respond within 1 hour</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-6">
              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                  <p className="text-gray-400">We'll get back to you with automation ideas shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-navy-900/50 border border-aqua-500/20 rounded-xl focus:outline-none focus:border-aqua-500 transition-colors duration-300 text-sm"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-navy-900/50 border border-aqua-500/20 rounded-xl focus:outline-none focus:border-aqua-500 transition-colors duration-300 text-sm"
                      placeholder="Your email"
                    />
                  </div>

                  <div>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full px-4 py-2.5 bg-navy-900/50 border border-aqua-500/20 rounded-xl focus:outline-none focus:border-aqua-500 transition-colors duration-300 text-sm"
                    >
                      <option value="Automation">AI Automation</option>
                      <option value="Website">Custom Website</option>
                      <option value="Subscription">Subscription Plan</option>
                      <option value="All">All Services</option>
                    </select>
                  </div>

                  <div>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-navy-900/50 border border-aqua-500/20 rounded-xl focus:outline-none focus:border-aqua-500 transition-colors duration-300 resize-none text-sm"
                      placeholder="What would you like to automate?"
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs">
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-aqua-500 to-cyan-500 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-aqua-500/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-aqua-500 to-cyan-500 rounded-full shadow-2xl shadow-aqua-500/30 flex items-center justify-center hover:scale-110 transition-transform duration-300 z-50 group"
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <>
            <MessageCircle className="w-7 h-7 text-white" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </span>
          </>
        )}
      </button>
    </>
  );
}
