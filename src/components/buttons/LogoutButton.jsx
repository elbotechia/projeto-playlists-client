// Exemplo de uso no componente
import { useContext } from 'react';
import { TokenContext } from '../../common/context/token-context';
import { handle2Home, handle2Logout } from '../../router/coordinator';
import { useNavigate } from 'react-router-dom';

export function LogoutButton() {
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  const logout = () => {
    handle2Logout(navigate);
    localStorage.setItem("api_token", null);
    setToken(null);
    handle2Home(navigate);
  };

  return <button 
                className="middle none center mt-3 mr-3 rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"

  onClick={logout}>Logout</button>;
}