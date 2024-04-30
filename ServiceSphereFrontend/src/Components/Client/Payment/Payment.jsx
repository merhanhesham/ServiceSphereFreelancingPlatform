import React from 'react'
import BASE_URL from './../../../Variables';
import axios from 'axios';

export default function Payment() {
    const handleClick = async () => {
        try {
           const {data}=await axios.post(`${BASE_URL}/api/payment/create-checkout-session`);
         
           const { url } = data;
           console.log(url);
           // Open a new window/tab with the URL
           window.open(url, '_blank');
        } catch (error) {
            console.error('Failed to fetch:', error);
        }
    };
    
    
  return (
    <div>
        <button onClick={handleClick} role="link">
            Checkout
        </button>
    </div>
  )
}
