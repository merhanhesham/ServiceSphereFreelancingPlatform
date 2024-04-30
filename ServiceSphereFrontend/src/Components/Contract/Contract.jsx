import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import ReactPlayer from "react-player";
import BASE_URL from "../../Variables";

export default function Contract({freelancerId,clientId}) {
  let contract = {
    "terms": "",
    "price": null,
    "clientId": clientId,
    "freelancerId": freelancerId,
    "serviceDetails": ""
  };
  async function MakeContract(contract) { 
    const token = localStorage.getItem('user');
  const headers = {
      Authorization: `Bearer ${token}`
  };
    const res = await axios.post(
      `${BASE_URL}/api/Agreements/makecontract`,
      contract, { headers: headers }
    );
   
    console.log(res.data);
    console.log(res);
  }
  const navigate = useNavigate();
  let formik = useFormik({
    initialValues: contract,
    onSubmit: async function (values) {
      console.log(values);
      try {
        $(".btn").attr("disabled", "true");
        await MakeContract(values);
        $(".successMsg").fadeIn(500, function () {
          setTimeout(function () {
            //navigate to all contracts ============================!!!!!!!
            navigate("/home");
            
          }, 2000);
        });
      } catch (error) {
        console.log(error);
        $(".errMsg").fadeIn(500, function () {
          setTimeout(function () {
            $(".errMsg").fadeOut(500);
            $(".btn").removeAttr("disabled");
          }, 3000);
        });
      }
    },
    validate: function () {
      const errors = {};

    //   if (
    //     !formik.values.serviceDetails.includes("@") )
    //      {
    //     errors.serviceDetails = "Invalid serviceDetails address";
    //   }

      return errors;
    },
  });
  

  return (
    <>
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="container ">
          <div className=" justify-content-center align-items-center">
           
            <div className=" ">
              <div className="item bg-light p-4 manualShadow rounded-4">
                <div className="errMsg alert alert-danger" style={{ display: "none" }}>
                  Failed to send contract
                </div>
                <div className="successMsg alert alert-success" style={{ display: "none" }}>
                 Contract sent to the client successfully
                </div>
                <h2 className="py-2">Make Contract</h2>
                <p>Create Your Contract in Minutes</p>
                <form className="row g-3 justify-content-center" onSubmit={formik.handleSubmit}>
                  <div className="col-12">
                    <textarea
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.serviceDetails}
                      type="text"
                      name="serviceDetails"
                      placeholder="service Details"
                      className="form-control"
                    />
                    {formik.errors.serviceDetails && formik.touched.serviceDetails && (
                      <div className="alert alert-danger mt-2">
                        {formik.errors.serviceDetails}
                      </div>
                    )}
                  </div>
                  <div className="col-12">
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.price}
                      type="price"
                      name="price"
                      placeholder="price"
                      className="form-control"
                    />
                    {formik.errors.price && formik.touched.price && (
                      <div className="alert alert-danger mt-2">
                        {formik.errors.price}
                      </div>
                    )}
                  </div>
                  <div className="col-12">
                    <textarea
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.terms}
                      type="terms"
                      name="terms"
                      placeholder="terms"
                      className="form-control"
                    />
                    {formik.errors.terms && formik.touched.terms && (
                      <div className="alert alert-danger mt-2">
                        {formik.errors.terms}
                      </div>
                    )}
                  </div>
                  <div className="col-12 text-center">
                    <button className="btn main-btn text-white w-50 m-auto" type="submit" >
                     Send Contract to Freelancer 
                    </button>
                  </div>
                </form>
                
              </div>
            </div>
            {/* <div className=" my-5 mb-lg-0 ">
              <div className="item shadow rounded">
              <div className='video1'>
    <ReactPlayer
        url={require('../../Images/video5.MOV')}
        controls={false}
        playing={true} // Set playing to true for autoplay
        loop={true} // Set loop to true for continuous playback
        muted={true} // Set muted to true for autoplay without controls
        width="100%"
        volume={0}
      />
    </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>

  );
}
