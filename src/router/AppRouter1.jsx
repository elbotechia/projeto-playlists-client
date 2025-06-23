import {Routes, Route} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ErrorPage from '../pages/ErrorPage';
import UsersPage from '../pages/UsersPage';
import TracksPage from '../pages/TracksPage';
import ManagerPage from '../pages/ManagerPage';


export default function AppRouter1() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />  
         <Route path="/tracks" element={<TracksPage />} />
        <Route path="/users" element={<UsersPage />} />
                <Route path="/manager" element={<ManagerPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}
