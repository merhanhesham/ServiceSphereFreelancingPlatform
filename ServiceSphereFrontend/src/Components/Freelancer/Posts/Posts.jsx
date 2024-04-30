import React, { useState } from 'react'
import ServicePostings from '../ServicePostings';
import ProjectPostings from '../ProjectPostings/ProjectPostings';

export default function Posts() {
    const [PostFlag, setPostFlag] = useState(true)

    function handleSerivePosts() {
      console.log("service");
      setPostFlag(true)
    }
    function handleProjectPosts() {
      console.log("Project");
      setPostFlag(false);
    }
  

  return (
   <>
    
    <div className='container p-5'>
      <div className="container mt-5">
        <div className="buttons">
          <button className='btn btn-dark mx-5' onClick={handleSerivePosts}>Service Posts</button>
          <button className='btn btn-dark' onClick={handleProjectPosts}>Project Posts</button>
        </div>
        <div className="posts my-5">
          {PostFlag ? <ServicePostings /> : <ProjectPostings />}
        </div>
      </div>

</div>
   </>
  )
}
