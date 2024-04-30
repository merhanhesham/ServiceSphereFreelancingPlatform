import axios from "axios";
import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

export default function AddService({crrUser}) {
  const [Categories, setCategories] = useState();
  let Service = {
    Name: "",
    Price: 0,
    Description: "",
    CategoryId: 0,
    FreelancerId:'',
   // UserId:crrUser.Id
  };
//   // Function to decode JWT and extract the userID in a case-insensitive manner
//   const decodeToken = (token) => {
//     try {
//         const base64Url = token.split('.')[1]; // Payload part
//         const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//         const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => {
//             return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//         }).join(''));

//         const payload = JSON.parse(jsonPayload);

//         // Find the userID property in a case-insensitive manner
//         const userIdProperty = Object.keys(payload).find(key => key.toLowerCase() === "userid");
//         if (!userIdProperty) {
//             console.error("UserID property not found in token payload.");
//             return null;
//         }

//         return payload[userIdProperty];
//     } catch (error) {
//         console.error("Error decoding token:", error);
//         return null;
//     }
// };





  async function GetAllCategories() {
    try {
      const { data } = await axios.get(
        "https://localhost:7157/api/Services/Category"
      );
      // console.log(data);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function AddService(values) {
    const token = localStorage.getItem('user');
    const headers = {
        Authorization: `Bearer ${token}`
    };

    const { data } = await axios.post(
        'https://localhost:7157/api/Services/AddService',
        values, // Request body is empty, assuming serviceDto is being sent from the client
        { headers:headers } // Pass headers as a separate object
    );
    console.log(data);
}

  const navigate = useNavigate();
  let formik = useFormik({
    initialValues: Service,
    onSubmit: async function (values) {
      console.log(values);
      
      try {
        $(".btn").attr("disabled", "true");
        await AddService(values);
         $(".successMsg").fadeIn(500,function(){
             setTimeout(function(){console.log("Hello"); navigate('/AllServices');},2000);
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

      if (!formik.values.Name.match(/^[A-Za-z]+/)) {
        errors.name = "name must contain only alphabets and numbers";
      }
      if (formik.values.Price === 0) {
        errors.Price = "You must Enter Price ";
      }
      if (formik.values.CategoryId === 0) {
        errors.CategoryId = "you must choose category";
      }

      return errors;
    },
  });

  useEffect(() => {
    GetAllCategories();
   // initializeService();
  }, []);

  function handleChangeForCategory(event) {
    // Update the state when dropdown selection changes
    Service.CategoryId = event.target.value;
    console.log(Service.CategoryId);
  }

  return (
    <>
      <h1>ADD Service</h1>

      <div className="container">
      <div className='errMsg alert alert-danger' style={{'display':'none'}}>failed .. </div>
       <div className='successMsg alert alert-success' style={{'display':'none'}}> done successfully!</div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Name}
              name="Name"
              type="text"
              className="form-control"
              placeholder="Service Name"
            />
            {formik.errors.Name && formik.touched.Name ? (
              <div className="alert alert-danger">{formik.errors.Name}</div>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Price}
              name="Price"
              type="number"
              className="form-control"
              placeholder="Price"
            />
            {formik.errors.Price && formik.touched.Price ? (
              <div className="alert alert-danger">{formik.errors.Price}</div>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <textarea
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Description}
              name="Description"
              className="form-control"
              placeholder="Description"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Select Category:
            </label>
            <select
              id="category"
              className="form-select"
              onChange={(event) => {
                handleChangeForCategory(event);
                formik.handleChange(event);
              }}
              name="CategoryId"
            >
              <option value="">Select a category</option>
              {/* Map over categories to populate dropdown options */}
              {Categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {formik.errors.CategoryId && formik.touched.CategoryId ? (
              <div className="alert alert-danger">
                {formik.errors.CategoryId}
              </div>
            ) : (
              ""
            )}
          </div>
          <button className="btn btn-success col-lg-1 ms-auto" type="submit">
            Add
          </button>
          {/* Other form fields for service details */}
        </form>
      </div>
    </>
  );
}
