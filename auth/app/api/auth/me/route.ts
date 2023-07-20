import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export async function GET () { 
    const cookieStore = cookies(); 

    const token = cookieStore.get("OurSiteJWT"); // a constant 
    if(!token) { 
        return new Response(JSON.stringify({ message: "Unauthorized!"}), { status: 401 }) //401 status for unauthorized
    }

    const { value } = token; 
    const secret = process.env.JWT_SECRET || ""; 

    try { 
        verify(value, secret); 

        const response = { 
            user: "ADMIN"
        }; 

        return new Response(JSON.stringify(response), { status: 200 });
    } catch (err) { 
        console.log(err); 

        return new Response("Something went wrong in jwt token", { status: 500 }); 
    }
}