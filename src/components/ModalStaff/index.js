/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ModalBox from 'react-native-modalbox';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
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
    dataView: PropTypes.array.isRequired,
    onClosed: PropTypes.func,
    onClick: PropTypes.func,
    select: PropTypes.array,
  };

  static defaultProps = {
    visible: false,
  };

  constructor(props) {
    super(props);
    const {visible, select} = this.props;
    this.state = {
      visible,
      staffArray: select,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {visible, select} = nextProps;
    this.setState({
      visible,
      staffArray: select,
    });
  }

  click() {
    const {onClick} = this.props;
    const {staffArray} = this.state;
    this.setState({visible: false});
    if (onClick) {
      onClick(staffArray);
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
    const {staffArray} = this.state;
    const result = staffArray.filter(i => i.id === item.id);
    const check = result.length > 0;
    return (
      <TouchableOpacity
        onPress={() => {
          if (check) {
            const removeItem = staffArray.filter(i => i.id !== item.id);
            this.setState({staffArray: removeItem});
          } else {
            this.setState({staffArray: [...staffArray, item]});
          }
        }}
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
        {check && (
          <Entypo name="check" color={AppValues.primaryColor} size={28} />
        )}
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
          <TouchableOpacity
            style={{
              alignContent: 'center',
              justifyContent: 'center',
            }}
            onPress={() => this.close()}>
            <TextView type="bold" style={{color: AppValues.COLOR_BG_WHITE}}>
              Hủy
            </TextView>
          </TouchableOpacity>
          <TextView style={styles.title}>{title}</TextView>
          <TouchableOpacity
            style={{alignContent: 'center', justifyContent: 'center'}}
            onPress={() => this.click()}>
            <TextView type="bold" style={{color: AppValues.COLOR_BG_WHITE}}>
              Chọn
            </TextView>
          </TouchableOpacity>
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
