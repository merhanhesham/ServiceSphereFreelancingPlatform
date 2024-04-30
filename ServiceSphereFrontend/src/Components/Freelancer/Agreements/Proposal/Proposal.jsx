import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import BASE_URL from "../../../../Variables";
import Posts from "../../Posts/Posts";

export default function Proposal() {
    const { flag, id } = useParams();
  let proposal = {
    ProposedTimeframe: "",
    ProposedBudget: 0,
    ProjectPostingId: null,
    ServicePostingId: null,
    CoverLetter: "",
    WorkPlan: "", //must
    Milestones: "",
    Availability: "",
    Inquiries: "",
    IsAccepted: false,
  };

  async function SubmitProposalForServicePost(proposal) {
    const token = localStorage.getItem('user');
            const headers = {
                Authorization: `Bearer ${token}`
            };
    const res = await axios.post(
      `${BASE_URL}/api/Agreements/SubmitProposalForServicePosting`,
      proposal,
      { headers: headers }
    );

    console.log(res);
  }

  async function SubmitProposalForProjectPost(proposal) {
    const token = localStorage.getItem('user');
            const headers = {
                Authorization: `Bearer ${token}`
            };
    const res = await axios.post(
      `${BASE_URL}/api/Agreements/SubmitProposalForProjectPosting`,
      proposal,
      { headers: headers }
    );

    console.log(res);
  }

  const navigate = useNavigate();

  let formik = useFormik({
    initialValues: proposal,
    
    onSubmit: async function (values) {
      console.log(flag);
        if(flag==="true"){
          console.log("se");
            values.ServicePostingId=id
        }else{
            values.ProjectPostingId=id
        }
      console.log(values);
      try {
        $(".btn").attr("disabled", "true");
        // await Login(values);
        if(flag==="true"){
          console.log("service");
          await  SubmitProposalForServicePost(values);
        }else{
          console.log("SubmitProposalForProjectPosting");
          await  SubmitProposalForProjectPost(values);
        }
        $(" .successMsg").fadeIn(500, function () {
          setTimeout(function () {
            navigate("/FreelancerHomePage");
          }, 2000);
        });
      } catch (error) {
        console.log(error);
        $(".errMsg").fadeIn(500, function () {
          setTimeout(function () {
            $(".errMsg").fadeOut(500);
            $(".btn").removeAttr("disabled");
            navigate("/FreelancerHomePage");
          }, 3000);
        });
      }
    },
    validate: function () {
      const errors = {};

    //   if (
    //     !formik.values.email.includes("@") &&
    //     !formik.values.email.includes(".com")
    //   ) {
    //     errors.email = "Invalid email address";
    //   }

      return errors;
    },
  });

  return (
    <>
    <div className="container my-5">
   
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow rounded">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Submit Proposal</h2>
              <p className="text-center">Make Your Mark on Our ServiceSphere World!</p>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="ProposedTimeframe" className="form-label">Proposed Time Frame</label>
                  <input 
                    id="ProposedTimeframe" 
                    name="ProposedTimeframe" 
                    type="text" 
                    className="form-control" 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    value={formik.values.ProposedTimeframe} 
                    aria-describedby="timeframeHelp"
                  />
                  <div id="timeframeHelp" className="form-text">
                    Input the estimated duration within which you expect to complete the project. For example, "2 weeks," "30 days," or "by the end of the month."
                  </div>
                  {formik.errors.ProposedTimeframe && formik.touched.ProposedTimeframe && (
                    <div className="alert alert-danger mt-2">{formik.errors.ProposedTimeframe}</div>
                  )}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="ProposedBudget" className="form-label">Proposed Budget</label>
                  <input 
                    id="ProposedBudget" 
                    name="ProposedBudget" 
                    type="number" 
                    className="form-control" 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    value={formik.values.ProposedBudget} 
                    aria-describedby="budgetHelp"
                  />
                  <div id="budgetHelp" className="form-text">
                    Input the total amount you propose to charge for the service. You might specify this as a fixed amount or a range.
                  </div>
                  {formik.errors.ProposedBudget && formik.touched.ProposedBudget && (
                    <div className="alert alert-danger mt-2">{formik.errors.ProposedBudget}</div>
                  )}
                </div>
  
                <div className="mb-3">
                  <label htmlFor="CoverLetter" className="form-label">Cover Letter</label>
                  <textarea 
                    id="CoverLetter" 
                    name="CoverLetter" 
                    className="form-control" 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    value={formik.values.CoverLetter} 
                    aria-describedby="coverLetterHelp"
                  ></textarea>
                  <div id="coverLetterHelp" className="form-text">
                    Write a personalized cover letter addressing the client directly and explaining why you're the right freelancer for the project.
                  </div>
                  {formik.errors.CoverLetter && formik.touched.CoverLetter && (
                    <div className="alert alert-danger mt-2">{formik.errors.CoverLetter}</div>
                  )}
                </div>
  
                <div className="mb-3">
                  <label htmlFor="WorkPlan" className="form-label">Work Plan</label>
                  <textarea 
                    id="WorkPlan" 
                    name="WorkPlan" 
                    className="form-control" 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    value={formik.values.WorkPlan} 
                    aria-describedby="workPlanHelp"
                  ></textarea>
                  <div id="workPlanHelp" className="form-text">
                    Describe your proposed approach or plan for completing the project.
                  </div>
                  {formik.errors.WorkPlan && formik.touched.WorkPlan && (
                    <div className="alert alert-danger mt-2">{formik.errors.WorkPlan}</div>
                  )}
                </div>
  
                <div className="mb-3">
                  <label htmlFor="Availability" className="form-label">Availability</label>
                  <textarea 
                    id="Availability" 
                    name="Availability" 
                    className="form-control" 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    value={formik.values.Availability} 
                    aria-describedby="availabilityHelp"
                  ></textarea>
                  <div id="availabilityHelp" className="form-text">
                    Specify your availability to work on the project, including your preferred working hours, days of the week, and any potential scheduling conflicts or constraints.
                  </div>
                  {formik.errors.Availability && formik.touched.Availability && (
                    <div className="alert alert-danger mt-2">{formik.errors.Availability}</div>
                  )}
                </div>
  
                <div className="mb-3">
                  <label htmlFor="Milestones" className="form-label">Milestones</label>
                  <textarea 
                    id="Milestones" 
                    name="Milestones" 
                    className="form-control" 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    value={formik.values.Milestones} 
                    aria-describedby="milestonesHelp"
                  ></textarea>
                  <div id="milestonesHelp" className="form-text">
                    Break down the project into key milestones or stages, along with corresponding deadlines or deliverables for each milestone.
                  </div>
                  {formik.errors.Milestones && formik.touched.Milestones && (
                    <div className="alert alert-danger mt-2">{formik.errors.Milestones}</div>
                  )}
                </div>
  
                <div className="mb-3">
                  <label htmlFor="Inquiries" className="form-label">Questions Or Clarifications</label>
                  <textarea 
                    id="Inquiries" 
                    name="Inquiries" 
                    className="form-control" 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    value={formik.values.Inquiries} 
                    aria-describedby="inquiriesHelp"
                  ></textarea>
                  <div id="inquiriesHelp" className="form-text">
                    If you have any questions or clarifications about the project, list them here. This shows that you've carefully reviewed the project requirements.
                  </div>
                  {formik.errors.Inquiries && formik.touched.Inquiries && (
                    <div className="alert alert-danger mt-2">{formik.errors.Inquiries}</div>
                  )}
                </div>
                <div className="errMsg alert alert-danger" style={{ display: "none" }} >
             
             Sending Failed .. you have already sent proposal to this post
            </div>
            <div className="successMsg alert alert-success" style={{ display: "none" }}>
              Proposal Submitted successfully 
            </div>
                <div className="d-grid gap-2">
            
                  <button className="btn main-btn" type="submit">Submit Proposal</button>
                  <Link to='/FreelancerHomePage'> <button className="btn btn-outline-danger col-12" type="button" >Cancel</button></Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  
  );
}
