"use client"
import {useState,useEffect} from "react"

import React from 'react'
import PromptCard from "./PromptCard";
import PromptCardm from "./PromptCardm";

const Feed = () => {
  const [allPosts,setAllPosts]=useState([]);
  const [searchText,setSearchText]=useState("");
  const [searchTimeout,setSearchTimeout]=useState(null);
  const [searchedResults,setSearchResults]=useState([]);
  const fetchPosts=async()=>{
    const response=await fetch("/api/prompt");
    const data=await response.json();
    setAllPosts(data);
  };
  useEffect(()=>{
    fetchPosts();
  },[])
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); 
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };


  const handleSearchChange=(e)=>{
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(()=>{
        const searchResult = filterPrompts(e.target.value);
        setSearchResults(searchResult);
      },1000)
    );
  };
  
  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchResults(searchResult);
  };

  return (
    <>
      <div className='feed'>
        <form className='search-form'>
        <input
            value={searchText}
            onChange={handleSearchChange}
            type='text'
            placeholder='Search....'
            required
            className='mx-[2.5%] form_textarea_small2'
          />
        </form>


        {
          searchText?(<><PromptCardm
          data={searchedResults}
          handleTagClick={handleTagClick}
        /></>):(
            <>
              <PromptCardm data={allPosts} handleTagClick={handleTagClick}/>
            </>
          )
        }
      </div>
    </>
  )
}

export default Feed