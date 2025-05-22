import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const EventsPage: React.FC = () => {
  const upcomingEvents = [
    {
      title: 'Global M&A Conference 2024',
      date: 'April 15-16, 2024',
      location: 'Virtual & In-Person',
      description: 'Join industry leaders for insights on the latest trends in mergers and acquisitions.',
      image: '/images/events/ma-conference.jpg',
      category: 'Conference',
      link: '/events/global-ma-conference',
    },
    {
      title: 'Webinar: ESG in Corporate Transactions',
      date: 'April 20, 2024',
      location: 'Virtual',
      description: 'Understanding environmental, social, and governance factors in deal-making.',
      image: '/images/events/esg-webinar.jpg',
      category: 'Webinar',
      link: '/events/esg-webinar',
    },
    {
      title: 'Tech Law Symposium',
      date: 'May 5, 2024',
      location: 'San Francisco, CA',
      description: 'Exploring legal challenges in emerging technologies and digital transformation.',
      image: '/images/events/tech-symposium.jpg',
      category: 'Symposium',
      link: '/events/tech-symposium',
    },
  ];

  const pastEvents = [
    {
      title: 'International Arbitration Summit',
      date: 'March 1, 2024',
      location: 'London, UK',
      description: 'Recap of key discussions on international dispute resolution.',
      image: '/images/events/arbitration-summit.jpg',
      category: 'Summit',
      link: '/events/arbitration-summit',
    },
    {
      title: 'Real Estate Investment Forum',
      date: 'February 15, 2024',
      location: 'New York, NY',
      description: 'Insights from leading experts on real estate investment trends.',
      image: '/images/events/real-estate-forum.jpg',
      category: 'Forum',
      link: '/events/real-estate-forum',
    },
  ];

  return (
    <>
      <Head>
        <title>Events - Haryawn</title>
        <meta name="description" content="Join us for upcoming events, webinars, and conferences featuring our legal experts." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-50"
            src="/images/events/hero.jpg"
            alt="Events"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Events</h1>
            <p className="text-xl md:text-2xl">
              Join us for conferences, webinars, and networking opportunities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <span className="mr-4">{event.date}</span>
                    <span>{event.location}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{event.description}</p>
                  <Link
                    href={event.link}
                    className="inline-block bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Register Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <span className="mr-4">{event.date}</span>
                    <span>{event.location}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{event.description}</p>
                  <Link
                    href={event.link}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    View Recap →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Calendar */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Event Calendar</h2>
          <p className="text-xl text-gray-600 mb-8">
            Stay updated with our upcoming events and never miss an opportunity to connect
          </p>
          <div className="max-w-md mx-auto">
            <button className="bg-primary-600 text-white px-8 py-3 rounded-md hover:bg-primary-700 transition-colors">
              Add to Calendar
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventsPage; 