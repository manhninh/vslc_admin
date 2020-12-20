/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Colors from '../../components/colors';
import Layouts from '../../components/layout';
import TextView from '../../components/TextView';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderBar from '../../components/HeaderBar';
import {listHistoryService} from '../../redux/selectors';
import {ordersIdApiSubmit} from '../../redux/actions/serviceActions';
import {
  formatDate,
  formatTime,
  formatOrderState,
  formatMoney,
} from '../../helpers/formatValue';
import Screen, * as AppValues from '../../AppValues';
import Entypo from 'react-native-vector-icons/Entypo';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  itemService(item) {
    const {
      orderCode,
      category,
      startTime,
      endTime,
      orderState,
      address,
      totalPrice,
      id,
    } = item;
    const {ordersIdApiSubmit} = this.props;
    return (
      <TouchableOpacity
        style={mStyles.service}
        onPress={() => {
          ordersIdApiSubmit(id);
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={[
              mStyles.status,
              {backgroundColor: formatOrderState(orderState).color},
            ]}>
            <TextView style={{color: AppValues.COLOR_BG_WHITE}}>
              {formatOrderState(orderState).text}
            </TextView>
          </View>
          <TextView>{formatDate(startTime)}</TextView>
        </View>
        <TextView style={{marginTop: Screen.width(1)}}>
          {'Loại dịch vụ: '}
          <TextView type="bold">{category.name}</TextView>
        </TextView>
        <TextView style={{marginTop: Screen.width(1)}}>
          {'Ca làm việc: ' +
            formatTime(startTime) +
            ' - ' +
            formatTime(endTime)}
        </TextView>
        <View
          style={{
            flexDirection: 'row',
            marginTop: Screen.width(1),
            marginRight: Screen.width(10),
          }}>
          <Entypo name="location" size={24} color={Colors.primaryColor} />
          <TextView style={{marginLeft: Screen.width(2)}}>
            {address.address}
          </TextView>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: Screen.width(1),
            alignItems: 'center',
          }}>
          <TextView
            type="bold"
            style={{flex: 1, color: AppValues.COLOR_BG_BLUE}}>
            {formatMoney(totalPrice) + 'đ'}
          </TextView>
          <View>
            <TextView>{orderCode}</TextView>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const {listHistoryService} = this.props;
    return (
      <View style={{flex: 1}}>
        <HeaderBar title="Lịch sử" />
        {listHistoryService.length === 0 ? (
          <View style={mStyles.container}>
            <Icon
              name="pagelines"
              size={Layouts.screen.width / 3}
              color={Colors.primaryColor}
            />
            <TextView>Hiện tại không có dịch vụ nào</TextView>
          </View>
        ) : (
          <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={listHistoryService}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return this.itemService(item);
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

const mStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  service: {
    flex: 1,
    marginHorizontal: Screen.width(2),
    padding: Screen.width(2),
    marginTop: Screen.height(1),
    borderRadius: 10,
    borderColor: AppValues.COLOR_BG_GREY,
    borderWidth: 0.5,
  },
  status: {
    padding: 3,
    borderRadius: 3,
    marginRight: Screen.height(1),
  },
});

const mapStateToProps = state => ({
  listHistoryService: listHistoryService(state),
});
export default connect(
  mapStateToProps,
  {ordersIdApiSubmit},
)(History);
