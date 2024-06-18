import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../Utilities/Context';



const SignUp = () => {
  const [Email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // const currentTimestamp = Math.floor(new Date().getTime() / 1000);
  // const formattedTimestamp = new Date(currentTimestamp * 1000).toLocaleString();

  const { User, signUp, allUsers } = UserContext()
  console.log(User);

  const navigate = useNavigate();

  function handleEmail(e) {
    setEmail(e.target.value);
    console.log(e.target.value)
  }
  function handlePassword(e) {
    setPassword(e.target.value);
    console.log(e.target.value)
  }
  
  // const addToAllUsers = async () => {
  //   if (FirstName && LastName && Email && password !== '') {
  //     await allUsers(FirstName, LastName, Email, password)
  //   } else {
  //     console.log('fill in the spaces')
  //   }
   
  // }

  const signUpToNext = async () => {
    try {
     const result = await signUp(Email, password)
      console.log(result.user)
      if (result.user) {
        // await allUsers(FirstName, LastName, Email, password, result.user.uid)
        navigate('/EmployerorIntern') && console.log('signed!!!!')
        
      } else {
        console.log('wrong entry')
      }
    } catch (error) {
      console.log(error)
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
        <span className='text-2xl sm:text-4xl'>First, Enter your work Email</span>
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
  <input onChange={handlePassword} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  <div className="label">
  </div>
</label>
          </div>

            <button onClick={signUpToNext} className="btn w-full rounded-full">Next</button>
          </div>
          <span className='text-sm mt-5'>Already using BordedIntern? <Link className='text-blue-600 underline' to={'/Login'}>Login Here</Link>.</span>

              </div>

        <div className='sm:w-1/3'>
          <img className='' src="./pegTop.png" alt="object" />
        </div>
              </div>
          
    </div>
  )
}

export default SignUp
