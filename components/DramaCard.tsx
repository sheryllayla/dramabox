
import React from 'react';
import { Link } from 'react-router-dom';
import { DramaItem } from '../types';
import { PlayIcon } from '@heroicons/react/24/solid';

interface DramaCardProps {
  drama: DramaItem;
  rank?: boolean;
}

const DramaCard: React.FC<DramaCardProps> = ({ drama, rank }) => {
  if (!drama.book_id) return null;

  return (
    <Link 
      to={`/detail/${drama.book_id}`}
      className="group relative flex flex-col gap-2 rounded-xl overflow-hidden transition-all duration-300"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-zinc-900">
        <img 
          src={drama.image} 
          alt={drama.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <PlayIcon className="w-6 h-6 text-white" />
          </div>
        </div>
        {rank && drama.rank && (
          <div className="absolute top-2 left-2 w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center font-bold text-sm shadow-xl">
            #{drama.rank}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="font-medium text-sm line-clamp-2 group-hover:text-rose-500 transition-colors leading-tight">
          {drama.title}
        </h3>
        <p className="text-xs text-zinc-500 flex items-center gap-2">
          {drama.views && <span>{drama.views} {typeof drama.views === 'number' ? 'views' : ''}</span>}
          {drama.episodes && drama.episodes !== 'ep' && <span>• {drama.episodes}</span>}
        </p>
      </div>
    </Link>
  );
};

export default DramaCard;
