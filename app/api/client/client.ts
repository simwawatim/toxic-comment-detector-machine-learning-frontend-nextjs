import axios from "axios";
import {BASE_API_URL} from "../base/base";
import { LoginResponse, LoginRequest, RegisterRequest, RegisterResponse, ProfilePictureResponse, UserListResponse, UserMessagesResponse, UserMessagesRequest, getUserByIdT, createMessageRequest, createMessageResponse, UpdateProfilePayload, UpdateProfileResponse } from "../types/types";
import { getAccessToken } from "../../api/base/token";
import router from "next/router";

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

    const token = getAccessToken();
        if (!token) {
      router.push("/");
    }

    const response = await axios.post(
        `${BASE_API_URL}messages/send/`,
        data,
        {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
        }
    );

  return response.data;
};
export const LoggedInUserProfile = async (): Promise <ProfilePictureResponse> => {
    const token = getAccessToken();
         if (!token) {
      router.push("/");
    }
    const response = await axios.get(
        `${BASE_API_URL}profile/me/`,
        {
            headers: {
                "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            }
        },
    )

    return response.data
}

export const UserListClient = async (): Promise< UserListResponse> => {
    const token = getAccessToken();
        if (!token) {
      router.push("/login");
    }
    const response = await axios.get(
         `${BASE_API_URL}users/`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        },

    )
    return response.data
}

export const UserMessageList = async (id: number): Promise<UserMessagesResponse> => {
    const token = getAccessToken();
        if (!token) {
      router.push("/");
    }
    const response = await axios.get(
        `${BASE_API_URL}messages/?receiver_id=${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }
    );
    
    return response.data;
}

export const getUserByIdClient = async (id: number): Promise<ProfilePictureResponse> => {
    const token = getAccessToken();
        if (!token) {
      router.push("/");
    }
    const response = await axios.get(
         `${BASE_API_URL}profile/${id}/`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        },
    )
    return response.data
}


export async function updateUserProfileClient(
  payload: UpdateProfilePayload
): Promise<UpdateProfileResponse> {
  const token = getAccessToken();
    if (!token) throw new Error("No token found");

  const formData = new FormData();
  if (payload.username) formData.append("username", payload.username);
  if (payload.email) formData.append("email", payload.email);
  if (payload.first_name) formData.append("first_name", payload.first_name);
  if (payload.last_name) formData.append("last_name", payload.last_name);
  if (payload.password) formData.append("password", payload.password);

  if (payload.profile_picture instanceof File) {
    formData.append("profile_picture", payload.profile_picture);
  }

  const res = await fetch(`${BASE_API_URL}users/update/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return await res.json();
}
