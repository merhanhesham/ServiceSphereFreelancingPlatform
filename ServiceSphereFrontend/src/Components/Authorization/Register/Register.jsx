import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaUserTie, FaUser } from 'react-icons/fa'; // Import the icons
import $ from 'jquery';
import { Link } from 'react-router-dom';
import './Register.css'

export default function Register() {
  const [selectedRole, setSelectedRole] = useState('');
  let user = {
    DisplayName: '', email: '', password: '', rePassword: '', PhoneNumber: '', Role: ''
  }
  async function register(user) {
    const res = await axios.post("https://localhost:7157/api/Account/Register", user);
    console.log(res);
  }
  // Handle change for radio buttons
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    formik.setFieldValue('Role', event.target.value); // Set Role field in formik
  };
  const navigate = useNavigate();
  let formik = useFormik(
    {
      initialValues: user,
      onSubmit: async function (values) {
        console.log(values);
        try {
          $(".btn").attr("disabled", "true");
          await register(values);
          $(" .successMsg").fadeIn(500, function () {
            setTimeout(function () { navigate('/login'); }, 2000);
          });


        } catch (error) {
          console.log(error);
          if (error.response.data.message === 'this email already exists') {
            $(".errMsgEmailExist").fadeIn(500, function () {
              setTimeout(function () {
                $(".errMsgEmailExist").fadeOut(500);
                $(".btn").removeAttr("disabled");
              }, 3000);
            });
          }
          else {
            $(".errMsg").fadeIn(500, function () {
              setTimeout(function () {
                $(".errMsg").fadeOut(500);
                $(".btn").removeAttr("disabled");
              }, 3000);
            });
          }

        }
      },
      validate: function () {
        const errors = {};

        if (!formik.values.DisplayName.match(/^[A-Za-z]+/)) {
          errors.DisplayName = 'name must contain only alphabets and numbers';
        }
        if (!formik.values.email.includes("@") && !formik.values.email.includes(".com")) {
          errors.email = 'Invalid email address';
        }
        if (!formik.values.password.match(/^(?=.*[^\w\d])(?=.*\d)(?=.*[A-Z]).{6,}$/)) {
          errors.password = 'Invalid password ';
        }
        if (formik.values.password !== formik.values.rePassword) {
          errors.rePassword = 'Passwords do not match';
        }
        if (!formik.values.PhoneNumber.match(/^01[0125][0-9]{8}$/)) {
          errors.PhoneNumber = 'Invalid Phone number';
        }

        if (formik.values.Role === '') {
          errors.PhoneNumber = 'You Must Choose the role';
        }


        return errors
      }
    }
  )
  return (
    <div className="container mt-5 d-flex align-items-center justify-content-center vh-100 mt-0">
      <div className="row justify-content-center ">
        <div className="col-lg-8 w-100 ">
          <div className="p-5 bg-light manualShadow rounded bg-white">
            <div className="errMsg alert alert-danger" style={{ display: "none" }}>Authentication failed ..</div>
            <div className="errMsgEmailExist alert alert-danger" style={{ display: "none" }}>Authentication failed .. Email already exists!</div>
            <div className="successMsg alert alert-success" style={{ display: "none" }}>Register done successfully!</div>
            <h2 className="text-center my-5">Join ServiceSphere Now!</h2>
            <form className="row g-5 needs-validation" onSubmit={formik.handleSubmit} noValidate>
              <div className="col-md-12">
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.DisplayName} type="text" name="DisplayName" placeholder="Name" className="form-control" required />
                {formik.errors.DisplayName && formik.touched.DisplayName ? <div className="alert alert-danger">{formik.errors.DisplayName}</div> : ''}
              </div>
              <div className="col-md-12">
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name="email" placeholder="Email" className="form-control" required />
                {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ''}
              </div>
              <div className="col-md-12">
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" name="password" placeholder="Password" className="form-control" required />
                {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ''}
              </div>
              <div className="col-md-12">
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} type="password" name="rePassword" placeholder="Confirm Password" className="form-control" required />
                {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">{formik.errors.rePassword}</div> : ''}
              </div>
              <div className="col-md-12">
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.PhoneNumber} type="text" name="PhoneNumber" placeholder="Phone Number" className="form-control" required />
                {formik.errors.PhoneNumber && formik.touched.PhoneNumber ? <div className="alert alert-danger">{formik.errors.PhoneNumber}</div> : ''}
              </div>
              <div className="d-flex align-items-center">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="Role"
                    id="Client"
                    value="Client"
                    onChange={handleRoleChange}
                  />
                  <label className="form-check-label d-flex align-items-center" htmlFor="Client">
                    <FaUser className="me-2" />Client
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="Role"
                    id="Freelancer"
                    value="Freelancer"
                    onChange={handleRoleChange}
                  />
                  <label className="form-check-label d-flex align-items-center" htmlFor="Freelancer">
                    <FaUserTie className="me-2" />Freelancer
                  </label>
                </div>
              </div>
              {formik.errors.Role && formik.touched.Role ? <div className="alert alert-danger">{formik.errors.Role}</div> : ''}
              <div className="col-12 text-end">
                <div >
                  <button type="submit" className="btn mt-3 font-weight-bold profilebtn rounded-3 px-4 ">Register</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );

}
