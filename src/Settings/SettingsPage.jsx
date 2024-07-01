import React from 'react'
import Navigation from '../Pages/Navigation'

const SettingsPage = () => {
  return (
    <div>
      <Navigation />
      <div className='p-4'> 
      <h1 className='text-4xl'>Settings</h1>
      <div>
        <span className='text-2xl'>Edit/Update your profile</span> 
      </div>

      <div>
        <span className='text-2xl'>Change Theme</span> 
      </div>
          <span>edit your Profile</span>  
      </div>
      </div>
  )
}

export default SettingsPage