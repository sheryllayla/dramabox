
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchStream, fetchDetail } from '../services/api';
import { DramaDetail, Episode } from '../types';
import { ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const Watch: React.FC = () => {
  const { bookId, episode } = useParams<{ bookId: string; episode: string }>();
  const navigate = useNavigate();
  const currentEp = parseInt(episode || '1');
  
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [detail, setDetail] = useState<DramaDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (bookId && episode) {
      setLoading(true);
      setError(null);
      
      // Parallel fetch for detail and stream
      Promise.all([
        fetchDetail(bookId),
        fetchStream(bookId, currentEp)
      ]).then(([detailRes, streamRes]) => {
        if (detailRes.status) setDetail(detailRes.result);
        if (streamRes.status) {
          setVideoUrl(streamRes.result.video_url);
        } else {
          setError('Could not load video. It might be unavailable.');
        }
        setLoading(false);
      }).catch(err => {
        setError('An unexpected error occurred.');
        setLoading(false);
      });
    }
  }, [bookId, currentEp]);

  const goToEpisode = (num: number) => {
    navigate(`/watch/${bookId}/${num}`);
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-zinc-500 font-medium">Preparing your drama...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-24">
      <Link 
        to={`/detail/${bookId}`}
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-rose-500 transition-colors mb-2"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to info
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Player Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-[9/16] md:aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-zinc-800">
            {videoUrl ? (
              <video 
                key={videoUrl}
                src={videoUrl} 
                controls 
                autoPlay
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-600 p-8 text-center">
                {error || 'Video source not found.'}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{detail?.title}</h1>
            <p className="text-rose-500 font-medium">Episode {currentEp}</p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between p-1 bg-zinc-900 rounded-2xl">
            <button 
              disabled={currentEp <= 1}
              onClick={() => goToEpisode(currentEp - 1)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeftIcon className="w-5 h-5" />
              Previous
            </button>
            <button 
              disabled={currentEp >= (detail?.episode_list.length || 0)}
              onClick={() => goToEpisode(currentEp + 1)}
              className="flex items-center gap-2 bg-rose-600 px-8 py-3 rounded-xl hover:bg-rose-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold"
            >
              Next Episode
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sidebar Episode List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Episodes</h2>
            <span className="text-xs text-zinc-500">{detail?.episode_list.length} Total</span>
          </div>
          <div className="grid grid-cols-4 lg:grid-cols-3 gap-2 h-fit max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {detail?.episode_list.map((ep) => (
              <button
                key={ep.id}
                onClick={() => goToEpisode(ep.episode)}
                className={`py-3 rounded-xl border text-center transition-all ${
                  currentEp === ep.episode
                    ? 'bg-rose-600 border-rose-600 text-white font-bold'
                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-600 text-zinc-400'
                }`}
              >
                {ep.episode}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
