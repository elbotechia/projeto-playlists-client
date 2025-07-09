import React from 'react';
import { FaSearch, FaSort, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';

export const TrackFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  sortBy, 
  setSortBy,
  sortOrder,
  setSortOrder 
}) => {
  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (type) => {
    if (sortBy !== type) return <FaSort className="text-white/60" />;
    return sortOrder === 'asc' ? 
      <FaSortAlphaDown className="text-white" /> : 
      <FaSortAlphaUp className="text-white" />;
  };

  return (
    <div className="mb-8">
      <div className="glass p-6 rounded-3xl backdrop-blur-md border border-white/20">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-white/60" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por música ou artista..."
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300"
            />
          </div>

          {/* Sort Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => handleSortChange('name')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                sortBy === 'name' 
                  ? 'bg-white/20 border border-white/30 text-white' 
                  : 'bg-white/10 border border-white/20 text-white/80 hover:bg-white/15'
              }`}
            >
              {getSortIcon('name')}
              <span className="text-sm font-medium">Música</span>
            </button>

            <button
              onClick={() => handleSortChange('artist')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                sortBy === 'artist' 
                  ? 'bg-white/20 border border-white/30 text-white' 
                  : 'bg-white/10 border border-white/20 text-white/80 hover:bg-white/15'
              }`}
            >
              {getSortIcon('artist')}
              <span className="text-sm font-medium">Artista</span>
            </button>
          </div>
        </div>

        {/* Active filters indicator */}
        {(searchTerm || sortBy) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {searchTerm && (
              <span className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-sm text-white">
                Busca: "{searchTerm}"
              </span>
            )}
            {sortBy && (
              <span className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-sm text-white">
                Ordenar por: {sortBy === 'name' ? 'Música' : 'Artista'} ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
