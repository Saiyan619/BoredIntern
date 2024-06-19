import React from 'react'
import { useParams } from 'react-router-dom'

const IntershipDetails = () => {
    const { id } = useParams();
    console.log(id)
  return (
    <div>IntershipDetails</div>
  )
}

export default IntershipDetails