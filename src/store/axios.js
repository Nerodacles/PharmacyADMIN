import axios from "axios";

let axiosInstance = axios.create({
    baseURL: "https://pharmacy.jmcv.codes/",
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    }
);

export default axiosInstance;