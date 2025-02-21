import React from 'react'
import { RefreshControl, RefreshControlProps } from 'react-native'
import { createNativeWrapper } from 'react-native-gesture-handler'
interface IAppRefreshControl extends Omit<RefreshControlProps, 'refreshing'> {
  onRefresh: () => void | Promise<void>
}

export const AndroidRefreshControl = createNativeWrapper(RefreshControl, {
  disallowInterruption: true,
  shouldCancelWhenOutside: false,
})

const AppRefreshControl = React.memo<IAppRefreshControl>(props => {
  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = async () => {
    try {
      setRefreshing(true)
      if (props.onRefresh && typeof props.onRefresh === 'function') {
        await props.onRefresh()
      }
    } catch (error) {
      console.log('📢 [AppRefreshControl.tsx:14]', error)
    } finally {
      setRefreshing(false)
    }
  }

  return <AndroidRefreshControl {...props} refreshing={refreshing} onRefresh={onRefresh} />
})

AppRefreshControl.displayName = 'AppRefreshControl'

export default AppRefreshControl
