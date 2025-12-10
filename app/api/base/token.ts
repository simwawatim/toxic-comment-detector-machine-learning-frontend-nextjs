import Swal from "sweetalert2";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < currentTime) {
      Swal.fire({
        title: "Session Expired",
        text: "Your login session has expired. Please login again.",
        icon: "warning",
        confirmButtonText: "Login",
      }).then(() => {
        localStorage.removeItem("access_token");
        window.location.href = "/login";
      });

      return null;
    }

    return token;
  } catch (error) {
    console.error("Invalid JWT token:", error);
    localStorage.removeItem("access_token");
    return null;
  }
}
