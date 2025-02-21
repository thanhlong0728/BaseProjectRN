import React from 'react'
import { ActivityIndicator, Animated, Image, ImageBackground, StyleProp, StyleSheet, ViewStyle } from 'react-native'
import FastImage, { ImageStyle } from 'react-native-fast-image'
import { Colors } from '@/theme'
import { scale } from 'react-native-size-matters'
import Constant from '@/controller/Constant'
interface IAppImageProps {
  uri?: string | number
  pictureStyle?: StyleProp<ImageStyle>
  loadingStyleProps?: ViewStyle
  children?: React.ReactNode
  size?: 'large' | 'normal' | 'small'
  width?: number
  height?: number
  borderRadius?: number
  pictureDefault?: any
}

const AppImage = ({
  children,
  uri,
  pictureStyle = {},
  loadingStyleProps = {},
  size,
  width,
  height,
  borderRadius,
  pictureDefault,
}: IAppImageProps) => {
  const opacity = React.useRef(new Animated.Value(1)).current
  const styleImage = React.useMemo(() => {
    let styleSize = {} as any
    switch (size) {
      case 'large':
        styleSize = {
          height: 104,
          width: 104,
          borderRadius: 104,
        }
        break
      case 'normal':
        styleSize = {
          height: 48,
          width: 48,
          borderRadius: 48,
        }
        break
      case 'small':
        styleSize = {
          height: 20,
          width: 20,
          borderRadius: 20,
        }
        break
      default:
        styleSize = {
          height: 64,
          width: 64,
          borderRadius: 64,
        }
        break
    }
    styleSize = {
      ...styleSize,
      width: scale(width ?? styleSize.width),
      height: scale(height ?? styleSize.height),
      borderRadius: scale(borderRadius ?? styleSize.borderRadius ?? 0),
    }
    return styleSize
  }, [borderRadius, height, size, width])

  const loadingStyle = React.useMemo(
    () => ({
      ...styles.loadingStyle,
      ...loadingStyleProps,
      opacity,
    }),
    [opacity, loadingStyleProps],
  )

  const _handleFinishLoading = React.useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {})
  }, [opacity])

  const src = React.useMemo(() => {
    if (pictureDefault && !uri) {
      return pictureDefault
    }
    if (!uri) {
      return Constant.icon.logoNoRadius
    }
    if (typeof uri === 'string') {
      return { uri }
    }
    return uri
  }, [pictureDefault, uri])

  const isLocalImg = React.useMemo(() => {
    if (uri && typeof uri === 'number') {
      return true
    }

    if (pictureDefault && !uri && typeof pictureDefault === 'number') {
      return true
    }

    if (!uri) {
      return true
    }

    return false
  }, [pictureDefault, uri])

  if (isLocalImg) {
    if (!children) {
      return <Image source={src} style={[styleImage, pictureStyle]} />
    }
    return (
      <ImageBackground source={src} style={[styleImage, pictureStyle]}>
        {children}
      </ImageBackground>
    )
  }

  return (
    <FastImage source={src} style={[styleImage, pictureStyle]} onLoadEnd={_handleFinishLoading}>
      {children}
      {uri && (
        <Animated.View style={loadingStyle}>
          <ActivityIndicator size={'small'} color={Colors.mainDark} />
        </Animated.View>
      )}
    </FastImage>
  )
}

export const styles = StyleSheet.create({
  loadingStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    zIndex: -1,
  },
})

export default React.memo(AppImage)
