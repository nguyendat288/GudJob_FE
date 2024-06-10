import React from 'react'
import { useParams } from 'react-router-dom'

const Filter = () => {
    const {categoryName} = useParams()
  return (
    <div>
      <p>Filter</p>
    </div>
  )
}

export default Filter
