import {Routes, Route} from 'react-router-dom';
import TracksPage from '../pages/TracksPage';
import HomePage from '../pages/HomePage';
import TrackPage from '../pages/TrackPage';
import ManagerPage from '../pages/ManagerPage';
import ErrorPage from '../pages/ErrorPage';
import UsersPage from '../pages/UsersPage';


export default function AppRouter2() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TracksPage />} />
        <Route path="/tracks/:id" element={<TrackPage />} />
        <Route path="/manager" element={<ManagerPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}
