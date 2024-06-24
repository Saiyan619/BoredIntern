import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Utilities/Context'
import { useEffect } from 'react'
import Navigation from './Navigation'
import Card from '../Components/Card'


const Home = () => {
    const { User, userDetails, fetchUserData, fetchUserDataIntern, fetchUserDataEmployer, userDetailsIntern,  userDetailsEmployer, appliedJobs, fetchAppliedJobs } = UserContext()
  const navigate = useNavigate()
  
  console.log(User?.email);

  
  // const currentTimestamp = Math.floor(new Date().getTime() / 1000);
  // const formattedTimestamp = new Date(currentTimestamp * 1000).toLocaleString();
  useEffect(() => {
    fetchUserData();
    if (userDetails?.itOrEm === 'intern') {
      fetchUserDataIntern()
    } else if (userDetails?.itOrEm === 'employer') {
      fetchUserDataEmployer()
    }  
    
    // console.log(userDetails);
  }, [User]);


  return (
    <div>
      <Navigation />
      <div className='p-4'>
      <span className='font-semibold'>Home</span>
      <p className='text-2xl font-bold'> Welcome, {userDetailsIntern?.FirstName || userDetailsEmployer?.FirstName} 😁</p>
         
      <Card />
      </div>
     
      
    </div>
  )
}

export default Home
