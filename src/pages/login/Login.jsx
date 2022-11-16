
import "./login.scss"
import axiosInstance from '../../store/axios'
import { useEffect, useState, useCallback } from 'react'

let Login = () => {
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(null)

  const handleLogin = useCallback(() => {
    axiosInstance.post('users/login', { username: user, password }).then((response) => {
      if (response.data.error) { setError(response.data.error) } 
      if (response.data.role !== 'admin') { setError('No tienes permisos para acceder a esta página') } 
      else {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data))
        window.location.href = '/'
      }
    })
  }, [user, password])

  useEffect(() => { if (localStorage.getItem('token')) { window.location.href = '/' } }, [])

  return (
    <div className="login-body">
      <div className="screen-1">
        <img className="logo" src="logo.png" alt="Logo" height={300} width={300} />
        <div className="email">
          <label htmlFor="email">Correo</label>
          <div className="sec-2">
            <ion-icon name="mail-outline"></ion-icon>
            <input type="email" name="email" placeholder="Username@gmail.com" onChange={(e) => setUser(e.target.value)}/>
          </div>
        </div>
        <div className="password">
          <label htmlFor="password">Contraseña</label>
          <div className="sec-2">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input className="pas" type="password" name="password" placeholder="············" onChange={(e) => setPassword(e.target.value)}/>
            <ion-icon className="show-hide" name="eye-outline"></ion-icon>
          </div>
        </div>
        <button className="login" onClick={handleLogin}>Login</button>
        <div>
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </div>
  )
}

export default Login
