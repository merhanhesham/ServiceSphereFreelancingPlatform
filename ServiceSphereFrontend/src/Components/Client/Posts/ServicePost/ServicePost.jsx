import axios from "axios";
import React from "react";
import BASE_URL from "../../../../Variables";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

export default function ServicePost() {
  let Post = {
    title: "",
    description: "",
    categoryId: 0,
    budget: 0,
    duration: "",
    //Deadline
  };
  async function PostServiePosting(Post) {
    const token = localStorage.getItem("user");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.post(
      `${BASE_URL}/api/Posting/ServicePosting`,
      Post,
      { headers: headers }
    );
    console.log(res.data);
  }
  const navigate = useNavigate();
  let formik = useFormik({
    initialValues: Post,
    onSubmit: async function (values) {
      console.log(values);
      try {
        $(".btn").attr("disabled", "true");
        await PostServiePosting(values);
        $(" .successMsg").fadeIn(500, function () {
          setTimeout(function () {
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
            if(formik.values.title==='')
                errors.title="Title is Required";
            if(formik.values.description==='')
            errors.description="Description is Required";
            if(formik.values.duration==='')
            errors.duration="Duration is Required";
            if(formik.values.budget===0)
            errors.budget="Budget is Required";
            if(formik.values.categoryId===0)
            errors.categoryId="categoryId is Required";

      return errors;
    },
  });

  // Function to retrieve category name based on category ID
  const getCategoryName = (categoryId) => {
    switch (categoryId) {
      case 1:
        return "Construction & Renovation";
      case 2:
        return "Event Planning";
      case 3:
        return "Education";
      default:
        return "Choose Category";
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-11">
            <div className="item bg-light p-5 shadow rounded">
              <div
                className="errMsg alert alert-danger"
                style={{ display: "none" }}
              >
                Failed to post ..
              </div>
              <div
                className="successMsg alert alert-success"
                style={{ display: "none" }}
              >
                Posted Successfully
              </div>
              <h2 className="py-2">Post a service post :</h2>
              <p>
              Welcome to ServiceSphere, where finding the perfect solution for your needs is just a post away. Share what you're looking for and connect with professionals eager to bring your vision to life. Start your journey towards seamless service discovery now.
              </p>
              <form
                className="row g-3 justify-content-center"
                onSubmit={formik.handleSubmit}
              >
                <div className="col-12">
                <span className="text-secondary py-5">Enter the title to describe the service</span>

                  <textarea
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="form-control"
                  />
                  {formik.errors.title && formik.touched.title && (
                    <div className="alert alert-danger mt-2">
                      {formik.errors.title}
                    </div>
                  )}
                </div>
                <div className="col-12">
                <span className="text-secondary py-5">Describe what you want in detail</span>

                  <textarea
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    type="text"
                    name="description"
                    placeholder="Description"
                    className="form-control"
                  />
                  {formik.errors.description && formik.touched.description && (
                    <div className="alert alert-danger mt-2">
                      {formik.errors.description}
                    </div>
                  )}
                </div>{" "}
                <div className="col-12">
                <span className="text-secondary py-5">How long do you want it to take?</span>

                  <textarea
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.duration}
                    type="text"
                    name="duration"
                    placeholder="duration"
                    className="form-control"
                  />
                  {formik.errors.duration && formik.touched.duration && (
                    <div className="alert alert-danger mt-2">
                      {formik.errors.duration}
                    </div>
                  )}
                </div>{" "}
                <div className="col-12">
                <span className="text-secondary py-5">Estimated budget for your service</span>

                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.budget}
                    type="number"
                    name="budget"
                    placeholder="budget"
                    className="form-control"
                  />
                  {formik.errors.budget && formik.touched.budget && (
                    <div className="alert alert-danger mt-2">
                      {formik.errors.budget}
                    </div>
                  )}
                </div>
                <div className="col-12 cursor-pointer">
                <span className="text-secondary py-5">Choose a category for your service</span>
                  <div className="dropdown">
                    <button
                      className="btn main-btn dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                     
                      
                    >
                      {formik.values.categoryId === 0
                        ? "Choose Category"
                        : getCategoryName(formik.values.categoryId)}
                    </button>
                    <ul className="dropdown-menu "  style={{ cursor: "pointer" }}>
                      <li className="cursor-pointer">
                        <span
                          className="dropdown-item cursor-pointer"
                          onClick={() => {
                            formik.setFieldValue("categoryId", 1);
                            console.log("Category ID: ", 1);
                          }}
                        >
                          Construction & Renovation
                        </span>
                      </li>
                      <li>
                        <span
                          className="dropdown-item"
                          onClick={() => {
                            formik.setFieldValue("categoryId", 2);
                            console.log("Category ID: ", 2);
                          }}
                        >
                          Event Planning
                        </span>
                      </li>
                      <li>
                        <span
                          className="dropdown-item"
                          onClick={() => {
                            formik.setFieldValue("categoryId", 3);
                            console.log("Category ID: ", 3);
                          }}
                        >
                          Education
                        </span>
                      </li>
                    </ul>
                  </div>
                  {formik.errors.categoryId && formik.touched.categoryId && (
                    <div className="alert alert-danger mt-2">
                      {formik.errors.categoryId}
                    </div>
                  )}
                </div>
                <div className="col-12">
                  <button
                    className="btn main-btn text-white w-100"
                    type="submit"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
