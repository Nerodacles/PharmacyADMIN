import axios from "axios";

let axiosInstance = axios.create({
    baseURL: "https://pharmacy.jmcv.codes/",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = token;
            config.headers["api-key"] = "/>P<UvGV^18y(E~K};^TH7jHTa3Lz";
        }
        return config;
    }
);

export default axiosInstance;