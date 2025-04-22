import RootNavigation from '@/navigation/RootNavigation'
import React from 'react'
import type { PropsWithChildren } from 'react'
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'

type SectionProps = PropsWithChildren<{
  title: string
}>

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <RootNavigation />
    </SafeAreaProvider>
  )
}

export default App
