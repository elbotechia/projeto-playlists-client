import React, { useContext, useState } from 'react';
import { MdEmail } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import Swal from 'sweetalert2';
import { BASE_API } from '../../CONSTANTS/CONSTANTS';
import useForm from '../../hooks/useForm';
import axios from 'axios';
import { handle2Manager } from '../../router/coordinator';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../common/context/token-context';

function UserRecovery() {
  return (
    <div className="glass p-8 rounded-3xl animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-white mb-2">🔐 Recuperação de Conta</h2>
        <p className="text-white/70">Em breve esta funcionalidade estará disponível</p>
      </div>
    </div>
  );
}

const switchUsersPage = (state, setState) => {
  if (state === 2) {
    return <UserRecovery />;
  } else if (state === 1) {
    return <UsersSignIn viewUser={state} setViewUser={setState} />;
  } else {
    return <UsersSignUp viewUser={state} setViewUser={setState} />;
  }
};

const UsersForm = () => {
  const [viewUser, setViewUser] = useState(0);
  
  return (
    <div className="animate-fade-in">
      {switchUsersPage(viewUser, setViewUser)}
    </div>
  );
};

function UsersSignUp({ viewUser, setViewUser }) {
  const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const { formState, handleOnChangeInput } = useForm(initialState);
  const { username, email, password, confirmPassword } = formState;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const usernameRegex = /^[A-Za-z0-9_]{3,30}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{4,12}$/;

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'As senhas não coincidem!',
      });
      return;
    }

    if (!usernameRegex.test(username)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Username inválido! Deve ter entre 3 e 30 caracteres, apenas letras, números e underscores.',
      });
      return;
    }

    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email inválido!',
      });
      return;
    }

    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Senha inválida! Deve ter entre 4 e 12 caracteres, pelo menos uma letra maiúscula, um número e um caractere especial.',
      });
      return;
    }

    const formData = {
      name: username,
      email: email,
      password: confirmPassword
    };

    if (formData.name && formData.email && formData.password) {
      try {
        const response = await axios.post(`${BASE_API}/auth/sign-up`, formData);
        if (response.status === 201 || response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Cadastro realizado com sucesso!',
            text: 'Você já pode fazer login.',
          });
          setViewUser(1);
        }
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erro ao cadastrar usuário. Tente novamente mais tarde.',
        });
      }
    }
  };

  return (
    <div className="glass p-8 rounded-3xl animate-slide-up">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-white mb-2">🚀 Criar Conta</h2>
        <p className="text-white/70">Junte-se à nossa comunidade musical</p>
      </div>
      
      <form onSubmit={handleOnSubmit} className="space-y-6">
        <div className="relative">
          <div className="input-modern flex items-center">
            <FaUserCircle className="text-white/70 mr-3" />
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleOnChangeInput}
              placeholder="Nome de usuário"
              className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="relative">
          <div className="input-modern flex items-center">
            <MdEmail className="text-white/70 mr-3" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleOnChangeInput}
              placeholder="Email"
              className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="relative">
          <div className="input-modern flex items-center">
            <FiLock className="text-white/70 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChangeInput}
              placeholder="Senha"
              className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-white/70 hover:text-white transition-colors"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="input-modern flex items-center">
            <FiLock className="text-white/70 mr-3" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChangeInput}
              placeholder="Confirmar senha"
              className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-white/70 hover:text-white transition-colors"
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full btn-primary text-center py-4 text-lg font-semibold"
        >
          Criar Conta
        </button>
      </form>

      <div className="mt-6 text-center space-y-2">
        <button
          type="button"
          onClick={() => setViewUser(1)}
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          Já tem uma conta? Faça login
        </button>
        <br />
        <button
          type="button"
          onClick={() => setViewUser(2)}
          className="text-pink-400 hover:text-pink-300 transition-colors text-sm"
        >
          Esqueceu a senha?
        </button>
      </div>
    </div>
  );
}

function UsersSignIn({ viewUser, setViewUser }) {
  const initialState = {
    email: '',
    password: ''
  };

  const { formState, handleOnChangeInput } = useForm(initialState);
  const { email, password } = formState;
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
      email: email,
      password: password
    };

    if (formData.email && formData.password) {
      try {
        const response = await axios.post(`${BASE_API}/auth/sign-in`, formData);
        if (response.status === 200) {
          const { token } = response.data;
          localStorage.setItem("api_key", token);
          setToken(token);
          
          Swal.fire({
            icon: 'success',
            title: 'Login realizado com sucesso!',
            showConfirmButton: false,
            timer: 1500
          });
          
          setTimeout(() => {
            handle2Manager(navigate);
          }, 1500);
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Credenciais inválidas. Tente novamente.',
        });
      }
    }
  };

  return (
    <div className="glass p-8 rounded-3xl animate-slide-up">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-white mb-2">🎵 Fazer Login</h2>
        <p className="text-white/70">Acesse sua conta e explore</p>
      </div>
      
      <form onSubmit={handleOnSubmit} className="space-y-6">
        <div className="relative">
          <div className="input-modern flex items-center">
            <MdEmail className="text-white/70 mr-3" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleOnChangeInput}
              placeholder="Email"
              className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="relative">
          <div className="input-modern flex items-center">
            <FiLock className="text-white/70 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChangeInput}
              placeholder="Senha"
              className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-white/70 hover:text-white transition-colors"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full btn-primary text-center py-4 text-lg font-semibold"
        >
          Entrar
        </button>
      </form>

      <div className="mt-6 text-center space-y-2">
        <button
          type="button"
          onClick={() => setViewUser(0)}
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          Não tem uma conta? Cadastre-se
        </button>
        <br />
        <button
          type="button"
          onClick={() => setViewUser(2)}
          className="text-pink-400 hover:text-pink-300 transition-colors text-sm"
        >
          Esqueceu a senha?
        </button>
      </div>
    </div>
  );
}

export default UsersForm;
