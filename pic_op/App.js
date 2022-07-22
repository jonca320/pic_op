import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, AppRegistry} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { customTheme } from './src/theme';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AboutScreen from './screens/AboutScreen';
import GetStartedScreen from './screens/GetStartedScreen.js';
import PlaceholderScreen from './screens/PlaceholderScreen';

import Animated, {
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
withSpring,
withDelay,} from 'react-native-reanimated';
import { useEffect } from 'react';
import 'react-native-gesture-handler';




const SIZE = 100.0;
const Stack = createStackNavigator();

//STACK-SCREENS

//Main Stack screen "Home"



export default function App() {



//logo animation variables
const opac = useSharedValue(0);
const Ypos = useSharedValue(50);

//text animation variables
const textOpac = useSharedValue(0);
const logoScale = useSharedValue(350);



function Home ({navigation}) {

  function animatedNav(path) {


    logoScale.value =  withSpring(100, {duration: 2000});
    Ypos.value =  withSpring(20, {duration: 2000});
    navigation.navigate(path)
  
  
  };

  return (
    <View>
      <Animated.Image 
             source={require('./assets/pic_op_logo.png')}
             resizeMode="contain"
            style={reanimatedStyle} />

      <View style = {styles.space}/>

  <TouchableOpacity
           onPress={() => navigation.navigate('About')}>
          <Animated.Text style = {textSelect} > About Pic Op </Animated.Text>
  </TouchableOpacity>
  <View style = {styles.space}/>

  <TouchableOpacity
  onPress={() =>animatedNav('GetStarted')}>
  <Animated.Text style = {textSelect} >  Get started </Animated.Text>
</TouchableOpacity>

<View style = {styles.space}/>

<TouchableOpacity 
onPress={() => navigation.navigate('Documentation')}>
<Animated.Text style = {textSelect} >  Documentation  </Animated.Text>
</TouchableOpacity>
</View>

  );
  
  }

  //Selectable stack-screens from "Home"
  function GetStarted ({navigation}) {

    function animatedNav() {

      logoScale.value =  withSpring(250, {duration: 2000});
      navigation.goBack()
    } 

    //PLACEHOLDER!!
    return (<View>
        <TouchableOpacity
        
        onPress={() => animatedNav()}>
          <Animated.Image 
             source={require('./assets/pic_op_logo.png')}
             resizeMode="contain"
            style={reanimatedStyle} />
      
    </TouchableOpacity>
    <GetStartedScreen/>

    </View>
    );
    
    }

function About ({navigation}) {

  //PLACEHOLDER!!
  return (
    <View>
       <AboutScreen/>
        <TouchableOpacity
        onPress={() => navigation.goBack()}>
       <Animated.Text style = {textSelect} > Go back </Animated.Text>
    </TouchableOpacity>
    </View>
  );
  
  }
  function Documentation ({navigation}) {
//PLACEHOLDER!!
   

    return (
      <View>
      <PlaceholderScreen/>
      <TouchableOpacity
      onPress={() => navigation.goBack()}>
     <Animated.Text style = {textSelect} > Go back </Animated.Text>
  </TouchableOpacity>
  </View>
  
    );
    
    }

    
    function MyStack() {
      return (
        <Stack.Navigator screenOptions={ {
          headerShown: false,
          detachPreviousScreen: true, presentation: 'transparentModal',
          cardStyle: {backgroundColor: "#FFFFFF"
          }}}>
          <Stack.Screen name ="Home" component = {Home} />
          <Stack.Screen name ="GetStarted" component = {GetStarted} />
          <Stack.Screen name ="About" component = {About} />
          <Stack.Screen name ="Documentation" component = {Documentation} />
          
      
        </Stack.Navigator>
      );
      }

//Main screen transitions
const reanimatedStyle = useAnimatedStyle(() => {
  return {
    alignSelf: 'center',
    width: logoScale.value,
    height: logoScale.value,
    transform: [{ translateY: Ypos.value }],
    opacity: opac.value
    
    };
});

//Values of main-screen routes
const textSelect = useAnimatedStyle(() => {
  return {
    alignSelf: 'center',
    fontSize: 30,
    color: '#69747C',
    opacity: textOpac.value
    };
});


//Specific animations upon app start
useEffect(() => {
  opac.value = withTiming(1, {duration: 1500});
  Ypos.value =  withDelay(1500, withSpring(0, {duration: 5000}));
  textOpac.value = withDelay(2000, withTiming(1, {duration: 4000}))
  logoScale.value =  withDelay(1500, withSpring(250, {duration: 5000}));
}, [])






return (


<NativeBaseProvider theme ={customTheme}>
<StatusBar
/>

<SafeAreaProvider>


{/* <Animated.Image 
             source={require('./assets/pic_op_logo.png')}
             resizeMode="contain"
            style={reanimatedStyle} /> */}

 <NavigationContainer>
<MyStack/>
</NavigationContainer>
<View style = {styles.space}/>

</SafeAreaProvider>

</NativeBaseProvider>


    );
}

//Background styling
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