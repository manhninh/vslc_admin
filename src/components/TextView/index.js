import React, {Component} from 'react';
import {Text, Platform} from 'react-native';
import {COLOR_BG_BLACK, SIZE_TEXT_PRIMARY} from '../../AppValues';

export default class TextView extends Component {
  type = () => {
    const {type} = this.props;
    // eslint-disable-next-line prefer-destructuring
    const OS = Platform.OS;
    switch (type) {
      case 'italic':
        if (OS === 'android') {
          return {fontFamily: 'NotoSans-RegularItalic'};
        }
        return {fontFamily: 'NotoSans', fontStyle: 'italic', fontWeight: '500'};
      case 'bold':
        if (OS === 'android') {
          return {fontFamily: 'NotoSans-Bold'};
        }
        return {fontFamily: 'NotoSans', fontWeight: '700'};
      case 'Regular':
        if (OS === 'android') {
          return {fontFamily: 'NotoSans-Regular'};
        }
        return {fontFamily: 'NotoSans'};
      default:
        if (OS === 'android') {
          return {fontFamily: 'NotoSans-Regular'};
        }
        return {fontFamily: 'NotoSans', fontWeight: '400'};
    }
  };

  render() {
    const {children, style, fontSize} = this.props;
    return (
      <Text
        {...this.props}
        ellipsizeMode="tail"
        style={[
          {
            color: COLOR_BG_BLACK,
            fontSize: fontSize || SIZE_TEXT_PRIMARY,
            letterSpacing: 0.2,
          },
          this.type(),
          style,
        ]}>
        {children || ''}
      </Text>
    );
  }
}
