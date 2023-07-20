'use client'; 

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UserCookieInterface { 
    user: string | null, 
    error: string | null, 
}

const DashboardLayout = ({ children } : { children: React.ReactNode}) => {
    const [ checkedProfile, setCheckedProfile ] = useState <Boolean> (false); 
    const router = useRouter(); 

    useEffect( () => {
        const getCookieData = async () => { 
            const { user, error } = await getUser(); 

            if(error) { //cannot enter the dashboard if error
                router.push("/"); 
                return; 
            }

            //if evetything is allright 
            setCheckedProfile(true) 
        }

        getCookieData();  
    }, [])

    if(!checkedProfile) { 
        return <p>Loading...</p>
    }
  return (
        <section>
            <header> Navigation </header>
            { children }
        </section>
    )
}

export default DashboardLayout

async function getUser (): Promise<UserCookieInterface> { 
    try { 
        const response = await fetch('/api/auth/me'); 
        const dataResponse = await response.json(); 

        console.log(dataResponse); 

        if(dataResponse.message) { 
            return { 
                user: null, 
                error: dataResponse.message 
            }
        }

        return { 
            user: dataResponse, 
            error: null
        }

    } catch(err: any) { 
        console.log(err); 

        const error: string = err.toString(); 
        return { 
            user: null, 
            error
        }
    }
}