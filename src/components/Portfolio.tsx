import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const portfolioItems = [
  {
    id: 1,
    client: 'TechFlow Solutions',
    logo: 'https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900',
    description: 'Custom e-commerce platform with AI-powered product recommendations',
    result: '250% increase in conversion rate within 3 months',
    tags: ['Web Development', 'AI Integration'],
  },
  {
    id: 2,
    client: 'DataStream Analytics',
    logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    image: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900',
    description: 'Automated data processing pipeline reducing manual work by 80%',
    result: 'Saved 120+ hours per week across the team',
    tags: ['AI Automation', 'Data Processing'],
  },
  {
    id: 3,
    client: 'CloudVenture Inc',
    logo: 'https://images.pexels.com/photos/39584/censorship-limitations-freedom-of-expression-restricted-39584.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900',
    description: 'Modern SaaS platform with intelligent chatbot support',
    result: '90% reduction in support ticket volume',
    tags: ['SaaS Platform', 'AI Chatbot'],
  },
  {
    id: 4,
    client: 'InnovateLabs',
    logo: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900',
    description: 'AI-powered content generation and management system',
    result: '10x faster content production workflow',
    tags: ['Content AI', 'CMS'],
  },
];

export function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % portfolioItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
  };

  const currentItem = portfolioItems[currentIndex];

  return (
    <section className="py-24 px-6 sm:px-8 lg:px-12 bg-navy-800/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Client <span className="text-gradient">Success Stories</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real results from real partnerships
          </p>
        </motion.div>

        <div className="relative">
          <div className="bg-navy-700/50 backdrop-blur-sm rounded-2xl border border-aqua-500/20 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
                className="aspect-[16/9] relative overflow-hidden"
              >
                <img
                  src={currentItem.image}
                  alt={currentItem.client}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="flex items-center gap-4 mb-4"
                  >
                    <img
                      src={currentItem.logo}
                      alt={`${currentItem.client} logo`}
                      className="w-16 h-16 rounded-xl object-cover border-2 border-aqua-500/30"
                    />
                    <h3 className="text-2xl sm:text-3xl font-bold">{currentItem.client}</h3>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="text-lg text-gray-300 mb-4 max-w-3xl"
                  >
                    {currentItem.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="flex items-center gap-2 mb-4"
                  >
                    <TrendingUp className="w-5 h-5 text-aqua-500" />
                    <span className="text-aqua-500 font-semibold">{currentItem.result}</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="flex flex-wrap gap-2"
                  >
                    {currentItem.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-aqua-500/10 border border-aqua-500/30 rounded-full text-sm text-aqua-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button
            onClick={prevSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-navy-700/80 hover:bg-navy-600 backdrop-blur-sm border border-aqua-500/30 p-3 rounded-full transition-colors duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-navy-700/80 hover:bg-navy-600 backdrop-blur-sm border border-aqua-500/30 p-3 rounded-full transition-colors duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          <div className="flex justify-center gap-2 mt-6">
            {portfolioItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-aqua-500'
                    : 'w-2 bg-aqua-500/30 hover:bg-aqua-500/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
