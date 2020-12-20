/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Colors from '../../components/colors';
import {Avatar} from 'react-native-elements';
import HeaderBar from '../../components/HeaderBar';
import Screen, * as AppValues from '../../AppValues';
import {
  NavigationReset,
  updateFcmTokenApiSubmit,
} from '../../redux/actions/anotherActions';
import {ACCESS_TOKEN, FCM_TOKEN, URL_IMAGE} from '../../utils/configApp';
import AsyncStorage from '@react-native-community/async-storage';
import {infoUser, dataUser} from '../../redux/selectors';
import {
  formatRole,
  formatDate,
  formatSex,
  formatStaffState,
} from '../../helpers/formatValue';
import Button from '../../components/Button';

class UserProfileScreen extends Component {
  loguot() {
    const {NavigationReset, updateFcmTokenApiSubmit} = this.props;
    Alert.alert('Thông báo', 'Bạn thực sự muốn đăng xuất?', [
      {
        text: 'ĐỒNG Ý',
        onPress: async () => {
          NavigationReset('SignIn');
          updateFcmTokenApiSubmit(null);
          AsyncStorage.removeItem(ACCESS_TOKEN);
          AsyncStorage.removeItem(FCM_TOKEN);
        },
      },
      {
        text: 'HUỶ',
        style: 'cancel',
      },
    ]);
  }

  itemView(title, content) {
    return (
      <View style={mStyles.textContainer}>
        <Text style={mStyles.textTitle}>{title}</Text>
        <Text style={mStyles.textInfo}>{content}</Text>
      </View>
    );
  }

  render() {
    const {navigation, infoUser, dataUser} = this.props;
    return (
      <View style={{flex: 1}}>
        <HeaderBar
          title="Cá nhân"
          btnBack={dataUser.role !== 'ROLE_STAFF'}
          navigation={navigation}
          textBtnRight="  "
        />
        <ScrollView
          style={{flex: 1, backgroundColor: AppValues.COLOR_BG_WHITE}}>
          <View style={mStyles.avatarContainer}>
            <Avatar
              size={Screen.width(40)}
              rounded
              source={{uri: URL_IMAGE + infoUser.image}}
              containerStyle={{
                borderWidth: 2,
                borderColor: '#ffffff',
                margin: 10,
              }}
            />
          </View>
          <View>
            {this.itemView('Họ tên:', infoUser.name)}
            {this.itemView('Chức vụ:', formatRole(infoUser.user.userRole))}
            {this.itemView('Số điện thoại:', infoUser.phone)}
            {this.itemView('Ngày sinh:', formatDate(infoUser.birthday))}
            {this.itemView('Giới tính:', formatSex(infoUser.sex))}
            {this.itemView(
              'Trạng thái:',
              formatStaffState(infoUser.state).text,
            )}
            {this.itemView('Địa chỉ:', infoUser.address)}
          </View>
          <Button
            textButton={'Đăng xuất'}
            styleBtn={{
              margin: Screen.width(5),
            }}
            backgroundColor={AppValues.primaryColor}
            onPress={() => this.loguot()}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  infoUser: infoUser(state),
  dataUser: dataUser(state),
});
export default connect(
  mapStateToProps,
  {NavigationReset, updateFcmTokenApiSubmit},
)(UserProfileScreen);

const mStyles = StyleSheet.create({
  headerButtonContainer: {
    marginRight: 5,
  },
  headerRightText: {
    color: Colors.primaryColor,
    fontSize: 16,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopColor: Colors.GRAY,
    borderTopWidth: 1,
    marginHorizontal: Screen.width(2),
  },
  textTitle: {
    flex: 2,
    fontSize: 18,
    color: Colors.WEIGHT_GRAY,
  },
  textInfo: {
    flex: 3,
    fontSize: 18,
    color: Colors.BACKDROP,
  },
});
