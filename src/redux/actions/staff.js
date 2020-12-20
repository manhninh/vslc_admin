import {
  LIST_STAFF_API,
  STATISTICS_STAFF_API,
  STAFF_DETAIL_API,
  LIST_BY_STAFF_API,
  STAFF_WORK_SHIFT_API,
} from './actionTypes';

export function listStaffApiSuccess(response, loadMore) {
  return {
    type: LIST_STAFF_API.SUCCESS,
    response,
    loadMore,
  };
}
export function listStaffApiFailure(error) {
  return {
    type: LIST_STAFF_API.FAILURE,
    error,
  };
}
export function listStaffApiSubmit(pageNumber, loadMore = false) {
  return {
    type: LIST_STAFF_API.REQUEST,
    pageNumber,
    loadMore,
  };
}

export function statisticsStaffApiSuccess(response) {
  return {
    type: STATISTICS_STAFF_API.SUCCESS,
    response,
  };
}
export function statisticsStaffApiFailure(error) {
  return {
    type: STATISTICS_STAFF_API.FAILURE,
    error,
  };
}
export function statisticsStaffApiSubmit(date, shift) {
  return {
    type: STATISTICS_STAFF_API.REQUEST,
    date,
    shift,
  };
}

export function staffDetailApiSuccess(response) {
  return {
    type: STAFF_DETAIL_API.SUCCESS,
    response,
  };
}
export function staffDetailApiFailure(error) {
  return {
    type: STAFF_DETAIL_API.FAILURE,
    error,
  };
}
export function staffDetailApiSubmit(staffId) {
  return {
    type: STAFF_DETAIL_API.REQUEST,
    staffId,
  };
}

export function listByStaffApiSuccess(response, loadMore) {
  return {
    type: LIST_BY_STAFF_API.SUCCESS,
    response,
    loadMore,
  };
}
export function listByStaffApiFailure(error) {
  return {
    type: LIST_BY_STAFF_API.FAILURE,
    error,
  };
}
export function listByStaffApiSubmit(staffId, pageNumber, loadMore = false) {
  return {
    type: LIST_BY_STAFF_API.REQUEST,
    staffId,
    pageNumber,
    loadMore,
  };
}

export function staffWorkShiftApiSuccess(response, loadMore) {
  return {
    type: STAFF_WORK_SHIFT_API.SUCCESS,
    response,
    loadMore,
  };
}
export function staffWorkShiftApiFailure(error) {
  return {
    type: STAFF_WORK_SHIFT_API.FAILURE,
    error,
  };
}
export function staffWorkShiftApiSubmit(pageNumber, loadMore = false) {
  return {
    type: STAFF_WORK_SHIFT_API.REQUEST,
    pageNumber,
    loadMore,
  };
}
