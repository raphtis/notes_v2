import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import { FaUser } from 'react-icons/fa'
import Spinner from '../components/Spinner'

function Register() {
  const [ formData, setFormData ] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  })
  
  const { username, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      navigate('/')
    }
    dispatch(reset())
  }, [ user, isError, isSuccess, message, navigate, dispatch])


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(password !== password2){
      toast.error('Passwords do not match')
    } else {
      const userData = {
        username, email, password
      }
      dispatch(register(userData))
    }
  }

  if(isLoading){
    return <Spinner />
  }

  return <>

    <section className="form">
      <div className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <h3>Register to start setting goals</h3>
      </div>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input 
            type="text" 
            className="form-control"
            id='username'
            name='username'
            placeholder='Enter a username'
            value={username}
            onChange={onChange}
            />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            className="form-control"
            id='email'
            name='email'
            placeholder='Enter an email'
            value={email}
            onChange={onChange}
            />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            className="form-control"
            id='password'
            name='password'
            placeholder='Create a password'
            value={password}
            onChange={onChange}
            />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            className="form-control"
            id='password2'
            name='password2'
            placeholder='Confirm your password'
            value={password2}
            onChange={onChange}
            />
        </div>
        <div className="form-group">
          <Link to='/login' className='form-link'>Already registered? Login here</Link>
          <button className="btn btn-block" type='submit'>
            Submit
          </button>
        </div>
      </form>
    </section>
  </>
}

export default Register