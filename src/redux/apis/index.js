// import RNFetchBlob from 'react-native-fetch-blob';
import {put, call} from 'redux-saga/effects';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {storeConfig} from '../../index';

import {TIME_REQUEST} from '../../utils/configApp';
import {
  showLoading,
  hideLoading,
  showPopupError,
  NavigationReset,
} from '../actions/anotherActions';
import {LOGGER_DEV} from '../../utils/logger';

function checkNetworking() {
  return NetInfo.fetch().then(connectionInfo => connectionInfo.isConnected);
}

function* handleApi(options) {
  const token = storeConfig.store.getState().another.access_token || '';
  let request = {
    timeout: TIME_REQUEST,
    headers: {
      // 'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: token,
    },
    ...options,
  };

  if (request.method && request.method.toUpperCase() !== 'GET') {
    request = {...request, data: request.data};
  }
  try {
    console.log('>>> Request >>>', request);
    const response = yield axios(request);
    console.log('>>> Response response >>>', request.url, response);

    if (!response) {
      const error = 'Connection errors';
      console.log('--!response----', error);
      throw error;
    }

    return response.data;
  } catch (error) {
    const objError = JSON.parse(JSON.stringify(error));
    console.log('---error---', objError);

    throw error.message;
  }
}

function* handleApiNotHeaders(options) {
  // const token = storeConfig.store.getState().auth.access_token || '';
  let request = {
    timeout: TIME_REQUEST,
    ...options,
  };

  if (request.method && request.method.toUpperCase() !== 'GET') {
    request = {...request, data: request.data};
  }
  try {
    console.log('>>> Request >>>', request);
    const response = yield axios(request);
    console.log('>>> Response response >>>', request.url, response);

    if (!response) {
      const error = 'Connection errors';
      throw error;
    }

    return response.data;
  } catch (error) {
    // if (typeof error === 'string' || error instanceof String) {
    //   throw error;
    // }
    throw error.message;
  }
}

export function* callApi(options, isLoading = true, headers = true) {
  const hasNetworking = yield call(checkNetworking);
  if (!hasNetworking) {
    const messageError = 'No internet connection';
    throw messageError;
  }

  try {
    let result;
    if (isLoading) {
      yield put(showLoading());
    }
    if (headers) {
      result = yield handleApi(options);
    } else {
      result = yield handleApiNotHeaders(options);
    }
    if (isLoading) {
      yield put(hideLoading());
    }
    return result;
  } catch (error) {
    if (isLoading) {
      yield put(hideLoading());
    }
    if (error === 'Request failed with status code 401') {
      yield put(NavigationReset('SignIn'));
      yield put(
        showPopupError('Hết phiên đăng nhập', 'Vui lòng đăng nhập lại!'),
      );
    }
    console.log('>>> Error API URL >>>', options.url);
    console.log('>>> Error catch >>>', error);
    throw error;
  }
}
