import React from 'react';
import Link from 'next/link';

const offices = [
  'New York',
  'London',
  'Singapore',
  'Hong Kong',
  'Tokyo',
  'Dubai',
  'Paris',
  'Frankfurt',
  'Milan',
  'Los Angeles',
  'San Francisco',
  'Chicago',
  'Washington, D.C.',
  'Boston',
  'Houston',
];

const socialLinks = [
  { name: 'LinkedIn', href: '#', icon: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  )},
  { name: 'Twitter', href: '#', icon: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )},
  { name: 'Facebook', href: '#', icon: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
    </svg>
  )},
  { name: 'YouTube', href: '#', icon: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )},
];

const footerLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Newsroom', href: '/news' },
  { name: 'Careers', href: '/careers' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Use', href: '/terms' },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          {/* Logo and Description */}
          <div className="flex items-center mb-6 lg:mb-0">
            <Link href="/" className="text-xl font-bold">
              Haryawn
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 mb-6 lg:mb-0">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-white text-sm whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-white"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Office Locations */}
        <div className="py-4 border-t border-gray-800">
          <div className="flex flex-wrap gap-x-6 gap-y-2 items-center justify-center text-sm">
            {offices.map((office) => (
              <Link
                key={office}
                href="#"
                className="text-gray-400 hover:text-white whitespace-nowrap"
              >
                {office}
              </Link>
            ))}
          </div>
        </div>

        {/* Legal Notice */}
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <p className="text-gray-400 text-sm max-w-3xl">
              Notice: We appreciate your interest in Haryawn. If your inquiry relates to a legal matter and you are not already a current client of the firm, please do not transmit any confidential information to us.
            </p>
            <div className="text-gray-400 text-sm whitespace-nowrap">
              © {new Date().getFullYear()} Haryawn. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 