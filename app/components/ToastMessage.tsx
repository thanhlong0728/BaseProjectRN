import { Colors, FontSizes, Spacing } from '@/theme'
import React, { memo } from 'react'
import AppText from './AppText'
import Animated, {
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
} from 'react-native-reanimated'

import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { s, vs } from 'react-native-size-matters'
import Spacer from './Spacer'
import useEmitter, { EDeviceEmitter, emitter } from '@/hook/useEmitter'

interface ToastMessageProps {
  message: string
  type: 'success' | 'error' | 'warning'
  duration?: number
}

export const Messages = {
  noInternetConnection: 'インターネットには接続されません。',
  buyMusicSuccess: 'メンバーシップの設定が完了しました。',
  editMembershipSuccess: 'メンバーシップの編集が完了しました。',
  setupMembershipError: '設定できませんでした。',
  editMembershipError: '編集できませんでした',
  editProfileSuccess: 'プロファイル更新しました',
}

export const showToast = ({ message = '', type = 'success', duration = 3000 }: ToastMessageProps) => {
  emitter(EDeviceEmitter.SHOW_TOAST, { message, type, duration })
}

const WIDTH_SCREEN_WITHOUT_PADDING = Dimensions.get('window').width - s(Spacing.m * 2)

const ToastMessage = () => {
  const MESSAGE_MARGIN_TOP = vs(30)
  const [options, setOptions] = React.useState<ToastMessageProps>({
    message: '',
    type: 'success',
    duration: 3000,
  })

  const ani = useSharedValue(0)

  useEmitter(EDeviceEmitter.SHOW_TOAST, (opts: ToastMessageProps) => {
    setOptions(opts)
  })

  const trans = useAnimatedStyle(() => {
    'worklet'
    return {
      transform: [
        { translateY: interpolate(ani.value, [0, 10], [-3 * MESSAGE_MARGIN_TOP, MESSAGE_MARGIN_TOP], 'clamp') },
      ],
    }
  })

  React.useEffect(() => {
    if (options.message && options.duration) {
      ani.value = withSpring(0, { mass: 1.9, damping: 41, stiffness: 325, overshootClamping: false })
      cancelAnimation(ani)
      ani.value = withSequence(
        withSpring(0, { mass: 1.9, damping: 41, stiffness: 325, overshootClamping: false }),
        withSpring(10, { mass: 1.9, damping: 58, stiffness: 300, overshootClamping: false }),
        withDelay(
          options.duration,
          withSpring(0, { mass: 1.9, damping: 41, stiffness: 325, overshootClamping: false }),
        ),
      )
    }
  }, [ani, options])

  return (
    <Animated.View
      style={[
        styles.containerToast,
        trans,
        { backgroundColor: options?.type === 'success' ? Colors.KA8DC83 : Colors.error },
      ]}>
      <TouchableOpacity
        style={styles.wrapper}
        activeOpacity={1}
        onPress={() => {
          cancelAnimation(ani)
          ani.value = withSpring(0, { mass: 1.9, damping: 41, stiffness: 325, overshootClamping: false })
        }}>
        <Spacer mode="horizontal" size={Spacing.xs} />
        <AppText
          style={styles.styleText}
          numberOfLines={3}
          fontSize={FontSizes.small}
          fontWeight={600}
          color={Colors.background}>
          {typeof options.message !== 'string' ? 'Something went wrong' : options.message}
        </AppText>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  containerToast: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    zIndex: 1,
  },
  wrapper: {
    width: WIDTH_SCREEN_WITHOUT_PADDING,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bgGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    borderRadius: 8,
  },
  styleText: {
    width: WIDTH_SCREEN_WITHOUT_PADDING - s(22),
  },
})

export default memo(ToastMessage)
