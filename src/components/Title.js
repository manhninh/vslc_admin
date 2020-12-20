/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from './colors';
import styles from './style';
import TextView from './TextView';

const Title = props => {
  return (
    <View style={{...mStyles.container, ...props.style}}>
      <View style={{width: 30, ...styles.cross_center}}>
        <Icon name={props.icon} size={20} color={Colors.primaryColor} />
      </View>
      <View style={{...styles.ml_15}}>
        <TextView>{props.text}</TextView>
      </View>
    </View>
  );
};

const mStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: Colors.BACKDROP,
  },
});

export default Title;
