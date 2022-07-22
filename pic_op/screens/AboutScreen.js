import React, { Component } from 'react';
import { Dimensions, StyleSheet,
  Text,
  Button,
View} from 'react-native';

import { Surface } from 'gl-react-expo';
import ImageFilters from 'react-native-gl-image-filters';

import Filter from './Filter';

const width = Dimensions.get('window').width - 40;

const settings = [
 
  {
    name: 'contrast',
    minValue: -10.0,
    maxValue: 10.0,
  }
];

export default class AboutScreen extends Component {
  state = {
    ...settings,
  
    contrast: 1,
    saturation: 1,
    brightness: 1,
    temperature: 6500,
    exposure: 0,
  };

  render() {
    return (
      <View style={styles.content} showsVerticalScrollIndicator={false}>

      <Surface style={{ width, height: width }} ref={ref => (this.image = ref)}>
      <ImageFilters {...this.state} width={width} height={width}>
        {{ uri: 'https://i.imgur.com/5EOyTDQ.jpg' }}
      </ImageFilters>
    </Surface>
    {settings.map(filter => (
            <Filter
              key={filter.name}
              name="Binarize!"
              onChange={value => this.setState({ saturation: 0, contrast: 10 })}
            />
          ))}


    </View>
    );
  }
}

const styles = StyleSheet.create({
  content: { marginTop: 20, marginHorizontal: 20 },
  button: { marginVertical: 20, borderRadius: 0 },
});