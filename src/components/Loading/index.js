import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, View} from 'react-native';
import Text from '../TextView';
import * as AppValues from '../../AppValues';
import styles from './styles';

const Loading = ({text, isVisible}) => {
  if (isVisible) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color={AppValues.COLOR_BG_WHITE} />
          <Text style={styles.textContent}>{text || 'Đang xử lý ...'}</Text>
        </View>
      </View>
    );
  }
  return null;
};

Loading.propTypes = {
  text: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
};

export default Loading;
