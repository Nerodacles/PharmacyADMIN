/* eslint-disable no-unused-vars */
import axiosInstance from '../../store/axios'
import { useEffect, useState, useCallback } from 'react'

let Login = () => {
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(null)

  const handleLogin = useCallback(() => {
    axiosInstance.post('users/login', { username: user, password }).then((response) => {
      if (response.data.error) {
        setError(response.data.error)
      } if (response.data.role !== 'admin') {
        setError('No tienes permisos para acceder a esta página')
      } else {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data))
        window.location.href = '/'
      }
    })
  }, [user, password])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      window.location.href = '/'
    }
  }
  , [])

  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>Admin</h3>
          <span className='loginDesc'>
            Administra tu farmacia
          </span>
        </div>
        <div className='loginRight'>
          <div className='loginBox'>
            <input placeholder='Usuario' className='loginInput' type='text' onChange={(e) => setUser(e.target.value)} />
            <input placeholder='Contraseña' className='loginInput' type='password' onChange={(e) => setPassword(e.target.value)} />
            <button className='loginButton' onClick={handleLogin}>Iniciar Sesión</button>
            <span className='loginForgot'>¿Olvidaste tu contraseña?</span>
          </div>
        </div>
        <div>
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default Login
