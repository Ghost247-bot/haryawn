import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiLoader } from 'react-icons/fi';

// Mock data - in a real app, this would come from an API
const allNewsItems = [
  {
    id: 1,
    title: 'Haryawn Law Expands Technology Practice with New Partner Hire',
    excerpt: 'Leading technology lawyer joins our growing practice to strengthen our capabilities in AI and data privacy.',
    category: 'Firm News',
    date: 'March 15, 2024',
    image: '/images/news/tech-practice.jpg',
    author: 'Communications Team',
    readTime: '3 min read'
  },
  {
    id: 2,
    title: 'New Legal Framework for Sustainable Finance',
    excerpt: 'Our experts analyze the latest regulatory changes affecting sustainable finance and ESG investments.',
    category: 'Publications',
    date: 'March 14, 2024',
    image: '/images/news/sustainable-finance.jpg',
    author: 'ESG Practice Group',
    readTime: '5 min read'
  },
  {
    id: 3,
    title: 'Haryawn Law Named Top Firm for Innovation',
    excerpt: 'Recognition for our innovative approach to legal service delivery and technology adoption.',
    category: 'Awards',
    date: 'March 13, 2024',
    image: '/images/news/awards.jpg',
    author: 'Marketing Team',
    readTime: '2 min read'
  },
  {
    id: 4,
    title: 'Upcoming Webinar: Navigating Cybersecurity Regulations',
    excerpt: 'Join our expert panel for insights on the evolving landscape of cybersecurity law.',
    category: 'Events',
    date: 'March 12, 2024',
    image: '/images/news/cybersecurity.jpg',
    author: 'Events Team',
    readTime: '1 min read'
  },
  {
    id: 5,
    title: 'International Trade Law Updates: Key Changes in 2024',
    excerpt: 'Analysis of recent developments in international trade law and their impact on global business.',
    category: 'Publications',
    date: 'March 11, 2024',
    image: '/images/news/trade-law.jpg',
    author: 'International Trade Team',
    readTime: '4 min read'
  },
  {
    id: 6,
    title: 'Pro Bono Success: Supporting Local Communities',
    excerpt: 'Highlighting our recent pro bono work and its impact on local communities.',
    category: 'Firm News',
    date: 'March 10, 2024',
    image: '/images/news/pro-bono.jpg',
    author: 'Pro Bono Committee',
    readTime: '3 min read'
  },
  {
    id: 7,
    title: 'Digital Assets and Securities Regulation',
    excerpt: 'Understanding the evolving regulatory landscape for cryptocurrencies and digital assets.',
    category: 'Publications',
    date: 'March 9, 2024',
    image: '/images/news/digital-assets.jpg',
    author: 'Fintech Practice Group',
    readTime: '6 min read'
  },
  {
    id: 8,
    title: 'Healthcare Law Symposium 2024',
    excerpt: 'Join us for our annual healthcare law symposium featuring industry experts and thought leaders.',
    category: 'Events',
    date: 'March 8, 2024',
    image: '/images/news/healthcare.jpg',
    author: 'Events Team',
    readTime: '2 min read'
  }
];

const ITEMS_PER_PAGE = 4;

const NewsList: React.FC = () => {
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setDisplayCount(prev => Math.min(prev + ITEMS_PER_PAGE, allNewsItems.length));
    setIsLoading(false);
  };

  return (
    <section className="space-y-8">
      <AnimatePresence>
        {allNewsItems.slice(0, displayCount).map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 relative h-48 md:h-auto">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 p-6 md:p-8">
                <div className="flex items-center space-x-4 mb-3">
                  <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-sm text-gray-500">{item.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                  <Link href={`/news/${item.id}`}>
                    {item.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">
                  {item.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-gray-600">{item.author}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">{item.readTime}</span>
                  </div>
                  <Link 
                    href={`/news/${item.id}`}
                    className="text-blue-600 hover:text-blue-700 transition-colors flex items-center"
                  >
                    Read more
                    <FiArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </AnimatePresence>

      {/* Load More Button */}
      {displayCount < allNewsItems.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center pt-8"
        >
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="group flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <FiLoader className="w-5 h-5 animate-spin text-blue-600" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <span>Load More News</span>
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </motion.div>
      )}

      {/* No More Items Message */}
      {displayCount >= allNewsItems.length && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 pt-8"
        >
          You've reached the end of the list
        </motion.p>
      )}
    </section>
  );
};

export default NewsList; 