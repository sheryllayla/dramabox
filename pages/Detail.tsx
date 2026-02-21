
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchDetail } from '../services/api';
import { DramaDetail } from '../types';
import { PlayIcon, ShareIcon, PlusIcon } from '@heroicons/react/24/solid';

const Detail: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [detail, setDetail] = useState<DramaDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookId) {
      setLoading(true);
      fetchDetail(bookId).then(res => {
        if (res.status) setDetail(res.result);
        setLoading(false);
      });
    }
  }, [bookId]);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading drama info...</div>;
  if (!detail) return <div className="py-20 text-center">Drama not found.</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-80 flex-shrink-0 group relative overflow-hidden rounded-2xl shadow-2xl">
          <img 
            src={detail.thumbnail} 
            alt={detail.title}
            className="w-full aspect-[2/3] object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Link 
              to={`/watch/${detail.book_id}/1`}
              className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <PlayIcon className="w-8 h-8 text-white" />
            </Link>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black">{detail.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
              <span className="text-rose-500 font-bold">{detail.stats.total_episodes}</span>
              <span>•</span>
              <span>Released: {new Date(detail.upload_date).toLocaleDateString()}</span>
            </div>
          </div>

          <p className="text-lg text-zinc-300 leading-relaxed max-w-3xl">
            {detail.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link 
              to={`/watch/${detail.book_id}/1`}
              className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-full font-bold transition-all"
            >
              <PlayIcon className="w-5 h-5" />
              Start Watching
            </Link>
            <button className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-full font-bold transition-all">
              <PlusIcon className="w-5 h-5" />
              Add to List
            </button>
            <button className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-full transition-all">
              <ShareIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Episode List */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Episodes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {detail.episode_list.map((ep) => (
            <Link
              key={ep.id}
              to={`/watch/${detail.book_id}/${ep.episode}`}
              className="bg-zinc-900 border border-zinc-800 hover:border-rose-600 hover:bg-rose-600/10 text-center py-4 rounded-xl transition-all group"
            >
              <span className="block text-xs text-zinc-500 group-hover:text-rose-400">Episode</span>
              <span className="text-lg font-bold">{ep.episode}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Detail;
