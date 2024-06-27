import React from 'react'
import { useState } from 'react';
import { UserContext } from '../Utilities/Context';
import {DatePicker} from "@nextui-org/react";
import {parseDate, getLocalTimeZone} from "@internationalized/date";
import {useDateFormatter} from "@react-aria/i18n";
import {Select, SelectItem} from "@nextui-org/react";
import Navigation from './Navigation';
import { skillsList } from '../Components/RoleData';

const PostJobs = () => {

    const [salary, setSalary] = useState('');
    const [jobType, setjobType] = useState('')
    const [jobDuration, setjobDuration] = useState('')
  const [jobDesc, setjobDesc] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [hireTimeLimit, sethireTimeLimit] = React.useState(parseDate("2024-04-04"));
 
  let formatter = useDateFormatter({ dateStyle: "full" });
  let NewDate = (formatter.format(hireTimeLimit.toDate(getLocalTimeZone())));

  function handleSalary(e) {
    const newValue = e.target.value;
    if (/^[0-9\b]+$/.test(newValue)) {
      setSalary(newValue)
    }
    }
  function handleJobDesc(e) {
       setjobDesc(e.target.value)
    }function handleCompany(e) {
       setCompany(e.target.value)
    }function handleLocation(e) {
       setLocation(e.target.value)
    }

    const { User, postJob, loader, setLoader } = UserContext();
   
  const [selectedSkills, setSelectedSkills] = useState('');
    const jobTypeData = [
        { key: 'On-Site',value: 'On-Site', label: 'On-Site' },
        { key: 'Remote',value: 'Remote', label: 'Remote' },
        { key: 'Hybrid',value: 'Hybrid', label: 'Hybrid' },
  ];
  const jobDurationData = [
    { key: 'fulltime', value: 'fulltime', label: 'Fulltime' },
    { key: 'parttime', value: 'parttime', label: 'Part-time' },
    { key: 'contract', value: 'contract', label: 'Contract' },
];
  const handleSelectionChange = (e) => {
    setSelectedSkills(e.target.value);
    console.log(e.target.value)
  };
  const handleJobTypeChange = (e) => {
    setjobType(e.target.value);
    console.log(e.target.value)
  };
  const handleJobDur = (e) => {
    setjobDuration(e.target.value)
  };

  const jobPost = async () => {
    try {
      setLoader('loading')
      await postJob(selectedSkills, salary, jobType, jobDuration, jobDesc, company, location, NewDate)  
      alert('JOB POSTED')
      setLoader('')
      // setSelectedSkills([])
      setSalary('')
      setjobType('')
      setjobDuration('')
      setCompany('')
      setLocation('')
      // sethireTimeLimit('')
      } catch (error) {
          console.log(error)
      }
}
   

  return (
      <div>
      <Navigation />
      <div className='p-5'>
      <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        label="Select Job Role"
        variant="bordered"
        placeholder="Select a Role"
        selectedKeys={[selectedSkills]}
        className="max-w-xs"
        onChange={handleSelectionChange}
      >
        {skillsList.map((item) => (
          <SelectItem key={item.key}>
            {item.label}
          </SelectItem>
        ))}  
      </Select>
      <p className="text-small text-default-500">Selected: {selectedSkills}</p>
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
            <Select
        label="Select Job Type"
        variant="bordered"
        placeholder="Select a Job Type"
        selectedKeys={[jobType]}
        className="max-w-xs"
        onChange={handleJobTypeChange}
      >
        {jobTypeData.map((item) => (
          <SelectItem key={item.key}>
            {item.label}
          </SelectItem>
        ))}
      </Select>
      <p className="text-small text-default-500">Selected: {jobType}</p>
          </label>
          
          <label className="form-control w-full max-w-xs">
            
  <div className="label">
    <span className="label-text">Duration</span>
            </div>
            <Select
        label="Select Job Type"
        variant="bordered"
        placeholder="Select a Job Type"
        selectedKeys={[jobDuration]}
        className="max-w-xs"
        onChange={handleJobDur}
      >
        {jobDurationData.map((item) => (
          <SelectItem key={item.key}>
            {item.label}
          </SelectItem>
        ))}
      </Select>
      <p className="text-small text-default-500">Selected: {jobDuration}</p>
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

            <div className="flex flex-row gap-2">
      <div className="w-full flex flex-col gap-y-2">
        <DatePicker className="max-w-[284px]" label="Date (controlled)" value={hireTimeLimit} onChange={sethireTimeLimit} />
        <p className="text-default-500 text-sm">
          Selected date: {hireTimeLimit ? formatter.format(hireTimeLimit.toDate(getLocalTimeZone())) : "--"}
        </p>
      </div>
    </div>
          </label>
          

        </div>
        
          <label className="form-control">
  <div className="label">
    <span className="label-text">Your description</span>
    {/* <span className="label-text-alt">Alt label</span> */}
  </div>
  <textarea onChange={handleJobDesc} className="textarea textarea-bordered h-24" placeholder="Write job description here..."></textarea>
          </label>
          
          <button onClick={jobPost} className="btn w-full rounded-full mt-5"><span className={`${loader} loading-spinner`}></span>Next</button>

      </div>
      </div>
  )
}

export default PostJobs