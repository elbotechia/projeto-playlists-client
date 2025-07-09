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

  return (
    <button 
      className="nav-button bg-red-500/20 border-red-400/30 hover:bg-red-500/30 hover:border-red-400/50 text-red-100 hover:text-white"
      onClick={logout}
    >
      🚪 LOGOUT
    </button>
  );
}