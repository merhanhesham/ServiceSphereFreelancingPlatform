import logo from './logo.svg';
import './App.css';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Register from './Components/Authorization/Register/Register';
import Login from './Components/Authorization/Login/Login';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import AddService from './Services/Service/AddService';
import AllServices from './Services/Service/Allservices/AllServices';
import ClientMainPage from './Components/Client/ClientMainPage/ClientMainPage';
import FreelancerMainPage from './Components/Freelancer/ServicePostings';
import ServicePostings from './Components/Freelancer/ServicePostings';
import ProjectPostings from './Components/Freelancer/ProjectPostings/ProjectPostings';
import Profile from './Components/Freelancer/Profile/Profile';
import EditProfile from './Components/Freelancer/Profile/EditProfile';
import ProfileStep1 from './Components/Freelancer/ProfileProcess/ProfileStep1'
import ProfileStep2 from './Components/Freelancer/ProfileProcess/ProfileStep2'
import ProfileStep3 from './Components/Freelancer/ProfileProcess/ProfileStep3'
import ProfileStep4 from './Components/Freelancer/ProfileProcess/ProfileStep4'
import ProfileStep5 from './Components/Freelancer/ProfileProcess/ProfileStep5'
import Posts from './Components/Freelancer/Posts/Posts';
import ProfileStepsParent from './Components/Freelancer/ProfileProcess/ProfileStepsParent/ProfileStepsParent';
import BASE_URL from './Variables';
import Proposal from './Components/Freelancer/Agreements/Proposal/Proposal';
import AllProjectPosts from './Components/Client/Posts/AllProjectPosts';
import ServicePost from './Components/Client/Posts/ServicePost/ServicePost';
import ProjectPost from './Components/Client/Posts/ProjectPost/ProjectPost';
import AllServicePosts from './Components/Client/Posts/AllServicePosts';
import AllPosts from './Components/Client/Posts/GetAllPosts/AllPosts';
import AddServiceInEditProfile from './Components/Freelancer/Profile/ServiceInEditProfile/AddServiceInEditProfile';
import UpdateServiceInEditProfile from './Components/Freelancer/Profile/ServiceInEditProfile/UpdateServiceInEditProfile';
import FreelancerHomePage from './Components/Freelancer/FreelancerHomePage/FreelancerHomePage';
import ProjectProposals from './Components/Client/Proposals/ProjectProposals';
import ServiceProposals from './Components/Client/Proposals/ServiceProposals';
import NotificationsSignalR from './Components/Notification/NotificationsSignalR';
import ChatApp from './Components/Chat/ChatApp';
import Talents from './Components/Client/Talents/Talents';
import Payment from './Components/Client/Payment/Payment';
import EntryHome from './Components/EntryHome/EntryHome';
import ProjectDetails from './Components/ProjectDetails/ProjectDetails';
import Contract from './Components/Contract/Contract';
import Reviews from './Components/Reviews/Reviews';
import GetReviews from './Components/Reviews/GetReviews';
import PostContract from './Components/PostContract/PostContract';
import ProjectSection from './Components/ProjectSection/ProjectSection'

function App() {
  const [crrUser, setCrrUser] = useState(null);
  const [Role, SetRole] = useState(null)

  function getUserData() {
    if (localStorage.getItem("user") != null) {
      const user = jwtDecode(localStorage.getItem("user"));
      setCrrUser(user);
      console.log("crr",crrUser);
      console.log("user",user);
      var RoleForuser=user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      console.log(RoleForuser);
      SetRole(RoleForuser);
    }

  }

  async function GetCurrentUserId() {
    try {
      const token = localStorage.getItem('user');
      const headers = {
        Authorization: `Bearer ${token}`
      };

      const { data } = await axios.get(
        `${BASE_URL}/api/Account`,
        // Request body is empty, assuming serviceDto is being sent from the client
        { headers } // Pass headers as a separate object
      );
      console.log(data);
      return data.id;
      
    } catch (error) {
      console.error('Error adding service:', error);
    }
  }
  function deleteUser() {
    setCrrUser(null);

  }
 // Improved ProtectedRoute to handle role-based access
function ProtectedRoute({ children, allowedRoles }) {
  const userRole = localStorage.getItem("role"); // Assuming you store the role in localStorage

  if (!crrUser || (allowedRoles && !allowedRoles.includes(userRole))) {
    // If user not logged in or role not allowed, redirect to login
    return <Navigate to="/login" replace />;
  }

  return children;
}

  function reload() {

    if (localStorage.getItem("user") != null && crrUser == null) {
      getUserData();
    }
    console.log("hello reloading...");
  }
  useEffect(function () {
    reload();

    getUserData();

  }, [])

  const router = createBrowserRouter(
    [
      {
        path: '', element: <Layout deleteUser={deleteUser} user={crrUser} Role={Role} />, children: [
          // {
          //   path: '',
          //   element: crrUser?.role === 'Freelancer' ? <FreelancerMainPage /> : <ClientMainPage />,
          // },
          { path: '', element: (
            <ProtectedRoute allowedRoles={['Freelancer']}>
              <FreelancerMainPage />
            </ProtectedRoute>
          ) },
        
         
          { path: 'home', element: <Home /> },
          { path: '', element: (
            <ProtectedRoute allowedRoles={['Client']}>
              <ClientMainPage />
            </ProtectedRoute>
          ) },
          {
            path: '',
            element:  <Home></Home>  ,
          },
          { path: 'Register', element: <Register /> },
          { path: 'Login', element: <Login getUserData={getUserData} GetCurrentUserId={GetCurrentUserId} /> },
          { path: 'AddService', element: <AddService GetCurrentUserId={GetCurrentUserId} crrUser={crrUser} /> },
          { path: 'AllServices', element: <AllServices /> },
          { path: 'ClientMainPage', element: <ClientMainPage /> },
          { path: 'FreelancerMainPage', element: <FreelancerMainPage /> },
          { path: 'ServicePostings', element: <ServicePostings /> },
          { path: 'ProjectPostings', element: <ProjectPostings /> },
          { path: 'profile', element: <Profile /> },
          { path: '/edit-profile', element: <EditProfile /> },
          { path: '/profileStep1', element: <ProfileStep1 /> },
          { path: '/profileStep2', element: <ProfileStep2 /> },
          { path: '/profileStep3', element: <ProfileStep3/> },
          { path: '/profileStep4', element: <ProfileStep4 /> },
          { path: '/profileStep5', element: <ProfileStep5 /> },
          { path: '/profileStepsParent', element: <ProfileStepsParent /> },
          { path: 'posts', element: <Posts /> },
          { path: 'Proposal/:flag/:id', element: <Proposal  /> },
          { path: 'ProjectProposals/:id', element: <ProjectProposals  /> },
          { path: 'ServiceProposals/:id', element: <ServiceProposals  /> },    
          { path: 'PostServicePost', element: <ServicePost  /> },
          { path: 'PostProjectPost', element: <ProjectPost  /> },
          { path: 'AllServicePosts', element: <AllServicePosts  /> },
          { path: 'AllProjectPosts', element: <AllProjectPosts  /> },
          { path: 'AllPosts', element: <AllPosts  /> },
          {path: 'AddServiceInEditProfile', element: <AddServiceInEditProfile/>},
          {path: '/update-service/:serviceId', element: <UpdateServiceInEditProfile/>},
          {path: 'FreelancerHomePage', element: <FreelancerHomePage/>},
          {path: 'NotificationsSignalR', element: <NotificationsSignalR/>},
          {path: 'chat', element: <ChatApp/>},
          {path: 'Talents', element: <Talents></Talents>},
          {path: 'payment', element: <Payment></Payment>},
          {path: 'entryHome', element: <EntryHome></EntryHome>},
          {path: 'ProjectDetails', element: <ProjectDetails></ProjectDetails>},
          {path: 'makeContract', element: <Contract></Contract>},
          {path: 'reviews/:targetUserId', element: <Reviews/>},
          {path: 'getReviews/:targetUserId', element: <GetReviews/>},
          {path: 'PostContracts', element: <PostContract Role={Role}/>},
          {path: 'ProjectSection', element: <ProjectSection/>},
          { path: '*', element: <>not found</> },

        ]
      }
    ]
  );

  return <>
 
    <RouterProvider router={router} />

  </>
}

export default App;
