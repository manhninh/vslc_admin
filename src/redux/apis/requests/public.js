import {URL_API, PAGE_SIZE} from '../../../utils/configApp';

const listNotifications = '/api/notifications/get-list';
export const listNotificationsRequest = pageNumber => ({
  method: 'POST',
  data: {
    pageNumber,
    pageSize: PAGE_SIZE,
  },
  url: `${URL_API}${listNotifications}`,
});

const readNotifications = '/api/notifications/checked';
export const readNotificationsRequest = data => ({
  method: 'POST',
  data: {
    lsNotifications: [data],
  },
  url: `${URL_API}${readNotifications}`,
});

const listFreeWork = '/api/staffs/get-list-free-work';
export const listFreeWorkRequest = (startDate, endDate) => ({
  method: 'POST',
  data: {
    startDate,
    endDate,
    keyword: '',
  },
  url: `${URL_API}${listFreeWork}`,
});

const payment = '/api/orders/payment';
export const paymentRequest = (orderId, paymentNote, paymentValue) => ({
  method: 'POST',
  data: {
    orderId,
    paymentNote,
    paymentValue,
  },
  url: `${URL_API}${payment}`,
});

const paymentDetail = '/api/order-details/payment';
export const paymentDetailRequest = (
  orderDetailId,
  paymentNote,
  paymentValue,
) => ({
  method: 'POST',
  data: {
    orderDetailId,
    paymentNote,
    paymentValue,
  },
  url: `${URL_API}${paymentDetail}`,
});

const updateExtra = '/api/orders/update-extra-time';
export const updateExtraRequest = (
  orderDetailId,
  acceptChangePrice,
  extraTime,
) => ({
  method: 'POST',
  data: {
    orderDetailId,
    acceptChangePrice,
    extraTime,
  },
  url: `${URL_API}${updateExtra}`,
});

const asign = '/api/orders/asign';
export const asignRequest = (orderDetailId, lstStaff) => ({
  method: 'POST',
  data: {
    orderDetailId,
    lstStaff,
  },
  url: `${URL_API}${asign}`,
});

const changeState = '/api/orders/change-state';
export const changeStateRequest = (orderId, state) => ({
  method: 'POST',
  data: {
    orderId,
    state,
    type: 1,
  },
  url: `${URL_API}${changeState}`,
});

const changeStateDetail = '/api/orders/change-state-detail';
export const changeStateDetailRequest = (
  orderDetailId,
  acceptChangePrice,
  state,
) => ({
  method: 'POST',
  data: {
    orderDetailId,
    acceptChangePrice,
    state,
  },
  url: `${URL_API}${changeStateDetail}`,
});

const searchCustomer = '/api/customers/get-list';
export const searchCustomerRequest = (keyword, pageNumber) => ({
  method: 'POST',
  data: {
    keyword,
    pageNumber,
    pageSize: PAGE_SIZE,
  },
  url: `${URL_API}${searchCustomer}`,
});

const addressCustomer = '/api/addresses/list-by-customer-id';
export const addressCustomerRequest = customerId => ({
  method: 'POST',
  data: {
    customerId,
  },
  url: `${URL_API}${addressCustomer}`,
});

const customerDetail = '/api/customers/';
export const customerDetailRequest = customerId => ({
  method: 'GET',
  url: `${URL_API}${customerDetail}${customerId}`,
});

const newPriceApi = '/api/orders/';
export const newPriceRequest = (orderId, newPrice) => ({
  method: 'PUT',
  data: {
    priceApply: newPrice,
  },
  url: `${URL_API}${newPriceApi}${orderId}`,
});
