import React from 'react'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'

const DismissKeyboardHOC = (Comp: any) => {
  return ({ children, ...props }: any) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>{children}</Comp>
    </TouchableWithoutFeedback>
  )
}
const DismissKeyboard = DismissKeyboardHOC(View)
export default React.memo(DismissKeyboard)
