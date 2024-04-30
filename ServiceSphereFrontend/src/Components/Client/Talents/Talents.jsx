import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Talent from './Talent';
import BASE_URL from '../../../Variables';
import Contract from '../../Contract/Contract';
import { jwtDecode } from 'jwt-decode';
import { FaUserTie } from 'react-icons/fa';
import $ from 'jquery'
import { Link } from 'react-router-dom';

export default function Talents() {
  const [Talents, setTalents] = useState([]);
  const [clientId, setclientId] = useState(null);
  const [contractVisible, setContractVisible] = useState(false);
  const handleContractClick = (id) => {
    //setContractVisible(true);
    console.log(clientId);
    $(`#${id}`).fadeIn();
  };

  const handleCancelClick = (id) => {
    // setContractVisible(false);
    $(`#${id}`).fadeOut();
  };


  //function to get all freelancers
  async function GetAllTalents() {
    try {

      const params = {
        search: null,
        sort: null,
        categoryId: null,
        subCategoryId: null
      };

      // Use `params` to pass the query parameters correctly
      const response = await axios.get(`${BASE_URL}/api/Freelancer/Freelancers`, { params });

      console.log(response.data);
      setTalents(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function Gettoken() {
    const decodedToken = jwtDecode(localStorage.getItem("user"));
    const clientIdFromToken = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    setclientId(clientIdFromToken);
    console.log(clientId);
  }

  useEffect(() => {

    try {
      Gettoken();
      GetAllTalents();
    } catch (error) {
      console.log(error);
    }

  }, [])


  return (
    <>
      <div id='talents' className="container p-5">

        <div className="title LineBelowDiv d-flex  align-items-center">
          <i className="fa-solid fa-person fa-2x"></i>
          <h2><FaUserTie className='mb-2' /> Talents </h2>
        </div>
        {Talents?.length > 0 ? (
          Talents.map((talent, index) => (
            <div key={index} className="item border rounded rounded-5 bg-mainColor p-4 my-5">
              <div className="row align-items-center ">
                <div className="col-lg-2">
                  <div className="info">
                    {/* Use conditional rendering for the image */}
                    {talent.profilePic ? (
                      <img
                        src={talent.profilePic}
                        className="w-75 rounded rounded-4 mb-3"
                        alt={talent.userName}
                      />
                    ) : (
                      <img
                        src={require('../../../Images/freelancer.png')}
                        className="w-75 rounded rounded-4 mb-3"
                        alt="Unknown"
                      />
                    )}
                  </div>
                </div>
                <div className="col-lg-2 fw-bold solidPurple">
                  {/* Render username if available */}
                  <p> {talent.displayName ? talent.displayName : 'No username'}</p>
                </div>
                <div className="col-lg-8">
                  <div className="info">
                    {/* Render bio if available */}
                    {talent.bio ? talent.bio : 'No bio available'}
                  </div>
                </div>

              </div>
              <div className="container" style={{ width: '100%' }}>
                <div>
                  {talent.services ? (
                    <div className="row">
                      {talent.services.map((service, index) => (
                        <div key={index} className="col-sm-12 col-md-6 col-lg-4 mb-4">
                          <div className="card h-100 border-0 shadow text-center">
                            <div className="card-body">
                              <h5 className="card-title">{service.name}</h5>
                              <h6 className="card-subtitle mb-2 text-muted">Price: ${service.price}</h6>
                              <p className="card-text">{service.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>No services listed</div>
                  )}
                </div>
              </div>
              <div className='d-flex justify-content-end mt-2'>
                <button className='btn pill-button my-2 text-white' onClick={function () { handleContractClick(talent.id) }}>Request A Service</button>
                  <Link className='ms-2 btn pill-button my-2 text-white' to={`/reviews/${talent.id}`}>Review the freelancer</Link>
                  <Link className='ms-2 btn pill-button my-2 text-white' to={`/getReviews/${talent.id}`}>Get Reviews</Link>

              </div>
              {(
                <div id={talent.id} style={{ display: 'none' }}>
                  <Contract freelancerId={talent.id} clientId={clientId} />
                  <button className='btn bg-black text-white' onClick={function () { handleCancelClick(talent.id) }}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          ''
        )}
      </div>
    </>
  )
}
