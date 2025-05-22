import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const initiatives = [
  {
    title: 'Pro Bono & Community Service',
    description: 'Making a positive impact through pro bono legal services and community engagement.',
    href: '/global-citizenship/pro-bono',
    image: '/images/pro-bono.jpg',
    color: 'from-blue-700/90 to-blue-900/90',
  },
  {
    title: 'Belong As You Are',
    description: 'Fostering an inclusive environment where diversity is celebrated and everyone can thrive.',
    href: '/global-citizenship/diversity',
    image: '/images/diversity.jpg',
    color: 'from-slate-700/90 to-slate-900/90',
  },
  {
    title: 'Women Enriching Business',
    description: 'Promoting the success and advancement of women in law and business.',
    href: '/global-citizenship/web',
    image: '/images/women-business.jpg',
    color: 'from-gray-700/90 to-gray-900/90',
  },
  {
    title: 'Environmental Sustainability',
    description: 'Leading by example in environmental stewardship and sustainable practices.',
    href: '/global-citizenship/sustainability',
    image: '/images/sustainability.jpg',
    color: 'from-zinc-700/90 to-zinc-900/90',
  },
];

const stats = [
  { 
    number: '100,000+', 
    label: 'Pro Bono Hours Annually',
    color: 'bg-gradient-to-br from-blue-700 to-blue-900'
  },
  { 
    number: '50+', 
    label: 'Community Partners',
    color: 'bg-gradient-to-br from-slate-700 to-slate-900'
  },
  { 
    number: '40%', 
    label: 'Carbon Footprint Reduction Goal',
    color: 'bg-gradient-to-br from-gray-700 to-gray-900'
  },
  { 
    number: '45+', 
    label: 'Global Initiatives',
    color: 'bg-gradient-to-br from-zinc-700 to-zinc-900'
  },
];

const GlobalCitizenshipPage: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-blue-900 to-slate-900" />
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 max-w-3xl border border-white/10">
            <h1 className="text-4xl font-bold mb-6 text-white">Global Citizenship</h1>
            <p className="text-xl text-white/80">
              We are committed to making a positive impact in our communities and around the world
              through pro bono service, sustainability initiatives, and fostering an inclusive
              environment where everyone can thrive.
            </p>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-block">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Commitment to Society
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe that our success comes with a responsibility to give back and make
            a meaningful difference in the world.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <div 
              key={stat.label} 
              className={`${stat.color} rounded-xl p-6 transform hover:scale-102 transition-transform duration-300 shadow-lg`}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {initiatives.map((initiative) => (
            <Link
              key={initiative.title}
              href={initiative.href}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <div className={`absolute inset-0 bg-gradient-to-tr ${initiative.color} group-hover:opacity-95 transition-opacity z-10`} />
                <Image
                  src={initiative.image}
                  alt={initiative.title}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                  <div className="transform group-hover:-translate-y-1 transition-transform duration-300">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {initiative.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {initiative.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-blue-900 to-slate-900" />
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Learn more about our initiatives and how you can get involved in our
            global citizenship programs.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white/10 text-white px-8 py-3 rounded-lg font-medium border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            Get Involved
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GlobalCitizenshipPage; 