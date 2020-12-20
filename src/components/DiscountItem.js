/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import styles from '../components/style';
import TextView from '../components/TextView';
import Colors from '../components/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

class DiscountItem extends React.Component {
  render() {
    let {title, startTime, endTime, img} = this.props.data;
    let {onPress} = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={mStyles.container}>
          <View style={mStyles.imageContainer}>
            <Image style={mStyles.image} source={img} />
          </View>
          <View style={mStyles.infoContainer}>
            <View
              style={{...styles.row, ...styles.cross_center, ...styles.ph_5}}>
              <View>
                <Icon name="flash" size={20} color={Colors.RED} />
              </View>
              <TextView
                type="bold"
                style={{...mStyles.title}}
                numberOfLines={1}>
                {title}
              </TextView>
            </View>
            <TextView style={{...mStyles.time}}>
              Từ {startTime} đến {endTime}
            </TextView>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const mStyles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 10,
    height: Dimensions.get('window').height / 5,
    minHeight: 130,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: Colors.LIGHT_BLUE,
  },
  imageContainer: {
    height: '60%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'stretch',
  },
  infoContainer: {
    height: '40%',
    padding: 5,
  },
  title: {
    fontSize: 18,
    color: Colors.BLUE,
    marginHorizontal: 10,
  },
  time: {
    fontSize: 15,
    color: Colors.BLACK,
    textAlign: 'center',
  },
});

export default DiscountItem;
