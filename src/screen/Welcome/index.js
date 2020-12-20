import React, {Component} from 'react';
import {View, Image} from 'react-native';
import Screen, * as AppValues from '../../AppValues';
import {connect} from 'react-redux';
import {
  NavigationReset,
  loginTokenApiSubmit,
} from '../../redux/actions/anotherActions';
import Backdrop from '../../components/Backdrop/Backdrop';
import AsyncStorage from '@react-native-community/async-storage';
import {ACCESS_TOKEN} from '../../utils/configApp';

class Welcome extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {NavigationReset, loginTokenApiSubmit} = this.props;
    AsyncStorage.multiGet([ACCESS_TOKEN])
      .then(res => {
        try {
          const token = res[0][1];
          if (token) {
            loginTokenApiSubmit(token);
          } else {
            NavigationReset('SignIn');
          }
        } catch (error) {
          NavigationReset('SignIn');
        }
      })
      .catch(() => NavigationReset('SignIn'));
  }

  render() {
    return (
      <Backdrop image="home.jpg">
        <View style={{alignItems: 'center', marginTop: Screen.height(15)}}>
          <Image
            style={{
              width: 200,
              height: 200,
            }}
            source={require('../../image/logonhasach.png')}
          />
        </View>
      </Backdrop>
    );
  }
}
const mapStateToProps = state => ({});
export default connect(
  mapStateToProps,
  {NavigationReset, loginTokenApiSubmit},
)(Welcome);
