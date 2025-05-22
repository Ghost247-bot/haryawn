import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaBuilding, FaSearch, FaGlobe, FaClock, FaDirections, FaLanguage, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Image from 'next/image';

interface Office {
  id: string;
  city: string;
  country: string;
  region: string;
  address: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  timezone: string;
  languages: string[];
  image: string;
  specialties: string[];
}

const regions = ['All', 'North America', 'Europe', 'Asia Pacific', 'Middle East'];
const languages = ['All', 'English', 'Spanish', 'French', 'German'];

const offices: Office[] = [
  {
    id: 'new-york',
    city: 'New York',
    country: 'United States',
    region: 'North America',
    address: '885 Third Avenue, New York, NY 10022',
    phone: '+1 (212) 906-1200',
    email: 'newyork@haryawn.com',
    coordinates: { lat: 40.7589, lng: -73.9851 },
    timezone: 'EST',
    languages: ['English', 'Spanish'],
    specialties: ['Corporate Law', 'M&A', 'Securities'],
    image: '/images/offices/new-york.jpg'
  },
  {
    id: 'london',
    city: 'London',
    country: 'United Kingdom',
    region: 'Europe',
    address: '99 Bishopsgate, London EC2M 3XF',
    phone: '+44 20 7710 1000',
    email: 'london@haryawn.com',
    coordinates: { lat: 51.5194, lng: -0.0807 },
    timezone: 'GMT',
    languages: ['English', 'French', 'German'],
    specialties: ['Banking', 'Capital Markets', 'Project Finance'],
    image: '/images/offices/london.jpg'
  },
  {
    id: 'tokyo',
    city: 'Tokyo',
    country: 'Japan',
    region: 'Asia Pacific',
    address: 'Marunouchi Building, 2-4-1 Marunouchi, Chiyoda-ku, Tokyo 100-6325',
    phone: '+81 3 6212 3900',
    email: 'tokyo@haryawn.com',
    coordinates: { lat: 35.6812, lng: 139.7671 },
    timezone: 'JST',
    languages: ['English'],
    specialties: ['Technology', 'Intellectual Property', 'Corporate Law'],
    image: '/images/offices/tokyo.jpg'
  },
  {
    id: 'singapore',
    city: 'Singapore',
    country: 'Singapore',
    region: 'Asia Pacific',
    address: 'One Raffles Quay, North Tower, Level 25, Singapore 048583',
    phone: '+65 6535 6000',
    email: 'singapore@haryawn.com',
    coordinates: { lat: 1.2838, lng: 103.8515 },
    timezone: 'SGT',
    languages: ['English', 'French'],
    specialties: ['Banking', 'Real Estate', 'Infrastructure'],
    image: '/images/offices/singapore.jpg'
  },
  {
    id: 'dubai',
    city: 'Dubai',
    country: 'UAE',
    region: 'Middle East',
    address: 'Burj Khalifa, Downtown Dubai, Dubai, UAE',
    phone: '+971 4 437 2100',
    email: 'dubai@haryawn.com',
    coordinates: { lat: 25.1972, lng: 55.2744 },
    timezone: 'GST',
    languages: ['English', 'French'],
    specialties: ['Islamic Finance', 'Real Estate', 'Energy'],
    image: '/images/offices/dubai.jpg'
  },
  {
    id: 'sydney',
    city: 'Sydney',
    country: 'Australia',
    region: 'Asia Pacific',
    address: 'Level 39, Governor Phillip Tower, 1 Farrer Place, Sydney NSW 2000',
    phone: '+61 2 9373 7000',
    email: 'sydney@haryawn.com',
    coordinates: { lat: -33.8688, lng: 151.2093 },
    timezone: 'AEST',
    languages: ['English'],
    specialties: ['Mining', 'Infrastructure', 'Banking'],
    image: '/images/offices/sydney.jpg'
  },
  {
    id: 'hong-kong',
    city: 'Hong Kong',
    country: 'China',
    region: 'Asia Pacific',
    address: 'One International Finance Centre, 1 Harbour View Street, Central, Hong Kong',
    phone: '+852 2522 7888',
    email: 'hongkong@haryawn.com',
    coordinates: { lat: 22.2783, lng: 114.1747 },
    timezone: 'HKT',
    languages: ['English', 'German'],
    specialties: ['Capital Markets', 'Banking', 'Real Estate'],
    image: '/images/offices/hong-kong.jpg'
  },
  {
    id: 'frankfurt',
    city: 'Frankfurt',
    country: 'Germany',
    region: 'Europe',
    address: 'Taunustor 1, 60310 Frankfurt, Germany',
    phone: '+49 69 6062 6000',
    email: 'frankfurt@haryawn.com',
    coordinates: { lat: 50.1109, lng: 8.6821 },
    timezone: 'CET',
    languages: ['German', 'English', 'French'],
    specialties: ['Banking', 'Capital Markets', 'Corporate Law'],
    image: '/images/offices/frankfurt.jpg'
  }
];

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 20,
  lng: 0
};

const OfficeMap: React.FC = () => {
  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [viewMode, setViewMode] = useState<'map' | 'list' | 'slide'>('map');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleOfficeSelect = (office: Office) => {
    setSelectedOffice(office);
    if (map) {
      map.panTo(office.coordinates);
      map.setZoom(15);
    }
  };

  const filteredOffices = offices.filter(office => {
    const matchesRegion = selectedRegion === 'All' || office.region === selectedRegion;
    const matchesLanguage = selectedLanguage === 'All' || office.languages.includes(selectedLanguage);
    return matchesRegion && matchesLanguage;
  });

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % filteredOffices.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + filteredOffices.length) % filteredOffices.length);
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (viewMode === 'slide') {
        if (e.key === 'ArrowLeft') {
          prevSlide();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [viewMode, currentSlideIndex]);

  if (!isLoaded) {
    return (
      <div className="h-[500px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            Our Global Offices
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            With offices across major financial centers worldwide, we provide seamless legal services to clients globally.
          </p>
        </motion.div>

        {/* Filter Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-2 w-full max-w-md">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('map')}
                className={`flex-1 min-w-[120px] px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'map'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Map View
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('list')}
                className={`flex-1 min-w-[120px] px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                List View
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('slide')}
                className={`flex-1 min-w-[120px] px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'slide'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Slide View
              </motion.button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {regions.map((region) => (
                <motion.button
                  key={region}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedRegion === region
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {region}
                </motion.button>
              ))}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {languages.map((language) => (
                <motion.button
                  key={language}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedLanguage(language)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors flex items-center gap-2 ${
                    selectedLanguage === language
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FaLanguage className="w-4 h-4" />
                  {language}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className={`grid gap-8 ${viewMode === 'map' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Map Container */}
          {viewMode === 'map' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl overflow-hidden h-[600px] relative shadow-lg"
            >
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={2}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                  styles: [
                    {
                      featureType: 'all',
                      elementType: 'labels.text.fill',
                      stylers: [{ color: '#000000' }]
                    }
                  ]
                }}
              >
                {filteredOffices.map((office) => (
                  <Marker
                    key={office.id}
                    position={office.coordinates}
                    onClick={() => handleOfficeSelect(office)}
                    icon={{
                      url: '/images/marker.svg',
                      scaledSize: new google.maps.Size(30, 30),
                    }}
                  />
                ))}

                {selectedOffice && (
                  <InfoWindow
                    position={selectedOffice.coordinates}
                    onCloseClick={() => setSelectedOffice(null)}
                  >
                    <div className="p-4 max-w-sm">
                      <h3 className="font-semibold text-lg mb-2">
                        {selectedOffice.city}, {selectedOffice.country}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{selectedOffice.address}</p>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2 text-gray-600">
                          <FaPhone className="w-4 h-4" />
                          {selectedOffice.phone}
                        </p>
                        <p className="flex items-center gap-2 text-gray-600">
                          <FaEnvelope className="w-4 h-4" />
                          {selectedOffice.email}
                        </p>
                        <p className="flex items-center gap-2 text-gray-600">
                          <FaClock className="w-4 h-4" />
                          {selectedOffice.timezone}
                        </p>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaGlobe className="w-4 h-4" />
                          <span>{selectedOffice.languages.join(', ')}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Specialties:</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedOffice.specialties.map((specialty) => (
                            <span
                              key={specialty}
                              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedOffice.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                      >
                        <FaDirections className="w-4 h-4" />
                        Get Directions
                      </a>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </motion.div>
          )}

          {/* Slide View */}
          {viewMode === 'slide' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative h-[600px] bg-white rounded-xl overflow-hidden shadow-lg"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlideIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={filteredOffices[currentSlideIndex].image}
                      alt={`${filteredOffices[currentSlideIndex].city} Office`}
                      layout="fill"
                      objectFit="cover"
                      className="opacity-20"
                      priority
                    />
                  </div>

                  {/* Content */}
                  <div className="relative h-full p-8">
                    <div className="h-full flex flex-col">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center justify-between mb-6"
                      >
                        <h3 className="text-2xl font-bold text-gray-900">
                          {filteredOffices[currentSlideIndex].city}, {filteredOffices[currentSlideIndex].country}
                        </h3>
                        <span className="text-sm text-gray-500">{filteredOffices[currentSlideIndex].region}</span>
                      </motion.div>

                      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="space-y-6"
                        >
                          <div className="space-y-2">
                            <h4 className="text-lg font-semibold text-gray-900">Contact Information</h4>
                            <div className="space-y-3">
                              <motion.p 
                                whileHover={{ x: 5 }}
                                className="flex items-center gap-3 text-gray-600"
                              >
                                <FaMapMarkerAlt className="w-5 h-5 text-blue-600" />
                                {filteredOffices[currentSlideIndex].address}
                              </motion.p>
                              <motion.p 
                                whileHover={{ x: 5 }}
                                className="flex items-center gap-3 text-gray-600"
                              >
                                <FaPhone className="w-5 h-5 text-blue-600" />
                                {filteredOffices[currentSlideIndex].phone}
                              </motion.p>
                              <motion.p 
                                whileHover={{ x: 5 }}
                                className="flex items-center gap-3 text-gray-600"
                              >
                                <FaEnvelope className="w-5 h-5 text-blue-600" />
                                {filteredOffices[currentSlideIndex].email}
                              </motion.p>
                              <motion.p 
                                whileHover={{ x: 5 }}
                                className="flex items-center gap-3 text-gray-600"
                              >
                                <FaClock className="w-5 h-5 text-blue-600" />
                                {filteredOffices[currentSlideIndex].timezone}
                              </motion.p>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">Languages</h4>
                            <div className="flex flex-wrap gap-2">
                              {filteredOffices[currentSlideIndex].languages.map((language, index) => (
                                <motion.span
                                  key={language}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.4 + index * 0.1 }}
                                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                >
                                  {language}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </motion.div>

                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="space-y-6"
                        >
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">Specialties</h4>
                            <div className="flex flex-wrap gap-2">
                              {filteredOffices[currentSlideIndex].specialties.map((specialty, index) => (
                                <motion.span
                                  key={specialty}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.4 + index * 0.1 }}
                                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                >
                                  {specialty}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(filteredOffices[currentSlideIndex].address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                          >
                            <FaDirections className="w-5 h-5" />
                            Get Directions
                          </motion.a>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50"
                  aria-label="Previous office"
                >
                  <FaChevronLeft className="w-6 h-6 text-gray-700" />
                </motion.button>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-gray-600"
                >
                  {currentSlideIndex + 1} / {filteredOffices.length}
                </motion.span>
                <motion.button
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50"
                  aria-label="Next office"
                >
                  <FaChevronRight className="w-6 h-6 text-gray-700" />
                </motion.button>
              </div>

              {/* Progress Bar */}
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-blue-600"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentSlideIndex + 1) / filteredOffices.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />

              {/* Thumbnail Preview */}
              <div className="absolute top-4 right-4 flex gap-2">
                {filteredOffices.map((office, index) => (
                  <motion.button
                    key={office.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentSlideIndex(index)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      currentSlideIndex === index
                        ? 'border-blue-600 shadow-lg'
                        : 'border-transparent hover:border-blue-300'
                    }`}
                    aria-label={`View ${office.city} office`}
                  >
                    <Image
                      src={office.image}
                      alt={`${office.city} Office`}
                      layout="fill"
                      objectFit="cover"
                      className={`transition-opacity duration-300 ${
                        currentSlideIndex === index ? 'opacity-100' : 'opacity-50'
                      }`}
                    />
                    <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                      currentSlideIndex === index ? 'opacity-0' : 'opacity-20'
                    }`} />
                  </motion.button>
                ))}
              </div>

              {/* Keyboard Navigation Hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm text-gray-600 shadow-md"
              >
                Use arrow keys to navigate
              </motion.div>
            </motion.div>
          )}

          {/* Office List */}
          {viewMode === 'list' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredOffices.map((office) => (
                <motion.div
                  key={office.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer bg-white shadow-sm hover:shadow-md ${
                    selectedOffice?.id === office.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleOfficeSelect(office)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <FaBuilding className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold">
                          {office.city}, {office.country}
                        </h3>
                        <span className="text-sm text-gray-500">{office.region}</span>
                      </div>
                      <div className="space-y-2 text-gray-600">
                        <p className="flex items-center gap-2">
                          <FaMapMarkerAlt className="w-4 h-4" />
                          {office.address}
                        </p>
                        <p className="flex items-center gap-2">
                          <FaPhone className="w-4 h-4" />
                          {office.phone}
                        </p>
                        <p className="flex items-center gap-2">
                          <FaEnvelope className="w-4 h-4" />
                          {office.email}
                        </p>
                        <p className="flex items-center gap-2">
                          <FaClock className="w-4 h-4" />
                          {office.timezone}
                        </p>
                        <div className="flex items-center gap-2">
                          <FaGlobe className="w-4 h-4" />
                          <span>{office.languages.join(', ')}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Specialties:</h4>
                        <div className="flex flex-wrap gap-1">
                          {office.specialties.map((specialty) => (
                            <span
                              key={specialty}
                              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OfficeMap; 