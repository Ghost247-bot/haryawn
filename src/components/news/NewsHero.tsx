import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiBell } from 'react-icons/fi';
import SubscribeForm from './SubscribeForm';

const NewsHero: React.FC = () => {
  const [showSubscribe, setShowSubscribe] = useState(false);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative h-[550px] sm:h-[600px] lg:h-[650px] bg-blue-900 text-white overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/news/hero-bg.jpg"
          alt="Legal office building"
          fill
          priority
          className="object-cover transform scale-105 motion-safe:animate-subtle-zoom"
          sizes="100vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-900/85 to-blue-900/75" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-3xl"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center px-4 py-2 mb-4 sm:mb-6 rounded-full bg-blue-500/20 text-blue-100 backdrop-blur-sm border border-blue-400/20 text-sm sm:text-base"
          >
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
            Latest Updates
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", damping: 20 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            News & Insights
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-xl text-blue-100 max-w-2xl mb-8 sm:mb-10 leading-relaxed"
          >
            Stay informed with the latest legal developments, firm news, and industry insights from our experienced team of attorneys.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          >
            <Link
              href="/news"
              className="group inline-flex justify-center items-center px-6 py-3.5 bg-white text-blue-900 rounded-lg hover:bg-blue-50 transition-all duration-300 text-base sm:text-lg font-medium shadow-lg shadow-blue-900/10 hover:shadow-xl hover:shadow-blue-900/20"
            >
              View Latest News
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <button
              onClick={() => setShowSubscribe(true)}
              className="group inline-flex justify-center items-center px-6 py-3.5 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all duration-300 text-base sm:text-lg font-medium backdrop-blur-sm"
            >
              <FiBell className="mr-2 group-hover:scale-110 transition-transform duration-300" />
              Subscribe to Updates
            </button>
          </motion.div>
        </motion.div>

        {/* Subscribe Form Modal */}
        <AnimatePresence>
          {showSubscribe && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSubscribe(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
              >
                <SubscribeForm />
                <button
                  onClick={() => setShowSubscribe(false)}
                  className="absolute -top-12 right-0 text-white/80 hover:text-white"
                >
                  Close
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/5 to-transparent" />
        <svg
          className="w-full text-white/5"
          height="20"
          viewBox="0 0 1440 74"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M456.464 0.0433865C277.158 -1.70575 0 50.0141 0 50.0141V74H1440V50.0141C1440 50.0141 1320.4 31.1925 1243.09 27.0276C1099.33 19.2816 1019.08 53.1981 875.138 50.0141C710.527 46.3727 621.108 1.64949 456.464 0.0433865Z"></path>
        </svg>
      </div>
    </motion.section>
  );
};

export default NewsHero;