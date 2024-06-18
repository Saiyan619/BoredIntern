import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Utilities/Context';

const EmployerOrIntern = () => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  // const [intern, setIntern] = useState('')
  // const [employer, setEmployer] = useState('')

  const employer = 'employer';
  const intern = 'intern';

  const { User, allUsers } = UserContext();
  console.log(User?.email)
    const navigate = useNavigate();
  const toEmployerProfile = async () => {
    try {
      // setEmployer('employer')
      await allUsers(FirstName, LastName, User?.email, employer);
    console.log('set to employer')
    navigate('/CreateProfileEmployer')
    } catch (error) {
      console.log(error
      )
    }
    
  }
  const ToInternProfile = async () => {
    try {
      // setIntern('intern')
      await allUsers(FirstName, LastName, User?.email, intern) ;
      console.log('set to intern')
    navigate('/CreateProfileIntern');
    } catch (error) {
      console.log(error)
    }
    
 }
  return (
    <div className='p-4'>
     
          <div className='mt-8'> 
          <span className='text-4xl flex items-center justify-center'>What brings you to BoredIntern?</span>

          <div className='sm:flex-row flex items-center flex-col justify-evenly mt-10 p-6'>
          <div className="sm:w-96 w-full card bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Employer</h2>
    <p>Posting Oppurtunities and discovering Interns</p>
    <div className="card-actions justify-end">
      <button onClick={toEmployerProfile} className="btn btn-primary">I'm Hiring</button>
    </div>
  </div>
</div>

<div className="sm:mt-0 mt-5 card w-80 bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Intern</h2>
    <p>Looking for Internship Oppurtunities</p>
    <div className="card-actions justify-end">
      <button onClick={ToInternProfile} className="btn btn-primary">Get Hired</button>
    </div>
  </div>
</div>
              </div>
              </div>
    </div>
  )
}

export default EmployerOrIntern
