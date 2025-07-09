import { useState, useMemo } from 'react';
import { useFetch } from '../hooks/useFetch';
import { BASE_API } from '../common/CONSTANTS/CONSTANTS.js';
import { PlayPauseButton } from '../components/buttons/PlayPauseButton.jsx';
import { TrackFilters } from '../components/filters/TrackFilters.jsx';

export const CardTrack = ({ track }) => {
  const { artist, cover, name, mediaId: audio } = track;
  const { nickname } = artist;
  const fetchAudio = useFetch(BASE_API, `storage/${audio}`, []);
  
  return (
    <div className="relative group">
      {/* Card Container com fundo branco e tamanho fixo */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden h-80">
        <div className="relative z-10 h-full flex flex-col">
          {/* Image Container */}
          <div className="relative overflow-hidden rounded-2xl mb-4 bg-gray-100 flex-shrink-0">
            <img 
              src={cover} 
              alt={name} 
              className="w-full h-40 object-cover transition-all duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* Content */}
          <div className="text-center space-y-2 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-gray-800 font-semibold text-lg truncate">{name}</h3>
              <p className="text-gray-600 text-sm">por {nickname}</p>
            </div>
            
            <div className="mt-auto">
              {fetchAudio.data.data != null && fetchAudio.data.data != undefined ? (
                <div className="flex justify-center">
                  <PlayPauseButton src={`http://localhost:3003/${fetchAudio.data.data.filename}`} />
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2 text-gray-500">
                  <div className="loading-spinner w-4 h-4"></div>
                  <span className="text-sm">Carregando...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ListTracks = ({ tracks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  // Filter and sort tracks
  const filteredAndSortedTracks = useMemo(() => {
    let filtered = tracks.data;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(track => 
        track.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.artist.nickname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        let aValue, bValue;
        
        if (sortBy === 'name') {
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
        } else if (sortBy === 'artist') {
          aValue = a.artist.nickname.toLowerCase();
          bValue = b.artist.nickname.toLowerCase();
        }

        if (sortOrder === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
    }

    return filtered;
  }, [tracks.data, searchTerm, sortBy, sortOrder]);

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        {/* Header melhorado com melhor contraste */}
        <div className="glass p-8 rounded-3xl mb-8 backdrop-blur-md border border-white/20">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-2xl">
            🎵 <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              BIBLIOTECA MUSICAL
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white font-medium drop-shadow-lg">
            Descubra e ouça músicas incríveis da nossa comunidade
          </p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Filters */}
      <TrackFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {/* Results count */}
      <div className="mb-6 text-center">
        <p className="text-white/80 text-sm">
          {filteredAndSortedTracks.length} {filteredAndSortedTracks.length === 1 ? 'música encontrada' : 'músicas encontradas'}
        </p>
      </div>
      
      {/* Tracks Grid - 4 colunas em lg, 3 em md */}
      <div 
        className="tracks-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full"
      >
        {filteredAndSortedTracks.map((track, index) => (
          <div key={`${track.id || index}`} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardTrack track={track} />
          </div>
        ))}
      </div>

      {/* No results message */}
      {filteredAndSortedTracks.length === 0 && (
        <div className="text-center mt-12">
          <div className="glass p-8 rounded-3xl">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-white text-2xl font-bold mb-2">Nenhuma música encontrada</h3>
            <p className="text-white/70">Tente ajustar os filtros de busca ou ordenação</p>
          </div>
        </div>
      )}
    </div>
  );
};

export const LoadingTracks = () => (
  <div className="loading">
    <div className="glass p-12 rounded-3xl">
      <div className="loading-spinner mb-6"></div>
      <h2 className="text-white text-3xl md:text-4xl font-bold mb-4 drop-shadow-2xl">Carregando músicas...</h2>
      <p className="text-white/90 text-lg md:text-xl font-medium drop-shadow-lg">Preparando sua experiência musical</p>
    </div>
  </div>
);

export default function TracksPage() {
  const { data, isLoading, isError } = useFetch(BASE_API, "tracks", []);
  const [switcher] = useState(0);

  if (switcher === 0 && isLoading) {
    return <LoadingTracks />;
  }

  if (switcher === 0 && isError) {
    return (
      <div className="text-center">
        <div className="glass p-12 rounded-3xl">
          <div className="text-8xl mb-6">😔</div>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4 drop-shadow-2xl">Oops! Algo deu errado</h2>
          <p className="text-white/90 text-lg md:text-xl font-medium drop-shadow-lg">Não foi possível carregar as músicas. Tente novamente mais tarde.</p>
        </div>
      </div>
    );
  }

  if (
    switcher === 0 &&
    data &&
    Array.isArray(data.data) &&
    data.data.length > 0
  ) {
    return <ListTracks tracks={data} />;
  }

  return (
    <div className="text-center">
      <div className="glass p-12 rounded-3xl">
        <div className="text-8xl mb-6">🎵</div>
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-4 drop-shadow-2xl">Nenhuma música encontrada</h2>
        <p className="text-white/90 text-lg md:text-xl font-medium drop-shadow-lg">Seja o primeiro a adicionar uma música à nossa biblioteca!</p>
      </div>
    </div>
  );
}