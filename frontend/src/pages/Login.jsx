import useField from '../hooks/useField'
import useLogin from '../hooks/useLogin'
import { useNavigate } from 'react-router-dom'

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()
  const email = useField('email')
  const password = useField('password')

  const { login, error } = useLogin('/api/users/login')

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const success = await login({
      email: email.value,
      password: password.value,
    })
    if (success) {
      console.log('Login successful')
      setIsAuthenticated(true)
      navigate('/')
    }
  }

  return (
    <div className='create'>
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Email address:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        <button type='submit'>Login</button>
      </form>
      {error && <p className='error'>{error}</p>}
    </div>
  )
}

export default Login
