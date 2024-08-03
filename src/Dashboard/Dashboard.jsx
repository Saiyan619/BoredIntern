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

      <div className='mt-2'></div>
      <span className='text-3xl ml-5'>Your Posted Jobs</span>
            {uploadJobs?.map((item) => {
              return <div>

                {/* <button className='bg-black text-white p-2 rounded' onClick={() => fetchAppliedJobs(item.id)} type="button">show applicants</button> */}
          <div className="card w-80 sm:w-96 bg-base-100 shadow-xl mt-5">
                  <div className="card-body">
                  <Link to={`/Internships/InternshipDetails/${item.id}`}>
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
                    </Link>
                                          {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}><span onClick={() => fetchAppliedJobs(item.id)} >View Applicants</span></button>
     
                    <div>
         
    </div>
  </div>
                          
          </div>
                
                
        </div>
            })}
      <dialog id="my_modal_2" className="modal">
  <div className="modal-box">
          <h3 className="font-bold text-lg">Applicants</h3>
    {jobsApplied?.map((item) => {
      return <div>
        <div className='text-md'>
          <div >
        <p>{item.fullName}</p>
          <p>{item.email}</p>
          <a href={item.resume} target="_blank" rel="noopener noreferrer" className='text-blue-500'>
                Download CV
          </a>
          </div>
          </div>
          

        </div>

    })}
          
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
      </dialog>
    </div>
  )
}

export default Dashboard
