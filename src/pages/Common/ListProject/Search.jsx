import React from 'react'
import { useParams } from 'react-router-dom'

const Search = () => {
    const {searchKey} = useParams()
  return (
    <div>
      <p>Search</p>
    </div>
  )
}

export default Search
