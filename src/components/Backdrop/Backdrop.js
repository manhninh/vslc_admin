/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
  View,
} from 'react-native';

class Backdrop extends React.Component {
  render() {
    const {image} = this.props;
    const source = image
      ? image.indexOf('http') !== -1
        ? {uri: image}
        : require('../../image/home.png')
      : null;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        {image ? (
          <ImageBackground
            source={source}
            style={{
              // // justifyContent: 'center',
              // alignItems: 'center',
              flex: 1,
              backgroundColor: 'transparent',
              alignSelf: 'stretch',
            }}>
            {this.props.children}
          </ImageBackground>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              backgroundColor: 'transparent',
              alignSelf: 'stretch',
            }}>
            {this.props.children}
          </View>
        )}
      </TouchableWithoutFeedback>
    );
  }
}

export default Backdrop;
