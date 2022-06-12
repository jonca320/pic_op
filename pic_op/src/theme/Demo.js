import { StyleSheet} from 'react-native'
import { Text } from 'native-base'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Demo = () => {
  return (
    <SafeAreaView>
      <Text color  = "green.300">Demo</Text>
      </SafeAreaView>
  );
};

export default Demo

const styles = StyleSheet.create({})