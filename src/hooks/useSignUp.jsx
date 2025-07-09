import { useState } from 'react'
import axios from 'axios'
import {BASE_API} from './../CONSTANTS/CONSTANTS.js'

export default function useSignUp({API_URL = BASE_API, path=""}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [token, setToken] = useState(null)

  const signUp = async ({ username, passwordConfirm, email }) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post(`https://projeto-playlists-node-2k25.onrender.com/api/auth/sign-up`, {
        name: username,
        password: passwordConfirm,
        email
      })
      const receivedToken = response.data.token
      setToken(receivedToken)
      localStorage.setItem('token', receivedToken)
      return receivedToken
    } catch (err) {
      setError(err.response?.data?.message || 'Error during sign up')
      return null
    } finally {
      setLoading(false)
    }
  }

  return { signUp, loading, error, token }
}