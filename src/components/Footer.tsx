import { Shield, Lock, Award, CheckCircle, Globe, Zap, Mail, Send, Twitter, Linkedin, Github, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

const trustBadges = [
  {
    icon: Shield,
    label: 'SSL Secured',
    description: '256-bit encryption'
  },
  {
    icon: Lock,
    label: 'Secure Payments',
    description: 'PCI DSS compliant'
  },
  {
    icon: Award,
    label: 'Trusted by 500+',
    description: 'Businesses worldwide'
  },
  {
    icon: CheckCircle,
    label: 'Verified',
    description: 'Business certified'
  }
];

const quickLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Insights', href: '#insights' },
  { name: 'Contact', href: '#contact' }
];

const services = [
  { name: 'Custom Websites', icon: Globe },
  { name: 'AI Automation', icon: Zap },
  { name: 'Subscription Plans', icon: CheckCircle }
];

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-sky-400' },
  { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-500' },
  { name: 'GitHub', icon: Github, href: '#', color: 'hover:text-gray-300' },
  { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-500' }
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') {
          setMessage('This email is already subscribed!');
        } else {
          setMessage('Something went wrong. Please try again.');
        }
        setStatus('error');
      } else {
        setMessage('Successfully subscribed to our newsletter!');
        setStatus('success');
        setEmail('');
      }
    } catch (err) {
      setMessage('Failed to subscribe. Please try again.');
      setStatus('error');
    }

    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <footer className="bg-navy-800/50 backdrop-blur-sm border-t border-aqua-500/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-4">
                Your <span className="text-gradient">Digital Partner</span>
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Building the future of business automation and web solutions.
                Transform your operations with cutting-edge technology and flexible subscription models.
              </p>
              <p className="text-sm text-gray-500 mb-6 italic">
                Powered by AI Automations • Built for Effortless Growth
              </p>

              <form onSubmit={handleNewsletterSubmit} className="mb-6">
                <label htmlFor="newsletter-email" className="block text-sm font-medium mb-2 text-gray-300">
                  Subscribe to Our Newsletter
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      disabled={status === 'loading'}
                      className="w-full pl-10 pr-4 py-3 bg-navy-700/50 border border-aqua-500/20 rounded-lg focus:outline-none focus:border-aqua-500 focus:ring-1 focus:ring-aqua-500 transition-all duration-300 text-white placeholder-gray-500 disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-6 py-3 bg-gradient-to-r from-aqua-500 to-blue-500 text-white font-semibold rounded-lg hover:from-aqua-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                {message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-2 text-sm ${
                      status === 'success' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {message}
                  </motion.p>
                )}
              </form>

              <div className="flex items-center gap-4 mb-4">
                <a
                  href="mailto:hello@naimtech.com"
                  className="inline-flex items-center gap-2 text-aqua-500 hover:text-aqua-400 transition-colors duration-300"
                >
                  <Mail className="w-4 h-4" />
                  hello@naimtech.com
                </a>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">Follow Us:</span>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`p-2 bg-navy-700/50 rounded-lg border border-aqua-500/20 hover:border-aqua-500/50 transition-all duration-300 ${social.color}`}
                      aria-label={social.name}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-aqua-500 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-aqua-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name} className="flex items-center gap-2 text-gray-400">
                    <service.icon className="w-4 h-4 text-aqua-500" />
                    {service.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-aqua-500/10 pt-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <h4 className="font-bold text-sm text-center mb-6 text-gray-400">
              SECURITY & TRUST
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center text-center p-4 bg-navy-700/30 rounded-xl border border-aqua-500/10 hover:border-aqua-500/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-aqua-500/10 rounded-full flex items-center justify-center mb-3">
                    <badge.icon className="w-6 h-6 text-aqua-500" />
                  </div>
                  <h5 className="font-semibold text-sm mb-1">{badge.label}</h5>
                  <p className="text-xs text-gray-400">{badge.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center text-gray-400 text-sm"
          >
            <p>© {currentYear} NaimTech. All rights reserved.</p>
            <p className="mt-2 text-xs">
              Powered by AI Automations • Built for Effortless Growth
            </p>
            <p className="mt-1 text-xs">
              Built with modern technology. Secured with enterprise-grade encryption.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
