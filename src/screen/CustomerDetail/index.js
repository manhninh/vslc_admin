/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {
  listByStaffApiSubmit,
  staffDetailApiSubmit,
} from '../../redux/actions/staff';
import {
  ordersIdApiSubmit,
  listFavatiteStaffApiSubmit,
  historyServiceApiSubmit,
} from '../../redux/actions/serviceActions';
import {
  listFavatiteStaff,
  customerDetail,
  listHistoryService,
} from '../../redux/selectors';
import FlatListCustoms from '../../components/FlatListCustoms';
import ButtonMore from '../../components/ButtonMore';
import TextView from '../../components/TextView';
import {
  formatDate,
  formatTime,
  formatOrderState,
  formatMoney,
} from '../../helpers/formatValue';
import Screen, * as AppValues from '../../AppValues';
import HeaderBar from '../../components/HeaderBar';

class CustomerDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageFavarite: 1,
      pageHistoryService: 1,
    };
  }

  submitFavariteAPI = (pageFavarite, loadMore = false) => {
    const {listFavatiteStaffApiSubmit, customerDetail} = this.props;
    listFavatiteStaffApiSubmit(customerDetail.id, pageFavarite, loadMore);
  };

  submitHistoryServiceAPI = (pageHistoryService, loadMore = false) => {
    const {historyServiceApiSubmit, customerDetail} = this.props;
    historyServiceApiSubmit(customerDetail.id, pageHistoryService, loadMore);
  };

  componentDidMount() {
    this.submitFavariteAPI(1);
    this.submitHistoryServiceAPI(1);
  }

  loadMoreFvarite(pageFavarite) {
    this.submitFavariteAPI(pageFavarite, true);
    this.setState({pageFavarite});
  }

  loadHistoryService(pageHistoryService) {
    this.submitHistoryServiceAPI(pageHistoryService, true);
    this.setState({pageHistoryService});
  }

  title(text) {
    return (
      <TextView type="bold" style={{color: AppValues.primaryColor}}>
        {text}
      </TextView>
    );
  }

  itemContainer(title, content, colorText = AppValues.COLOR_BG_BLACK) {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TextView style={{flex: 2}}>{title}</TextView>
        <TextView
          style={{flex: 3, marginLeft: Screen.width(1), color: colorText}}>
          {content}
        </TextView>
      </View>
    );
  }

  itemStaff(item) {
    const {code, name, phone, id} = item;
    const {staffDetailApiSubmit} = this.props;
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
        onPress={() => staffDetailApiSubmit(id)}>
        {this.itemContainer('Mã nhân viên:', code)}
        {this.itemContainer('Tên nhân viên:', name)}
        {this.itemContainer('Số điện thoại:', phone)}
      </TouchableOpacity>
    );
  }

  itemHistoryService(item) {
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
        onPress={() => ordersIdApiSubmit(item.id)}>
        {this.itemContainer('Loại dịch vụ:', item.category.name)}
        {this.itemContainer('Ngày làm:', formatDate(item.startTime))}
        {this.itemContainer(
          'Giờ làm:',
          formatTime(item.startTime) + ' - ' + formatTime(item.endTime),
        )}
        {this.itemContainer('Đơn giá:', formatMoney(item.totalPrice) + 'đ')}
        {this.itemContainer(
          'Trạng thái:',
          formatOrderState(item.orderState).text,
          formatOrderState(item.orderState).color,
        )}
      </TouchableOpacity>
    );
  }

  itemAddress(item) {
    const {navigation} = this.props;
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
        onPress={() => {
          navigation.navigate('MapGoogle', {
            address: item,
          });
        }}>
        <TextView>{item.address}</TextView>
      </TouchableOpacity>
    );
  }

  render() {
    const {pageFavarite, pageHistoryService} = this.state;
    const {
      navigation,
      customerDetail,
      listFavatiteStaff,
      listHistoryService,
    } = this.props;
    const checkMoreFavative =
      listFavatiteStaff.list.length !== listFavatiteStaff.count;
    const checkMoreHistoryService =
      listHistoryService.list.length !== listHistoryService.count;
    return (
      <View style={{flex: 1}}>
        <HeaderBar
          title="Chi tiết khách hàng"
          btnBack
          navigation={navigation}
        />
        <ScrollView
          style={{
            flex: 1,
            paddingHorizontal: Screen.width(2),
            backgroundColor: AppValues.COLOR_BG_WHITE,
          }}>
          {this.title('THÔNG TIN CHUNG:')}
          {this.itemContainer('Tên khách hàng:', customerDetail.name)}
          {this.itemContainer('Số điện thoại:', customerDetail.phone)}
          {this.title('NHÂN VIÊN YÊU THÍCH:')}
          <FlatListCustoms
            data={listFavatiteStaff.list}
            renderItem={({item}) => <View>{this.itemStaff(item)}</View>}
            textEmpty="Danh sách trống"
            ListFooterComponent={() =>
              checkMoreFavative ? (
                <ButtonMore
                  onPress={() => this.loadMoreFvarite(pageFavarite + 1)}
                />
              ) : null
            }
          />
          {this.title('CÔNG VIỆC YÊU CẦU:')}
          <FlatListCustoms
            data={listHistoryService.list}
            renderItem={({item}) => (
              <View>{this.itemHistoryService(item)}</View>
            )}
            textEmpty="Danh sách trống"
            ListFooterComponent={() =>
              checkMoreHistoryService ? (
                <ButtonMore
                  onPress={() =>
                    this.loadHistoryService(pageHistoryService + 1)
                  }
                />
              ) : null
            }
          />
          {this.title('DANH SÁCH ĐỊA CHỈ:')}
          <FlatListCustoms
            data={customerDetail.lstAddress}
            renderItem={({item}) => <View>{this.itemAddress(item)}</View>}
            textEmpty="Danh sách trống"
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  customerDetail: customerDetail(state),
  listFavatiteStaff: listFavatiteStaff(state),
  listHistoryService: listHistoryService(state),
});
export default connect(
  mapStateToProps,
  {
    listByStaffApiSubmit,
    staffDetailApiSubmit,
    ordersIdApiSubmit,
    listFavatiteStaffApiSubmit,
    historyServiceApiSubmit,
  },
)(CustomerDetail);
