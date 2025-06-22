import { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { BASE_API } from '../common/CONSTANTS/CONSTANTS.js'
import { PlayPauseButton } from '../components/buttons/PlayPauseButton.jsx'

export const CardTrack = ({ track }) => {
  const { artist, cover, name, mediaId: audio } = track
  const { nickname } = artist
  const fetchAudio = useFetch(BASE_API, `storage/${audio}`, [])
console.log(fetchAudio)
  // Só renderiza o botão se a URL do áudio estiver disponível
  return (
    <div className="card">
      <img src={cover} alt={name} />
      <h2>{name}</h2>
      <p>Artist: {nickname}</p>
 {fetchAudio.data.data != null && fetchAudio.data.data != undefined? (
        <PlayPauseButton src={`http://localhost:3003/${fetchAudio.data.data.filename}`} />
      ) : (
        <span>Carregando áudio...</span>
      )}
    </div>
  )
}

export const ListTracks = ({ tracks }) => (
  <div className="tracksList">
    {tracks.data.map((track, index) => (
      <CardTrack key={index} track={track} />
    ))}
  </div>
)

export const LoadingTracks = () => (
  <div className="loading">
    <h2>Loading tracks...</h2>
  </div>
)

export default function TracksPage() {
  const { data, isLoading, isError } = useFetch(BASE_API, "tracks", [])
  const [switcher] = useState(0)

  if (switcher === 0 && isLoading) {
    return <LoadingTracks />
  }

  if (switcher === 0 && isError) {
    return <h2>Error loading tracks</h2>
  }

  if (
    switcher === 0 &&
    data &&
    Array.isArray(data.data) &&
    data.data.length > 0
  ) {
    return <ListTracks tracks={data} />
  }

  return <h2>No tracks found.</h2>
}