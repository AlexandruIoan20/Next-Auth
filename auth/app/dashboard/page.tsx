'use client'; 

import React from 'react'; 
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const router = useRouter(); 
  const logout = async () => { 
    try { 
      const response = await fetch("/api/auth/logout", { 
        method: "POST", 
        mode: "cors", 
      }); 
      router.push("/"); 

      if(response.ok) { 
        return; 
      }
    } catch(err) {  
      console.log(err); 
    }
  }
  return (
    <>
      <div>DashboardPage</div>
      <button
        className = 'p-2 text-sm bg-orange-600 text-white w-fit rounded hover:scale-125 transition-all duration-500 hover:font-extrabold'
        onClick = { logout }>Logout</button>
    </>
  )
}

export default DashboardPage