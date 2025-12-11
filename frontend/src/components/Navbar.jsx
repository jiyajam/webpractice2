import { Link } from 'react-router-dom'

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const handleClick = (e) => {
    setIsAuthenticated(false)
    localStorage.removeItem('user')
  }

  return (
    <nav className='navbar'>
      <Link to='/'>
        <h1>React Products</h1>
      </Link>
      <div className='links'>
        {isAuthenticated && (
          <div>
            <Link to='/products/add-product'>Add Product</Link>
            <span>{JSON.parse(localStorage.getItem('user')).email}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
        )}
        {!isAuthenticated && (
          <div>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
