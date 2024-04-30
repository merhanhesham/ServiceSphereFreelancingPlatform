import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "./login.css";
import ReactPlayer from "react-player";

export default function Login({ getUserData, GetCurrentUserId }) {
  let user = {
    email: "",
    password: "",
  };
  async function Login(user) {
    const res = await axios.post(
      "https://localhost:7157/api/Account/Login",
      user
    );
    if (res.data.email === user.email) {
      localStorage.setItem("user", res.data.token);


      //getId
      GetCurrentUserId(res.data.id);
      console.log(res.data.id);

      console.log(res.data.token);
      //   console.log(crruser);
    }
    console.log(res);
  }

  const navigate = useNavigate();
  let formik = useFormik({
    initialValues: user,
    onSubmit: async function (values) {
      console.log(values);
      try {
        $(".btn").attr("disabled", "true");
        await Login(values);
        $(" .successMsg").fadeIn(500, function () {
          setTimeout(function () {
            navigate("/home");
            getUserData();
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

      if (
        !formik.values.email.includes("@") &&
        !formik.values.email.includes(".com")
      ) {
        errors.email = "Invalid email address";
      }

      return errors;
    },
  });
  return (
    <>
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="container my-5">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="item  w-100 h-100 rounded">
              <div className='video1'>
    <ReactPlayer
        url={require('../../../Images/video2.mp4')}
        controls={false}
        playing={true} // Set playing to true for autoplay
        loop={true} // Set loop to true for continuous playback
        muted={true} // Set muted to true for autoplay without controls
        width="100%"
        height='100%'
        volume={0}
      />
    </div>
              </div>
            </div>
            <div className="col-lg-6 ">
              <div className="item bg-light p-5 manualShadow rounded-4">
                <div className="errMsg alert alert-danger" style={{ display: "none" }}>
                  Email or password is incorrect ..
                </div>
                <div className="successMsg alert alert-success" style={{ display: "none" }}>
                  Welcome!
                </div>
                <h2 className="py-2">Login</h2>
                <p>Welcome back! Please log in to your account in ServiceSphere.</p>
                <form className="row g-3 justify-content-center" onSubmit={formik.handleSubmit}>
                  <div className="col-12">
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                    />
                    {formik.errors.email && formik.touched.email && (
                      <div className="alert alert-danger mt-2">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>
                  <div className="col-12">
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                    />
                    {formik.errors.password && formik.touched.password && (
                      <div className="alert alert-danger mt-2">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>
                  <div className="col-12">
                    <button className="btn main-btn text-white w-100" type="submit" >
                      Login
                    </button>
                  </div>
                </form>
                <div className="text-center mt-4">
                  <div className="divider">
                    <span className="divider-text">or</span>
                  </div>
                  <p className="text-secondary">Don't have an account?</p>
                  <button className="btn main-btn text-white w-50">
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}
