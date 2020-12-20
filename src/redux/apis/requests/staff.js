import {URL_API, PAGE_SIZE} from '../../../utils/configApp';

const listStaff = '/api/staffs/get-list';
export const listStaffRequest = pageNumber => ({
  method: 'POST',
  data: {
    pageNumber,
    pageSize: PAGE_SIZE,
  },
  url: `${URL_API}${listStaff}`,
});

const statisticsStaff = '/api/staff-work-shift/get-staff-dashboard';
export const statisticsStaffRequest = (date, shift) => ({
  method: 'POST',
  data: {
    date,
    shift,
  },
  url: `${URL_API}${statisticsStaff}`,
});

const staffDetail = '/api/staffs/';
export const staffDetailRequest = staffId => ({
  method: 'GET',
  url: `${URL_API}${staffDetail}${staffId}`,
});

const listByStaff = '/api/order-details/get-list-by-staff';
export const listByStaffRequest = (staffId, pageNumber) => ({
  method: 'POST',
  data: {
    staffId,
    pageNumber,
    pageSize: PAGE_SIZE,
  },
  url: `${URL_API}${listByStaff}`,
});

const staffWorkShift = '/api/staff-work-shift/get-list';
export const staffWorkShiftRequest = pageNumber => ({
  method: 'POST',
  data: {
    pageNumber,
    pageSize: PAGE_SIZE,
  },
  url: `${URL_API}${staffWorkShift}`,
});
