import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Platform, PermissionsAndroid, Linking, Alert } from 'react-native'
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import HomeScreen from '@/screens/HomeScreen'
import ArgearScreen from '@/screens/ArgearScreen'

const Stack = createNativeStackNavigator()
export const _refNavigation = createNavigationContainerRef()

const RootNavigation = () => {
  const [screen, setScreen] = useState('HomeScreen')

  return screen != null ? (
    <SafeAreaProvider>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={screen}>
          <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
          <Stack.Screen name={'ArgearScreen'} component={ArgearScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  ) : (
    <View />
  )
}

export default RootNavigation
