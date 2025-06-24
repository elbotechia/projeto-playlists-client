import React, { useContext } from 'react'
import { TokenContext } from '../common/context/token-context'
import ManagerForm from '../components/forms/ManagerForm';

export default function ManagerPage() {
  const {token, setToken}= useContext(TokenContext)
  setToken(localStorage.getItem("api_token"));
  return (
    <div>
      <header className="header__section">
        <h2 className="section__title">
          TRACK.<strong>MANAGER</strong>
        </h2>
      </header>
      <div className="manager__content">
      <ManagerForm/>
      </div>
    </div>
  )
}


