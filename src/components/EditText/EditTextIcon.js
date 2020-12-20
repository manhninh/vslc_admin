/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  TextInput,
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Screen, * as AppValues from '../../AppValues';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  wrapInput: {
    flex: 1,
    backgroundColor: '#e7e7e7',
    fontSize: AppValues.SIZE_EDIT_TEXT,
    fontFamily: AppValues.FONT_TEXT_INPUT,
    paddingVertical:
      Platform.OS === 'android' ? Screen.width(1.2) : Screen.width(2.9),
    paddingHorizontal: Screen.width(3),
    marginTop: Screen.height(1),
    marginBottom: 2,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#0e030380',
    color: AppValues.COLOR_BG_BLACK,
    textAlignVertical: 'top',
  },
});

export default class EditTextIcon extends Component {
  static propTypes = {
    refInner: PropTypes.string,
    editable: PropTypes.bool,
    onPress: PropTypes.func,
    iconName: PropTypes.string,
  };

  static defaultProps = {
    refInner: undefined,
    editable: true,
    onPress: () => {},
    iconName: 'search',
  };

  render() {
    const {refInner, editable, onPress, iconName} = this.props;
    return (
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          {...this.props}
          editable={editable}
          placeholderTextColor="#a8a8a8"
          style={styles.wrapInput}
          ref={refInner}
        />
        <TouchableOpacity onPress={onPress}>
          <FontAwesome5
            name={iconName}
            size={25}
            color={AppValues.primaryColor}
            style={{paddingLeft: Screen.width(2)}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
