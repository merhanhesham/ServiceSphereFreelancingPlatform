import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
// import "./projectPostings.css";
import { Link } from "react-router-dom";
import BASE_URL from "../../../Variables";
import { jwtDecode } from "jwt-decode";

export default function AllProjectPosts() {
  const [posts, setPosts] = useState([]);

  //function to get all posts
async function fetchPosts(categoryId){
  try {
    const token = localStorage.getItem("user");
    const decode=jwtDecode(token);
    const email=decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    const Projectsresponse = await axios.get(
      `${BASE_URL}/api/Posting/ProjectPostings`,{
        params: {
          EmailAddress: email
        }
      }
    );
    console.log(Projectsresponse.data);
    setPosts(Projectsresponse.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

  useEffect(() => {
    try {
      fetchPosts();
    } catch (error) {
      console.log("failed to fetch");
    }
  }, []);



  return (
    <div className="mainpage" id="projectposting">
      <div className="container my-4">
        <div className="BelowBlock mt-4">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={post.id} className='d-flex justify-content-center align-items-center my-5 col-md-5 mx-5 '>
              <div className="job shadow d-flex align-items-center py-4 rounded-5 container">
                  <div className="container">
                      <div className='row'>
                          <div className="d-flex">
                              <div className="row justify-content-center w-100">
                                  <div className="col-sm-12 col-xl-2 ">
                                      <div className="imgdiv ">
                                          <img src={require('../../../Images/unknown.webp')} className="rounded img-fluid unknown" alt="Profile" />
                                      </div>
                                  </div>
                                  <div className="col-sm-12 col-xl-8">
                                      <div>
                                          <h3 className="font-weight-bold mb-3 mt-3 ">{post.title}</h3>
                                          <h4 className="font-weight-bold mb-3">Budget: {post.budget ? `$${post.budget}` : 'N/A'} </h4>
                                          <h4 className="font-weight-bold mb-3">Category: {`Category ID ${post.categoryId}`}</h4>
                                          <h4 className="font-weight-bold mb-3">Duration: {post.duration || 'N/A'}</h4>
                                          <h4 className="font-weight-bold mb-3">Deadline: {post.deadline ? new Date(post.deadline).toLocaleDateString() : 'N/A'} </h4>
                                          <p><span className="fs-5 lead">{post.description}</span></p>

                                          <div className="text-center mt-3">
                    <Link to={`/ProjectProposals/${post.id}`}>
                      <button className="btn main-btn">Get Proposals</button> 
                     </Link>
                  </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
            ))
          ) : (
            <p className="text-center">No posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
  
}
