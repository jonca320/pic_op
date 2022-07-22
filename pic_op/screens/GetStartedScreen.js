import React from 'react';
import {StyleSheet, View, Text, SafeAreaView, Button, Image, TouchableOpacity} from 'react-native';
import {Camera} from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library'




export default function GetStartedScreen () {

let cameraRef = useRef();

const [hasCameraPermission, setHasCameraPermission] = useState();
const [hasMediaPermission, setHasMediaPermission] = useState();
const [photo, setPhoto] = useState();
//Check permission with user to use medialibrary and camera
useEffect(() => {
  (async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
    setHasCameraPermission(cameraPermission.status === "granted");
    setHasMediaPermission(mediaLibraryPermission.status === "granted");
  })();
}, []);

//Check if permission has been granted
if(hasCameraPermission === undefined) {

  return <Text>Requesting permission...</Text>
} else if(!hasCameraPermission) {

return <Text>Permission not granted. </Text>
}


let takePic = async () => {
let options = {

  quality: 0.5,
  base64: true,
  exif: false
};
let newPhoto = await cameraRef.current.takePictureAsync(options);
setPhoto(newPhoto);
}

if (photo) {
  let sharePic = () => {
    shareAsync(photo.uri).then(() => {
      setPhoto(undefined);
    });

  };
  let savePhoto = () => {

    MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
      setPhoto(undefined);
    });
  };

  let  binarizePhoto = async () => {


  }

return (

  <SafeAreaView style={styles.container}>

<Image  style={styles.preview} source =  { {uri: "data:image/jpg;base64," + photo.base64}}/>
<Button title="Share" onPress={sharePic} />
        {hasMediaPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
        <Button title="Binarize" onpress={() => binarizePhoto()}/>
  </SafeAreaView>
)

}
  return (
    
<Camera style={styles.container} ref={cameraRef}>
<View style={styles.buttonContainer}>

<TouchableOpacity
 onPress = {takePic}>
<Image source = {require('../assets/photo_logo.png')}
style = {styles.photoStyle}/>

</TouchableOpacity>

</View>



</Camera>

  )
  
}

const styles = StyleSheet.create({
  container: {
  alignItems: 'center',
  justifyContent: 'center',
  height: 700,
  flex: 0
  },
  buttonContainer: {
  marginTop: 450
  
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
    
  },
  photoStyle: {
      height: 80,
      width: 80

  }
});