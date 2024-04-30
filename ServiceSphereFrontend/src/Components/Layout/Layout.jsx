import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import ClientNavbar from '../Client/ClientNavbar/ClientNavbar'
import Home from '../Home/Home'
import MainNavbar from '../MainNavbar/MainNavbar'

export default function Layout({deleteUser,user,Role}) {
  return <>
   {console.log(Role)}
    {Role==="Freelancer" ? <Navbar deleteUser={deleteUser} user={user}/>:Role==='Client'?<ClientNavbar deleteUser={deleteUser} user={user}/>:<MainNavbar/>}
    {/* <Navbar deleteUser={deleteUser} user={user}/> */}
    <Outlet/>
  </>
}
