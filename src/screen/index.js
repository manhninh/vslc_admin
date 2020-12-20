import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {RootNavigation} from '../navigations/AppNavigation';
import {
  Platform,
  KeyboardAvoidingView,
  View,
  StatusBar,
  BackHandler,
  Dimensions,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {
  showPopupSuccess,
  hidePopupSuccess,
  hidePopupError,
  NavigationBack,
  NavigationReset,
} from '../redux/actions/anotherActions';
import Loading from '../components/Loading';
import {
  isLoading,
  popupSuccess,
  popupError,
  dataUser,
} from '../redux/selectors';
import ErrorModal from '../components/ModalError';
import SuccessModal from '../components/ModalSuccess';
import * as AppValues from '../AppValues';
import AsyncStorage from '@react-native-community/async-storage';
import {FCM_TOKEN} from '../utils/configApp';

class Screens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      showModal: false,
    };
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this._handleHardwareBackPress,
      );
    }
    messaging().onMessage(async remoteMessage => {
      const {showPopupSuccess} = this.props;
      const {body, title} = remoteMessage.notification;
      console.log('-----remoteMessage-onMessage-----:', title);
      this.setState({title, body, showModal: true});
    });
    this.requestUserPermission();
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this._handleHardwareBackPress,
      );
    }
  }

  _handleHardwareBackPress = () => {
    const {NavigationBack, nav} = this.props;
    if (nav.index === 0) {
      BackHandler.exitApp();
      return false;
    }
    NavigationBack();
    return true;
  };

  requestUserPermission = async () => {
    console.log('---requestUserPermission---');
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
      this.postFcmToken();
    }
  };

  postFcmToken = async () => {
    try {
      const token = await messaging().getToken();
      if (token) {
        AsyncStorage.setItem(FCM_TOKEN, token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  renderView() {
    const {title, body, showModal} = this.state;
    const {
      isLoading,
      popupSuccess,
      popupError,
      hidePopupSuccess,
      hidePopupError,
      NavigationReset,
      dataUser,
    } = this.props;
    const role = dataUser.role === 'ROLE_STAFF';
    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor={AppValues.primaryColor}
          styles={{hight: (Dimensions.get('window').height * 60) / 2208}}
        />
        <RootNavigation />
        <Loading isVisible={isLoading} />
        <SuccessModal
          txtContent={popupSuccess.content}
          txtTitle={popupSuccess.title}
          visible={popupSuccess.isShow}
          onPress={() => hidePopupSuccess()}
        />
        <ErrorModal
          txtTitle={popupError.title}
          txtContent={popupError.content}
          visible={popupError.isShow}
          onPress={() => hidePopupError()}
        />
        <SuccessModal
          txtContent={body}
          txtTitle={title}
          visible={showModal}
          onPress={() => {
            this.setState({showModal: false});
            NavigationReset(role ? 'HomeStaffNotify' : 'HomeAdminNotify');
          }}
        />
      </View>
    );
  }

  render() {
    if (Platform.OS === 'ios') {
      return (
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
          {this.renderView()}
        </KeyboardAvoidingView>
      );
    }
    return <View style={{flex: 1}}>{this.renderView()}</View>;
  }
}
const mapStateToProps = state => ({
  nav: state.nav,
  isLoading: isLoading(state),
  popupSuccess: popupSuccess(state),
  popupError: popupError(state),
  dataUser: dataUser(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showPopupSuccess,
      hidePopupSuccess,
      hidePopupError,
      NavigationBack,
      NavigationReset,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screens);
