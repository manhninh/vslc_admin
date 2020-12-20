/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, ScrollView, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from '../../components/style';
import {
  listByStaffApiSubmit,
  staffDetailApiSubmit,
} from '../../redux/actions/staff';
import {ordersIdApiSubmit} from '../../redux/actions/serviceActions';
import {listStaff, staffDetail, listByStaff} from '../../redux/selectors';
import FlatListCustoms from '../../components/FlatListCustoms';
import ButtonMore from '../../components/ButtonMore';
import TextView from '../../components/TextView';
import {
  formatRole,
  formatDate,
  formatSex,
  formatStaffState,
  formatWorkShift,
  formatTime,
  formatOrderState,
} from '../../helpers/formatValue';
import Screen, * as AppValues from '../../AppValues';
import HeaderBar from '../../components/HeaderBar';
import {URL_IMAGE} from '../../utils/configApp';
import Title from '../../components/Title';

const WIDTH_IMAGE = Screen.width(30);

class StaffDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  submitAPI = (page, loadMore = false) => {
    const {listByStaffApiSubmit, staffDetail} = this.props;
    listByStaffApiSubmit(staffDetail.id, page, loadMore);
  };

  componentDidMount() {
    this.submitAPI(1);
  }

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
        <TextView
          style={{flex: 1, marginLeft: Screen.width(1), color: colorText}}>
          {content}
        </TextView>
      </View>
    );
  }

  itemStaff(item) {
    const {workTimeStart, workTimeEnd, workShift, orderState, orderId} = item;
    const {ordersIdApiSubmit} = this.props;
    return (
      <TouchableOpacity
        style={{
          marginHorizontal: Screen.width(2),
          marginTop: Screen.height(1),
          paddingHorizontal: Screen.width(3),
          paddingVertical: Screen.width(1),
          borderRadius: Screen.height(1),
          borderColor: AppValues.COLOR_BG_GREY,
          borderWidth: 0.5,
        }}
        onPress={() => ordersIdApiSubmit(orderId)}>
        {this.itemContainer('Ngày làm:', formatDate(workTimeStart))}
        {this.itemContainer('Ca làm:', formatWorkShift(workShift))}
        {this.itemContainer(
          'Ca làm việc:',
          formatTime(workTimeStart) + ' - ' + formatTime(workTimeEnd),
        )}
        {this.itemContainer(
          'Ca làm:',
          formatOrderState(orderState).text,
          formatOrderState(orderState).color,
        )}
      </TouchableOpacity>
    );
  }

  render() {
    const {page} = this.state;
    const {listByStaff, navigation, staffDetail} = this.props;
    const checkMore = listByStaff.list.length !== listByStaff.count;
    const {
      name,
      phone,
      user,
      birthday,
      address,
      sex,
      state,
      image,
      code,
    } = staffDetail;
    return (
      <View style={{flex: 1}}>
        <HeaderBar title="Chi tiết nhân viên" btnBack navigation={navigation} />
        <ScrollView
          style={{
            flex: 1,
            paddingHorizontal: Screen.width(2),
            backgroundColor: AppValues.COLOR_BG_WHITE,
          }}>
          <View
            style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{width: WIDTH_IMAGE}}>
              <TextView type="bold" style={{textAlign: 'center'}}>
                {name}
              </TextView>
              <Image
                style={{
                  width: WIDTH_IMAGE,
                  height: WIDTH_IMAGE,
                  borderRadius: WIDTH_IMAGE / 2,
                  marginRight: Screen.width(2),
                }}
                source={{uri: URL_IMAGE + image}}
              />
              <TextView style={{textAlign: 'center'}}>
                {formatRole(user.userRole)}
              </TextView>
            </View>
            <View style={{flex: 1, marginLeft: Screen.width(1)}}>
              {this.itemContainer('Mã nhân viên:', code)}
              {this.itemContainer('Tên đăng nhập:', user.username)}
              {this.itemContainer('Số điện thoại:', phone)}
              {this.itemContainer('Ngày sinh:', formatDate(birthday))}
              {this.itemContainer('Giới tính:', formatSex(sex))}
              {this.itemContainer(
                'Trạng thái:',
                formatStaffState(state).text,
                formatStaffState(state).color,
              )}
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TextView>Địa chỉ:</TextView>
            <TextView style={{flex: 1, marginLeft: Screen.width(1)}}>
              {address}
            </TextView>
          </View>
          <Title
            style={{...styles.mt_10}}
            icon="list-alt"
            text="DANH SÁCH CÔNG VIỆC:"
          />
          <FlatListCustoms
            data={listByStaff.list}
            onRefresh={this.onLoadRefresh}
            renderItem={({item}) => <View>{this.itemStaff(item)}</View>}
            textEmpty="Danh sách trống"
            ListFooterComponent={() =>
              checkMore ? (
                <ButtonMore onPress={() => this.loadMore(page + 1)} />
              ) : null
            }
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  listStaff: listStaff(state),
  staffDetail: staffDetail(state),
  listByStaff: listByStaff(state),
});
export default connect(
  mapStateToProps,
  {listByStaffApiSubmit, staffDetailApiSubmit, ordersIdApiSubmit},
)(StaffDetail);
