import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as AppValues from '../../AppValues';
import TextView from '../TextView';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: 500
  },
  list: {
    flex: 1,
    height: 50,
    width: AppValues.WIDTH_DEVICE,
    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: AppValues.COLOR_BG_GREY
  }
});

export default class Item extends Component {
  render() {
    const { name, button, select } = this.props;
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity
          onPress={button}
          style={[
            styles.list,
            {
              backgroundColor: select === name ? '#5c7891' : '#f3f6f9'
            }
          ]}
        >
          <TextView
            numberOfLines={1}
            style={{
              color: select === name ? AppValues.COLOR_BG_WHITE : '#a2a2a2',
              fontSize: AppValues.normalize(15),
              marginHorizontal: 10
            }}
          >
            {name}
          </TextView>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
