import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("Network error:", error);
      alert("Network error. Please try again.");
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    const message = data?.message || "Something went wrong";

    switch (status) {
      case 400:
        alert(message);
        break;
      case 404:
        alert("Resource not found");
        break;
      case 500:
        alert("Server error");
        break;
      default:
        alert(message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
