'use client';

import HeaderOne from '@/components/Layout/Text/HeaderOne';
import HeaderTwo from '@/components/Layout/Text/HeaderTwo';
import HeaderThree from '@/components/Layout/Text/HeaderThree';
import Link from 'next/link';

// Mock data for featured builds
const featuredBuilds = [
  {
    id: 1,
    title: 'Frost Nova Sorcerer',
    author: 'MasterOfIce',
    class: 'Sorcerer',
    rating: 4.9,
    views: 1234,
    description:
      'A powerful frost-based build focusing on area control and burst damage.',
    tags: ['Frost', 'Area Control', 'Burst Damage'],
  },
  {
    id: 2,
    title: 'Shadow Blade Assassin',
    author: 'NightStalker',
    class: 'Assassin',
    rating: 4.8,
    views: 987,
    description: 'High mobility build with devastating critical strikes.',
    tags: ['Critical', 'Mobility', 'Stealth'],
  },
  {
    id: 3,
    title: 'Earth Shaker Warrior',
    author: 'TitanSlayer',
    class: 'Warrior',
    rating: 4.7,
    views: 876,
    description: 'Tanky build with massive area damage and crowd control.',
    tags: ['Tank', 'Area Damage', 'Control'],
  },
];

// Mock data for trending builds
const trendingBuilds = [
  {
    id: 4,
    title: 'Lightning Storm Mage',
    author: 'StormCaller',
    class: 'Mage',
    rating: 4.6,
    views: 2345,
    tags: ['Lightning', 'Chain Damage', 'AoE'],
  },
  {
    id: 5,
    title: 'Poison Master Rogue',
    author: 'Venomous',
    class: 'Rogue',
    rating: 4.5,
    views: 1987,
    tags: ['Poison', 'DoT', 'Stealth'],
  },
  {
    id: 6,
    title: 'Holy Paladin',
    author: 'DivineLight',
    class: 'Paladin',
    rating: 4.4,
    views: 1765,
    tags: ['Healing', 'Support', 'Tank'],
  },
];

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <HeaderOne>Welcome Exile!</HeaderOne>
        <div className="mt-4">
          <HeaderTwo>Create. Share. Rate.</HeaderTwo>
        </div>
        <div className="text-customTxtContent mt-6 max-w-2xl mx-auto">
          This is the best place to share your beloved Path of Exile 2 creation.
          Join our community of builders and discover amazing builds from fellow
          exiles.
        </div>
      </div>

      {/* Featured Builds Section */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <HeaderTwo>Featured Builds</HeaderTwo>
          <Link
            href="/builds"
            className="text-customSecondary hover:text-customTxtContent transition-colors"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredBuilds.map((build) => (
            <div
              key={build.id}
              className="bg-customContentBg rounded-lg p-6 shadow-customBlockShadow hover:shadow-customBlockShadowHover transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <HeaderThree>{build.title}</HeaderThree>
                <div className="text-customSecondary">★ {build.rating}</div>
              </div>
              <div className="text-customHeaderTwo mb-2">by {build.author}</div>
              <div className="text-customTxtContent mb-4">
                {build.description}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {build.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-customBg rounded text-sm text-customSecondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-customHeaderTwo text-sm">
                👁️ {build.views} views
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Builds Section */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <HeaderTwo>Trending Now</HeaderTwo>
          <Link
            href="/builds/trending"
            className="text-customSecondary hover:text-customTxtContent transition-colors"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingBuilds.map((build) => (
            <div
              key={build.id}
              className="bg-customContentBg rounded-lg p-6 shadow-customBlockShadow hover:shadow-customBlockShadowHover transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <HeaderThree>{build.title}</HeaderThree>
                <div className="text-customSecondary">★ {build.rating}</div>
              </div>
              <div className="text-customHeaderTwo mb-2">by {build.author}</div>
              <div className="flex flex-wrap gap-2 mb-4">
                {build.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-customBg rounded text-sm text-customSecondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-customHeaderTwo text-sm">
                👁️ {build.views} views
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
