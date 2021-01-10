import React, {Component} from 'react';
import {View, Image, Alert, ScrollView, TouchableOpacity} from 'react-native';
import Screen, * as AppValues from '../../AppValues';
import TextView from '../../components/TextView';
import EditText from '../../components/EditText/EditTextCustoms';
import {connect} from 'react-redux';
import {
  NavigationReset,
  loginApiSubmit,
} from '../../redux/actions/anotherActions';
import Backdrop from '../../components/Backdrop/Backdrop';

class SingIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  login() {
    const {username, password} = this.state;
    const {loginApiSubmit} = this.props;
    if (!username) {
      Alert.alert('Thông báo', 'Tên đăng nhập không hợp lệ!');
      return;
    }
    if (!password) {
      Alert.alert('Thông báo', 'Mật khẩu không hợp lệ!');
      return;
    }
    loginApiSubmit(username, password);
  }

  render() {
    const {username, password} = this.state;
    return (
      <Backdrop image="home.jpg">
        <ScrollView style={{paddingHorizontal: Screen.width(10)}}>
          <View style={{alignItems: 'center', marginTop: Screen.height(10)}}>
            <Image
              style={{
                width: 200,
                height: 200,
              }}
              source={require('../../image/logonhasach.png')}
            />
          </View>
          <View style={{alignItems: 'center', marginBottom: Screen.height(2)}}>
            <TextView
              // type="bold"
              fontSize={AppValues.SIZE_TEXT_MEDIUM}
              style={{color: AppValues.primaryColor}}>
              Nhà sạch Lào Cai xin chào!
            </TextView>
          </View>
          <EditText
            placeholder="Tên đăng nhập"
            returnKeyType="next"
            value={username}
            onChangeText={text => this.setState({username: text})}
            onSubmitEditing={() => this.Pass.refs.pass.focus()}
          />
          <EditText
            placeholder="Mật khẩu"
            secureTextEntry
            returnKeyType="done"
            value={password}
            onChangeText={text => this.setState({password: text})}
            ref={ref => {
              this.Pass = ref;
            }}
            refInner="pass"
          />
          <View style={{marginTop: Screen.height(4)}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#3DD03D',
                borderWidth: 0.5,
                borderRadius: 5,
                padding: Screen.height(1),
                marginHorizontal: Screen.width(10),
              }}
              onPress={() => this.login()}>
              <TextView style={{textAlign: 'center'}}>ĐĂNG NHẬP</TextView>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Backdrop>
    );
  }
}
const mapStateToProps = state => ({});
export default connect(
  mapStateToProps,
  {NavigationReset, loginApiSubmit},
)(SingIn);
