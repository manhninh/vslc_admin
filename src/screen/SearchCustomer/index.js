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
import {searchCustomerApiSubmit} from '../../redux/actions/publicActions';
import FlatListCustoms from '../../components/FlatListCustoms';
import ButtonMore from '../../components/ButtonMore';

class SearchCustomer extends React.Component {
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

  itemAddress(item) {
    const {phone, name} = item;
    return (
      <TouchableOpacity
        style={{
          paddingHorizontal: Screen.width(3),
          marginTop: Screen.height(1),
        }}
        onPress={() => this.onChoose(item)}>
        <TextView
          type="bold"
          style={{
            color: AppValues.primaryColor,
            fontSize: AppValues.SIZE_TEXT_SMALLER,
          }}>{`${name} (${phone})`}</TextView>
      </TouchableOpacity>
    );
  }

  onChoose(item) {
    const {navigation} = this.props;
    navigation.goBack();
    navigation.state.params.onSelect(item);
  }

  render() {
    const {
      navigation,
      listSearchCustomer,
      searchCustomerApiSubmit,
      isLoadSearch,
    } = this.props;
    const {textSearch, page} = this.state;
    const checkMore =
      listSearchCustomer.list.length !== listSearchCustomer.count;
    return (
      <View style={{flex: 1}}>
        <HeaderBar
          title="Khách hàng"
          btnBack
          navigation={navigation}
          textBtnRight="    "
        />
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
  {searchCustomerApiSubmit},
)(SearchCustomer);
