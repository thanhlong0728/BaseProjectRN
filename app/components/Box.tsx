import { Layout } from '@/theme'
import React, { forwardRef, memo } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { s, vs } from 'react-native-size-matters'

interface BoxProps extends ViewStyle {
  children?: React.ReactNode
  fill?: boolean
  flex?: number
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  backgroundColor?: string
  opacity?: number
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  reverse?: boolean
  row?: boolean
  center?: boolean
  paddingBottom?: number
  paddingLeft?: number
  paddingRight?: number
  paddingTop?: number
  paddingHorizontal?: number
  paddingVertical?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  marginTop?: number
  marginHorizontal?: number
  marginVertical?: number
  height?: number | 'auto' | `${number}%`
  width?: number | 'auto' | `${number}%`
  maxHeight?: number | 'auto' | `${number}%`
  minHeight?: number | 'auto' | `${number}%`
  maxWidth?: number | 'auto' | `${number}%`
  minWidth?: number | 'auto' | `${number}%`
  radius?: number
  topLeftRadius?: number
  topRightRadius?: number
  bottomLeftRadius?: number
  bottomRightRadius?: number
  overflow?: 'visible' | 'hidden' | 'scroll'
  borderTopWidth?: number
  borderBottomWidth?: number
  borderLeftWidth?: number
  borderRightWidth?: number
  borderTopColor?: string
  borderBottomColor?: string
  borderLeftColor?: string
  borderRightColor?: string
  borderWidth?: number
  borderColor?: string
  gap?: number
  style?: StyleProp<ViewStyle>
}

const Box = forwardRef(
  (
    {
      children,
      fill,
      flex,
      align,
      flexWrap,
      justify,
      center,
      reverse,
      alignSelf,
      row,
      style,
      paddingBottom,
      paddingHorizontal,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingVertical,
      marginBottom,
      marginHorizontal,
      marginLeft,
      marginRight,
      marginTop,
      marginVertical,
      backgroundColor,
      height,
      maxHeight,
      minHeight,
      maxWidth,
      minWidth,
      width,
      opacity,
      radius,
      topLeftRadius,
      topRightRadius,
      bottomLeftRadius,
      bottomRightRadius,
      overflow,
      borderBottomColor,
      borderBottomWidth,
      borderLeftColor,
      borderLeftWidth,
      borderRightColor,
      borderRightWidth,
      borderTopColor,
      borderTopWidth,
      borderColor,
      borderWidth,
      gap,
      ...restProps
    }: BoxProps,
    ref: React.ForwardedRef<View>,
  ) => {
    return (
      <View
        {...restProps}
        ref={ref}
        style={
          [
            style,
            row ? (reverse ? Layout.rowReverse : Layout.row) : reverse ? Layout.columnReverse : Layout.column,
            center && Layout.center,
            fill && Layout.fill,
            flex && { flex },
            opacity && { opacity },
            height && {
              height: typeof height === 'string' ? height : vs(height),
            },
            width && {
              width: typeof width === 'string' ? width : s(width),
            },
            maxHeight && {
              maxHeight: typeof maxHeight === 'string' ? maxHeight : vs(maxHeight),
            },
            minHeight && {
              minHeight: typeof minHeight === 'string' ? minHeight : vs(minHeight),
            },
            maxWidth && {
              maxWidth: typeof maxWidth === 'string' ? maxWidth : s(maxWidth),
            },
            minWidth && {
              minWidth: typeof minWidth === 'string' ? minWidth : s(minWidth),
            },
            backgroundColor && { backgroundColor },
            align && { alignItems: align },
            justify && { justifyContent: justify },
            alignSelf && { alignSelf },
            flexWrap && { flexWrap },
            radius && { borderRadius: s(radius) },
            overflow && { overflow },
            topLeftRadius && {
              borderTopLeftRadius: s(topLeftRadius),
            },
            topRightRadius && {
              borderTopRightRadius: s(topRightRadius),
            },
            bottomLeftRadius && {
              borderBottomLeftRadius: s(bottomLeftRadius),
            },
            bottomRightRadius && {
              borderBottomRightRadius: s(bottomRightRadius),
            },
            paddingBottom && {
              paddingBottom: vs(paddingBottom),
            },
            paddingLeft && { paddingLeft: s(paddingLeft) },
            paddingRight && { paddingRight: s(paddingRight) },
            paddingTop && { paddingTop: vs(paddingTop) },
            paddingHorizontal && {
              paddingHorizontal: s(paddingHorizontal),
            },
            paddingVertical && {
              paddingVertical: vs(paddingVertical),
            },
            marginBottom && { marginBottom: vs(marginBottom) },
            marginLeft && { marginLeft: s(marginLeft) },
            marginRight && { marginRight: s(marginRight) },
            marginTop && { marginTop: vs(marginTop) },
            marginHorizontal && {
              marginHorizontal: s(marginHorizontal),
            },
            marginVertical && {
              marginVertical: vs(marginVertical),
            },
            borderTopWidth && {
              borderTopWidth: s(borderTopWidth),
            },
            borderBottomWidth && {
              borderBottomWidth: s(borderBottomWidth),
            },
            borderLeftWidth && {
              borderLeftWidth: s(borderLeftWidth),
            },
            borderRightWidth && {
              borderRightWidth: s(borderRightWidth),
            },
            borderTopColor && { borderTopColor },
            borderBottomColor && { borderBottomColor },
            borderLeftColor && { borderLeftColor },
            borderRightColor && { borderRightColor },
            borderColor && { borderColor },
            borderWidth && { borderWidth: s(borderWidth) },
            gap && { gap: s(gap) },
          ] as any
        }>
        {children}
      </View>
    )
  },
)

export default memo(Box)
