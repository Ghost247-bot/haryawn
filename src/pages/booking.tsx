import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import BookingForm from '@/components/booking/BookingForm';
import { motion } from 'framer-motion';

const BookingPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Book a Consultation - Haryawn Law Firm</title>
        <meta name="description" content="Schedule a consultation with our experienced legal team. We're here to help you with your legal needs." />
      </Head>

      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Book a Consultation
              </h1>
              <p className="text-lg md:text-xl text-blue-100">
                Schedule a meeting with our experienced legal team to discuss your case
              </p>
            </motion.div>
          </div>
        </section>

        {/* Booking Form Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <BookingForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default BookingPage; 