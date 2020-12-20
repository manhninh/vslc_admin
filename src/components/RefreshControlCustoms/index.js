import React, {Component} from 'react';
import {RefreshControl} from 'react-native';
import PropTypes from 'prop-types';

class RefreshControlCustoms extends Component {
  static propTypes = {
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func,
  };

  static defaultProps = {
    refreshing: false,
    onRefresh: () => {},
  };

  render() {
    const {refreshing, onRefresh} = this.props;
    return (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={() => onRefresh()}
        title="Tải lại dữ liệu ..."
        tintColor={'#a8a8a8'}
        titleColor={'#a8a8a8'}
        {...this.props}
      />
    );
  }
}

export default RefreshControlCustoms;
