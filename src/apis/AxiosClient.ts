import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://10.0.255.40:8001',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
})

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('Response method and status', {
      method: response.config.method,
      status: response.status,
    })
    return response
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error('Response Error', {
        method: error.response.config.method,
        status: error.response.status,
        data: error.response.data,
      })
    } else {
      console.error('Response Error', error)
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
