import React, { useEffect, useState } from 'react';
import { MdEmail } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import Swal from 'sweetalert2';
import { BASE_API } from '../../CONSTANTS/CONSTANTS';
import useForm from '../../hooks/useForm';
import axios from 'axios';
import { handle2Manager } from '../../router/coordinator';
import { useNavigate } from 'react-router-dom';


function UserRecovery({ setViewUser }) {
  const initialState = {
    email: ''
  };

  const { formState, handleOnChangeInput } = useForm(initialState);
  const { email } = formState;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email inválido!',
      });
      return;
    }

    // Simular envio de email de recuperação
    Swal.fire({
      icon: 'success',
      title: 'Email enviado!',
      text: 'Se o email estiver cadastrado, você receberá as instruções para recuperar sua senha.',
    });
    
    setViewUser(1); // Volta para o login
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass p-8 rounded-3xl w-full max-w-md animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 font-display">
            <span className="text-white">Recuperar</span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Conta</span>
          </h2>
          <p className="text-white/70 mb-6">Digite seu email para receber instruções de recuperação</p>
          
          <button
            type="button"
            className="nav-button bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700"
            onClick={() => setViewUser(1)}
          >
            ← Voltar ao Login
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleOnSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="flex items-center gap-2 text-white/80 font-medium">
              <MdEmail className="text-purple-400" />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seu@email.com"
              required
              value={email}
              onChange={handleOnChangeInput}
              className="input-modern w-full text-white placeholder-white/50"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            📧 ENVIAR INSTRUÇÕES
          </button>
        </form>
      </div>
    </div>
  );
}



const switchUsersPage = (state, setState) => {
  if (state === 2) {
    return <UserRecovery setViewUser={setState} />;
  } else if (state === 1) {
    return <UsersSignIn setViewUser={setState} />;
  } else {
    return <UsersSignUp setViewUser={setState} />;
  }
};

 const UsersForm = ()=>{
  const [viewUser, setViewUser] = useState(0);

  return(
    <>
    {switchUsersPage(viewUser, setViewUser)}
  </>)
 }



function UsersSignUp({ setViewUser }) {
  const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const { formState, handleOnChangeInput } = useForm(initialState);
  const { username, email, password, confirmPassword } = formState;

  const usernameRegex = /^[A-Za-z0-9_]{3,30}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{4,12}$/;

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
      name: formState.username,
      email: formState.email,
      password: formState.confirmPassword
    };

    if (formData.name && formData.email && formData.password) {
      try {
        const response = await axios.post(`${BASE_API}/auth/sign-up`, formData);
        if (response.status === 201|| response.status === 200) {
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

  useEffect(() => {
    console.log('useEffect disparado: username mudou ', formState.username);
  }, [formState.username]);

  useEffect(() => {
    console.log('useEffect disparado: email mudou ', formState.email);
  }, [formState.email]);

  useEffect(() => {
    console.log('useEffect disparado: password mudou ', formState.password);
  }, [formState.password]);

  useEffect(() => {
    console.log('useEffect disparado: passwordConfirm mudou ', formState.confirmPassword);
  }, [formState.confirmPassword]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass p-8 rounded-3xl w-full max-w-md animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 font-display">
            <span className="text-white">Colab</span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Cadastro</span>
          </h2>
          <p className="text-white/70 mb-6">Crie sua conta e junte-se à nossa comunidade musical</p>
          
          <button
            type="button"
            className="nav-button bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            onClick={() => setViewUser(1)}
          >
            🔑 Já tenho conta
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleOnSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="flex items-center gap-2 text-white/80 font-medium">
              <MdEmail className="text-purple-400" />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seu@email.com"
              required
              value={email}
              onChange={handleOnChangeInput}
              className="input-modern w-full text-white placeholder-white/50"
            />
          </div>

          {/* Username Field */}
          <div className="space-y-2">
            <label htmlFor="username" className="flex items-center gap-2 text-white/80 font-medium">
              <FaUserCircle className="text-purple-400" />
              Nome de usuário
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="usuario123"
              required
              value={username}
              onChange={handleOnChangeInput}
              className="input-modern w-full text-white placeholder-white/50"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="flex items-center gap-2 text-white/80 font-medium">
              <FiLock className="text-purple-400" />
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={handleOnChangeInput}
              className="input-modern w-full text-white placeholder-white/50"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="flex items-center gap-2 text-white/80 font-medium">
              <FiLock className="text-purple-400" />
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              required
              value={confirmPassword}
              onChange={handleOnChangeInput}
              className="input-modern w-full text-white placeholder-white/50"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            🚀 CRIAR CONTA
          </button>
        </form>
      </div>
    </div>
  );
}


 function UsersSignIn({ setViewUser }) {
  const initialState = {
    email: '',
    password: ''
  };

  const { formState, handleOnChangeInput } = useForm(initialState);
  const { email, password } = formState;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const navigate = useNavigate();
  
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email inválido!',
      });
      return;
    }

    if (!password || password.length < 4) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Senha inválida! Deve ter pelo menos 4 caracteres.',
      });
      return;
    }

    const formData = {
      email,
      password
    };
    
    try {
      const response = await axios.post(`${BASE_API}/auth/sign-in`, formData);
      if (response.status === 200 && response.data.data && response.data.data.token) {
        localStorage.setItem('api_token', response.data.data.token);
        handle2Manager(navigate);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erro ao fazer login. Verifique suas credenciais.',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass p-8 rounded-3xl w-full max-w-md animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 font-display">
            <span className="text-white">Colab</span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Login</span>
          </h2>
          <p className="text-white/70 mb-6">Entre na sua conta e explore a música</p>
          
          <button
            type="button"
            className="nav-button bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            onClick={() => setViewUser(0)}
          >
            ✨ Criar conta
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleOnSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="flex items-center gap-2 text-white/80 font-medium">
              <MdEmail className="text-purple-400" />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seu@email.com"
              required
              value={email}
              onChange={handleOnChangeInput}
              className="input-modern w-full text-white placeholder-white/50"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="flex items-center gap-2 text-white/80 font-medium">
              <FiLock className="text-purple-400" />
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={handleOnChangeInput}
              className="input-modern w-full text-white placeholder-white/50"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            🔐 ENTRAR
          </button>
        </form>

        {/* Additional Options */}
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            Esqueceu sua senha?{' '}
            <button 
              type="button"
              className="text-purple-400 hover:text-purple-300 underline transition-colors"
              onClick={() => setViewUser(2)}
            >
              Recuperar conta
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}


export default UsersForm