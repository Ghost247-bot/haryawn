import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const leaders = [
  {
    id: 1,
    name: 'Sarah J. Mitchell',
    position: 'Managing Partner',
    image: '/images/team/leader1.jpg',
    description: 'Over 25 years of experience in corporate law and international transactions.',
    expertise: ['Corporate Law', 'Mergers & Acquisitions', 'International Business'],
  },
  {
    id: 2,
    name: 'Michael R. Chen',
    position: 'Senior Partner, Litigation',
    image: '/images/team/leader2.jpg',
    description: 'Leading complex litigation cases with a focus on technology and intellectual property.',
    expertise: ['Litigation', 'IP Law', 'Technology'],
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    position: 'Head of Global Operations',
    image: '/images/team/leader3.jpg',
    description: 'Driving operational excellence across our international offices.',
    expertise: ['Operations', 'Strategic Planning', 'International Relations'],
  },
  {
    id: 4,
    name: 'David A. Thompson',
    position: 'Chief Innovation Officer',
    image: '/images/team/leader4.jpg',
    description: 'Spearheading legal technology initiatives and digital transformation.',
    expertise: ['Legal Tech', 'Innovation', 'Digital Strategy'],
  },
  {
    id: 5,
    name: 'Dr. Amanda K. Patel',
    position: 'Head of Research',
    image: '/images/team/leader5.jpg',
    description: 'Leading legal research and development of emerging practice areas.',
    expertise: ['Legal Research', 'Policy Development', 'Emerging Technologies'],
  },
  {
    id: 6,
    name: 'James W. Foster',
    position: 'Financial Director',
    image: '/images/team/leader6.jpg',
    description: 'Managing financial strategy and growth initiatives.',
    expertise: ['Financial Planning', 'Risk Management', 'Strategic Growth'],
  }
];

const LeadershipSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prevSlide) => (prevSlide + newDirection + leaders.length) % leaders.length);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6"
          >
            Our Leadership Team
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Meet the experts leading our firm into the future of legal excellence
          </motion.p>
        </div>

        <div className="relative h-[700px] bg-white rounded-2xl shadow-xl overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                <div className="relative h-[300px] lg:h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent z-10" />
                  <Image
                    src={leaders[currentSlide].image}
                    alt={leaders[currentSlide].name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-xl"
                  >
                    <span className="text-blue-600 text-lg font-medium mb-4 block">
                      Leadership
                    </span>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {leaders[currentSlide].name}
                    </h3>
                    <p className="text-blue-600 text-xl mb-8">
                      {leaders[currentSlide].position}
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed mb-10">
                      {leaders[currentSlide].description}
                    </p>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 text-lg">Areas of Expertise</h4>
                      <div className="flex flex-wrap gap-3">
                        {leaders[currentSlide].expertise.map((item, index) => (
                          <span
                            key={index}
                            className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute bottom-8 left-0 right-0 z-10">
            <div className="flex items-center justify-center space-x-6">
              <button
                onClick={() => paginate(-1)}
                className="p-3 rounded-full bg-white/90 shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 group"
              >
                <ChevronLeftIcon className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
              </button>
              <div className="flex items-center space-x-3">
                {leaders.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentSlide ? 1 : -1);
                      setCurrentSlide(index);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-blue-600 w-6' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => paginate(1)}
                className="p-3 rounded-full bg-white/90 shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 group"
              >
                <ChevronRightIcon className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadershipSlider; 