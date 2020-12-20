/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import styles from '../../components/style';
import {staffWorkShiftApiSubmit} from '../../redux/actions/staff';
import {ordersIdApiSubmit} from '../../redux/actions/serviceActions';
import {staffWorkShift, isLoadStaffWorkShift} from '../../redux/selectors';
import FlatListCustoms from '../../components/FlatListCustoms';
import ButtonMore from '../../components/ButtonMore';
import TextView from '../../components/TextView';
import {
  formatTime,
  formatDate,
  formatOrderState,
} from '../../helpers/formatValue';
import Screen, * as AppValues from '../../AppValues';
import HeaderBar from '../../components/HeaderBar';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    const {staffWorkShiftApiSubmit} = this.props;
    staffWorkShiftApiSubmit(1);
  }

  submitAPI = (page, loadMore) => {
    const {staffWorkShiftApiSubmit} = this.props;
    staffWorkShiftApiSubmit(page, loadMore);
  };

  onLoadRefresh = () => {
    this.submitAPI(1, false);
  };

  loadMore(page) {
    this.submitAPI(page, true);
    this.setState({page});
  }

  itemContainer(title, content, colorText = AppValues.COLOR_BG_BLACK) {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TextView style={{flex: 1}}>{title}</TextView>
        <TextView style={{flex: 2, color: colorText}}>{content}</TextView>
      </View>
    );
  }

  itemStaff(item) {
    const {orderDetail, staff} = item;
    const {ordersIdApiSubmit} = this.props;
    return (
      <TouchableOpacity
        style={{
          marginHorizontal: Screen.width(2),
          marginTop: Screen.height(1),
          padding: Screen.width(1),
          borderRadius: Screen.height(1),
          borderColor: AppValues.COLOR_BG_GREY,
          borderWidth: 0.5,
        }}
        onPress={() => ordersIdApiSubmit(orderDetail.orderId)}>
        {this.itemContainer('Tên nhân viên:', staff.name)}
        {this.itemContainer('Loại dịch vụ:', orderDetail.order.category.name)}
        {this.itemContainer('Ngày làm:', formatDate(orderDetail.workTimeStart))}
        {this.itemContainer(
          'Ca làm việc:',
          formatTime(orderDetail.workTimeStart) +
            ' - ' +
            formatTime(orderDetail.workTimeEnd),
        )}
        {this.itemContainer(
          'Trạng thái:',
          formatOrderState(orderDetail.orderState).text,
          formatOrderState(orderDetail.orderState).color,
        )}
        {this.itemContainer('Địa chỉ:', orderDetail.order.address.address)}
      </TouchableOpacity>
    );
  }

  render() {
    const {page} = this.state;
    const {staffWorkShift, isLoadStaffWorkShift} = this.props;
    const checkMore = staffWorkShift.list.length !== staffWorkShift.count;
    return (
      <View style={{flex: 1, paddingBottom: 10, ...styles.white_bg}}>
        <HeaderBar title="Lịch làm việc" />
        <FlatListCustoms
          refreshing={isLoadStaffWorkShift}
          data={staffWorkShift.list}
          onRefresh={this.onLoadRefresh}
          renderItem={({item}) => <View>{this.itemStaff(item)}</View>}
          textEmpty="Danh sách trống"
          ListFooterComponent={() =>
            checkMore ? (
              <ButtonMore onPress={() => this.loadMore(page + 1)} />
            ) : null
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  staffWorkShift: staffWorkShift(state),
  isLoadStaffWorkShift: isLoadStaffWorkShift(state),
});
export default connect(
  mapStateToProps,
  {staffWorkShiftApiSubmit, ordersIdApiSubmit},
)(Calendar);
