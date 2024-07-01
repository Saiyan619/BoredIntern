import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { UserContext } from '../Utilities/Context'

const Login = () => {
  const [Email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { User, logIn, loader, setLoader} = UserContext()
  console.log(User)
  const navigate = useNavigate();
  function handleEmail(e) {
    setEmail(e.target.value);
    console.log(e.target.value)
  }
  function handlePasswordl(e) {
    setPassword(e.target.value);
    console.log(e.target.value)
  }


  const logInToNext = async () => {
    try {
      setLoader('loading')
      await logIn(Email, password)
      console.log('logged in!!')
      setLoader('')
      navigate('/Home')
    } catch (error) {
      console.log(error)
      setLoader('')
      console.log('wrong entry')
    }
  }

 
  
  
  return (
    <div>

          <nav>
              <img className='w-28' src="./Bored-removebg-preview.png" alt="logo" />
          </nav>

          <div className='flex justify-around items-center flex-wrap'>
      
      <div className='p-4'>
        <span className='text-2xl sm:text-4xl'>Welcome back Mr Niyi</span>
        <div>
          <div>
          <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Email</span>
  </div>
  <input onChange={handleEmail} type="text" placeholder="abc123@gmail.com" className="input input-bordered w-full max-w-xs" />
  <div className="label">
  </div>
              </label>

              <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Password</span>
  </div>
  <input onChange={handlePasswordl} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  <div className="label">
  </div>
</label>
          </div>

            <button onClick={logInToNext} className="btn w-full rounded-full">
            <span className={`${loader} loading-spinner`}></span>Next</button>
          </div>
          <span className='text-sm mt-5'>Never used BordedIntern? <Link className='text-blue-600 underline' to={'/'}>Sign up Here</Link>.</span>

              </div>

        <div className='sm:w-1/3'>
          <img className='' src="./pegTop.png" alt="object" />
        </div>
              </div>
          
    </div>
  )
}

export default Login
