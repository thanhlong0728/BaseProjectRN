import React, { memo } from 'react'
import { StyleProp, StyleSheet, TextProps, TextStyle, View } from 'react-native'
import { ms } from 'react-native-size-matters'
import { AppFonts, FontSizes, Colors } from '@/theme'

const Text = require('react-native/Libraries/Text/TextNativeComponent').NativeText
export interface AppTextProps extends TextProps {
  children: React.ReactNode
  fontWeight?: keyof typeof AppFonts | string
  fontSize?: number | keyof typeof FontSizes
  color?: string
  lineHeightRatio?: number
  lineHeight?: number
  style?: StyleProp<TextStyle>
  align?: 'left' | 'center' | 'right'
  useDefaultFont?: boolean
  viewStyle?: StyleProp<TextStyle>
}

const AppText = ({
  children,
  fontWeight = 400,
  fontSize = 'normal',
  color = Colors.mainDark,
  lineHeightRatio = 1.3125,
  lineHeight,
  style,
  viewStyle,
  align = 'left',
  useDefaultFont = false,
  ...restProps
}: AppTextProps) => {
  const size = typeof fontSize === 'string' ? FontSizes[fontSize] : fontSize
  const textStyles = {
    fontFamily: useDefaultFont ? undefined : typeof fontWeight === 'string' ? fontWeight : AppFonts[fontWeight],
    color,
    fontSize: ms(size),
    ...(lineHeightRatio && {
      lineHeight: ms(size * lineHeightRatio),
    }),
    ...(lineHeight && { lineHeight: ms(lineHeight) }),
    textAlign: align,
  }
  return Array.isArray(children) ? (
    <View style={viewStyle}>
      <Text {...restProps} style={[styles.base, textStyles, style]} ellipsizeMode="tail">
        {children.map((child, idx) => (
          <React.Fragment key={`${child}_${idx}`}>
            {typeof child === 'string' ? (
              <Text {...restProps} style={[styles.base, textStyles, style]} ellipsizeMode="tail">
                {child}
              </Text>
            ) : (
              child
            )}
          </React.Fragment>
        ))}
      </Text>
    </View>
  ) : (
    <View style={viewStyle}>
      <Text {...restProps} style={[styles.base, textStyles, style]} ellipsizeMode="tail">
        {children}
      </Text>
    </View>
  )
}

export default memo(AppText)

const styles = StyleSheet.create({
  base: {
    flexShrink: 1,
    color: Colors.mainDark,
  },
})
