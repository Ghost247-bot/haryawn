import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import FeaturedInsights from '@/components/insights/FeaturedInsights';
import InsightCategories from '@/components/insights/InsightCategories';
import LatestBlogs from '@/components/insights/LatestBlogs';
import InsightSubscribe from '@/components/insights/InsightSubscribe';
import InsightResources from '@/components/insights/InsightResources';

const InsightsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Insights | Haryawn Law</title>
        <meta name="description" content="Stay informed with our latest legal insights, articles, and updates." />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative bg-blue-900 text-white py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Insights
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-blue-100 max-w-2xl"
            >
              Stay ahead with our latest legal perspectives, industry insights, and thought leadership.
            </motion.p>
          </div>
        </motion.section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-12">
            {/* Categories Navigation */}
            <InsightCategories />

            {/* Featured Insights */}
            <FeaturedInsights />

            {/* Latest Blogs */}
            <LatestBlogs />

            {/* Resources Section */}
            <InsightResources />

            {/* Subscribe Section */}
            <InsightSubscribe />
          </div>
        </div>
      </main>
    </>
  );
};

export default InsightsPage; 