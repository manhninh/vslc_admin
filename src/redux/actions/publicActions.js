import {
  LIST_NOTIFICATIONS_API,
  READ_NOTIFICATIONS_API,
  LIST_FREE_WORK_API,
  PAYMENT_API,
  PAYMENT_DETAIL_API,
  CHANGE_STATE_API,
  CHANGE_STATE_DETAIL_API,
  ASIGN_API,
  UPDATE_EXTRA_API,
  SEARCH_CUSTOMER_API,
  ADDRESS_CUSTOMER_API,
  CUSTOMER_DETAIL_API,
  NEW_PRICE_API,
} from './actionTypes';

export function listNotificationsApiSuccess(response, loadMore) {
  return {
    type: LIST_NOTIFICATIONS_API.SUCCESS,
    response,
    loadMore,
  };
}
export function listNotificationsApiFailure(error) {
  return {
    type: LIST_NOTIFICATIONS_API.FAILURE,
    error,
  };
}
export function listNotificationsApiSubmit(pageNumber, loadMore = false) {
  return {
    type: LIST_NOTIFICATIONS_API.REQUEST,
    pageNumber,
    loadMore,
  };
}

export function readNotificationsApiSuccess(response) {
  return {
    type: READ_NOTIFICATIONS_API.SUCCESS,
    response,
  };
}
export function readNotificationsApiFailure(error) {
  return {
    type: READ_NOTIFICATIONS_API.FAILURE,
    error,
  };
}
export function readNotificationsApiSubmit(data) {
  return {
    type: READ_NOTIFICATIONS_API.REQUEST,
    data,
  };
}

export function listFreeWorkApiSuccess(response) {
  return {
    type: LIST_FREE_WORK_API.SUCCESS,
    response,
  };
}
export function listFreeWorkApiFailure(error) {
  return {
    type: LIST_FREE_WORK_API.FAILURE,
    error,
  };
}
export function listFreeWorkApiSubmit(startDate, endDate) {
  return {
    type: LIST_FREE_WORK_API.REQUEST,
    startDate,
    endDate,
  };
}

export function paymentApiSuccess(response) {
  return {
    type: PAYMENT_API.SUCCESS,
    response,
  };
}
export function paymentApiFailure(error) {
  return {
    type: PAYMENT_API.FAILURE,
    error,
  };
}
export function paymentApiSubmit(orderId, paymentNote, paymentValue) {
  return {
    type: PAYMENT_API.REQUEST,
    orderId,
    paymentNote,
    paymentValue,
  };
}

export function paymentDetailApiSuccess(response) {
  return {
    type: PAYMENT_DETAIL_API.SUCCESS,
    response,
  };
}
export function paymentDetailApiFailure(error) {
  return {
    type: PAYMENT_DETAIL_API.FAILURE,
    error,
  };
}
export function paymentDetailApiSubmit(
  orderId,
  orderDetailId,
  paymentNote,
  paymentValue,
) {
  return {
    type: PAYMENT_DETAIL_API.REQUEST,
    orderId,
    orderDetailId,
    paymentNote,
    paymentValue,
  };
}

export function asignApiSuccess(response) {
  return {
    type: ASIGN_API.SUCCESS,
    response,
  };
}
export function asignApiFailure(error) {
  return {
    type: ASIGN_API.FAILURE,
    error,
  };
}
export function asignApiSubmit(orderId, orderDetailId, lstStaff) {
  return {
    type: ASIGN_API.REQUEST,
    orderId,
    orderDetailId,
    lstStaff,
  };
}

export function updateExtraApiSuccess(response) {
  return {
    type: UPDATE_EXTRA_API.SUCCESS,
    response,
  };
}
export function updateExtraApiFailure(error) {
  return {
    type: UPDATE_EXTRA_API.FAILURE,
    error,
  };
}
export function updateExtraApiSubmit(
  orderId,
  orderDetailId,
  acceptChangePrice,
  extraTime,
) {
  return {
    type: UPDATE_EXTRA_API.REQUEST,
    orderId,
    orderDetailId,
    acceptChangePrice,
    extraTime,
  };
}

export function changeStateApiSuccess(response) {
  return {
    type: CHANGE_STATE_API.SUCCESS,
    response,
  };
}
export function changeStateApiFailure(error) {
  return {
    type: CHANGE_STATE_API.FAILURE,
    error,
  };
}
export function changeStateApiSubmit(orderId, state) {
  return {
    type: CHANGE_STATE_API.REQUEST,
    orderId,
    state,
  };
}

export function changeStateDetailApiSuccess(response) {
  return {
    type: CHANGE_STATE_DETAIL_API.SUCCESS,
    response,
  };
}
export function changeStateDetailApiFailure(error) {
  return {
    type: CHANGE_STATE_DETAIL_API.FAILURE,
    error,
  };
}
export function changeStateDetailApiSubmit(
  orderId,
  orderDetailId,
  acceptChangePrice,
  state,
) {
  return {
    type: CHANGE_STATE_DETAIL_API.REQUEST,
    orderId,
    orderDetailId,
    acceptChangePrice,
    state,
  };
}

export function searchCustomerApiSuccess(response, loadMore) {
  return {
    type: SEARCH_CUSTOMER_API.SUCCESS,
    response,
    loadMore,
  };
}
export function searchCustomerApiFailure(error) {
  return {
    type: SEARCH_CUSTOMER_API.FAILURE,
    error,
  };
}
export function searchCustomerApiSubmit(keyword, pageNumber, loadMore) {
  return {
    type: SEARCH_CUSTOMER_API.REQUEST,
    keyword,
    pageNumber,
    loadMore,
  };
}

export function addressCustomerApiSuccess(response) {
  return {
    type: ADDRESS_CUSTOMER_API.SUCCESS,
    response,
  };
}
export function addressCustomerApiFailure(error) {
  return {
    type: ADDRESS_CUSTOMER_API.FAILURE,
    error,
  };
}
export function addressCustomerApiSubmit(customerId) {
  return {
    type: ADDRESS_CUSTOMER_API.REQUEST,
    customerId,
  };
}

export function customerDetailApiSuccess(response) {
  return {
    type: CUSTOMER_DETAIL_API.SUCCESS,
    response,
  };
}
export function customerDetailApiFailure(error) {
  return {
    type: CUSTOMER_DETAIL_API.FAILURE,
    error,
  };
}
export function customerDetailApiSubmit(customerId) {
  return {
    type: CUSTOMER_DETAIL_API.REQUEST,
    customerId,
  };
}

export function newPriceApiSuccess(response) {
  return {
    type: NEW_PRICE_API.SUCCESS,
    response,
  };
}
export function newPriceApiFailure(error) {
  return {
    type: NEW_PRICE_API.FAILURE,
    error,
  };
}
export function newPriceApiSubmit(orderId, newPrice) {
  return {
    type: NEW_PRICE_API.REQUEST,
    orderId,
    newPrice,
  };
}
