import { useContext, useState } from 'react';
import Footer from './components/footer/Footer';
import { TokenContext } from './common/context/token-context';
import AppRouter1 from './router/AppRouter1';
import AppRouter2 from './router/AppRouter2';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { handle2Error, handle2Tracks, handle2Home, handle2Users } from './router/coordinator';
import NavAsideNOAuth from './components/navbars/NavAsideNOAuth';
import NavAsideAuth from './components/navbars/NavAsideAuth';
import { TracksContext } from './common/context/tracks-context';
import { useFetch } from './hooks/useFetch';
import { BASE_API } from './common/CONSTANTS/CONSTANTS';
function App() {
  const { token, setToken } = useContext(TokenContext);
  setToken(localStorage.getItem("api_key"));
  const {data, isLoading, isError} =useFetch(BASE_API, "tracks", []);
  return (
    <BrowserRouter>
      <AppContent token={token} tracks={data}/>
    </BrowserRouter>
  );
}

function AppContent({ token, tracks }) {
  // Agora useNavigate está dentro do contexto do BrowserRouter

  console.log(tracks.data)
  return (
    <div className="container">
    <div className="main-grid-1">
      <header className="a p-4">
        <h1 id="title" className='text-center m-3 text-purple-700 font-bold text-4xl'><span className="text-gray-900">Colab</span>Tracks</h1>
     
     <div>
  {  !token || token === "null"||token.length === 1
    ? <NavAsideNOAuth />
    : <NavAsideAuth />}
</div>
      </header>
      <main className="b p-3">

<section className="bb m-5 text-center" id="content">
  
    <AppRouter1 />
</section>
      </main>
      <footer className="c text-center mt-5 p-3">
        <p>
          Made with ❤️ by{' '}
          <a href="https://github.com/botechia-erika" target="_blank" rel="noopener noreferrer">
            @Botechia-Erika
          </a>
        </p>
      </footer>
    </div>
    </div>
  );
}

export default App;