import { all } from 'redux-saga/effects';
import packagesSaga from './packages/saga';
//end-of-imports

export default function* rootSaga(getState) {
  yield all([
    packagesSaga(),
    //end-of-sagas
  ]);
}
