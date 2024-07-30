import React from 'react'
import { Link } from 'react-router-dom'

const Card = () => {
  return (
    <div>

      <div className='flex justify-center md:justify-evenly flex-wrap items-center'>
       <div className="card w-80 sm:w-96 bg-base-100 shadow-xl mt-5">
           
        <div className="card-body">
              <div className='flex justify-between flex-wrap'>
    <h2 className="card-title text-lg">Build your profile</h2>
 </div>
        <p className='text-sm'>Give Employers more information about you</p>
    <div className="card-actions justify-end">
              <button className="btn btn-sm btn-success"><Link to={'/ProfilePage'}>Complete profile</Link></button>
              
    </div>
  </div>
      </div>
      
      <div className="card w-80 sm:w-96 bg-base-100 shadow-xl mt-5">
           
        <div className="card-body">
              <div className='flex justify-between flex-wrap'>
    <h2 className="card-title text-lg">Find your next internship</h2>
 </div>
        <p className='text-sm'>Explore exclusive Internships</p>
            <div className="card-actions justify-end">
            <button className="btn btn-sm btn-success"><Link to={'/Internships'}>Discover jobs</Link></button>
    </div>
  </div>
      </div>
      
      <div className="card w-80 sm:w-96 bg-base-100 shadow-xl mt-5">
           
        <div className="card-body">
              <div className='flex justify-between flex-wrap'>
    <h2 className="card-title text-lg">Send invoice and proposals</h2>
 </div>
        <p className='text-sm'>Manage your workflow commission-free</p>
    <div className="card-actions justify-end">
    <button className="btn btn-sm btn-success">Send Ideas</button>
    </div>
  </div>
        </div>
        </div>
    </div>
  )
}

export default Card