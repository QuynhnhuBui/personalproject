import { POST_REGIS,POST_REGIS_ERROR,POST_REGIS_SUCCESS } from '../../../actions/login/RegisActions';


import { call, takeEvery, put } from 'redux-saga/effects';

import { postRegis } from '../../api/login/regis'



function* regisFlow(action) {
  const { data } = action.data
  try {
    const response = yield postRegis(data)
    // console.log(response)
    yield put({ type: POST_REGIS_SUCCESS, response })
  } catch (error) {
    // console.log("signInFlow")
    //console.log(error)
    yield put({ type: POST_REGIS_ERROR, error })
  }
}

export function* watchRegis() {
  yield takeEvery(POST_REGIS, regisFlow);
}
