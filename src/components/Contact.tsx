import { useState, FormEvent } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    serviceInterest: 'Website'
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
          submission_type: 'contact'
        }]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '', serviceInterest: 'Website' });

      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-6 sm:px-8 lg:px-12 bg-navy-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ready to transform your business? Get in touch and let's discuss how we can help
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <p className="text-gray-400 mb-8">
                We're here to help you automate, innovate, and grow. Fill out the form and our team will get back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-aqua-500/10 rounded-xl flex items-center justify-center group-hover:bg-aqua-500/20 transition-colors duration-300">
                  <Mail className="w-6 h-6 text-aqua-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email Us</h4>
                  <p className="text-gray-400">hello@agency.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-aqua-500/10 rounded-xl flex items-center justify-center group-hover:bg-aqua-500/20 transition-colors duration-300">
                  <Phone className="w-6 h-6 text-aqua-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Call Us</h4>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-aqua-500/10 rounded-xl flex items-center justify-center group-hover:bg-aqua-500/20 transition-colors duration-300">
                  <MapPin className="w-6 h-6 text-aqua-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Global Reach</h4>
                  <p className="text-gray-400">Serving clients worldwide from North America to APAC</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden border border-aqua-500/20">
              <img
                src="https://images.pexels.com/photos/335393/pexels-photo-335393.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Global network"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/50 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-sm text-aqua-500 font-semibold mb-1">Operating Globally</p>
                <p className="text-white font-bold text-lg">Trusted by clients in 15+ countries</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-navy-700/50 backdrop-blur-sm rounded-2xl p-8 border border-aqua-500/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-navy-900/50 border border-aqua-500/20 rounded-xl focus:outline-none focus:border-aqua-500 transition-colors duration-300"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-navy-900/50 border border-aqua-500/20 rounded-xl focus:outline-none focus:border-aqua-500 transition-colors duration-300"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-semibold mb-2">
                    Service Interest
                  </label>
                  <select
                    id="service"
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className="w-full px-4 py-3 bg-navy-900/50 border border-aqua-500/20 rounded-xl focus:outline-none focus:border-aqua-500 transition-colors duration-300"
                  >
                    <option value="Website">Custom Website</option>
                    <option value="Automation">AI Automation</option>
                    <option value="Subscription">Subscription Management</option>
                    <option value="All">All Services</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-navy-900/50 border border-aqua-500/20 rounded-xl focus:outline-none focus:border-aqua-500 transition-colors duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm">
                    Thank you! We'll get back to you within 24 hours.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                    Something went wrong. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
