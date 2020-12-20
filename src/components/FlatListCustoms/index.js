import React, {Component} from 'react';
import {FlatList, Platform, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Screen from '../../AppValues';
import LoadingMore from '../Loading/LoadMore';
import TextView from '../TextView';
import RefreshControlCustoms from '../RefreshControlCustoms';

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    color: '#727272',
    position: 'absolute',
    paddingLeft: Screen.width(1),
  },
  flatlist: {
    marginBottom: Screen.width(2),
    minHeight: Screen.width(6),
  },
});

class FlatListCustoms extends Component {
  static propTypes = {
    isLoadMore: PropTypes.bool,
    data: PropTypes.array,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func,
    textEmpty: PropTypes.string,
  };

  static defaultProps = {
    isLoadMore: false,
    data: [],
    refreshing: false,
    onRefresh: () => {},
    textEmpty: undefined,
  };

  NoData() {
    const {data, textEmpty} = this.props;
    if (data.length < 1) {
      return (
        <TextView style={styles.container}>
          {textEmpty || 'Không có dữ liệu!'}
        </TextView>
      );
    }
    return undefined;
  }

  DataSource() {
    const {data, isLoadMore, refreshing, onRefresh} = this.props;
    return (
      <FlatList
        data={data}
        style={styles.flatlist}
        keyExtractor={(item, key) => key.toString()}
        onEndReachedThreshold={Platform.OS === 'ios' ? -0.2 : 1}
        ListFooterComponent={() => (isLoadMore ? <LoadingMore /> : null)}
        refreshControl={
          <RefreshControlCustoms
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }
        {...this.props}
      />
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.NoData()}
        {this.DataSource()}
      </View>
    );
  }
}

export default FlatListCustoms;
