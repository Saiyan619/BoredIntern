import React from 'react'
import { useEffect } from 'react';
import { UserContext } from '../Utilities/Context'
import { Link } from 'react-router-dom';
import Navigation from '../Pages/Navigation';


const Internships = () => {
  const { User, getJobs, allJobs } = UserContext();
  useEffect(() => {
    getJobs()
  }, [User])
  
  return (
    <div>
      <Navigation />
      
      <div className='flex flex-wrap items-center justify-center gap-10 p-4'>
      {allJobs?.map((item) => {
        return <div>
           <Link to={`/Internships/InternshipDetails/${item.id}`}>
          <div className="card w-80 sm:w-96 bg-base-100 shadow-xl mt-5">
            <div className="card-body">
              <div className='flex justify-between flex-wrap'>
    <h2 className="card-title">
                {item?.role}
                </h2>
 <div className="badge badge-secondary">{item.typeOfWork}</div> 
 </div>
              <p>${item.salary}</p>
              <p>{item.duration}</p>
              
    <div className="card-actions justify-end">
      <div className="badge badge-outline">frontend</div> 
      <div className="badge badge-outline">fullstack</div>
    </div>
  </div>
  
          </div>
          </Link>
        </div>
      })}
      </div>
      </div>
  )
}

export default Internships