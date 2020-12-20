/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ModalBox from 'react-native-modalbox';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import TextView from '../TextView';
import Screen, * as AppValues from '../../AppValues';

const styles = StyleSheet.create({
  modal: {
    height: 'auto',
    maxHeight: '70%',
    width: '100%',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: AppValues.COLOR_BG_WHITE,
  },
  btnTitle: {
    textAlign: 'center',
    padding: 5,
    color: AppValues.COLOR_BG_WHITE,
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    width: AppValues.WIDTH_DEVICE,
    paddingHorizontal: Screen.width(2),
    alignItems: 'center',
    marginBottom: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: AppValues.COLOR_BORDER_GRAY,
  },
});

export default class ModalStaff extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    dataView: PropTypes.array,
    onClosed: PropTypes.func,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    visible: false,
  };

  constructor(props) {
    super(props);
    const {visible} = this.props;
    this.state = {
      visible,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {visible} = nextProps;
    this.setState({
      visible,
    });
  }

  click(item) {
    const {onClick} = this.props;
    this.setState({visible: false});
    if (onClick) {
      onClick(item);
    }
  }

  close() {
    const {onClosed} = this.props;
    this.setState({visible: false});
    if (onClosed) {
      onClosed();
    }
  }

  itemModal(item) {
    return (
      <TouchableOpacity
        onPress={() => this.click(item)}
        style={[
          styles.list,
          {
            backgroundColor: AppValues.COLOR_BG_WHITE,
          },
        ]}>
        <TextView
          numberOfLines={1}
          style={{
            flex: 1,
            color: AppValues.primaryColor,
            marginHorizontal: 10,
          }}>
          {item.name}
        </TextView>
      </TouchableOpacity>
    );
  }

  render() {
    const {visible} = this.state;
    const {title, dataView} = this.props;
    return (
      <ModalBox
        isOpen={visible}
        swipeArea={20}
        position="bottom"
        onClosed={() => this.close()}
        style={styles.modal}>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            padding: Screen.width(1),
            backgroundColor: AppValues.primaryColor,
          }}>
          <TextView style={styles.title}>{title}</TextView>
        </View>

        <FlatList
          style={{}}
          data={dataView}
          keyExtractor={(item, key) => key.toString()}
          renderItem={({item}) => this.itemModal(item)}
        />
      </ModalBox>
    );
  }
}
