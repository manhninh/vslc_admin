import {takeLatest, put} from 'redux-saga/effects';
import {NavigationActions, StackActions} from 'react-navigation';
import {NAVIGATION_APP} from '../actions/actionTypes';
import {LOGGER_DEV} from '../../utils/logger';

function* gotoBack() {
  try {
    yield put(NavigationActions.back());
  } catch (error) {
    LOGGER_DEV(error);
  }
}

function* resetNavigation(action) {
  try {
    const resetNav = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: action.nameScreen})],
    });
    yield put(resetNav);
  } catch (error) {
    LOGGER_DEV(error);
  }
}

function* replaceNavigation(action) {
  try {
    const replaceNav = StackActions.replace({routeName: action.nameScreen});
    yield put(replaceNav);
  } catch (error) {
    LOGGER_DEV(error);
  }
}

function* navigationRouter(action) {
  try {
    const navigate = NavigationActions.navigate({
      routeName: action.nameScreen,
      params: action.dataParams,
    });
    yield put(navigate);
  } catch (error) {
    LOGGER_DEV(error);
  }
}

export default function* anotherSagas() {
  yield takeLatest(NAVIGATION_APP.BACK, gotoBack);
  yield takeLatest(NAVIGATION_APP.NAVIGATE, navigationRouter);
  yield takeLatest(NAVIGATION_APP.RESET, resetNavigation);
  yield takeLatest(NAVIGATION_APP.REPLACE, replaceNavigation);
}
