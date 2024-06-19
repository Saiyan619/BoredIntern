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
      
      {allJobs?.map((item) => {
        return <div>
          <div className="card w-96 bg-base-100 shadow-xl mt-5">
  <div className="card-body">
    <h2 className="card-title">
                {item?.role.map((item, key) => {
                  return <p>{item}</p>
                })}
 <Link to={`/Internships/InternshipDetails/${item.id}`}> <div className="badge badge-secondary">{item.typeOfWork}</div></Link>    
              </h2>
              <p>${item.salary}</p>
              <p>{item.duration}</p>
              
    <div className="card-actions justify-end">
      <div className="badge badge-outline">frontend</div> 
      <div className="badge badge-outline">fullstack</div>
    </div>
  </div>
</div>
        </div>
      })}
    </div>
  )
}

export default Internships