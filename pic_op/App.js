import React from 'react';
import { Center, NativeBaseProvider } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, AppRegistry } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Demo from './src/theme/Demo';
import { customTheme } from './src/theme';
import Animated, {
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
withSpring,
Easing,
withDelay,
withDecay} from 'react-native-reanimated';
import { useEffect } from 'react';

/**
 * 
 * textSelect: {

    fontFamily: 'monospace',
    fontSize: 30,
    color: '#ffffff',
  },
 */

const SIZE = 100.0;


export default function App() {

//logon animation variables
const opac = useSharedValue(0);
const Ypos = useSharedValue(100);

//text animation variables
const textOpac = useSharedValue(0);
const logoScale = useSharedValue(350);

const reanimatedStyle = useAnimatedStyle(() => {
  return {

    width: logoScale.value,
    height: logoScale.value,
    transform: [{ translateY: Ypos.value }],
    opacity: opac.value
    
    };
});

const textSelect = useAnimatedStyle(() => {
  return {
    alignSelf: 'center',
    fontFamily: 'monospace',
    fontSize: 30,
    color: '#69747C',
    opacity: textOpac.value
    };
});


useEffect(() => {
  opac.value = withTiming(1, {duration: 1500});
  Ypos.value =  withDelay(1500, withSpring(-100, {duration: 5000}));
  textOpac.value = withDelay(2000, withTiming(1, {duration: 4000}))
  logoScale.value =  withDelay(1500, withSpring(250, {duration: 5000}));
}, [])


  return (


<NativeBaseProvider theme ={customTheme}>
<StatusBar
/>

<SafeAreaProvider>

<View style={styles.container}>

<Animated.Image 
             source={require('./assets/pic_op_logo.png')}
             resizeMode="contain"
            style={ reanimatedStyle} />
  



<TouchableOpacity
        onPress={() => {}}>
        <Animated.Text style = {textSelect} >   Get started </Animated.Text>
</TouchableOpacity>

 <View style = {styles.space}/>
 
<TouchableOpacity
         onPress={() => {}}>
        <Animated.Text style = {textSelect} >  About Pic Op </Animated.Text>
</TouchableOpacity>

<View style = {styles.space}/>

<TouchableOpacity 
        onPress={() => {}}>
        <Animated.Text style = {textSelect} >  Documentation  </Animated.Text>
</TouchableOpacity>


  </View>
</SafeAreaProvider>

</NativeBaseProvider>


    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFFDFD',
    
  },

  
  space: {
    paddingBottom: 60

  }
});