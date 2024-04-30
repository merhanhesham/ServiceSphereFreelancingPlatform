import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BASE_URL from '../../../Variables'
import { Link, useParams } from 'react-router-dom'
import $ from 'jquery'

export default function ServiceProposals() {
    let {id}=useParams();
    const [Proposals, setProposals] = useState([])

   async function  GetAllPrposals( Id){
        const response =await axios.get(`${BASE_URL}/api/Agreements/ProposalForSerivePost`,{
            "params":{
                "ServicePostId":Id
            }
        })
        console.log(response.data);
        setProposals(response.data)
        }

        async function AcceptProposal(Id){
          try {
            const token = localStorage.getItem("user");
         //   console.log(token);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
            const response =await axios.patch(`${BASE_URL}/api/agreements/acceptproposal/${Id}`,{},{ headers: headers });
            //Create Contract
            const ContractResponse=await axios.post(`${BASE_URL}/api/agreements/makepostcontract?ProposalId=${Id}`,{},{ headers: headers })
          //  console.log(ContractResponse.data);
            $(" .SericeProposalAcceptSuccess").fadeIn(500, function () {
              setTimeout(function () {
                $(" .SericeProposalAcceptSuccess").fadeOut(500);
              }, 2000);});
          } catch (error) {
            console.log(error);
            $(" .SericeProposalAcceptfailed").fadeIn(500, function () {
              setTimeout(function () {
                $(" .SericeProposalAcceptfailed").fadeOut(500);
              }, 2000);});
          }
        }

        useEffect(() => {
            try {
                GetAllPrposals(id)
            } catch (error) {
                console.log(error);
            }
         
        }, [])
        
  return (
    <>
    <div className="container mt-5">
      <div className="SericeProposalAcceptSuccess" style={{display:"none"}}>
        
        <p className='text-success'>Proposal Accepted !!</p>
      </div>
      <div className="SericeProposalAcceptfailed" style={{display:"none"}}>
<div className="text-danger">failed to accept</div>
        </div>
      <h2 className="mb-4 text-center main-color">Project Proposals</h2> {/* Slightly increased top margin for better spacing */}
      <div className="row g-4"> {/* Added gutter spacing for more visual separation between cards */}
        {Proposals.map(proposal => (
          <div className="col-md-6 col-lg-4" key={proposal.id}>
            <div className="card h-100 shadow-lg border-0"> {/* Enhanced shadow for more depth and border removed for cleaner look */}
            <div className="text-center">
            <img src={require('../../../Images/Proposal.png')} alt="Visual representation of the proposal" className="card-img-top img-fluid p-2 w-50" /> {/* Padding adjustment and better alt text */}
            </div>
              <div className="card-body">
                <h5 className="card-title main-color text-center">{proposal.title || "Proposal"}</h5> {/* Conditional title rendering */}
                <ul className="list-unstyled">
                  <li><strong>Budget:</strong> ${proposal.proposedBudget.toLocaleString()}</li> {/* Formatting numbers for readability */}
                  <li><strong>Timeframe:</strong> {proposal.proposedTimeframe} days</li>
                  <li><strong>Plan:</strong> {proposal.workPlan}</li>
                  <li><strong>Milestones:</strong> {proposal.milestones}</li>
                  <li><strong>Availability:</strong> {proposal.availability}</li>
                  <li><strong>Inquiries:</strong> {proposal.inquiries}</li>
                  <li><strong>Cover letter:</strong> {proposal.coverLetter}</li>
                </ul>
              </div>
              <div className="card-footer bg-transparent d-flex justify-content-around">
                <button className="btn main-btn" onClick={function(){AcceptProposal(proposal.id)}}>Accept</button> {/* Button centered and more accessible */}
                <button className="btn btn-outline-secondary">Reject</button> {/* Additional button for more actions */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Link to="/AllPosts">
          <button className="btn main-btn">Back to All Posts</button> {/* Info button for a softer navigation option */}
        </Link>
      </div>
    </div>
  </>
  
  
  )
}
