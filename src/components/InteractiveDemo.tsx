import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

export function InteractiveDemo() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: 'Hello! I can help summarize text, answer questions, or assist with tasks. Try me out!', isUser: false }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        'That\'s a great question! Our AI can help automate tasks like this across your entire workflow.',
        'Interesting! With our custom AI solutions, we can build something exactly like this for your business.',
        'I understand what you need. This is precisely the kind of automation we specialize in creating.',
        'Perfect use case! Our AI automations can handle this and scale it across your organization.'
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      setMessages(prev => [...prev, { text: randomResponse, isUser: false }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section className="py-24 px-6 sm:px-8 lg:px-12 bg-navy-900 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-aqua-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-aqua-400/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-aqua-500/10 border border-aqua-500/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-aqua-500" />
            <span className="text-sm font-semibold text-aqua-500">Interactive Demo</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Experience <span className="text-gradient">AI in Action</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See how our AI automation can transform your business operations
          </p>
        </div>

        <div className="bg-navy-700/50 backdrop-blur-sm rounded-2xl border border-aqua-500/20 overflow-hidden shadow-2xl">
          <div className="bg-navy-800/80 px-6 py-4 border-b border-aqua-500/20">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="ml-4 text-sm text-gray-400">AI Assistant Demo</span>
            </div>
          </div>

          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.isUser
                      ? 'bg-aqua-500 text-navy-900'
                      : 'bg-navy-800 text-white border border-aqua-500/20'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-navy-800 border border-aqua-500/20 px-4 py-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-aqua-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-aqua-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-aqua-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-6 border-t border-aqua-500/20">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Try asking me something..."
                className="flex-1 bg-navy-800 border border-aqua-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-aqua-500/50 transition-colors"
              />
              <button
                type="submit"
                className="bg-aqua-500 hover:bg-aqua-400 text-navy-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-aqua-500/50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        <div className="text-center mt-8">
          <button className="bg-navy-700 hover:bg-navy-600 text-white border border-aqua-500/30 hover:border-aqua-500/50 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
            Try It Now
          </button>
        </div>
      </div>
    </section>
  );
}
