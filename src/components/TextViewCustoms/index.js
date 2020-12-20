import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Platform} from 'react-native';
import PropTypes from 'prop-types';
import Screen, * as AppValues from '../../AppValues';
import TextView from '../TextView';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../colors';

const styles = StyleSheet.create({
  wrapInput: {
    flexDirection: 'row',
    backgroundColor: '#e7e7e7',
    fontSize: AppValues.SIZE_EDIT_TEXT,
    fontFamily: AppValues.FONT_TEXT_INPUT,
    paddingVertical:
      Platform.OS === 'android' ? Screen.width(1.2) : Screen.width(2.9),
    paddingHorizontal: Screen.width(3),
    marginBottom: 2,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#0e030380',
  },
});

export default class TextViewCustoms extends Component {
  static propTypes = {
    nameIcon: PropTypes.string,
    value: PropTypes.string,
    icon: PropTypes.bool,
  };

  static defaultProps = {
    nameIcon: 'chevron-down',
    value: undefined,
    icon: true,
  };

  render() {
    const {nameIcon, value, icon} = this.props;
    return (
      <TouchableOpacity {...this.props} style={styles.wrapInput}>
        <TextView style={{flex: 1}}>{value}</TextView>
        {icon && <Icon name={nameIcon} size={18} color={Colors.primaryColor} />}
      </TouchableOpacity>
    );
  }
}
