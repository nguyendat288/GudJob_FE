import React from 'react'
import SideBar from './component/SideBar'
import TopBarFreelancer from '../../Freelancer/LayOut/TopBarFreelancer'

function Setting() {
  return (
    <>
        <TopBarFreelancer/>
        <div className='setting-container'>
          <SideBar/>
        </div>
    </>
  )
}

export default Setting



