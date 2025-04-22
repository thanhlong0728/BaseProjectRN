import { StackActions, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  NativeModules,
  TextInput,
  requireNativeComponent,
  TouchableOpacity,
  NativeEventEmitter,
  Alert,
  Platform,
} from 'react-native'
import FastImage from 'react-native-fast-image'

import { SafeAreaView } from 'react-native-safe-area-context'

import Constant from '../controller/Constant'

const { ArgearNativeModule, VC, RNEventEmitter } = NativeModules

type mediaDataType = {
  filePath?: string
  isVideo?: boolean
  aspectRation?: number | string
}

const ArgearScreen = () => {
  const eventEmitter = new NativeEventEmitter(RNEventEmitter)
  const [fileUri, setFileUri] = useState('')
  const navigation = useNavigation()

  const showConfirmScreen = (mediaData: mediaDataType) => {}

  const showHomeScreen = () => {}

  useEffect(() => {
    const subcribe = eventEmitter.addListener('onFinished', resInfo => {
      if (Platform.OS === 'ios') {
        // resInfo = JSON.stringify(resInfo)
        if (resInfo === 'back') {
          showHomeScreen()
          return
        }

        if (String(resInfo?.mediaType) == 'video') {
          showConfirmScreen({
            filePath: resInfo?.filePath,
            aspectRation: resInfo?.ratio || 1,
            isVideo: true,
          })
        } else {
          let fileUrl = `file://${resInfo?.filePath}`
          showConfirmScreen({
            filePath: fileUrl,
            aspectRation: resInfo?.ratio || 1,
            isVideo: false,
          })
          setFileUri(fileUrl)
        }
      }
    })
    return () => {
      subcribe.remove()
    }
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (Platform.OS === 'android') {
        VC.setCallBack((path: any, ratio: any) => {
          if (path == null) {
            //Event click back button
            showHomeScreen()
          } else {
            let fileUrl = `file://${path}`
            setFileUri(fileUrl)

            if (fileUrl.includes('.mp4')) {
              showConfirmScreen({
                filePath: fileUrl,
                isVideo: true,
                aspectRation: 1 / ratio,
              })
            } else {
              showConfirmScreen({
                filePath: fileUrl,
                isVideo: false,
                aspectRation: 1 / ratio,
              })
            }
          }
        })
        VC.openViewControllerInMainStory()
      } else {
        VC.openViewControllerInMainStory()
      }
    })
    return unsubscribe
  }, [navigation])

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              VC.openViewControllerInMainStory()
            }}>
            <Text>Open Argear Screen</Text>
          </TouchableOpacity>
          <FastImage
            source={{ uri: fileUri }}
            style={{
              width: 200,
              height: 200,
              backgroundColor: 'coral',
            }}
          />
        </View>
      </SafeAreaView>
    </>
  )
}

export default ArgearScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDBD15',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
  },
  logoImg: {
    width: Constant.screen.width * 0.49,
    resizeMode: 'contain',
  },
  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentView: {
    flex: 1,
    justifyContent: 'center',
  },
  rootText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 18,
  },
  text: {
    textDecorationLine: 'underline',
    fontSize: 12,
  },
  registerText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
})
