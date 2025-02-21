import React, { memo } from 'react'
import { Platform, StatusBar, StatusBarProps, StyleProp, View, ViewStyle } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Layout, Colors } from '@/theme'
import { ScaledSheet } from 'react-native-size-matters'

interface ContainerProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  disableTop?: boolean
  disableBottom?: boolean
  disablePadding?: boolean
  statusBarProps?: StatusBarProps
  useFading?: boolean
  containerStyle?: ViewStyle
  safeAreaStyle?: ViewStyle
  safeAreaColor?: string
  header?: any
  isTab?: boolean
}

const Container = ({
  children,
  disablePadding = false,
  statusBarProps,
  safeAreaColor,
  safeAreaStyle,
  useFading = false,
  style,
  containerStyle,
  header,
  isTab = false,
}: ContainerProps) => {
  const insets = useSafeAreaInsets()

  const bottomInsets = Platform.OS === 'android' ? insets.bottom : 0

  const backgroundColor = safeAreaColor ?? containerStyle?.backgroundColor ?? Colors.background
  return (
    <View
      style={[
        Layout.fill,
        safeAreaStyle,
        isTab && styles.safeEdgeBottomTabbar,
        {
          backgroundColor,
          paddingTop: insets.top,
          paddingBottom: bottomInsets,
        },
      ]}>
      <View style={[Layout.fullWidth, { zIndex: 1 }]}>{header}</View>
      <Animated.View
        entering={useFading ? FadeIn : undefined}
        style={[
          styles.container,
          {
            backgroundColor,
          },
          containerStyle,
          disablePadding && styles.disablePadding,
        ]}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content" {...statusBarProps} />
        <View style={[Layout.fill, style]}>{children}</View>
      </Animated.View>
    </View>
  )
}

export default memo(Container)

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '16@s',
    padding: 0,
  },
  disablePadding: {
    padding: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  safeEdgeBottomTabbar: {
    marginBottom: '85@vs',
  },
})
