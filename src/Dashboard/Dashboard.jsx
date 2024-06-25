import React from 'react'
import { useEffect } from 'react'
import { UserContext } from '../Utilities/Context'
import { Link } from 'react-router-dom'
import Navigation from '../Pages/Navigation'

const Dashboard = () => {
  const { User, uploadedJobs, uploadJobs, fetchAppliedJobs, jobsApplied } = UserContext()
    

  useEffect(() => {
      uploadedJobs()
  }, [User])



  return (
      <div>
          <Navigation />

            {uploadJobs?.map((item) => {
              return <div>
                            <button className='bg-black text-white p-2 rounded' onClick={() => fetchAppliedJobs(item.id)} type="button">show applicants</button>

           <Link to={`/Internships/InternshipDetails/${item.id}`}>
          <div className="card w-80 sm:w-96 bg-base-100 shadow-xl mt-5">
            <div className="card-body">
                <div className='flex justify-between flex-wrap'>
                  {item.id}

    <h2 className="card-title">
                {item?.role.map((item, key) => {
                  return <p>{item}</p>
                })}
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
      {jobsApplied?.map((item) => {
        return <div>
          <p>{item.fullName}</p>
          <p>{item.email}</p>
        </div>
      })}
    </div>
  )
}

export default Dashboard
