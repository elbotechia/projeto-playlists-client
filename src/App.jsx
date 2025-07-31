import { useContext } from 'react';
import { TokenContext } from './common/context/token-context';
import AppRouter1 from './router/AppRouter1';
import { BrowserRouter } from 'react-router-dom';
import NavAsideNOAuth from './components/navbars/NavAsideNOAuth';
import NavAsideAuth from './components/navbars/NavAsideAuth';
import { useFetch } from './hooks/useFetch';
import { BASE_API } from './common/CONSTANTS/CONSTANTS';
import Footer from './components/footer/Footer';

function App() {
  const { token, setToken } = useContext(TokenContext);
  setToken(localStorage.getItem("api_key"));
  const {data} = useFetch(BASE_API, "tracks", []);
  
  return (







    <>
    {console.log(data)}
    <BrowserRouter>
      <AppContent token={token} tracks={data}/>
    </BrowserRouter>
    
    </>);
}

function AppContent({ token, tracks }) {
  console.log(tracks.data);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4">
        <div className="main-grid">
          {/* Header */}
          <header className="animate-fade-in">
            <div className="text-center py-8">
              <h1 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tight drop-shadow-2xl">
                <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">Colab</span>
                <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">Tracks</span>
              </h1>
              <p className="text-xl md:text-2xl text-white font-medium drop-shadow-lg max-w-2xl mx-auto">
                Explore músicas incríveis e seja um colaborador fazendo upload de novas músicas
              </p>
              <div className="mt-6 w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-center mb-8">
              <div className="nav-container">
                {!token || token === "null" || token.length === 1
                  ? <NavAsideNOAuth />
                  : <NavAsideAuth />
                }
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="animate-slide-up">
            <section className="min-h-96 flex flex-col items-center justify-center">
              <div className="w-full max-w-7xl">
                <AppRouter1 />
              </div>
            </section>
          </main>
          
          {/* Footer */}
          <Footer/>
        </div>
      </div>
    </div>
  );
}

export default App;