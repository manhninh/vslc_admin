import {takeLatest, put} from 'redux-saga/effects';
import {
  LOGIN_API,
  REGISTER_API,
  LOGIN_TOKEN_API,
  UPDATE_FCM_TOKEN_API,
  CUSTOMERS_API,
  INFO_API,
} from '../actions/actionTypes';
import {callApi} from '../apis';
import {ACCESS_TOKEN, FCM_TOKEN} from '../../utils/configApp';
import AsyncStorage from '@react-native-community/async-storage';

import {
  NavigationReset,
  loginApiFailure,
  loginApiSuccess,
  loginApiSubmit,
  registerApiFailure,
  registerApiSuccess,
  loginTokenApiSuccess,
  loginTokenApiSubmit,
  updateFcmTokenApiSuccess,
  updateFcmTokenApiSubmit,
  customersApiFailure,
  customersApiSuccess,
  infoApiFailure,
  infoApiSuccess,
  showPopupError,
  infoApiSubmit,
} from '../actions/anotherActions';
import {
  loginRequest,
  registerRequest,
  loginTokenRequest,
  updateFcmTokenRequest,
  customersRequest,
  infoRequest,
} from '../apis/requests/auth';
import {
  historyServiceApiSubmit,
  listFavatiteStaffApiSubmit,
  listServiceApiSubmit,
} from '../actions/serviceActions';
import {dataUser} from '../../redux/selectors';

let fcmToken = '';

function* fetchLoginApi(action) {
  const {username, password} = action;
  try {
    const request = loginRequest(username, password);
    const response = yield callApi(request);
    yield put(loginApiSuccess(response));
    AsyncStorage.setItem(ACCESS_TOKEN, response.access_token);
    yield put(loginTokenApiSubmit(response.access_token));
    // yield put(NavigationReset('Home'));
  } catch (error) {
    yield put(loginApiFailure(error));
    yield put(showPopupError('Đăng nhập', 'Thất bại, vui lòng thử lại!'));
  }
}

function* fetchRegister(action) {
  const {phone, name} = action;
  try {
    const request = registerRequest(phone, name);
    const response = yield callApi(request, true, false);
    yield put(registerApiSuccess(response));
    yield put(loginApiSubmit(phone));
  } catch (error) {
    yield put(registerApiFailure(error));
  }
}

function* fetchLoginToken() {
  AsyncStorage.multiGet([FCM_TOKEN]).then(res => {
    try {
      fcmToken = res[0][1];
      if (fcmToken) {
        console.log('----fcmToken------', fcmToken);
      }
    } catch (error) {}
  });
  try {
    const request = loginTokenRequest();
    const response = yield callApi(request);
    yield put(loginTokenApiSuccess(response));
    yield put(updateFcmTokenApiSubmit(fcmToken));
    if (response.role === 'ROLE_STAFF') {
      yield put(NavigationReset('HomeStaff'));
    } else {
      yield put(NavigationReset('Home'));
    }
    yield put(listServiceApiSubmit(1));
    yield put(infoApiSubmit());
  } catch (error) {
    yield put(NavigationReset('SignIn'));
  }
}

function* fetchUpdateFcmToken(action) {
  const {fcmToken} = action;
  try {
    const request = updateFcmTokenRequest(fcmToken);
    const response = yield callApi(request);
    yield put(updateFcmTokenApiSuccess(response));
  } catch (error) {}
}

function* fetchCustomers() {
  try {
    const request = customersRequest();
    const response = yield callApi(request);
    yield put(customersApiSuccess(response));
    // yield put(historyServiceApiSubmit(response.id, 1));
    // yield put(listFavatiteStaffApiSubmit(response.id, 1));
  } catch (error) {
    yield put(customersApiFailure());
  }
}

function* fetchInfo() {
  try {
    const request = infoRequest();
    const response = yield callApi(request);
    yield put(infoApiSuccess(response));
  } catch (error) {
    yield put(infoApiFailure());
  }
}

export default function* authApiSagas() {
  yield takeLatest(LOGIN_API.REQUEST, fetchLoginApi);
  yield takeLatest(REGISTER_API.REQUEST, fetchRegister);
  yield takeLatest(LOGIN_TOKEN_API.REQUEST, fetchLoginToken);
  yield takeLatest(UPDATE_FCM_TOKEN_API.REQUEST, fetchUpdateFcmToken);
  yield takeLatest(CUSTOMERS_API.REQUEST, fetchCustomers);
  yield takeLatest(INFO_API.REQUEST, fetchInfo);
}
