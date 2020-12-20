import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import TextView from '../TextView';
import styles from './styles';
import Screen, * as AppValues from '../../AppValues';

const style = StyleSheet.create({
  btn: {
    // borderColor: AppValues.COLOR_BG_BLUE,
    // borderWidth: 1,
    // marginTop: Screen.height(1),
    // marginHorizontal: Screen.width(1),
    // backgroundColor: AppValues.COLOR_BG_WHITE,
    // marginBottom: 10,
    // ...AppValues.SHADOW_GENERATOR,
  },
});

export default class ButtonMore extends Component {
  static propTypes = {
    textButton: PropTypes.string,
  };

  static defaultProps = {
    textButton: 'Xem thêm',
  };

  render() {
    const {textButton, disabled} = this.props;
    return (
      <TouchableOpacity
        style={[styles.view_btn, style.btn]}
        disabled={disabled}
        {...this.props}>
        <TextView
          type="bold"
          style={{
            color: AppValues.primaryColor,
            textDecorationLine: 'underline',
          }}>
          {textButton}
        </TextView>
      </TouchableOpacity>
    );
  }
}
