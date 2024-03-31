"use client"
import React from 'react'
import PromptCard from './PromptCard'

const PromptCardm = ({data,handleTagClick}) => {
  return (
    <>
        <span className='mt-16 span grid grid-cols-1 sm:grid-cols-2 p-4 gap-3 lg:grid-cols-3 span'>
            {data && data?.map((post)=>{
                return(
                    <>
                    <span>

                        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick}/>
                    </span>
                    </>)
            })}
        </span>
    </>
  )
}

export default PromptCardm