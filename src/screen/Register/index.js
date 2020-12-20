/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Image, Alert, ScrollView, TouchableOpacity} from 'react-native';
import Screen, * as AppValues from '../../AppValues';
import TextView from '../../components/TextView';
import EditText from '../../components/EditText/EditTextCustoms';
import Button from '../../components/Button';
import {connect} from 'react-redux';
import {
  NavigationReset,
  registerApiSubmit,
} from '../../redux/actions/anotherActions';
import Backdrop from '../../components/Backdrop/Backdrop';
import HeaderBar from '../../components/HeaderBar';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      phone: this.props.navigation.state.params.phone,
    };
  }

  login() {
    const {name, phone} = this.state;
    const {registerApiSubmit} = this.props;
    if (!name) {
      Alert.alert('Thông báo', 'Vui lòng điền tên của bạn!');
      return;
    }
    registerApiSubmit(phone, name);
  }

  render() {
    const {name} = this.state;
    const {navigation} = this.props;
    return (
      <Backdrop image="home.jpg">
        <HeaderBar title="Đăng ký" btnBack navigation={navigation} />
        <ScrollView style={{paddingHorizontal: Screen.width(10)}}>
          <View style={{alignItems: 'center', marginTop: Screen.height(5)}}>
            <Image
              style={{
                width: 200,
                height: 200,
              }}
              source={require('../../image/logonhasach.png')}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: Screen.height(2),
            }}>
            <TextView
              // type="bold"
              fontSize={AppValues.SIZE_TEXT_MEDIUM}
              style={{
                color: AppValues.primaryColor,
                textAlign: 'center',
              }}>
              Nhập tên đầy đủ của bạn để hoàn tất
            </TextView>
          </View>
          <EditText
            placeholder="Nhập tên của bạn"
            value={name}
            onChangeText={text => this.setState({name: text})}
          />
          <View style={{marginTop: Screen.height(4)}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#3DD03D',
                borderRadius: 5,
                padding: Screen.height(1),
                marginHorizontal: Screen.width(10),
              }}
              onPress={() => this.login()}>
              <TextView style={{textAlign: 'center'}}>XÁC NHẬN</TextView>
            </TouchableOpacity>
            {/* <Button textButton="XÁC NHẬN" onPress={() => this.login()} /> */}
          </View>
        </ScrollView>
      </Backdrop>
    );
  }
}
const mapStateToProps = state => ({});
export default connect(
  mapStateToProps,
  {NavigationReset, registerApiSubmit},
)(Register);
