import {takeLatest, put} from 'redux-saga/effects';
import {
  HISTORY_SERVICE_API,
  LIST_SERVICE_API,
  LIST_FAVARITE_STAFF_API,
  ADD_FAVARITE_STAFF_API,
  REMOVE_FAVARITE_STAFF_API,
  ORDERS_ID_API,
  REG_ORDER_API,
  ORDERS_DETAIL_ID_API,
  EVALUATION_STAFF_API,
} from '../actions/actionTypes';
import {callApi} from '../apis';
import {
  historyServiceApiFailure,
  historyServiceApiSuccess,
  listServiceApiFailure,
  listServiceApiSuccess,
  listFavatiteStaffApiSubmit,
  listFavatiteStaffApiFailure,
  listFavatiteStaffApiSuccess,
  addFavatiteStaffApiFailure,
  addFavatiteStaffApiSuccess,
  removeFavatiteStaffApiFailure,
  removeFavatiteStaffApiSuccess,
  ordersIdApiFailure,
  ordersIdApiSuccess,
  regOrdersApiFailure,
  regOrdersApiSuccess,
  ordersDetailIdApiFailure,
  ordersDetailIdApiSuccess,
  ordersDetailIdApiSubmit,
  evaluationStaffApiFailure,
  evaluationStaffApiSuccess,
  ordersIdApiSubmit,
} from '../actions/serviceActions';
import {
  historyServiceRequest,
  listFavatiteStaffRequest,
  addFavatiteStaffRequest,
  removeFavatiteStaffRequest,
  ordersIdRequest,
  regOrdersRequest,
  ordersDetailIdRequest,
  evaluationStaffRequest,
  listServiceRequest,
} from '../apis/requests/service';
import {
  NavigationRouter,
  NavigationBack,
  showPopupError,
  showPopupSuccess,
} from '../actions/anotherActions';

function* fetchHistoryService(action) {
  const {customerId, pageNumber, loadMore} = action;
  try {
    const request = historyServiceRequest(customerId, pageNumber);
    const response = yield callApi(request);
    yield put(historyServiceApiSuccess(response, loadMore));
  } catch (error) {
    yield put(historyServiceApiFailure());
  }
}

function* fetchListService(action) {
  const {pageNumber, phone, loadMore} = action;
  try {
    const request = listServiceRequest(pageNumber, phone);
    const response = yield callApi(request, false);
    yield put(listServiceApiSuccess(response, loadMore));
  } catch (error) {
    yield put(listServiceApiFailure());
  }
}

function* fetchListFavatiteStaff(action) {
  const {customerId, pageNumber, loadMore} = action;
  try {
    const request = listFavatiteStaffRequest(customerId, pageNumber);
    const response = yield callApi(request);
    yield put(listFavatiteStaffApiSuccess(response, loadMore));
  } catch (error) {
    yield put(listFavatiteStaffApiFailure());
  }
}

function* fetchAddFavatiteStaff(action) {
  const {id, staffId} = action;
  try {
    const request = addFavatiteStaffRequest(staffId);
    const response = yield callApi(request);
    yield put(addFavatiteStaffApiSuccess(response));
    yield put(listFavatiteStaffApiSubmit(id, 1));
    yield put(showPopupSuccess('Thêm nhân viên yêu thích', 'Thành công!'));
  } catch (error) {
    yield put(addFavatiteStaffApiFailure());
    if (error === 'Request failed with status code 400') {
      yield put(
        showPopupError(
          'Thêm nhân viên yêu thích',
          'Nhân viên đã có trong danh sách yêu thích!',
        ),
      );
    } else {
      yield put(
        showPopupError(
          'Thêm nhân viên yêu thích',
          'Thất bại, vui lòng thử lại!',
        ),
      );
    }
  }
}

function* fetchRemoveFavatiteStaff(action) {
  const {id, staffId} = action;
  try {
    const request = removeFavatiteStaffRequest(staffId);
    const response = yield callApi(request);
    yield put(removeFavatiteStaffApiSuccess(response));
    yield put(listFavatiteStaffApiSubmit(id, 1));
    yield put(showPopupSuccess('Xóa nhân viên yêu thích', 'Thành công!'));
  } catch (error) {
    yield put(addFavatiteStaffApiFailure());
    yield put(
      showPopupError('Xóa nhân viên yêu thích', 'Thất bại, vui lòng thử lại!'),
    );
  }
}

function* fetchEvaluationStaff(action) {
  const {id, customerRate, customerNote} = action;
  try {
    const request = evaluationStaffRequest(id, customerRate, customerNote);
    const response = yield callApi(request);
    yield put(evaluationStaffApiSuccess(response));
    yield put(showPopupSuccess('Đánh giá ca làm', 'Thành công!'));
  } catch (error) {
    yield put(evaluationStaffApiFailure());
    yield put(showPopupError('Đánh giá ca làm', 'Thất bại!'));
  }
}

function* fetchOrdersId(action) {
  const {id} = action;
  try {
    const request = ordersIdRequest(id);
    const response = yield callApi(request);
    yield put(ordersIdApiSuccess(response));
    yield put(ordersDetailIdApiSubmit(id));
  } catch (error) {
    yield put(ordersIdApiFailure());
  }
}

function* fetchRegOrder(action) {
  const {
    customer,
    categoryId,
    workShift,
    timeStart,
    timeEnd,
    address,
    description,
    lstDay,
    months,
    priceApply,
  } = action;
  try {
    const request = regOrdersRequest(
      customer,
      categoryId,
      workShift,
      timeStart,
      timeEnd,
      address,
      description,
      lstDay,
      months,
      priceApply,
    );
    const response = yield callApi(request);
    yield put(regOrdersApiSuccess(response));
    yield put(ordersIdApiSubmit(response.id));
    yield put(showPopupSuccess('Đăng ký dịch vụ', 'Thành công!'));
  } catch (error) {
    yield put(regOrdersApiFailure());
    yield put(
      showPopupError('Đăng ký dịch vụ thất bại', 'Vui lòng thử lại sau!'),
    );
  }
}

function* fetchOrdersDetailId(action) {
  const {orderId} = action;
  try {
    const request = ordersDetailIdRequest(orderId);
    const response = yield callApi(request);
    yield put(ordersDetailIdApiSuccess(response));
    yield put(NavigationRouter('Order'));
  } catch (error) {
    yield put(ordersDetailIdApiFailure());
  }
}

export default function* authApiSagas() {
  yield takeLatest(HISTORY_SERVICE_API.REQUEST, fetchHistoryService);
  yield takeLatest(LIST_SERVICE_API.REQUEST, fetchListService);
  yield takeLatest(LIST_FAVARITE_STAFF_API.REQUEST, fetchListFavatiteStaff);
  yield takeLatest(ADD_FAVARITE_STAFF_API.REQUEST, fetchAddFavatiteStaff);
  yield takeLatest(REMOVE_FAVARITE_STAFF_API.REQUEST, fetchRemoveFavatiteStaff);
  yield takeLatest(EVALUATION_STAFF_API.REQUEST, fetchEvaluationStaff);
  yield takeLatest(ORDERS_ID_API.REQUEST, fetchOrdersId);
  yield takeLatest(REG_ORDER_API.REQUEST, fetchRegOrder);
  yield takeLatest(ORDERS_DETAIL_ID_API.REQUEST, fetchOrdersDetailId);
}
