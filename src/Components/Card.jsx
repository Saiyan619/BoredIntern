import React from 'react'

const Card = () => {
  return (
      <div>
          <div className='flex justify-between flex-col lg:flex-row lg:flex-wrap'>
          <div className="stats bg-blue-100 ">
  
  <div className="stat lg:w-96">
    <div className="stat-title">Build your profile</div>
    <div className="stat-value text-sm font-thin">Give Employers more information about you</div>
    <div className="stat-actions">
      <button className="btn btn-sm btn-success">Complete profile</button>
    </div>
  </div>

  
          </div>

          <div className="stats bg-blue-100 ">
  
  <div className="stat lg:w-96">
    <div className="stat-title">Find your next internship</div>
    <div className="stat-value text-sm font-thin">Explore exclusive Internships</div>
    <div className="stat-actions">
      <button className="btn btn-sm btn-success">Discover jobs</button>
    </div>
  </div>

  
          </div>

          <div className="stats bg-blue-100 ">
  
  <div className="stat lg:w-96">
    <div className="stat-title">Send invoice and proposals</div>
    <div className="stat-value text-sm font-thin">Manage your workflow commission-free</div>
    <div className="stat-actions">
      <button className="btn btn-sm btn-success">Send Ideas</button>
    </div>
  </div>

  </div>
</div>
    </div>
  )
}

export default Card