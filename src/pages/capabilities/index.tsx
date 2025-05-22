import React, { useState } from 'react';
import { NextPage } from 'next';

const categories = [
  { id: 'all', name: 'All Capabilities' },
  { id: 'practices', name: 'Practices' },
  { id: 'industries', name: 'Industries' },
  { id: 'regional', name: 'Regional Practices' },
];

const capabilities = [
  // Practices
  { name: 'Antitrust & Competition', category: 'practices' },
  { name: 'Artificial Intelligence', category: 'practices' },
  { name: 'Banking', category: 'practices' },
  { name: 'Capital Markets', category: 'practices' },
  { name: 'Corporate Governance', category: 'practices' },
  { name: 'Digital Assets & Web3', category: 'practices' },
  { name: 'Intellectual Property', category: 'practices' },
  { name: 'Litigation & Trial', category: 'practices' },
  { name: 'Mergers & Acquisitions', category: 'practices' },
  { name: 'Privacy & Cyber', category: 'practices' },
  
  // Industries
  { name: 'Aerospace & Defense', category: 'industries' },
  { name: 'Automotive', category: 'industries' },
  { name: 'Energy & Infrastructure', category: 'industries' },
  { name: 'Financial Institutions', category: 'industries' },
  { name: 'Healthcare & Life Sciences', category: 'industries' },
  { name: 'Technology', category: 'industries' },
  { name: 'Real Estate', category: 'industries' },
  
  // Regional Practices
  { name: 'Africa Practice', category: 'regional' },
  { name: 'Asia Practice', category: 'regional' },
  { name: 'European Practice', category: 'regional' },
  { name: 'Latin America Practice', category: 'regional' },
  { name: 'Middle East Practice', category: 'regional' },
];

const CapabilitiesPage: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCapabilities = capabilities.filter(
    cap => selectedCategory === 'all' || cap.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-4xl font-bold mb-6">Capabilities</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Our firm brings together exceptional talent and resources to help clients 
            navigate their most complex legal and business challenges.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  px-3 py-2 text-sm font-medium rounded-md
                  ${selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-500 hover:text-gray-700'}
                `}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Capabilities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCapabilities.map((capability) => (
            <div
              key={capability.name}
              className="group relative rounded-lg border border-gray-200 p-6 hover:border-blue-600 transition-colors"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {capability.name}
              </h3>
              <div className="mt-2">
                <a
                  href={`/capabilities/${capability.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-blue-600 group-hover:text-blue-700 font-medium text-sm inline-flex items-center"
                >
                  Learn more
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CapabilitiesPage; 