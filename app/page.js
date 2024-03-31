import React from 'react'
import Feed from './components/Feed'
const page = () => {
  return (
    <>
      <div className='main-body'>
        <div className='text-center text-[2.5rem]'>
          <h1 className='main-u-heading'>
            Create, Discover and Share 
          </h1>
          <h1 className='main-heading '>
             AI PROMPTS
          </h1>
        </div>
        <Feed/>
      </div>
    </>
  )
}

export default page