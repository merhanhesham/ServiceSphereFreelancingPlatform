import React from 'react';

export default function Talent({ talent }) {
  return (
   
    <div className="item border rounded rounded-5 bg-mainColor p-5 my-5">
       {console.log(talent)}
      <div className="row align-items-center justify-content-center">
        <div className="col-lg-2">
          <div className="info">
            {/* Use conditional rendering for the image */}
            {/* {talent.profilePic ? (
              <img
                src={talent.profilePic}
                className="w-75 rounded rounded-4"
                alt={talent.userName}
              />
            ) : (
              <img
                src={require('../../../Images/unknown.webp')}
                className="w-75 rounded rounded-4"
                alt="Unknown"
              />
            )} */}
          </div>
        </div>
        <div className="col-lg-1">
          {/* Render username if available */}
          {talent.userName ? talent.userName : 'No username'}
        </div>
        <div className="col-lg-3">
          <div className="info">
            {/* Render bio if available */}
            {talent.bio ? talent.bio : 'No bio available'}
          </div>
        </div>
        <div className="col-lg-7">
          <div className="info">
            {/* Render services if available */}
            {talent.services ? (
              <div className="services">
                {/* Iterate over services and display them */}
                {talent.services?.map((service, index) => (
                  <span key={index} className="badge bg-secondary me-2">
                    {service}
                  </span>
                ))}
              </div>
            ) : (
              <div>No services listed</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
