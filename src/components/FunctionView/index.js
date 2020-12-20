import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TextView from '../TextView';
import Screen, * as AppValues from '../../AppValues';

class FunctionView extends Component {
  static propTypes = {
    title: PropTypes.string,
    note: PropTypes.string,
    icon: PropTypes.bool,
    dash: PropTypes.bool,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    title: undefined,
    note: undefined,
    icon: true,
    dash: true,
    onPress: () => {},
  };

  render() {
    const {
      title, note, icon, dash, onPress
    } = this.props;
    return (
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: AppValues.COLOR_BG_WHITE,
            padding: Screen.width(2),
            alignItems: 'center',
          }}
          onPress={onPress}
        >
          <View
            style={{
              flex: 1,
              marginLeft: Screen.width(2),
              justifyContent: 'center',
            }}
          >
            <TextView numberOfLines={1} type="bold" style={{ color: AppValues.COLOR_BG_GREY }}>
              {title}
            </TextView>
          </View>
          <View>{note && <TextView>{note}</TextView>}</View>
          {icon && (
            <MaterialCommunityIcons
              name="chevron-right"
              size={22}
              style={{ marginLeft: Screen.width(2) }}
              color={AppValues.COLOR_BG_GREY}
            />
          )}
        </TouchableOpacity>
        {dash && (
          <View
            style={{
              height: 2,
              marginRight: Screen.width(96),
              backgroundColor: AppValues.COLOR_BG_WHITE,
            }}
          />
        )}
      </View>
    );
  }
}

export default FunctionView;
