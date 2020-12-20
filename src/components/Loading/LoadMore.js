import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import Text from '../TextView';

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  text: {
    color: '#a8a8a8',
  },
});

const LoadingMore = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" animating />
    <Text style={styles.text}>Đang tải...</Text>
  </View>
);

export default LoadingMore;
