/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from './colors';
import TextView from './TextView';

const Title = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{...mStyles.container, ...props.style}}>
        <TextView {...this.props}>{props.text}</TextView>
      </View>
    </TouchableOpacity>
  );
};

const mStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.BACKDROP,
    justifyContent: 'center',
  },
});

export default Title;
