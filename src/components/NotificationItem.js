/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Badge} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../components/style';
import dimensions from '../components/dimensions';
import Colors from '../components/colors';
import TextView from './TextView';
import {formatDateTime} from '../helpers/formatValue';

class NotificationItem extends React.Component {
  render() {
    let {state, message, createdAt} = this.props.data;
    let {onPress} = this.props;
    /**
     * state
     * 0: Unseen
     * 1: Seen
     */
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            ...styles.row,
            ...styles.cross_center,
            ...styles.p_10,
            ...styles.border_b_w_1,
            ...styles.gray_border_b,
          }}>
          <View
            style={{
              ...styles.view_center,
              ...styles.w_50,
              ...styles.h_50,
              ...styles.green_bg,
              borderRadius: 50,
              marginRight: 10,
            }}>
            <MaterialIcons
              name="notifications"
              size={dimensions.SUPER_EXTRA}
              color={Colors.WHITE}
            />
            {state === 0 ? (
              <Badge
                badgeStyle={{
                  width: 16,
                  height: 16,
                  borderWidth: 2,
                  borderColor: '#ffffff',
                  borderBottomRightRadius: 8,
                  borderBottomLeftRadius: 8,
                  borderTopRightRadius: 8,
                  borderTopLeftRadius: 8,
                }}
                status="error"
                containerStyle={{position: 'absolute', top: 3, right: -3}}
              />
            ) : null}
          </View>
          <View
            style={{
              ...styles.row,
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              flex: 1,
            }}>
            <TextView type={state === 0 ? 'bold' : 'Regular'}>
              {message}
            </TextView>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}} />
              <TextView>{formatDateTime(createdAt)}</TextView>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default NotificationItem;
