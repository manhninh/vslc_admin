import {takeLatest, put} from 'redux-saga/effects';
import {
  LIST_STAFF_API,
  STATISTICS_STAFF_API,
  STAFF_DETAIL_API,
  LIST_BY_STAFF_API,
  STAFF_WORK_SHIFT_API,
} from '../actions/actionTypes';
import {callApi} from '../apis';
import {
  listStaffApiFailure,
  listStaffApiSuccess,
  statisticsStaffApiFailure,
  statisticsStaffApiSuccess,
  staffDetailApiFailure,
  staffDetailApiSuccess,
  listByStaffApiFailure,
  listByStaffApiSuccess,
  staffWorkShiftApiFailure,
  staffWorkShiftApiSuccess,
} from '../actions/staff';
import {
  listStaffRequest,
  statisticsStaffRequest,
  staffDetailRequest,
  listByStaffRequest,
  staffWorkShiftRequest,
} from '../apis/requests/staff';
import {NavigationRouter, showPopupError} from '../actions/anotherActions';

function* fetchListStaff(action) {
  const {pageNumber, loadMore} = action;
  try {
    const request = listStaffRequest(pageNumber);
    const response = yield callApi(request, false);
    yield put(listStaffApiSuccess(response, loadMore));
  } catch (error) {
    yield put(listStaffApiFailure());
  }
}

function* fetchStatisticsStaff(action) {
  const {date, shift} = action;
  try {
    const request = statisticsStaffRequest(date, shift);
    const response = yield callApi(request);
    yield put(statisticsStaffApiSuccess(response));
  } catch (error) {
    yield put(statisticsStaffApiFailure());
  }
}

function* fetchStaffDetail(action) {
  const {staffId} = action;
  try {
    const request = staffDetailRequest(staffId);
    const response = yield callApi(request);
    yield put(staffDetailApiSuccess(response));
    yield put(NavigationRouter('StaffDetail'));
  } catch (error) {
    yield put(staffDetailApiFailure());
    yield put(
      showPopupError(
        'Xem chi tiết nhân viên thất bại',
        'Vui lòng thử lại sau!',
      ),
    );
  }
}

function* fetchListByStaff(action) {
  const {staffId, pageNumber, loadMore} = action;
  try {
    const request = listByStaffRequest(staffId, pageNumber);
    const response = yield callApi(request);
    yield put(listByStaffApiSuccess(response, loadMore));
  } catch (error) {
    yield put(listByStaffApiFailure());
  }
}

function* fetchStaffWorkShift(action) {
  const {pageNumber, loadMore} = action;
  try {
    const request = staffWorkShiftRequest(pageNumber);
    const response = yield callApi(request, false);
    yield put(staffWorkShiftApiSuccess(response, loadMore));
  } catch (error) {
    yield put(staffWorkShiftApiFailure());
  }
}

export default function* authApiSagas() {
  yield takeLatest(LIST_STAFF_API.REQUEST, fetchListStaff);
  yield takeLatest(STATISTICS_STAFF_API.REQUEST, fetchStatisticsStaff);
  yield takeLatest(STAFF_DETAIL_API.REQUEST, fetchStaffDetail);
  yield takeLatest(LIST_BY_STAFF_API.REQUEST, fetchListByStaff);
  yield takeLatest(STAFF_WORK_SHIFT_API.REQUEST, fetchStaffWorkShift);
}
