
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchDramas } from '../services/api';
import { DramaItem } from '../types';
import DramaCard from '../components/DramaCard';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<DramaItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      searchDramas(query).then(res => {
        if (res.status) setResults(res.result);
        setLoading(false);
      });
    }
  }, [query]);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">
          {query ? (
            <>Search results for <span className="text-rose-600">"{query}"</span></>
          ) : (
            'Browse Dramas'
          )}
        </h1>
        {query && <p className="text-zinc-500">{results.length} titles found</p>}
      </div>

      {!query && (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center">
            <MagnifyingGlassIcon className="w-10 h-10 text-zinc-700" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold">Find your next obsession</h3>
            <p className="text-zinc-500">Search for titles, actors, or genres above.</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="aspect-[2/3] bg-zinc-900 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {results.map((drama, i) => (
            <DramaCard key={i} drama={drama} />
          ))}
        </div>
      )}

      {query && !loading && results.length === 0 && (
        <div className="py-20 text-center text-zinc-500">
          No dramas found matching your search.
        </div>
      )}
    </div>
  );
};

export default Search;
