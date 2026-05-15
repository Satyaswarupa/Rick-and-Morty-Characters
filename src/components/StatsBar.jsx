import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, MapPin, Tv, Layers } from 'lucide-react';

const StatsBar = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  const stats = [
    { icon: Users, label: 'Total Characters', value: '826+', color: 'from-purple-500 to-pink-500' },
    { icon: MapPin, label: 'Dimensions', value: '126', color: 'from-cyan-500 to-blue-500' },
    { icon: Tv, label: 'Episodes', value: '51', color: 'from-green-500 to-emerald-500' },
    { icon: Layers, label: 'Species', value: '60+', color: 'from-amber-500 to-orange-500' },
  ];

  return (
    <section ref={ref} className="py-12 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -3 }}
              className="flex items-center gap-4 p-4 rounded-2xl glass border border-white/5">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;