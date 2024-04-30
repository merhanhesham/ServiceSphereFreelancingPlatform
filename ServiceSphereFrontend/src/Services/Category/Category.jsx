import axios from 'axios'
import React from 'react'

export default function Category() {

    async function GetAllCategories(){
        const {data}=await axios.get('https://localhost:7157/api/Service/Category')
    }

  return <>
  <h1>Category</h1>
    <div>
     
    
    </div>
  </>
}
