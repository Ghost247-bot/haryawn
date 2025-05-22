import React from 'react';
import Head from 'next/head';
import NewsHero from '@/components/news/NewsHero';
import NewsList from '@/components/news/NewsList';
import NewsCategories from '@/components/news/NewsCategories';

const NewsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>News & Insights | Haryawn Law</title>
        <meta name="description" content="Stay informed with our latest legal news, insights, and updates." />
      </Head>

      {/* Hero Section */}
      <NewsHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <NewsCategories />

        {/* News List */}
        <NewsList />
      </div>
    </>
  );
};

export default NewsPage; 