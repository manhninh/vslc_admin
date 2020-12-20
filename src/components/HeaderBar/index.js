import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import TextView from '../TextView';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Screen, * as AppValues from '../../AppValues';

export default class HeaderBar extends Component {
  static propTypes = {
    title: PropTypes.string,
    btnBack: PropTypes.bool,
    textBtnRight: PropTypes.string,
    onPressRight: PropTypes.func,
  };

  static defaultProps = {
    title: undefined,
    btnBack: false,
    textBtnRight: undefined,
    onPressRight: () => {},
  };

  render() {
    const {title, btnBack, textBtnRight, onPressRight, navigation} = this.props;
    return (
      <View style={styles.container}>
        {btnBack && (
          <TouchableOpacity
            style={styles.btn_left}
            onPress={() => {
              navigation.goBack();
            }}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={38}
              color={AppValues.primaryColor}
            />
          </TouchableOpacity>
        )}
        <View style={styles.view_title}>
          <TextView type="bold" numberOfLines={1} style={styles.title}>
            {title}
          </TextView>
        </View>
        {textBtnRight && (
          <TouchableOpacity style={styles.btn_left} onPress={onPressRight}>
            <TextView type="bold" style={{color: AppValues.primaryColor}}>
              {textBtnRight}
            </TextView>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
