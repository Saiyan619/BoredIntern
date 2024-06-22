import React from 'react'
import { useState } from 'react';
import { UserContext } from '../Utilities/Context';
import Navigation from './Navigation';

const PostJobs = () => {

    const [salary, setSalary] = useState('');
    const [jobType, setjobType] = useState('')
    const [jobDuration, setjobDuration] = useState('')
  const [jobDesc, setjobDesc] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [hireTimeLimit, sethireTimeLimit] = useState('')

  function handleSalary(e) {
    const newValue = e.target.value;
    if (/^[0-9\b]+$/.test(newValue)) {
      setSalary(newValue)
    }
    }function handleJobtype(e) {
       setjobType(e.target.value)
    }function handleJobDur(e) {
       setjobDuration(e.target.value)
    }function handleJobDesc(e) {
       setjobDesc(e.target.value)
    }function handleCompany(e) {
       setCompany(e.target.value)
    }function handleLocation(e) {
       setLocation(e.target.value)
    }function handleHireLimit(e) {
       sethireTimeLimit(e.target.value)
    }

    const { User, postJob } = UserContext();
    const jobPost = async () => {
        try {
            await postJob(selectedSkills, salary, jobType, jobDuration, jobDesc, company, location, hireTimeLimit)  
        } catch (error) {
            
        }
    }
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
    
        if (checked && selectedSkills.length >= 1) {
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
  return (
      <div>
      <Navigation />
      <div className='p-5'>
      <div className=" flex items-left flex-col">
      <label className="block text-lg font-medium text-gray-700 mb-4">
        Select your role (only one)
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
        <p className="text-red-500 mt-2">You can only select a skill.</p>
      )}
          </div>

        <div className='mt-5'>
        <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Salary($)/Year</span>
                </div>
            <input onChange={handleSalary} value={salary} type="number"  placeholder="salary" className="input input-bordered w-full max-w-xs" />
          </label>
          
          <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Job type</span>
                </div>
            <input onChange={handleJobtype} type="text" placeholder="type of work e.g remote,hybrid e.tc..." className="input input-bordered w-full max-w-xs" />
          </label>
          
          <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Duration</span>
                </div>
            <input onChange={handleJobDur} type="text" placeholder="duration e.g fulltime..." className="input input-bordered w-full max-w-xs" />
          </label>
          
          <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Company</span>
                </div>
            <input onChange={handleCompany} type="text" placeholder="company or self-hiring" className="input input-bordered w-full max-w-xs" />
          </label>
          
          <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Location</span>
                </div>
            <input  onChange={handleLocation} type="text" placeholder="location" className="input input-bordered w-full max-w-xs" />
          </label>
          
          <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Deadline</span>
                </div>
            <input onChange={handleHireLimit} type="text" placeholder="deadline" className="input input-bordered w-full max-w-xs" />
          </label>
          

        </div>
        
          <label className="form-control">
  <div className="label">
    <span className="label-text">Your description</span>
    {/* <span className="label-text-alt">Alt label</span> */}
  </div>
  <textarea onChange={handleJobDesc} className="textarea textarea-bordered h-24" placeholder="Write job description here..."></textarea>
          </label>
          
          <button onClick={jobPost} className="btn w-full rounded-full mt-5">Next</button>

      </div>
      </div>
  )
}

export default PostJobs