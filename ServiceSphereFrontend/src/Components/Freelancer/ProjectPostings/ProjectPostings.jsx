import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import "./projectPostings.css";
import { Link } from "react-router-dom";

export default function ProjectPostings({PostFlag}) {
  const [posts, setPosts] = useState([]);

  //function to get all posts
async function fetchPosts(categoryId){
  try {
    const Projectsresponse = await axios.get(
      `https://localhost:7157/api/Posting/ProjectPostings`,{
        params: {
          CategoryId: categoryId
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

  //function to handle category:
  function HandleCategory(Id) {
    // Define a mapping of category IDs to category names
    const categoryMap = {
      1: "Construction & Renovation",
      2: "Event Planning",
      3: "Education",
      // Add more categories as needed
    };

    // Return the category name based on the category ID
    return categoryMap[Id] || "Unknown Category";
  }

  return (
    <div className="mainpage" id="projectposting">
    <div className="container my-4">
      <div className="AboveBlock">
      <div className="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filter by category
            </button>
            <ul className="dropdown-menu cursor-pointer" style={{ cursor: 'pointer' }}>
              <li  onClick={function(e){fetchPosts(null)}} >
                All
              </li>
              <li  onClick={function(e){fetchPosts(1)}} >
              Construction & Renovation
              </li>
              <li  onClick={function(e){fetchPosts(2)}} >
              Event Planning
              </li>
              <li onClick={function(e){fetchPosts(3)}} >
              Education
              </li>
            </ul>
          </div>
      </div>
      <div className="BelowBlock mt-4">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  {/* {post.image && (
                    <img src={post.image || 'default-image.jpg'} className="card-img-top mb-3" alt="Project Visual" onError={(e) => { e.target.onerror = null; e.target.src = 'default-image.jpg'; }} />
                  )} */}
                  <h5 className="card-title">{post.title}</h5>
                  <div className="border-top pt-2">
                    <h6 className="text-muted">Description</h6>
                    <p>{post.description}</p>
                  </div>
                  <div className="border-top pt-2">
                    <h6 className="text-muted">Budget</h6>
                    <p>{post.budget ? `$${post.budget.toFixed(2)}` : "Not specified"}</p>
                  </div>
                  <div className="border-top pt-2">
                    <h6 className="text-muted">Duration</h6>
                    <p>{post.duration || "Not specified"}</p>
                  </div>
                  <div className="border-top pt-2">
                    <h6 className="text-muted">Deadline</h6>
                    <p>{post.deadline || "Not specified"}</p>
                  </div>
                  <div className="border-top pt-2">
                    <h6 className="text-muted">Category</h6>
                    <p>{HandleCategory(post.categoryId)}</p>
                  </div>
                  <div className="text-center mt-3">
                   <Link to={`/Proposal/${PostFlag}/${post.id}`}><button className="btn main-btn">Apply</button></Link>
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
