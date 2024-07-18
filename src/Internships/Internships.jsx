import React from 'react'
import { useEffect, useState } from 'react';
import { UserContext } from '../Utilities/Context'
import { Link } from 'react-router-dom';
import Navigation from '../Pages/Navigation';


const Internships = () => {
  const { User, getJobs, allJobs, searchedJobs, searchJob } = UserContext();
  const [searchValue, setSearchValue] = useState()
  useEffect(() => {
    getJobs()
  }, [User])

  console.log(searchValue)
  
  return (
    <div>
      <Navigation />
      
      <span className='text-4xl pl-4 mt-3'>Internships</span>
      <div className='p-6'>
      <label className="input input-bordered flex items-center gap-2">
          <input type="text" onChange={(e)=>{setSearchValue(e.target.value)}} className="grow" placeholder="Search" />
          {/* /////////////////////////// BUTTON ICON ///////////////////// */}
          <svg
           onClick={() => { searchJob(searchValue) }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-5 w-5 cursor-pointer opacity-70">
    <path
      fillRule="evenodd"
      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      clipRule="evenodd" />
          </svg>
          {/* ///////////////////////////////////////////// */}
        </label>
        <span className='text-sm'>Note🛑:The search functionality is still in production,Make sure when you search for an Internship the title is word-for-word with what you want</span>
      </div>
      <div>{searchedJobs ? <div className='flex flex-wrap items-center justify-center gap-10 p-4'>
        {/* searchedJobs */}
        {searchedJobs?.map((item) => {
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
      </div> : 
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
         </div>}</div>
      
     
      </div>
  )
}

export default Internships