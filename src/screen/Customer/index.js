/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Colors from '../../components/colors';
import TextView from '../../components/TextView';
import HeaderBar from '../../components/HeaderBar';
import {listSearchCustomer, isLoadSearch} from '../../redux/selectors';
import Screen, * as AppValues from '../../AppValues';
import EditText from '../../components/EditText';
import {
  searchCustomerApiSubmit,
  customerDetailApiSubmit,
} from '../../redux/actions/publicActions';
import FlatListCustoms from '../../components/FlatListCustoms';
import ButtonMore from '../../components/ButtonMore';

class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: '',
      page: 1,
    };
  }

  submitAPI = (page = 1, loadMore = false) => {
    const {textSearch} = this.state;
    const {searchCustomerApiSubmit} = this.props;
    searchCustomerApiSubmit(textSearch, page, loadMore);
  };

  componentDidMount() {
    this.submitAPI();
  }

  onLoadRefresh = () => {
    this.submitAPI();
  };

  loadMore(page) {
    this.submitAPI(page, true);
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

  itemAddress(item) {
    const {phone, name} = item;
    return (
      <TouchableOpacity
        style={{
          paddingHorizontal: Screen.width(3),
          marginTop: Screen.height(1),
          marginHorizontal: Screen.width(2),
          padding: Screen.width(1),
          borderRadius: Screen.height(1),
          borderColor: AppValues.COLOR_BG_GREY,
          borderWidth: 0.5,
        }}
        onPress={() => this.onChoose(item)}>
        {this.itemContainer('Tên khách hàng:', name)}
        {this.itemContainer('Số điện thoại:', phone)}
      </TouchableOpacity>
    );
  }

  onChoose(item) {
    const {customerDetailApiSubmit} = this.props;
    customerDetailApiSubmit(item.id);
  }

  render() {
    const {
      listSearchCustomer,
      searchCustomerApiSubmit,
      isLoadSearch,
    } = this.props;
    const {textSearch, page} = this.state;
    const checkMore =
      listSearchCustomer.list.length !== listSearchCustomer.count;
    return (
      <View style={{flex: 1}}>
        <HeaderBar title="Quản lý khách hàng" />
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.WHITE,
            padding: Screen.width(2),
          }}>
          <EditText
            placeholder="Tìm kiếm..."
            value={textSearch}
            onChangeText={text => {
              this.setState({textSearch: text});
              searchCustomerApiSubmit(text, 1);
            }}
          />
          <FlatListCustoms
            refreshing={isLoadSearch}
            data={listSearchCustomer.list}
            onRefresh={this.onLoadRefresh}
            renderItem={({item}) => {
              return this.itemAddress(item);
            }}
            textEmpty="Danh sách trống"
            ListFooterComponent={() =>
              checkMore ? (
                <ButtonMore onPress={() => this.loadMore(page + 1)} />
              ) : null
            }
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  listSearchCustomer: listSearchCustomer(state),
  isLoadSearch: isLoadSearch(state),
});
export default connect(
  mapStateToProps,
  {searchCustomerApiSubmit, customerDetailApiSubmit},
)(Customer);
