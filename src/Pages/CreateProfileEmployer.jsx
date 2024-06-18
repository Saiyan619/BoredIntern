import React from 'react'
import { useState } from 'react';
import { auth } from '../Utilities/firebaseConfig';
import { UserContext } from '../Utilities/Context';

const CreateProfileEmployer = () => {
  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [Company, setCompany] = useState('')
  const [Email, setEmail] = useState('')
  const [Bio, setBio] = useState('')
  const [About, setAbout] = useState('')

  function handleFirstName(e) {
    setFirstName(e.target.value)
    console.log(FirstName)
  }function handleLastName(e) {
    setLastName(e.target.value)
  }function handleCompany(e) {
    setCompany(e.target.value)
  }function handleEmail(e) {
    setEmail(e.target.value)
  }function handleBio(e) {
    setBio(e.target.value)
  }function handleAbout(e) {
    setAbout(e.target.value)
  }

  const { createEmployerDetails, allUsers, User } = UserContext()
  
  const skillsList = [
    { value: 'software-developer', label: 'Software Developer' },
    { value: 'frontend-developer', label: 'Frontend Developer' },
    { value: 'backend-developer', label: 'Backend Developer' },
    { value: 'fullstack-developer', label: 'Fullstack Developer' },
    { value: 'data-scientist', label: 'Data Scientist' },
    { value: 'ui-ux-designer', label: 'UI/UX Designer' },
  ];
const [selectedSkills, setSelectedSkills] = useState([]);
  const [warning, setWarning] = useState(false);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked && selectedSkills.length >= 3) {
      setWarning(true);
      return;
    }

    setWarning(false);
    if (checked) {
      setSelectedSkills([...selectedSkills, value]);
    } else {
      setSelectedSkills(selectedSkills.filter(skill => skill !== value));
    }
  };
  console.log(selectedSkills)

  const createEmployerProfile = async () => {
    if (FirstName && LastName && Company !== '') {
      await createEmployerDetails(FirstName, LastName, Email, Company, Bio, About, selectedSkills)
      allUsers();
    } else {
      console.log('fill in the spaces')
    }
   
  }


  

  return (
    <div>

      <div className='flex items-center justify-center flex-col mt-20'>
        <span className='text-4xl'>Fill in your Employer Profile</span>
        <div className='mt-10'>
        <label className="form-control w-full max-w-xs">
        <div className="label">
        <span className="label-text">First Name</span>
  </div>
  <input onChange={handleFirstName} type="text" placeholder="First Name" className="input input-bordered w-full max-w-xs" />
  <div className="label">
  </div>
      </label>

      <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Last Name</span>
  </div>
  <input onChange={handleLastName} type="text" placeholder="Last Name" className="input input-bordered w-full max-w-xs" />
  <div className="label">
  </div>
      </label>
      
      <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Company or Self Hiring(If Self Hiring just type 'self hiring')</span>
  </div>
  <input onChange={handleCompany} type="text" placeholder="Company or self hiring" className="input input-bordered w-full max-w-xs" />
  <input onChange={handleEmail} type="text" placeholder="email" className="input input-bordered w-full max-w-xs" />
  <input onChange={handleBio} type="text" placeholder="Bio" className="input input-bordered w-full max-w-xs" />
  <input onChange={handleAbout} type="text" placeholder="about" className="input input-bordered w-full max-w-xs" />
  <div className="label">
  </div>
          </label>
          <button onClick={createEmployerProfile} className="btn w-full rounded-full">Next</button>

        </div>
      </div>
      
      <div className="max-w-md mx-auto p-8">
      <label className="block text-lg font-medium text-gray-700 mb-4">
        Select your skills (up to 3)
        </label>
        <span>{selectedSkills.map((items) => {
          return <p>{items}</p>
        })}</span>
      <div className="space-y-2">
        {skillsList.map(skill => (
          <div key={skill.value} className="flex items-center">
            <input
              type="checkbox"
              id={skill.value}
              value={skill.value}
              checked={selectedSkills.includes(skill.value)}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor={skill.value} className="ml-2 block text-sm text-gray-700">
              {skill.label}
            </label>
          </div>
        ))}
      </div>
      {warning && (
        <p className="text-red-500 mt-2">You can select up to 3 skills.</p>
      )}
    </div>
    </div>
  )
}

export default CreateProfileEmployer
