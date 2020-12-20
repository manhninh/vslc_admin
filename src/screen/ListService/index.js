/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, AppState, TouchableOpacity, Platform} from 'react-native';
import {Avatar} from 'react-native-elements';
import Screen, * as AppValues from '../../AppValues';
import TextView from '../../components/TextView';
import FlatListCustoms from '../../components/FlatListCustoms';
import ButtonMore from '../../components/ButtonMore';
import {connect} from 'react-redux';
import {NavigationRouter} from '../../redux/actions/anotherActions';
import {listCategoryApiSubmit} from '../../redux/actions/categoryActions';
import {
  listServiceApiSubmit,
  ordersIdApiSubmit,
} from '../../redux/actions/serviceActions';
import {
  listService,
  dataUser,
  isLoadListService,
  listCategory,
  infoUser,
} from '../../redux/selectors';
import {
  formatDaySession,
  formatDate,
  formatMoney,
  formatOrderState,
  formatPaymentState,
} from '../../helpers/formatValue';
import EditText from '../../components/EditText';
import {URL_IMAGE} from '../../utils/configApp';

class ListService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daySession: formatDaySession(),
      appState: AppState.currentState,
      page: 1,
      phoneSearch: '',
    };
  }

  componentDidMount() {
    const {listCategoryApiSubmit} = this.props;
    listCategoryApiSubmit();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    const {appState} = this.state;
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      this.setState({daySession: formatDaySession()});
      console.warn('davaoday');
    }
    this.setState({appState: nextAppState});
  };

  submitAPI = (page, phoneSearch, loadMore = false) => {
    const {listServiceApiSubmit} = this.props;
    listServiceApiSubmit(page, phoneSearch, loadMore);
  };

  onLoadRefresh = () => {
    const {phoneSearch} = this.state;
    this.submitAPI(1, phoneSearch);
  };

  loadMore(page) {
    const {phoneSearch} = this.state;
    this.submitAPI(page, phoneSearch, true);
    this.setState({page});
  }

  itemContainer(title, content, colorText = AppValues.COLOR_BG_BLACK) {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TextView style={{flex: 1}}>{title}</TextView>
        <TextView style={{flex: 1, color: colorText}}>{content}</TextView>
      </View>
    );
  }

  itemListService(item) {
    const {ordersIdApiSubmit} = this.props;
    const {
      id,
      orderCode,
      customer,
      category,
      startTime,
      totalPrice,
      orderState,
      paymentState,
    } = item;
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
        onPress={() => {
          ordersIdApiSubmit(id);
        }}>
        {this.itemContainer('Mã phiếu:', orderCode)}
        {this.itemContainer('Khách hàng:', customer.name)}
        {this.itemContainer('Số điện thoại:', customer.phone)}
        {this.itemContainer('Loại dịch vụ:', category.name)}
        {this.itemContainer('Ngày làm (bắt đầu):', formatDate(startTime))}
        {this.itemContainer('Đơn giá:', `${formatMoney(totalPrice)}đ`)}
        {this.itemContainer(
          'Trạng thái công việc:',
          formatOrderState(orderState).text,
          formatOrderState(orderState).color,
        )}
        {this.itemContainer(
          'Trạng thái thanh toán:',
          formatPaymentState(paymentState).text,
          formatPaymentState(paymentState).color,
        )}
      </TouchableOpacity>
    );
  }

  render() {
    const {
      NavigationRouter,
      infoUser,
      listService,
      isLoadListService,
    } = this.props;
    const {daySession, page, phoneSearch} = this.state;
    const checkMore = listService.list.length !== listService.count;
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            paddingTop: Platform.OS === 'ios' ? 30 : 0,
            minHeight: 80,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: AppValues.primaryColor,
          }}>
          <Avatar
            size={60}
            rounded
            source={{uri: URL_IMAGE + infoUser.image}}
            containerStyle={{
              borderWidth: 2,
              borderColor: '#ffffff',
              margin: 10,
            }}
            onPress={() => {
              NavigationRouter('UserProfile');
            }}
          />
          <TextView
            maxLines={1}
            type="bold"
            style={{flex: 1, color: AppValues.COLOR_BG_WHITE}}>
            {`Chào buổi ${daySession}, ${infoUser.name ? infoUser.name : ''}!`}
          </TextView>
        </View>
        <View
          style={{
            marginHorizontal: Screen.width(2),
            marginTop: Screen.height(1),
          }}>
          <TextView type="bold" style={{color: AppValues.primaryColor}}>
            Tìm kiếm phiếu dịch vụ:
          </TextView>
          <EditText
            placeholder="Nhập số điện thoại..."
            keyboardType="number-pad"
            value={phoneSearch}
            onChangeText={text => {
              this.setState({page: 1, phoneSearch: text});
              this.submitAPI(1, text, false);
            }}
          />
        </View>
        <FlatListCustoms
          refreshing={isLoadListService}
          data={listService.list}
          onRefresh={this.onLoadRefresh}
          renderItem={({item}) => <View>{this.itemListService(item)}</View>}
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
  listService: listService(state),
  dataUser: dataUser(state),
  isLoadListService: isLoadListService(state),
  listCategory: listCategory(state),
  infoUser: infoUser(state),
});
export default connect(
  mapStateToProps,
  {
    NavigationRouter,
    listCategoryApiSubmit,
    listServiceApiSubmit,
    ordersIdApiSubmit,
  },
)(ListService);
