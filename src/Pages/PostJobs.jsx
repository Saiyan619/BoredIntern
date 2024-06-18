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
       setSalary(e.target.value)
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

            <input onChange={handleSalary}  type="text" placeholder="salary" className="input input-bordered w-full max-w-xs" />
            <input onChange={handleJobtype} type="text" placeholder="type of work" className="input input-bordered w-full max-w-xs" />
            <input onChange={handleJobDur} type="text" placeholder="duration" className="input input-bordered w-full max-w-xs" />
            <input onChange={handleCompany} type="text" placeholder="company" className="input input-bordered w-full max-w-xs" />
            <input onChange={handleLocation} type="text" placeholder="location" className="input input-bordered w-full max-w-xs" />
            <input onChange={handleHireLimit} type="text" placeholder="deadline" className="input input-bordered w-full max-w-xs" />
           
          <label className="form-control">
  <div className="label">
    <span className="label-text">Your description</span>
    <span className="label-text-alt">Alt label</span>
  </div>
  <textarea onChange={handleJobDesc} className="textarea textarea-bordered h-24" placeholder="desc"></textarea>
          </label>
          
          <button onClick={jobPost} className="btn w-full rounded-full mt-5">Next</button>

    </div>
  )
}

export default PostJobs