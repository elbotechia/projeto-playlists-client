import React, { useState } from 'react'
import { MdEmail } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import useSignUp from '../../hooks/useSignUp';
import styled from "styled-components";
import Swal from 'sweetalert2'
import { BASE_API } from '../../CONSTANTS/CONSTANTS';
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
  const { signUp, loading } = useSignUp(`http://localhost:3003/api/auth/sign-up`);
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  // Regex
  const usernameRegex = /^[A-Za-z0-9_]{3,30}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{4,12}$/;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!usernameRegex.test(form.username)) {
      Swal.fire('Erro', 'Nome de usuário inválido.', 'error');
      return false;
    }
    if (!emailRegex.test(form.email) || form.email.length < 3 || form.email.length > 200) {
      Swal.fire('Erro', 'E-mail inválido.', 'error');
      return false;
    }
    if (!passwordRegex.test(form.password)) {
      Swal.fire('Erro', 'Senha fraca.', 'error');
      return false;
    }
    if (form.password !== form.confirmPassword) {
      Swal.fire('Erro', 'As senhas não coincidem.', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    const token = await signUp({
      username: form.username,
      passwordConfirm: form.password,
      email: form.email
    });
    if (token) {
      Swal.fire('Sucesso', 'Cadastro realizado!', 'success');
      localStorage.setItem('api_token', token);
    } else {
      Swal.fire('Erro', 'Erro ao cadastrar. Tente novamente.', 'error');
    }
  };

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
        <form className="signUpForm" onSubmit={handleSubmit}>
          <div className="fieldset">
            <label htmlFor="email" className='labelFieldset'><MdEmail /> Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="pepe@gmail.com"
              required
              value={form.email}
              onChange={handleChange}
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
              value={form.username}
              onChange={handleChange}
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
              value={form.password}
              onChange={handleChange}
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
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button
            className="middle none center mr-3 rounded-lg bg-gradient-to-tr from-purple-600 to-purple-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-purple-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </div>
    </StyledForm>
  );
}


 function UsersSignIn({viewUser, setViewUser}) {
  
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
          <button className="middle none center mt-3 mr-3 rounded-lg bg-gradient-to-tr from-purple-600 to-purple-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-purple-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" onClick={() => switchButtons(viewUser, setViewUser, 0)}>Click para CADASTRAR</button>
        </div>
      </div>
      <form className="signUpForm">
         <div className="fieldset">
            <label htmlFor="username" className='labelFieldset'><FaUserCircle /> Username</label>
            <input type="text" id="username" name="username" placeholder="pepe123" required />
        </div>
        <div className="fieldset">
            <label htmlFor="password" className='labelFieldset'><FiLock /> Senha</label>
            <input type="password" id="password" name="password" placeholder="********" required />
        </div>
      <button className="middle none center mr-3 rounded-lg bg-gradient-to-tr from-purple-600 to-purple-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-purple-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">LOGAR</button>

      </form>
      </div>
    </StyledForm>
    </div>
  )
}


export default UsersForm