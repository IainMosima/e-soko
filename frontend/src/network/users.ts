import { fetchData } from "./fetchData";
import { User } from "../models/user";
import { loginCredentials } from "../models/loginCredentials";

// getting an authenticated user
export async function getLoggedInUser():Promise<User> {
    const response = await fetchData('/api/v1/users/', { method: 'GET' });
    return response.json();
}

// login function
export async function login(credentials: loginCredentials): Promise<User> {
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

// logout function
export async function logout() {
    await fetchData('/api/v1/users/logout', { method: 'POST' });
}

// fetching user profile image
export function getUserProfileImage(key: string) {
    const imageUrl = `/api/v1/users/image/${key}`;
    return imageUrl;
}