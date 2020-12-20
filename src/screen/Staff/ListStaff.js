/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import styles from '../../components/style';
import {
  listStaffApiSubmit,
  staffDetailApiSubmit,
} from '../../redux/actions/staff';
import {listStaff, isLoadListstaff} from '../../redux/selectors';
import FlatListCustoms from '../../components/FlatListCustoms';
import ButtonMore from '../../components/ButtonMore';
import TextView from '../../components/TextView';
import {
  formatRole,
  formatDate,
  formatSex,
  formatStaffState,
} from '../../helpers/formatValue';
import Screen, * as AppValues from '../../AppValues';

class ListStaff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    const {listStaffApiSubmit} = this.props;
    listStaffApiSubmit(1);
  }

  submitAPI = (page, loadMore) => {
    const {listStaffApiSubmit} = this.props;
    listStaffApiSubmit(page, loadMore);
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
    const {name, phone, user, birthday, address, sex, state, id} = item;
    const {staffDetailApiSubmit} = this.props;
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
        onPress={() => staffDetailApiSubmit(id)}>
        <TextView type="bold" style={{textAlign: 'center'}}>
          {name}
        </TextView>
        {this.itemContainer('Chức danh:', formatRole(user.userRole))}
        {this.itemContainer('Số điện thoại:', phone)}
        {this.itemContainer('Ngày sinh:', formatDate(birthday))}
        {this.itemContainer('Giới tính:', formatSex(sex))}
        {this.itemContainer(
          'Trạng thái:',
          formatStaffState(state).text,
          formatStaffState(state).color,
        )}
        {this.itemContainer('Địa chỉ:', address)}
      </TouchableOpacity>
    );
  }

  render() {
    const {page} = this.state;
    const {listStaff, isLoadListstaff} = this.props;
    const checkMore = listStaff.list.length !== listStaff.count;
    return (
      <View style={{flex: 1, paddingBottom: 10, ...styles.white_bg}}>
        <FlatListCustoms
          refreshing={isLoadListstaff}
          data={listStaff.list}
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
  listStaff: listStaff(state),
  isLoadListstaff: isLoadListstaff(state),
});
export default connect(
  mapStateToProps,
  {listStaffApiSubmit, staffDetailApiSubmit},
)(ListStaff);
