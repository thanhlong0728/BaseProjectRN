import { MMKV } from 'react-native-mmkv'
export enum STORAGE_KEYS {
  TOKEN = '@@TOKEN',
  APP_INSTALLED = '@@APP_INSTALLED',
  ACCOUNT_ACTIVE = '@@ACCOUNT_ACTIVE',
}
export const storage = new MMKV()

export const clearStorage = (excludeKey: string[] = []) => {
  const keys = storage.getAllKeys()
  keys.forEach(key => {
    if (!excludeKey.includes(key)) {
      storage.delete(key)
    }
  })
}

export default class MMKVStorage {
  static setData = (key: string, value: any) => {
    try {
      return storage.set(key, JSON.stringify(value))
    } catch (error) {
      console.log('errorr::', error)
      return null
    }
  }

  static getData = (key: string) => {
    try {
      let data: any = storage.getString(key)
      return JSON.parse(data)
    } catch (error) {
      console.log('errorr::', error)
      return null
    }
  }
}
