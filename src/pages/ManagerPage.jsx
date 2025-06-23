import React, { useContext } from 'react'
import { TokenContext } from '../common/context/token-context'

export default function ManagerPage() {
  const {token, setToken}= useContext(TokenContext)
  setToken(localStorage.getItem("api_token"));
  return (
    <div>
      <h1>Welcome to the Manager Page</h1>
    </div>
  )
}
