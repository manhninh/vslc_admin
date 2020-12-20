/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import {Badge} from 'react-native-elements';
import styles from '../style';
import Screen, * as AppValues from '../../AppValues';
import TextView from '../TextView';

const ServiceItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={mStyles.gridItem}>
      <View style={mStyles.touchContainer}>
        <TouchableCmp style={{flex: 1}} onPress={props.onPress}>
          <View style={{...mStyles.imageContainer}}>
            <Image style={mStyles.image} source={props.img} />
          </View>
        </TouchableCmp>
      </View>
      {props.badge !== '' && (
        <View
          style={{
            position: 'absolute',
            top: -4,
            right: 0,
            backgroundColor: AppValues.ORANGE,
            paddingHorizontal: 10,
            borderRadius: 10,
            paddingVertical: 2,
          }}>
          <TextView
            type="bold"
            style={{
              ...styles.white_txt,
              fontSize: AppValues.SIZE_TEXT_LABEL_SMALLER,
            }}>
            {props.badge}
          </TextView>
        </View>
        // <Badge
        //   value={
        //     <TextView
        //       type="bold"
        //       style={{
        //         ...styles.white_txt,
        //         fontSize: AppValues.SIZE_TEXT_LABEL_SMALLER,
        //       }}>
        //       {props.badge}
        //     </TextView>
        //   }
        //   badgeStyle={{
        //     backgroundColor: AppValues.ORANGE,
        //     padding: 10,
        //     height: 23,
        //   }}
        //   containerStyle={{
        //     position: 'absolute',
        //     top: -4,
        //     right: 0,
        //   }}
        // />
      )}
    </View>
  );
};

const mStyles = StyleSheet.create({
  gridItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    width: 120,
    height: 120,
    borderRadius: 10,
    // backgroundColor: 'red'
  },
  touchContainer: {
    backgroundColor: AppValues.COLOR_BG_WHITE,
    flex: 1,
    width: '75%',
    height: '75%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: AppValues.BACKDROP,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
});

export default ServiceItem;
