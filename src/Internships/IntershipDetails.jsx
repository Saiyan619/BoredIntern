import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { UserContext } from '../Utilities/Context';

const IntershipDetails = () => {
    const {User, getJobDetails, jobDetails} = UserContext()
    const { id } = useParams();
    console.log(id)
    useEffect(() => {
        getJobDetails(id)
        // console.log(jobDetails)
    }, [User])
    
  return (
      <div>
          {id}
          <div>
              {jobDetails.description}
          </div>
      </div>
  )
}

export default IntershipDetails