import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { requestInterceptor, responseInterceptor } from './Interceptors'
import Endpoint from './Endpoint'

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

const timeout = 30000

class NetworkService {
  public client: AxiosInstance
  constructor() {
    this.client = axios.create({ baseURL: Endpoint().baseURL, headers, timeout })
    this.client.interceptors.response.use(responseInterceptor.onFulfill, responseInterceptor.onReject)
    this.client.interceptors.request.use(requestInterceptor.onFulfill, requestInterceptor.onReject)
  }

  request<T>({ method, url, data, ...config }: AxiosRequestConfig<any>) {
    return this.client.request<T>({ method, url, data, ...config })
  }
}

export const networkService = new NetworkService()
