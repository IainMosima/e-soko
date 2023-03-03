import { fetchData } from "./fetchData";
import { User } from "../models/user";
import { loginCredentials } from "../models/loginCredentials";

// getting an authenticated user
export async function getLoggedInUser():Promise<User> {
    const response = await fetchData('/api/v1/users/', { method: 'GET' });
    return response.json();
}

export async function login(credentials: loginCredentials) {
    const response = await fetchData('/api/v1/users/login', 
    { 
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    return response.json();
}