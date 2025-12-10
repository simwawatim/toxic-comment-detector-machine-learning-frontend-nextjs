import { jwtDecode } from "jwt-decode";

interface AccessTokenPayload {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: string | number;
}

export const decodeAccessToken = (token: string): string | number | null => {
  try {
    const decoded: AccessTokenPayload = jwtDecode(token);
    return decoded.user_id ?? null;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
