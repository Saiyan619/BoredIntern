import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { UserContext } from '../Utilities/Context';
import Navigation from '../Pages/Navigation';
import ApplyModal from '../Components/ApplyModal';

const IntershipDetails = () => {
    const {User, getJobDetails, jobDetails, jobsApplied, fetchAppliedJobs, } = UserContext()
    const { id } = useParams();
    console.log(id)
    
    useEffect(() => {
        getJobDetails(id)
        fetchAppliedJobs(id)
        console.log(jobsApplied)
    }, [User]);
    // useEffect(() => {
    //     // fetchAppliedJobs(id)
    //     console.log(appliedJobs)
    // }, [User])
    
    return (
        <div>
            <Navigation />
      <div className='p-4 sm:p-6'>
                <div className='flex flex-col'>
                    {jobsApplied?.map((item) => {
                        return <p>{item.fullName}</p>
                   })}
              <div className='flex items-center gap-5 flex-wrap'>
                 <h1 className='sm:text-4xl text-3xl capitalize'>{jobDetails?.role.map((item) => item)}</h1> 
                  {jobDetails?.duration}
              </div>

              <div className='flex items-center gap-10 mt-3'>
                 <span className='text-lg'>{jobDetails?.company}</span>
                 <span>{jobDetails?.location}</span>
              </div>
              
              <div className='flex items-center gap-10 mt-3'>
               <span>${jobDetails?.salary}</span>
              <div className="badge badge-primary">{jobDetails?.typeOfWork}</div>
              </div>

              <div className='mt-3'>
                  <p>Posted : {jobDetails?.DatePosted}</p>
                  <p>Hiring end at : {jobDetails?.HireStopAt}</p>
              </div>
              
              <div className='mt-3 '>
                  <span className='text-2xl capitalize'>description</span>
              <div className='text-sm mt-2 '>
              {jobDetails?.description}
                  </div>
                    </div>
                
                    <ApplyModal id = {id}/>
              
                </div>
                </div>
      </div>
  )
}

export default IntershipDetails