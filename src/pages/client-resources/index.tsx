import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const ClientResourcesPage: React.FC = () => {
  const resources = [
    {
      title: 'Client Portal',
      description: 'Access your secure client portal for document management and case updates.',
      icon: '🔐',
      link: '/client-portal',
      features: [
        'Secure Document Access',
        'Case Status Updates',
        'Billing Information',
        'Team Communication',
      ],
    },
    {
      title: 'Legal Tools',
      description: 'Interactive tools and calculators for legal planning and analysis.',
      icon: '⚖️',
      link: '/legal-tools',
      features: [
        'Contract Templates',
        'Legal Calculators',
        'Compliance Checklists',
        'Document Review Tools',
      ],
    },
    {
      title: 'Publications',
      description: 'Access our library of legal guides, articles, and whitepapers.',
      icon: '📚',
      link: '/publications',
      features: [
        'Legal Guides',
        'Industry Reports',
        'Case Studies',
        'Newsletters',
      ],
    },
    {
      title: 'Training & Webinars',
      description: 'Educational resources and training materials for clients.',
      icon: '🎓',
      link: '/training',
      features: [
        'Legal Training Videos',
        'Webinar Recordings',
        'Best Practices Guides',
        'Compliance Training',
      ],
    },
  ];

  const recentPublications = [
    {
      title: 'Guide to International M&A Transactions',
      category: 'Legal Guide',
      date: 'March 2024',
      link: '/publications/international-ma-guide',
      image: '/images/resources/ma-guide.jpg',
    },
    {
      title: 'ESG Compliance Checklist',
      category: 'Tool',
      date: 'February 2024',
      link: '/publications/esg-checklist',
      image: '/images/resources/esg-checklist.jpg',
    },
    {
      title: 'Q1 2024 Legal Update',
      category: 'Newsletter',
      date: 'January 2024',
      link: '/publications/q1-2024-update',
      image: '/images/resources/q1-update.jpg',
    },
  ];

  return (
    <>
      <Head>
        <title>Client Resources - Haryawn</title>
        <meta name="description" content="Access tools, publications, and resources for Haryawn clients." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-50"
            src="/images/resources/hero.jpg"
            alt="Client Resources"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Client Resources</h1>
            <p className="text-xl md:text-2xl">
              Tools, publications, and resources to support your legal needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Resources Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-8">
                  <div className="text-4xl mb-4">{resource.icon}</div>
                  <h2 className="text-2xl font-bold mb-4">{resource.title}</h2>
                  <p className="text-gray-600 mb-6">{resource.description}</p>
                  
                  <h3 className="text-lg font-semibold mb-3">Features</h3>
                  <ul className="list-disc list-inside mb-6 space-y-2">
                    {resource.features.map((feature) => (
                      <li key={feature} className="text-gray-600">{feature}</li>
                    ))}
                  </ul>

                  <Link
                    href={resource.link}
                    className="inline-block bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Access Resource
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Publications */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Recent Publications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPublications.map((pub, index) => (
              <motion.div
                key={pub.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={pub.image}
                    alt={pub.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-600 mb-2">
                    <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm mr-2">
                      {pub.category}
                    </span>
                    <span className="text-sm">{pub.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{pub.title}</h3>
                  <Link
                    href={pub.link}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    Read more →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Portal Access */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Client Portal Access</h2>
          <p className="text-xl text-gray-600 mb-8">
            Log in to your secure client portal to access your resources
          </p>
          <div className="max-w-md mx-auto">
            <Link
              href="/client-portal"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-md hover:bg-primary-700 transition-colors"
            >
              Log In to Client Portal
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClientResourcesPage; 