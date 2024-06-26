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
        // console.log(jobsApplied)
    }, [User]);
  
    
    return (
        <div>
            <Navigation />
      <div className='p-4 sm:p-6'>
                <div className='flex flex-col'>
              <div className='flex items-center gap-5 flex-wrap'>
                        <h1 className='sm:text-4xl text-3xl capitalize'>{jobDetails?.role} Intern</h1> 
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
                    {/* //In this case of displaying "Job posted by "" i'll have to set a displayname input in the signIn page" */}
                {/* {jobDetails?.userId}     */}
                    <ApplyModal id = {id}/>
              
                </div>
                </div>
      </div>
  )
}

export default IntershipDetails