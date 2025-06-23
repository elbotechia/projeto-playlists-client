import React, { useContext, useEffect, useState } from 'react'
import { MdEmail } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import useSignUp from '../../hooks/useSignUp';
import styled from "styled-components";
import Swal from 'sweetalert2'
import { BASE_API } from '../../CONSTANTS/CONSTANTS';
import useForm from '../../hooks/useForm';
import axios from 'axios';
import { handle2Manager, handle2Users } from '../../router/coordinator';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../common/context/token-context';
const StyledForm = styled.div`
width: 454px;
height: 652px;
flex-shrink: 0;
border-radius: 43px;
background: #FFF;
display: flex;
flex-flow: column nowrap;
align-items: center;
justify-content: center;
justify-self: center;
align-self: flex-start;


.fieldset{
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: flex-start;
width: 353px;
height: 54.667px;
padding: 9px 16px;
align-items: center;
gap: 8px;
flex-shrink: 0;
border-radius: 6px;
border: 1px solid #DEE2E6;
background: #F1F4FF;
margin: 30px auto;
}

.labelFieldset{
display: flex;
gap: 8px;
align-items: center;
justify-content: center;
width: 100%;
}   

input{
width: 100%;
height: 36px;
background: transparent;
border: none;
text-align: left;
padding-left: 8px;
}

input:active, input:focus, input:focus-visible, input:hover , input:focus-within, input:outline{
border: none!important;
border-radius: 6px;


}

`


function UserRecovery(){
  return (
    <div>
      <h2>Recuperação de Conta</h2>
    </div>
  )
}



const switchUsersPage = (state, setState)=>{
  if(state === 2){
    return <UsersRecovery />
  }else if(state === 1){
    return <UsersSignIn viewUser={state} setViewUser={setState} />
  }else{
    return <UsersSignUp viewUser={state} setViewUser={setState}/>
  }
}

 const UsersForm = ()=>{
  const [viewUser, setViewUser] = useState(0);

  return(
    <>
    {switchUsersPage(viewUser, setViewUser)}
  </>)
 }


 const switchButtons = (state, setState, newState)=>{
  setState(newState);
 }
function UsersSignUp({ viewUser, setViewUser }) {
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
          setViewUser(1); // Muda para a página de login
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
    // dispara efeitos secundarios quando formState muda
    console.log('useEffect disparado: username mudou ', formState.username);
  }, [formState.username]);

    // dispara efeitos secundarios quando formState muda

useEffect(() => {
    console.log('useEffect disparado: email mudou ', formState.email);
  }, [formState.email]);

  useEffect(() => {
    console.log('useEffect disparado: password mudou ', formState.password);
  }, [formState.password]);


  useEffect(() => {
    console.log('useEffect disparado: passwordConfirm mudou ', formState.passwordConfirm);
  }, [formState.confirmPassword]);



  return (
    <StyledForm>
      <div>
        <div className="bannerSignUp">
          <h2 className="formTitle text-center text-purple-600 font-bold text-2xl">
            <strong className="text-gray-900">Colab.</strong>Cadastro
          </h2>
          <p className="slogan">Aproveite para criar sua conta ou faça seu Login</p>
          <div className="flex-row justify-items-center justify-self-center align-items-center gap-2">
            <button
              type="button"
              className="middle none center mt-3 mr-3 rounded-lg bg-gradient-to-tr from-purple-600 to-purple-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-purple-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              onClick={() => switchButtons(viewUser, setViewUser, 1)}
            >
              Click para LOGAR
            </button>
          </div>
        </div>
      <form className="signUpForm" onSubmit={(e)=>{handleOnSubmit(e)}}>
          <div className="fieldset">
            <label htmlFor="email" className='labelFieldset'><MdEmail /> Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="pepe@gmail.com"
              required
              value={email}
              onChange={handleOnChangeInput}
            />
          </div>
          <div className="fieldset">
            <label htmlFor="username" className='labelFieldset'><FaUserCircle /> Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="pepe123"
              required
              value={username}
              onChange={handleOnChangeInput}
            />
          </div>
          <div className="fieldset">
            <label htmlFor="password" className='labelFieldset'><FiLock /> Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              required
              value={password}
              onChange={handleOnChangeInput}
            />
          </div>
          <div className="fieldset">
            <label htmlFor="confirmPassword" className='labelFieldset'><FiLock /> Confirmar Senha</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="********"
              required
              value={confirmPassword}
              onChange={handleOnChangeInput}
            />
          </div>
          <button
            className="middle none center mr-3 rounded-lg bg-gradient-to-tr from-purple-600 to-purple-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-purple-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
            
          >
            CADASTRAR
          </button>
        </form>
      </div>
    </StyledForm>
  );
}


 function UsersSignIn({viewUser, setViewUser}) {
  const initialState = {
  email: '',
  password: ''
};

const { formState, handleOnChangeInput } = useForm(initialState);
const { email, password } = formState;
 const { token , setToken} = useContext(TokenContext);

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
    // Corrigido: acessar o token dentro de response.data.data
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
    <div>
  <StyledForm>
    <div>
      <div className="bannerSignUp">
        <h2 className="formTitle text-center text-purple-600 font-bold text-2xl">
          <strong className="text-gray-900">Colab.</strong>Login
        </h2>
        <p className="slogan">Aproveite para LOGAR ou CADASTRE-SE</p>
        <div className="flex-row justify-items-center justify-self-center align-items-center gap-2">
          <button
            type="button"
            className="middle none center mt-3 mr-3 rounded-lg bg-gradient-to-tr from-purple-600 to-purple-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-purple-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={() => switchButtons(viewUser, setViewUser, 0)}
          >
            Click para CADASTRAR
          </button>
        </div>
      </div>
      <form className="signUpForm" onSubmit={handleOnSubmit}>
        <div className="fieldset">
          <label htmlFor="email" className='labelFieldset'><MdEmail /> Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="pepe123@gmail.com"
            required
            value={email}
            onChange={handleOnChangeInput}
          />
        </div>
        <div className="fieldset">
          <label htmlFor="password" className='labelFieldset'><FiLock /> Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            required
            value={password}
            onChange={handleOnChangeInput}
          />
        </div>
        <button
          type='submit'
          className="middle none center mr-3 rounded-lg bg-gradient-to-tr from-purple-600 to-purple-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-purple-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          LOGAR
        </button>
      </form>
    </div>
  </StyledForm>
    </div>
  )
}


export default UsersForm