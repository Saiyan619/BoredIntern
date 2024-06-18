import React from 'react'
import { useEffect } from 'react';
import { UserContext } from '../Utilities/Context'
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
  {/* <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> */}
  <div className="card-body">
    <h2 className="card-title">
    {item?.role.map(item => item)}
      <div className="badge badge-secondary">{item.typeOfWork}</div>
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