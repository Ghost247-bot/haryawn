import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const CareersPage: React.FC = () => {
  const jobOpportunities = [
    {
      title: 'Associate Attorney',
      location: 'New York, NY',
      department: 'Corporate',
      type: 'Full-time',
      link: '/careers/associate-attorney-ny',
    },
    {
      title: 'Senior Counsel',
      location: 'London, UK',
      department: 'Litigation',
      type: 'Full-time',
      link: '/careers/senior-counsel-london',
    },
    {
      title: 'Legal Operations Manager',
      location: 'Los Angeles, CA',
      department: 'Operations',
      type: 'Full-time',
      link: '/careers/legal-ops-manager-la',
    },
    {
      title: 'Summer Associate Program',
      location: 'Multiple Locations',
      department: 'Recruiting',
      type: 'Internship',
      link: '/careers/summer-associate',
    },
  ];

  const cultureValues = [
    {
      title: 'Excellence',
      description: 'We strive for the highest standards in everything we do.',
      icon: '⭐',
    },
    {
      title: 'Collaboration',
      description: 'Working together to achieve exceptional results for our clients.',
      icon: '🤝',
    },
    {
      title: 'Innovation',
      description: 'Embracing new ideas and technologies to deliver better solutions.',
      icon: '💡',
    },
    {
      title: 'Diversity & Inclusion',
      description: 'Fostering an inclusive environment where everyone can thrive.',
      icon: '🌈',
    },
  ];

  return (
    <>
      <Head>
        <title>Careers - Haryawn</title>
        <meta name="description" content="Join our team of exceptional legal professionals and build your career at Haryawn." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-50"
            src="/images/careers/hero.jpg"
            alt="Careers at Haryawn"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Careers</h1>
            <p className="text-xl md:text-2xl">
              Join our team of exceptional legal professionals
            </p>
          </motion.div>
        </div>
      </section>

      {/* Job Opportunities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Current Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {jobOpportunities.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
              >
                <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <span className="mr-4">{job.location}</span>
                  <span className="mr-4">{job.department}</span>
                  <span>{job.type}</span>
                </div>
                <Link
                  href={job.link}
                  className="inline-block bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  Apply Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Firm Culture */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Culture</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cultureValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Application Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-2">Submit Application</h3>
              <p className="text-gray-600">
                Complete your online application with required documents
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-2">Interview Process</h3>
              <p className="text-gray-600">
                Meet with our team through multiple interview rounds
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-bold mb-2">Join Our Team</h3>
              <p className="text-gray-600">
                Begin your journey with Haryawn
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Recruiting */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Questions?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Our recruiting team is here to help with any questions about our opportunities
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-md hover:bg-primary-700 transition-colors"
          >
            Contact Recruiting
          </Link>
        </div>
      </section>
    </>
  );
};

export default CareersPage; 