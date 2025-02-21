import { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { format } from 'date-fns'
import { STORAGE_KEYS, storage } from '../storage'
import { Alert } from 'react-native'
import { Messages, showToast } from '@/components/ToastMessage'

export enum HTTP_STATUS {
  APPLICATION_ERROR = 499,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
}

const STATUS_CUSTOM_ERROR = [HTTP_STATUS.NOT_FOUND]

const errorLogger = (responseError: any) => {
  const typeError = responseError?.response ? '[ErrorResponse]' : '[ErrorRequest]'
  const prefix = `[APP_113_STREAMER]${typeError}`
  const dateTime = format(new Date(), 'dd/MM/yyyy HH:mm:ss')
  const url = responseError?.response?.responseURL || responseError?.request?.responseURL
  const statusCode = responseError?.response?.status
  const payload = JSON.stringify(responseError?.response?.config?.data)
  const errData = JSON.stringify(responseError?.response?.data)
  console.log(`${prefix} ${dateTime} ${url} ${statusCode} ${payload} ${errData}`)
}

const successLogger = (responseSuccess: any) => {
  const prefix = '[APP_113_STREAMER] SuccessResponse'
  const dateTime = format(new Date(), 'dd/MM/yyyy HH:mm:ss')
  const url = responseSuccess?.config?.url
  const statusCode = responseSuccess?.status
  const payload = JSON.stringify(responseSuccess?.config?.data)
  console.log(`${prefix} ${dateTime} ${url} ${statusCode} ${payload}`)
}

export const responseInterceptor = {
  onFulfill(response: AxiosResponse<any, any>) {
    successLogger(response)
    return response
  },
  async onReject(error: any) {
    errorLogger(error)
    if (JSON.stringify(error?.message)?.includes('Network Error')) {
      showToast({ message: Messages.noInternetConnection, type: 'error' })
      return Promise.reject(error)
    }
    if (error?.response?.status === HTTP_STATUS.UNAUTHORIZED) {
      storage.delete(STORAGE_KEYS.TOKEN)
    }
    if (!STATUS_CUSTOM_ERROR.includes(error?.response?.status)) {
      Alert.alert('', error?.response?.data?.message)
    }
    return Promise.reject(error)
  },
}

export const requestInterceptor = {
  onFulfill(config: InternalAxiosRequestConfig<any>) {
    if (config.method === 'get') {
      const currentTime = new Date().getTime()
      const oldUrl = config.url
      if (oldUrl?.includes('?')) {
        config.url = `${oldUrl}&time=${currentTime}`
      } else {
        config.url = `${oldUrl}?time=${currentTime}`
      }
    }
    const token = storage.getString(STORAGE_KEYS.TOKEN)
    if (token && config.headers) {
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  },
  onReject(error: any) {
    console.log('====================================');
    console.log('API ERROR', error);
    console.log('====================================');
    return Promise.reject(error)
  },
}
