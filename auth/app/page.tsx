'use client'; 

import React from 'react'; 
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter (); 
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault(); 

    const payload = { 
      username: e.currentTarget.username.value, 
      password: e.currentTarget.password.value, 
    }

    try { 
      const response = await fetch(`/api/auth/login`, { 
        method: "POST" ,
        mode: "cors", 
        body: JSON.stringify(payload), 
      }); 

      console.log(response); 
      alert(JSON.stringify(response)); 
      //redirect the user to /dashboard
      
      router.push('/dashboard')
    } catch(err) { 
      console.log(err); 
      alert(err); 
    }
  }
  return (
    <main>
        <h1 className = 'text-center text-2xl font-semibold grid place-content-center mb-8'> Next JS authentification JWT verify cookie only </h1>

        <form onSubmit={ handleSubmit } className = 'flex flex-col justify-center items-center gap-y-4'>
          <div>
            <label htmlFor="username"> Username: </label>
            <input 
              type="text" 
              id = 'username'
              name = 'username'
              required 
              className = 'border rounded border-black'
            />
          </div>

          <div>
            <label htmlFor="password">Password: </label>
            <input 
              type="password"
              id = 'password' 
              name = 'password'
              required 
              className = 'border rounded border-black'  
            />
          </div>

          <button 
            className = 'p-2 text-sm bg-orange-600 text-white w-fit rounded hover:scale-125 transition-all duration-500 hover:font-extrabold'
            type = 'submit'> Submit </button>
        </form>
    </main>
  )
}

export default Home