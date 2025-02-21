import React from 'react'
import { DeviceEventEmitter } from 'react-native'

export enum EDeviceEmitter {
  GLOBAL_LOADING = 'GLOBAL_LOADING',
  SHOW_TOAST = 'SHOW_TOAST',
  CREATED_SESSION = 'CREATED_SESSION',
  REFRESH_HOME_SCREEN = 'REFRESH_HOME_SCREEN',
}

export const emitter = (type: EDeviceEmitter, param?: any) => {
  DeviceEventEmitter.emit(type, param)
}

const useEmitter = (type: EDeviceEmitter | null, callback?: (data: any) => void, deps: any = []) => {
  const savedCallback = React.useRef((_data: any) => {})
  if (callback) {
    savedCallback.current = callback
  }

  React.useEffect(() => {
    if (!type) {
      return
    }
    DeviceEventEmitter.addListener(type, savedCallback.current)
    return () => {
      DeviceEventEmitter.removeAllListeners(type)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, type, ...deps])
}

export default useEmitter
