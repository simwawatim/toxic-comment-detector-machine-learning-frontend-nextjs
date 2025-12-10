
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponseData {
  username: string;
  email: string;
  access: string;
  refresh: string;
}

export interface LoginResponse {
  status_code: number;
  status: string;
  message: string;
  data: LoginResponseData;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface RegisterResponseData {
  username: string;
  email: string;
}

export interface RegisterResponse {
  status_code: number; // number instead of string
  status: string;
  message: string;
  data: RegisterResponseData;
}


export interface ProfilePictureResponseData {
  username: string;
  email: string;
  profile_picture: string;
}

export interface ProfilePictureResponse {
  status_code: number;
  status: string;
  message: string;
  data: ProfilePictureResponseData;
}


export interface UserListResponseData {
  id: number;
  username: string;
  email: string;
  profile_picture: string; 
}


export interface UserListResponse {
  status_code: number;
  status: string;
  message: string;
  data: UserListResponseData[];
}

export interface UserMessagesResponseData {
  id: string;
  sender: number;
  receiver: number;
  text: string;
  toxic_tag: string;
  created_at: string;
  created_by: string;
}
export interface UserMessagesResponse {
  status_code: string;
  status: string;
  message: string;
  data: UserMessagesResponseData[];
}

export interface UserMessagesRequest {
  receiver_id: number;
}

export interface getUserByIdT {
  id: number;
}