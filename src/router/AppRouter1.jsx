import {Routes, Route} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ErrorPage from '../pages/ErrorPage';
import UsersPage from '../pages/UsersPage';
import TracksPage from '../pages/TracksPage';


export default function AppRouter1() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />  
         <Route path="/tracks" element={<TracksPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}
