import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器：添加token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器：处理错误
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// API 接口定义
export const authAPI = {
  login: (data: { username: string; password: string }) =>
    apiClient.post("/auth/login", data),
  register: (data: { username: string; password: string; email: string }) =>
    apiClient.post("/auth/register", data),
};

export const boxAPI = {
  createBox: (data: { title: string; content: string }) =>
    apiClient.post("/boxes", data),
  getBoxes: () => apiClient.get("/boxes"),
  getBox: (id: string) => apiClient.get(`/boxes/${id}`),
};
