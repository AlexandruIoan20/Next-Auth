import { cookies } from "next/headers";

export async function POST (request) { 
    try  { 
        const cookieStore = cookies(); 
        cookieStore.set("OurSiteJWT", { maxAge: -1 }); 
    
        return new Response("Logged out", { status: 200 }); 
    } catch(err) { 
        console.log(err);
        return new Response('Cannot log out', { status: 500 });  
    }
}