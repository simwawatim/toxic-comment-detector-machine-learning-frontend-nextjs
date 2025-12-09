import axios from "axios";
import BASE_API_URL from "../base/base";
import { LoginResponse, LoginRequest } from "../types/types";


export const LoginClient = async (data: LoginRequest): Promise <LoginResponse> => {
    const response = await axios.post(
        `${BASE_API_URL}login/`,
        data,
        {
            headers: {
                "Content-Type": "application/json",
            }
        },
    )
    return response.data;
};