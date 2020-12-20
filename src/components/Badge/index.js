import React, {Component} from 'react';
import {View} from 'react-native';
import TextView from '../TextView';
import Ionicons from 'react-native-vector-icons/Ionicons';

class Badge extends Component {
  render() {
    const {name, badgeCount, color, size} = this.props;
    return (
      <View style={{width: 24, height: 24, margin: 5}}>
        <Ionicons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              // If you're using react-native < 0.57 overflow outside of the parent
              // will not work on Android, see https://git.io/fhLJ8
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 12,
              width: 20,
              height: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextView
              style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>
              {badgeCount}
            </TextView>
          </View>
        )}
      </View>
    );
  }
}

export default Badge;
