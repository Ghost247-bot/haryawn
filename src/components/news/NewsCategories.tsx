import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  { name: 'All News', count: 156 },
  { name: 'Firm News', count: 45 },
  { name: 'Press Releases', count: 38 },
  { name: 'Awards', count: 28 },
  { name: 'Publications', count: 25 },
  { name: 'Events', count: 20 }
];

const NewsCategories: React.FC = () => {
  return (
    <section className="mb-12">
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        {categories.map((category, index) => (
          <motion.button
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group flex items-center space-x-2 px-6 py-3 rounded-full border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <span className="text-gray-700 group-hover:text-blue-600">
              {category.name}
            </span>
            <span className="text-sm text-gray-500 group-hover:text-blue-500">
              ({category.count})
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
};

export default NewsCategories; 