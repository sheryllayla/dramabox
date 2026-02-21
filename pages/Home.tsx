
import React, { useEffect, useState } from 'react';
import { fetchHome } from '../services/api';
import { HomeResult } from '../types';
import DramaCard from '../components/DramaCard';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [data, setData] = useState<HomeResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHome().then(res => {
      if (res.status) setData(res.result);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-64 md:h-96 bg-zinc-900 rounded-3xl" />
        <div className="space-y-4">
          <div className="h-6 w-48 bg-zinc-900 rounded" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-zinc-900 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const featured = data?.trending[0];

  return (
    <div className="space-y-12 pb-20 md:pb-8">
      {/* Featured Hero */}
      {featured && (
        <section className="relative group overflow-hidden rounded-3xl aspect-[16/9] md:aspect-[21/9]">
          <img 
            src={featured.image} 
            alt={featured.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 space-y-4">
            <span className="px-3 py-1 bg-rose-600 rounded-full text-xs font-bold uppercase tracking-wider">Trending #1</span>
            <h1 className="text-3xl md:text-5xl font-black max-w-2xl leading-tight">
              {featured.title}
            </h1>
            <div className="flex items-center gap-4">
              <Link 
                to={`/detail/${featured.book_id}`}
                className="bg-zinc-100 text-zinc-950 px-8 py-3 rounded-full font-bold hover:bg-rose-600 hover:text-white transition-all flex items-center gap-2"
              >
                Watch Now
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Trending Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            Trending <span className="text-rose-600">Dramas</span>
          </h2>
          <button className="text-sm text-zinc-500 hover:text-rose-500 transition-colors flex items-center gap-1">
            See all <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {data?.trending.map((drama, i) => (
            <DramaCard key={i} drama={drama} rank />
          ))}
        </div>
      </section>

      {/* Latest Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            Newly <span className="text-rose-600">Added</span>
          </h2>
          <button className="text-sm text-zinc-500 hover:text-rose-500 transition-colors flex items-center gap-1">
            See all <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {data?.latest.map((drama, i) => (
            <DramaCard key={i} drama={drama} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
