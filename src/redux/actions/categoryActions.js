import {LIST_CATEGORY_API} from './actionTypes';

export function listCategoryApiSuccess(response) {
  return {
    type: LIST_CATEGORY_API.SUCCESS,
    response,
  };
}

export function listCategoryApiFailure(error) {
  return {
    type: LIST_CATEGORY_API.FAILURE,
    error,
  };
}

export function listCategoryApiSubmit() {
  return {
    type: LIST_CATEGORY_API.REQUEST,
  };
}
