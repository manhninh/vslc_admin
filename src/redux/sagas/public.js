import {takeLatest, put} from 'redux-saga/effects';
import {
  LIST_NOTIFICATIONS_API,
  READ_NOTIFICATIONS_API,
  LIST_FREE_WORK_API,
  PAYMENT_API,
  PAYMENT_DETAIL_API,
  ASIGN_API,
  UPDATE_EXTRA_API,
  CHANGE_STATE_API,
  CHANGE_STATE_DETAIL_API,
  SEARCH_CUSTOMER_API,
  ADDRESS_CUSTOMER_API,
  CUSTOMER_DETAIL_API,
  NEW_PRICE_API,
} from '../actions/actionTypes';
import {callApi} from '../apis';
import {
  listNotificationsApiFailure,
  listNotificationsApiSuccess,
  listNotificationsApiSubmit,
  readNotificationsApiFailure,
  readNotificationsApiSuccess,
  listFreeWorkApiFailure,
  listFreeWorkApiSuccess,
  paymentApiFailure,
  paymentApiSuccess,
  paymentDetailApiFailure,
  paymentDetailApiSuccess,
  changeStateApiFailure,
  changeStateApiSuccess,
  searchCustomerApiFailure,
  searchCustomerApiSuccess,
  addressCustomerApiFailure,
  addressCustomerApiSuccess,
  customerDetailApiFailure,
  customerDetailApiSuccess,
  newPriceApiFailure,
  newPriceApiSuccess,
} from '../actions/publicActions';
import {
  listNotificationsRequest,
  readNotificationsRequest,
  listFreeWorkRequest,
  paymentRequest,
  paymentDetailRequest,
  asignRequest,
  updateExtraRequest,
  changeStateRequest,
  changeStateDetailRequest,
  searchCustomerRequest,
  addressCustomerRequest,
  customerDetailRequest,
  newPriceRequest,
} from '../apis/requests/public';
import {
  showPopupError,
  showPopupSuccess,
  NavigationRouter,
} from '../actions/anotherActions';
import {
  ordersIdApiSubmit,
  ordersDetailIdApiSubmit,
  listServiceApiSubmit,
} from '../actions/serviceActions';

function* fetchListNotifications(action) {
  const {pageNumber, loadMore} = action;
  try {
    const request = listNotificationsRequest(pageNumber);
    const response = yield callApi(request);
    yield put(listNotificationsApiSuccess(response, loadMore));
  } catch (error) {
    yield put(listNotificationsApiFailure());
  }
}

function* fetchReadNotifications(action) {
  const {data} = action;
  try {
    const request = readNotificationsRequest(data);
    const response = yield callApi(request);
    yield put(readNotificationsApiSuccess(response));
    yield put(listNotificationsApiSubmit(1));
  } catch (error) {
    yield put(readNotificationsApiFailure());
  }
}

function* fetchListFreeWork(action) {
  const {startDate, endDate} = action;
  try {
    const request = listFreeWorkRequest(startDate, endDate);
    const response = yield callApi(request);
    yield put(listFreeWorkApiSuccess(response));
  } catch (error) {
    yield put(listFreeWorkApiFailure());
  }
}

function* fetchPayment(action) {
  const {orderId, paymentNote, paymentValue} = action;
  try {
    const request = paymentRequest(
      String(orderId),
      paymentNote,
      Number(paymentValue),
    );
    const response = yield callApi(request);
    yield put(paymentApiSuccess(response));
    yield put(ordersIdApiSubmit(orderId));
    yield put(ordersDetailIdApiSubmit(orderId));
    yield put(listServiceApiSubmit(1));
    yield put(showPopupSuccess('Thực hiện thanh toán', 'Thành công!'));
  } catch (error) {
    yield put(paymentApiFailure());
    yield put(
      showPopupError('Thực hiện thanh toán', 'Thất bại, vui lòng thử lại!'),
    );
  }
}

function* fetchPaymentDetail(action) {
  const {orderId, orderDetailId, paymentNote, paymentValue} = action;
  try {
    const request = paymentDetailRequest(
      String(orderDetailId),
      paymentNote,
      Number(paymentValue),
    );
    const response = yield callApi(request);
    yield put(paymentDetailApiSuccess(response));
    yield put(ordersIdApiSubmit(orderId));
    yield put(ordersDetailIdApiSubmit(orderId));
    yield put(listServiceApiSubmit(1));
    yield put(showPopupSuccess('Thực hiện thanh toán', 'Thành công!'));
  } catch (error) {
    yield put(paymentDetailApiFailure());
    yield put(
      showPopupError('Thực hiện thanh toán', 'Thất bại, vui lòng thử lại!'),
    );
  }
}

function* fetchAsign(action) {
  const {orderId, orderDetailId, lstStaff} = action;
  try {
    const request = asignRequest(String(orderDetailId), lstStaff);
    const response = yield callApi(request);
    yield put(ordersIdApiSubmit(orderId));
    yield put(ordersDetailIdApiSubmit(orderId));
    yield put(listServiceApiSubmit(1));
  } catch (error) {
    yield put(showPopupError('Thông báo', 'Thất bại, vui lòng thử lại!'));
  }
}

function* fetchUpdateExtra(action) {
  const {orderId, orderDetailId, acceptChangePrice, extraTime} = action;
  try {
    const request = updateExtraRequest(
      String(orderDetailId),
      acceptChangePrice,
      extraTime,
    );
    const response = yield callApi(request);
    yield put(ordersIdApiSubmit(orderId));
    yield put(ordersDetailIdApiSubmit(orderId));
    yield put(listServiceApiSubmit(1));
  } catch (error) {
    yield put(
      showPopupError(
        'Cập nhật thời gian làm thêm giờ',
        'Thất bại, vui lòng thử lại!',
      ),
    );
  }
}

function* fetchChangeState(action) {
  const {orderId, state} = action;
  try {
    const request = changeStateRequest(orderId, state);
    const response = yield callApi(request);
    yield put(changeStateApiSuccess(response));
    yield put(ordersIdApiSubmit(orderId));
    yield put(ordersDetailIdApiSubmit(orderId));
    yield put(listServiceApiSubmit(1));
  } catch (error) {
    yield put(changeStateApiFailure());
    yield put(
      showPopupError('Báo hết nhân viên', 'Thất bại, vui lòng thử lại!'),
    );
  }
}

function* fetchChangeStateDetail(action) {
  const {orderId, orderDetailId, acceptChangePrice, state} = action;
  try {
    const request = changeStateDetailRequest(
      String(orderDetailId),
      acceptChangePrice,
      state,
    );
    const response = yield callApi(request);
    yield put(ordersIdApiSubmit(orderId));
    yield put(ordersDetailIdApiSubmit(orderId));
    yield put(listServiceApiSubmit(1));
  } catch (error) {
    yield put(showPopupError('Thông báo', 'Thất bại, vui lòng thử lại!'));
  }
}

function* fetchSearchCustomer(action) {
  const {keyword, pageNumber, loadMore} = action;
  try {
    const request = searchCustomerRequest(keyword, pageNumber);
    const response = yield callApi(request, false);
    yield put(searchCustomerApiSuccess(response, loadMore));
  } catch (error) {
    yield put(searchCustomerApiFailure(error));
  }
}

function* fetchAddressCustomer(action) {
  const {customerId} = action;
  try {
    const request = addressCustomerRequest(customerId);
    const response = yield callApi(request);
    yield put(addressCustomerApiSuccess(response));
  } catch (error) {
    yield put(addressCustomerApiFailure(error));
  }
}

function* fetchCustomerDetail(action) {
  const {customerId} = action;
  try {
    const request = customerDetailRequest(customerId);
    const response = yield callApi(request);
    yield put(customerDetailApiSuccess(response));
    yield put(NavigationRouter('CustomerDetail'));
  } catch (error) {
    yield put(customerDetailApiFailure(error));
  }
}

function* fetchNewPrice(action) {
  const {orderId, newPrice} = action;
  try {
    const request = newPriceRequest(orderId, newPrice);
    const response = yield callApi(request);
    yield put(newPriceApiSuccess(response));
    yield put(ordersIdApiSubmit(orderId));
    yield put(ordersDetailIdApiSubmit(orderId));
    yield put(listServiceApiSubmit(1));
  } catch (error) {
    yield put(newPriceApiFailure());
    yield put(
      showPopupError('Cập nhật đơn giá', 'Thất bại, vui lòng thử lại!'),
    );
  }
}

export default function* authApiSagas() {
  yield takeLatest(LIST_NOTIFICATIONS_API.REQUEST, fetchListNotifications);
  yield takeLatest(READ_NOTIFICATIONS_API.REQUEST, fetchReadNotifications);
  yield takeLatest(LIST_FREE_WORK_API.REQUEST, fetchListFreeWork);
  yield takeLatest(PAYMENT_API.REQUEST, fetchPayment);
  yield takeLatest(PAYMENT_DETAIL_API.REQUEST, fetchPaymentDetail);
  yield takeLatest(ASIGN_API.REQUEST, fetchAsign);
  yield takeLatest(UPDATE_EXTRA_API.REQUEST, fetchUpdateExtra);
  yield takeLatest(CHANGE_STATE_API.REQUEST, fetchChangeState);
  yield takeLatest(CHANGE_STATE_DETAIL_API.REQUEST, fetchChangeStateDetail);
  yield takeLatest(SEARCH_CUSTOMER_API.REQUEST, fetchSearchCustomer);
  yield takeLatest(ADDRESS_CUSTOMER_API.REQUEST, fetchAddressCustomer);
  yield takeLatest(CUSTOMER_DETAIL_API.REQUEST, fetchCustomerDetail);
  yield takeLatest(NEW_PRICE_API.REQUEST, fetchNewPrice);
}
