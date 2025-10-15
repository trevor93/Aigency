import { Globe, Zap, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Globe,
    title: 'Custom Websites',
    description: 'Beautifully crafted, responsive websites tailored to your brand. Built with modern technologies for optimal performance and user experience.',
  },
  {
    icon: Zap,
    title: 'AI Automations',
    description: 'Intelligent automation solutions that streamline your workflows, reduce manual tasks, and unlock new levels of efficiency for your business.',
  },
  {
    icon: CreditCard,
    title: 'Subscription Management',
    description: 'Flexible monthly plans with no long-term commitments. Scale your services up or down as your business needs evolve.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export function Features() {
  return (
    <section className="py-24 px-6 sm:px-8 lg:px-12 bg-navy-800/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Everything You Need to <span className="text-gradient">Succeed</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive solutions designed to accelerate your digital transformation
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative bg-navy-700/50 backdrop-blur-sm rounded-2xl p-8 border border-aqua-500/10 hover:border-aqua-500/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-aqua-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-aqua-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-aqua-500/20 transition-colors duration-300"
                >
                  <feature.icon className="w-8 h-8 text-aqua-500" />
                </motion.div>

                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
