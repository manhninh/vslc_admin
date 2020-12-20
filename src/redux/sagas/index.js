import {fork, all} from 'redux-saga/effects';
import another from './another';
import auth from './auth';
import category from './category';
import service from './service';
import publicc from './public';
import staff from './staff';

export default function* rootSaga() {
  yield all([
    fork(auth),
    fork(another),
    fork(category),
    fork(service),
    fork(publicc),
    fork(staff),
  ]);
}
