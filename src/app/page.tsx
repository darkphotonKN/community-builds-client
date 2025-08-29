'use client';

import HeaderOne from '@/components/Layout/Text/HeaderOne';
import HeaderTwo from '@/components/Layout/Text/HeaderTwo';
import HeaderThree from '@/components/Layout/Text/HeaderThree';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import { getRequest, postRequest } from '@/lib/api/requestHelpers';

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
  const [communityBuilds, setCommunityBuilds] = useState([]);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [ratingBuild, setRatingBuild] = useState<any>(null);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [ratingBuildId, setRatingBuildId] = useState<string>('');

  useEffect(() => {
    const handleGetCommunityBuilds = async () => {
      try {
        const res = await getRequest<any>(
          `/build/community?page_no=1&page_size=10`,
          null
        );
        console.log('res', res);

        if (res?.statusCode === 200 && res.result && res.result.builds) {
          console.log('res.result.builds', res.result.builds);
          setCommunityBuilds(res.result.builds);
        }
      } catch (error) {
        console.log('err', error);
      }
    };
    handleGetCommunityBuilds();
  }, []);

  const handleUpdateBuild = async () => {
    try {
      const payload = {
        buildId: ratingBuildId,
        value: selectedRating,
      };
      const res = await postRequest<any>(`/rating`, payload, true);
      if (res?.statusCode === 200) {
        console.log('res', res);
      }
    } catch (error) {
      console.log('err', error);
    }
  };
  return (
    <>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <HeaderOne>Welcome Exile!</HeaderOne>
          <div className="mt-4">
            <HeaderTwo>Create. Share. Rate.</HeaderTwo>
          </div>
          <div className="text-customTxtContent mt-6 max-w-2xl mx-auto">
            This is the best place to share your beloved Path of Exile 2
            creation. Join our community of builders and discover amazing builds
            from fellow exiles.
          </div>
        </div>

        {/* Community Builds Section */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <HeaderTwo>Community Builds</HeaderTwo>
            <Link
              href="/builds/community"
              className="text-customSecondary hover:text-customTxtContent transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {communityBuilds &&
              communityBuilds.map((build: any) => (
                <div
                  key={build.id}
                  className="bg-customContentBg rounded-lg p-6 shadow-customBlockShadow hover:shadow-customBlockShadowHover transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <HeaderThree>{build.title || ''}</HeaderThree>
                    <button
                      className="text-customSecondary hover:text-customTxtContent transition-colors"
                      onClick={() => {
                        setRatingBuild(build);
                        setSelectedRating(0);
                        setHoveredStar(null);
                        setIsRatingOpen(true);
                        setRatingBuildId(build.id);
                      }}
                    >
                      ★ {build.avgRating || 0}
                    </button>
                  </div>
                  <div className="text-customHeaderTwo mb-2">
                    by {build.author || ''}
                  </div>
                  <div className="text-customTxtContent mb-4">
                    {build.description}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {build?.tags?.map((tag: any, index: any) => (
                      <span
                        key={tag.id}
                        className="px-2 py-1 bg-customBg rounded text-sm text-customSecondary"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <div className="text-customHeaderTwo text-sm">
                    👁️ {build.views || 0} views
                  </div>
                </div>
              ))}
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
                <div className="text-customHeaderTwo mb-2">
                  by {build.author}
                </div>
                <div className="text-customTxtContent mb-4">
                  {build.description}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {build?.tags?.map((tag, index) => (
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
                <div className="text-customHeaderTwo mb-2">
                  by {build.author}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {build?.tags?.map((tag, index) => (
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

      {/* Rating Modal */}
      <Modal
        isOpen={isRatingOpen}
        onClose={() => setIsRatingOpen(false)}
        title={
          ratingBuild ? `Rating for 「${ratingBuild.title || ''}」` : '評分'
        }
        confirmText="send"
        onConfirm={() => {
          handleUpdateBuild();
          setIsRatingOpen(false);
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <div className="text-customHeaderTwo">Select your rating</div>
          <div className="flex gap-2 text-3xl">
            {[1, 2, 3, 4, 5].map((star) => {
              const active = (hoveredStar ?? selectedRating) >= star;
              return (
                <button
                  key={star}
                  aria-label={`rate-${star}`}
                  className={
                    active ? 'text-yellow-400' : 'text-customSecondary'
                  }
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(null)}
                  onClick={() => setSelectedRating(star)}
                >
                  ★
                </button>
              );
            })}
          </div>
          <div className="text-customTxtContent">
            current rating：{selectedRating} / 5
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Home;
