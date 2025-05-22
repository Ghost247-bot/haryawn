import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/router';

interface SearchButtonProps {
  onClick?: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Mock search results - replace with actual search logic
    const mockResults = [
      'Practice Areas: Corporate Law',
      'News: Latest Legal Updates',
      'Events: Upcoming Seminars',
    ].filter(result => result.toLowerCase().includes(searchQuery.toLowerCase()));

    setSearchResults(mockResults);
  };

  const handleResultClick = (result: string) => {
    // Extract the page from the result and navigate
    const page = result.split(':')[0].toLowerCase();
    setIsExpanded(false);
    setSearchResults([]);
    setSearchQuery('');
    router.push(`/${page.replace(/\s+/g, '-')}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim()) {
      handleSearch(e as any);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-2.5 rounded-full transition-all duration-300 transform hover:scale-105 md:px-4 md:py-2 md:rounded-lg flex items-center gap-2"
          aria-label="Search"
        >
          <FaSearch className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden md:inline">Search</span>
        </button>
      ) : (
        <div className="fixed inset-0 z-50 md:absolute md:inset-auto md:right-0 md:w-[300px] lg:w-[400px]">
          <div className="absolute inset-0 bg-black bg-opacity-50 md:hidden" onClick={() => setIsExpanded(false)} />
          <div className="absolute right-0 top-0 w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-white"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search..."
                className="px-4 py-3 w-full focus:outline-none text-base"
                autoFocus
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 transition-colors"
              >
                <FaSearch className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-3 transition-colors"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </form>

            {searchResults.length > 0 && (
              <div className="max-h-[60vh] md:max-h-[400px] overflow-y-auto">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleResultClick(result)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b last:border-b-0"
                  >
                    {result}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchButton; 