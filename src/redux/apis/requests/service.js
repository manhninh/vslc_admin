import {URL_API, PAGE_SIZE} from '../../../utils/configApp';

const historyService = '/api/orders/get-list-by-customer';
export const historyServiceRequest = (customerId, pageNumber) => ({
  method: 'POST',
  data: {
    customerId,
    pageNumber,
    pageSize: PAGE_SIZE,
  },
  url: `${URL_API}${historyService}`,
});

const listService = '/api/orders/get-list';
export const listServiceRequest = (pageNumber, phone) => ({
  method: 'POST',
  data: {
    pageNumber,
    phone,
    pageSize: PAGE_SIZE,
  },
  url: `${URL_API}${listService}`,
});

const listFavatiteStaff = '/api/staffs/list-favorite-staff';
export const listFavatiteStaffRequest = (customerId, pageNumber) => ({
  method: 'POST',
  data: {
    customerId,
    pageNumber,
    pageSize: PAGE_SIZE,
  },
  url: `${URL_API}${listFavatiteStaff}`,
});

const addFavatiteStaff = '/api/staffs/add-favorite-staff';
export const addFavatiteStaffRequest = staffId => ({
  method: 'POST',
  data: {
    staffId,
  },
  url: `${URL_API}${addFavatiteStaff}`,
});

const removeFavatiteStaff = '/api/staffs/remove-favorite-staff';
export const removeFavatiteStaffRequest = staffId => ({
  method: 'POST',
  data: {
    staffId,
  },
  url: `${URL_API}${removeFavatiteStaff}`,
});

const evaluationStaff = '/api/orders/evaluation-staff';
export const evaluationStaffRequest = (id, customerRate, customerNote) => ({
  method: 'POST',
  data: {
    lstStaffWorkShiftDto: [
      {
        id,
        customerRate,
        customerNote,
      },
    ],
  },
  url: `${URL_API}${evaluationStaff}`,
});

const ordersDetailId = '/api/order-details/get-list';
export const ordersDetailIdRequest = orderId => ({
  method: 'POST',
  url: `${URL_API}${ordersDetailId}`,
  data: {
    orderId,
  },
});

const ordersId = '/api/orders/';
export const ordersIdRequest = id => ({
  method: 'GET',
  url: `${URL_API}${ordersId}${id}`,
});

const regOrders = '/api/orders';
export const regOrdersRequest = (
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
) => ({
  method: 'POST',
  data: {
    customer,
    categoryId,
    shifts: workShift,
    timeStart,
    timeEnd,
    address,
    description,
    lstDay,
    months,
    priceApply,
  },
  url: `${URL_API}${regOrders}`,
});
