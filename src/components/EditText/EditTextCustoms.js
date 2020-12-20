import React, {Component} from 'react';
import {TextInput, StyleSheet, Platform} from 'react-native';
import PropTypes from 'prop-types';
import Screen, * as AppValues from '../../AppValues';

const styles = StyleSheet.create({
  wrapInput: {
    fontSize: AppValues.SIZE_EDIT_TEXT,
    fontFamily: AppValues.FONT_TEXT_INPUT,
    textAlign: 'center',
    paddingVertical:
      Platform.OS === 'android' ? Screen.width(1.2) : Screen.width(2.9),
    paddingHorizontal: Screen.width(3),
    marginBottom: 2,
    borderBottomWidth: 0.5,
    borderColor: AppValues.COLOR_BG_BLACK,
    color: AppValues.COLOR_BG_BLACK,
    marginTop: Screen.height(1),
  },
});

export default class EditText extends Component {
  static propTypes = {
    refInner: PropTypes.string,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    refInner: undefined,
    editable: true,
  };

  render() {
    const {refInner, editable} = this.props;
    return (
      <TextInput
        {...this.props}
        editable={editable}
        placeholderTextColor="#a8a8a8"
        style={styles.wrapInput}
        ref={refInner}
      />
    );
  }
}
