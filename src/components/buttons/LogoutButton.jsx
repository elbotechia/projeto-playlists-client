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

  return <button onClick={logout}>Logout</button>;
}