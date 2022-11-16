import axios from "axios"

let axiosInstance = axios.create({ baseURL: "https://pharmacy.jmcv.codes/" })

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        if (token) { config.headers.Authorization = token }
        return config
    }
)

axiosInstance.interceptors.response.use(
    (response) => { return response },
    (error) => {
        if (error.response.status === 401 || error.response.status === 403 || error.response.status === 500) {
            localStorage.removeItem("token")
            window.location.href = "/login"
        }
        return Promise.reject(error)
    }
)

export default axiosInstance