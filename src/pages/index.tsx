import React, { useEffect } from 'react';
import Head from 'next/head';
import Testimonials from '../components/Testimonials';
import OfficeMap from '../components/OfficeMap';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGavel, FaBalanceScale, FaHandshake, FaChartLine } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import HeroSlideshow from '../components/HeroSlideshow';

const featuredNews = [
  {
    title: 'Leading the Future of Legal Innovation',
    category: 'Client Alert',
    description: 'Pioneering new approaches to legal services in the digital age.',
    image: '/images/innovation.jpg',
    href: '/news/legal-innovation'
  },
  {
    title: 'Sustainable Finance Initiative Launch',
    category: 'Resource',
    description: 'Driving sustainable development through innovative financial solutions.',
    image: '/images/sustainable-finance.jpg',
    href: '/news/sustainable-finance'
  },
  {
    title: 'Global Markets Outlook 2025',
    category: 'Report',
    description: 'Analysis of emerging trends and opportunities in global markets.',
    image: '/images/global-markets.jpg',
    href: '/news/global-markets'
  }
];

const recentDeals = [
  {
    title: 'Major Tech Acquisition',
    description: 'Advised on $5B cross-border technology sector acquisition',
    category: 'Technology M&A',
    image: '/images/tech-deal.jpg'
  },
  {
    title: 'Renewable Energy Project',
    description: 'Led $2B renewable energy infrastructure financing',
    category: 'Energy & Infrastructure',
    image: '/images/energy-project.jpg'
  },
  {
    title: 'Healthcare Innovation',
    description: 'Supported groundbreaking healthcare merger',
    category: 'Healthcare',
    image: '/images/healthcare-deal.jpg'
  }
];

const achievements = [
  {
    title: 'Law Firm of the Year',
    description: 'Recognized for excellence across multiple practice areas',
    source: 'Legal 500 2024'
  },
  {
    title: 'Most Innovative Law Firm',
    description: 'Leading innovation in legal services',
    source: 'Financial Times 2024'
  },
  {
    title: 'Top Global Law Firm',
    description: '#1 in cross-border transactions',
    source: 'Chambers Global 2024'
  }
];

const testimonials = [
  {
    quote: "A winning team with a truly global approach.",
    source: "Chambers Global 2024"
  },
  {
    quote: "Best in class when it comes to complex business strategies and market knowledge.",
    source: "Legal 500 2024"
  }
];

const HomePage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Add scroll-based animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Head>
        <title>Haryawn - Global Law Firm</title>
        <meta name="description" content="Haryawn is a global law firm providing comprehensive legal services across various practice areas." />
      </Head>

      {/* Hero Slideshow */}
      <HeroSlideshow />

      {/* Featured News Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredNews.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="group relative bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm font-medium text-blue-600">
                    {item.category}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {item.description}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    Read More
                    <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Deals Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Recent Deals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentDeals.map((deal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm font-medium text-blue-600">
                    {deal.category}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold text-gray-900">
                    {deal.title}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {deal.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Recognition & Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold mb-3">{achievement.title}</h3>
                <p className="text-gray-300 mb-4">{achievement.description}</p>
                <span className="text-sm font-medium text-blue-300">{achievement.source}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Others Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <blockquote className="text-xl text-gray-900 italic mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <cite className="text-gray-600 not-italic">— {testimonial.source}</cite>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Ready to Work Together?</h2>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3 border-2 border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-blue-800 transition-all duration-200"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 