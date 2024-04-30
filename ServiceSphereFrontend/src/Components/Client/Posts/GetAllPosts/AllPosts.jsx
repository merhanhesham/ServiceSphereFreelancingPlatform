import React, { useState } from 'react'
import AllServicePosts from '../AllServicePosts';
import AllProjectPosts from '../AllProjectPosts';

export default function AllPosts() {
    const [PostFlag, setPostFlag] = useState(true)

    function handleSeriveAllPosts() {
      console.log("service");
      setPostFlag(true)
    }
    function handleProjectAllPosts() {
      console.log("Project");
      setPostFlag(false);
    }
  

  return (
   <>
    
    <div className='container p-5'>
      <div className="container mt-5">
        <div className="buttons">
          <button className='btn main-btn mx-5' onClick={handleSeriveAllPosts} >Service AllPosts</button>
          <button className='btn main-btn' onClick={handleProjectAllPosts}>Project AllPosts</button>
        </div>
        <div className="Allposts my-5">
          {PostFlag ? <AllServicePosts PostFlag={PostFlag}/> : <AllProjectPosts PostFlag={PostFlag} />}
        </div>
      </div>

</div>
   </>
  )
}
