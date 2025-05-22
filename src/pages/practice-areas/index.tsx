import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';

const PracticeAreasPage: React.FC = () => {
  const practiceAreas = [
    {
      title: 'Bankruptcy & Restructuring',
      description: 'Comprehensive solutions for complex financial challenges',
      icon: '🏦',
      expertise: [
        'Chapter 11 Reorganizations',
        'Cross-Border Insolvency',
        'Distressed M&A',
        'Creditor Rights',
      ],
      caseStudy: {
        title: 'Major Retail Chain Restructuring',
        description: 'Successfully guided a Fortune 500 retailer through Chapter 11 reorganization.',
        link: '/case-studies/retail-restructuring',
      },
    },
    {
      title: 'Corporate',
      description: 'Strategic counsel for global business transactions',
      icon: '💼',
      expertise: [
        'Mergers & Acquisitions',
        'Capital Markets',
        'Private Equity',
        'Corporate Governance',
      ],
      caseStudy: {
        title: 'Tech Industry M&A',
        description: 'Advised on a $10B acquisition in the technology sector.',
        link: '/case-studies/tech-merger',
      },
    },
    {
      title: 'Litigation',
      description: 'Expert representation in high-stakes disputes',
      icon: '⚖️',
      expertise: [
        'Complex Commercial Litigation',
        'Class Actions',
        'Regulatory Investigations',
        'International Arbitration',
      ],
      caseStudy: {
        title: 'International Arbitration Victory',
        description: 'Secured a $500M award in an international arbitration proceeding.',
        link: '/case-studies/arbitration-win',
      },
    },
    {
      title: 'Real Estate',
      description: 'Full-service real estate legal solutions',
      icon: '🏢',
      expertise: [
        'Property Development',
        'Real Estate Finance',
        'Leasing',
        'Land Use',
      ],
      caseStudy: {
        title: 'Mixed-Use Development',
        description: 'Structured a $2B mixed-use development project in a major metropolitan area.',
        link: '/case-studies/real-estate-dev',
      },
    },
  ];

  return (
    <>
      <Head>
        <title>Practice Areas - Haryawn</title>
        <meta name="description" content="Explore our comprehensive legal practice areas and expertise." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-50"
            src="/images/practice-areas/hero.jpg"
            alt="Practice Areas"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Practice Areas</h1>
            <p className="text-xl md:text-2xl">
              Comprehensive legal solutions across all major practice areas
            </p>
          </motion.div>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {practiceAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-8">
                  <div className="text-4xl mb-4">{area.icon}</div>
                  <h2 className="text-2xl font-bold mb-4">{area.title}</h2>
                  <p className="text-gray-600 mb-6">{area.description}</p>
                  
                  <h3 className="text-lg font-semibold mb-3">Areas of Expertise</h3>
                  <ul className="list-disc list-inside mb-6 space-y-2">
                    {area.expertise.map((item) => (
                      <li key={item} className="text-gray-600">{item}</li>
                    ))}
                  </ul>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Featured Case Study</h4>
                    <p className="text-gray-600 mb-4">{area.caseStudy.description}</p>
                    <Link
                      href={area.caseStudy.link}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Legal Assistance?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Our experienced attorneys are ready to help with your legal needs
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-md hover:bg-primary-700 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
};

export default PracticeAreasPage; 