import {takeLatest, put} from 'redux-saga/effects';
import {LIST_CATEGORY_API} from '../actions/actionTypes';
import {callApi} from '../apis';
import {
  listCategoryApiFailure,
  listCategoryApiSuccess,
} from '../actions/categoryActions';
import {categoryRequest} from '../apis/requests/category';

function* fetchListCategory() {
  try {
    const request = categoryRequest();
    const response = yield callApi(request);
    yield put(listCategoryApiSuccess(response.list));
  } catch (error) {
    yield put(listCategoryApiFailure());
  }
}

export default function* authApiSagas() {
  yield takeLatest(LIST_CATEGORY_API.REQUEST, fetchListCategory);
}
