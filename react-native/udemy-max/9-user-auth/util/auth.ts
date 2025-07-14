import axios from "axios";
import { API_KEY } from "@env";

async function authenticate(mode: "signUp" | "signInWithPassword", email: string, password: string) {
    const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`, {
        email: email,
        password: password,
        returnSecureToken: true,
    });

    return response.data.idToken;
}

export function createUser(email: string, password: string) {
    return authenticate("signUp", email, password);
}

export function login(email: string, password: string) {
    return authenticate("signInWithPassword", email, password);
}