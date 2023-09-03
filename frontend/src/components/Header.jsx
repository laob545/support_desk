import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user}= useSelector((state)=>state.auth)

  const onLogout = async () => {
    await dispatch(logout())
    await dispatch(reset())
    /* setTimeout(() => {
      // 👇 Redirects to about page, note the `replace: true`
      navigate('/login', { replace: true });
    }, 500); */

   await navigate('/login')
  }
  return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>Support Desk</Link>
        </div>
        <ul>
          {user ? (
            <li>
              <button className="btn" onClick={onLogout}><FaSignOutAlt/>Logout</button>
            </li>
          ) : (<>
                <li><Link to='/login'><FaSignInAlt/>Login</Link></li>
                <li><Link to='/register'><FaUser/>Register</Link></li>
              </>
              )}
        </ul>
    </header>
  )
}

export default Header