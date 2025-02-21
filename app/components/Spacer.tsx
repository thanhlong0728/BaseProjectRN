import React from 'react'
import { View } from 'react-native'
import { s, vs } from 'react-native-size-matters'

const DEFAULT_SPACE = 20

export type SpacerMode = 'horizontal' | 'vertical' | 'expand' | 'left' | 'right'

const SPACER_STYLES = {
  left: (size: number) => ({ width: s(size) }),
  right: (size: number) => ({ width: s(size) }),
  horizontal: (size: number) => ({ width: s(size) }),
  vertical: (size: number) => ({ height: vs(size) }),
  expand: () => ({ flex: 1 }),
}

const Spacer: React.FC<{ mode?: SpacerMode; size?: number }> = ({ mode = 'vertical', size = DEFAULT_SPACE }) => {
  const style = SPACER_STYLES[mode](size)
  return <View style={style} />
}
export default React.memo(Spacer)
