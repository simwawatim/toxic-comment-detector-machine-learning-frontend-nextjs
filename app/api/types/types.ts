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

export interface RegisterResponseData {
    username: string;
    email: string
}
export interface RegisterResponse{
    status_code: string;
    status: string;
    message: string;
    data: RegisterResponseData;

}
export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}