import axios from "axios";
import {BASE_API_URL} from "../base/base";
import { LoginResponse, LoginRequest, RegisterRequest, RegisterResponse, ProfilePictureResponse, UserListResponse, UserMessagesResponse, UserMessagesRequest, getUserByIdT, createMessageRequest, createMessageResponse } from "../types/types";


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

export const RegisterClient = async (data: RegisterRequest): Promise <RegisterResponse> => {
    const response = await axios.post(
         `${BASE_API_URL}register/`,
         data,
         {
            headers: {
                "Content-Type": "application/json",
            }
        },
    )
    return response.data
}


export const createMessageClient = async (data: createMessageRequest): Promise<createMessageResponse> => {
    const response = await axios.post(
         `${BASE_API_URL}messages/send/`,
         data,
         {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoyMDgwNjU5ODczLCJpYXQiOjE3NjUyOTk4NzMsImp0aSI6IjU0ZGRmZGI0MzcxNjRjYzc5ZDA0ZDQ0MWM5MTc2YmU5IiwidXNlcl9pZCI6IjcifQ.mFHFeLlJf_D9Llp0jkuX5wBeyiZMv4dZzqd5yambNxc`
            }
        },
    )

    return response.data
}

export const LoggedInUserProfile = async (): Promise <ProfilePictureResponse> => {
    const response = await axios.get(
        `${BASE_API_URL}profile/me/`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoyMDgwNjU5ODczLCJpYXQiOjE3NjUyOTk4NzMsImp0aSI6IjU0ZGRmZGI0MzcxNjRjYzc5ZDA0ZDQ0MWM5MTc2YmU5IiwidXNlcl9pZCI6IjcifQ.mFHFeLlJf_D9Llp0jkuX5wBeyiZMv4dZzqd5yambNxc`
            }
        },
    )

    return response.data
}

export const UserListClient = async (): Promise< UserListResponse> => {
    const response = await axios.get(
         `${BASE_API_URL}users/`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoyMDgwNjU5ODczLCJpYXQiOjE3NjUyOTk4NzMsImp0aSI6IjU0ZGRmZGI0MzcxNjRjYzc5ZDA0ZDQ0MWM5MTc2YmU5IiwidXNlcl9pZCI6IjcifQ.mFHFeLlJf_D9Llp0jkuX5wBeyiZMv4dZzqd5yambNxc`
            }
        },

    )
    return response.data
}

export const UserMessageList = async (id: number): Promise<UserMessagesResponse> => {
    const response = await axios.get(
        `${BASE_API_URL}messages/?receiver_id=${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoyMDgwNjU5ODczLCJpYXQiOjE3NjUyOTk4NzMsImp0aSI6IjU0ZGRmZGI0MzcxNjRjYzc5ZDA0ZDQ0MWM5MTc2YmU5IiwidXNlcl9pZCI6IjcifQ.mFHFeLlJf_D9Llp0jkuX5wBeyiZMv4dZzqd5yambNxc`
            }
        }
    );
    
    return response.data;
}

export const getUserByIdClient = async (id: number): Promise<ProfilePictureResponse> => {
    const response = await axios.get(
         `${BASE_API_URL}profile/${id}/`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoyMDgwNjU5ODczLCJpYXQiOjE3NjUyOTk4NzMsImp0aSI6IjU0ZGRmZGI0MzcxNjRjYzc5ZDA0ZDQ0MWM5MTc2YmU5IiwidXNlcl9pZCI6IjcifQ.mFHFeLlJf_D9Llp0jkuX5wBeyiZMv4dZzqd5yambNxc`
            }
        },
    )
    return response.data
}