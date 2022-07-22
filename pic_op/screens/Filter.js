import React from 'react';
import { StyleSheet, View, Button} from 'react-native';
import { Text } from 'native-base';

export default ({ name, minimum, maximum, onChange }) => (
  <View style={styles.container}>
    <Text style={styles.text} on>{name}</Text>
    <Button title ="press" onPress={onChange}></Button>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 300,
    paddingLeft: 20,
  },
  text: { textAlign: 'center' },
  slider: { width: 150 },
});