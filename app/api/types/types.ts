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
