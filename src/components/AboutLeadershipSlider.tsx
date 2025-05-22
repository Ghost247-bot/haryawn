import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const leadership = [
  {
    name: 'John Smith',
    title: 'Global Chair',
    image: '/images/leadership/john-smith.jpg',
    bio: 'Over 25 years of experience in corporate law and strategic leadership.',
    refCode: 'GC-JS-001'
  },
  {
    name: 'Sarah Johnson',
    title: 'Managing Partner',
    image: '/images/leadership/sarah-johnson.jpg',
    bio: 'Expert in international transactions and cross-border operations.',
    refCode: 'MP-SJ-002'
  },
  {
    name: 'Michael Chen',
    title: 'Executive Partner',
    image: '/images/leadership/michael-chen.jpg',
    bio: 'Specialist in technology and innovation in legal services.',
    refCode: 'EP-MC-003'
  },
  {
    name: 'Emily Davis',
    title: 'Senior Partner',
    image: '/images/leadership/emily-davis.jpg',
    bio: 'Leading expert in mergers and acquisitions with global experience.',
    refCode: 'SP-ED-004'
  },
  {
    name: 'David Wilson',
    title: 'Head of Litigation',
    image: '/images/leadership/david-wilson.jpg',
    bio: 'Renowned litigator with expertise in complex commercial disputes.',
    refCode: 'HL-DW-005'
  },
  {
    name: 'Lisa Chang',
    title: 'Head of Corporate',
    image: '/images/leadership/lisa-chang.jpg',
    bio: 'Specializes in corporate restructuring and strategic transactions.',
    refCode: 'HC-LC-006'
  },
  {
    name: 'Robert Martinez',
    title: 'Head of Real Estate',
    image: '/images/leadership/robert-martinez.jpg',
    bio: 'Expert in commercial real estate and property development law.',
    refCode: 'HR-RM-007'
  },
  {
    name: 'Amanda Foster',
    title: 'Head of Employment',
    image: '/images/leadership/amanda-foster.jpg',
    bio: 'Specializes in employment law and workplace regulations.',
    refCode: 'HE-AF-008'
  },
  {
    name: 'James Kim',
    title: 'Head of Technology',
    image: '/images/leadership/james-kim.jpg',
    bio: 'Leading expert in technology law and digital transformation.',
    refCode: 'HT-JK-009'
  },
];

const AboutLeadershipSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const totalSlides = Math.ceil(leadership.length / 3);
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = totalSlides - 1;
      if (nextIndex >= totalSlides) nextIndex = 0;
      return nextIndex;
    });
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [isPlaying, paginate]);

  const getCurrentSlideProfiles = () => {
    const startIndex = currentIndex * 3;
    return leadership.slice(startIndex, startIndex + 3);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Leadership Team</h2>
          <div className="w-12 h-0.5 bg-primary-600 mx-auto"></div>
        </div>
        <div className="relative h-[300px] overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.4 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4">
                {getCurrentSlideProfiles().map((profile, index) => (
                  <motion.div
                    key={profile.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-[140px]">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 z-10" />
                      <Image
                        src={profile.image}
                        alt={profile.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-3 bg-white">
                      <h3 className="text-base font-bold text-gray-900 mb-1">
                        {profile.name}
                      </h3>
                      <div className="w-8 h-0.5 bg-primary-600 mb-2"></div>
                      <p className="text-sm text-primary-600 font-semibold mb-2">
                        {profile.title}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 mb-3">
                        {profile.bio}
                      </p>
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/contact?subject=Contact ${profile.name}&ref=${profile.refCode}`}
                          className="inline-flex items-center text-xs text-primary-600 hover:text-primary-700 transition-colors duration-200"
                        >
                          <EnvelopeIcon className="w-3 h-3 mr-1" />
                          Contact {profile.name.split(' ')[0]}
                        </Link>
                        <span className="text-xs text-gray-400">Ref: {profile.refCode}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute inset-y-0 -left-2 -right-2 flex items-center justify-between pointer-events-none">
            <button
              onClick={() => paginate(-1)}
              className="p-2 rounded-full bg-white/90 shadow-lg text-gray-800 hover:bg-white hover:scale-110 pointer-events-auto transition-all duration-300 ml-4 backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="p-2 rounded-full bg-white/90 shadow-lg text-gray-800 hover:bg-white hover:scale-110 pointer-events-auto transition-all duration-300 mr-4 backdrop-blur-sm"
              aria-label="Next slide"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Play/Pause and Dots Navigation */}
          <div className="absolute -bottom-2 left-0 right-0 flex flex-col items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-full bg-white/90 shadow-lg text-gray-800 hover:bg-white hover:scale-110 transition-all duration-300 backdrop-blur-sm mb-1"
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isPlaying ? (
                <PauseIcon className="w-3 h-3" />
              ) : (
                <PlayIcon className="w-3 h-3" />
              )}
            </button>
            <div className="flex justify-center gap-2">
              {Array.from({ length: Math.ceil(leadership.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 transform hover:scale-125 ${
                    index === currentIndex 
                      ? 'bg-primary-600 scale-125' 
                      : 'bg-gray-300 hover:bg-primary-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutLeadershipSlider; 