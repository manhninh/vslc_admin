import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import TextView from '../TextView';
import styles from './styles';
import * as AppValues from '../../AppValues';

export default class Button extends Component {
  static propTypes = {
    textButton: PropTypes.string,
    backgroundColor: PropTypes.string,
    styleBtn: PropTypes.object,
  };

  static defaultProps = {
    textButton: undefined,
    backgroundColor: 'transparent',
    styleBtn: {},
  };

  render() {
    const {textButton, disabled, backgroundColor, styleBtn} = this.props;
    return (
      <TouchableOpacity
        style={[styles.view_btn, {backgroundColor: backgroundColor}, styleBtn]}
        disabled={disabled}
        {...this.props}>
        <TextView type="bold" style={styles.textButton}>
          {textButton}
        </TextView>
      </TouchableOpacity>
    );
  }
}
