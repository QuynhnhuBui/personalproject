import { POST_LOGIN,POST_LOGIN_ERROR,POST_LOGIN_SUCCESS } from '../../../actions/login/LoginActions';


import { call, takeEvery, put } from 'redux-saga/effects';

import { postLogin } from '../../api/login/login'



function* signInFlow(action) {
  const { user, password } = action.data
  try {
    const response = yield postLogin(user, password)
    // console.log(response)
    yield put({ type: POST_LOGIN_SUCCESS, response })
  } catch (error) {
    // console.log("signInFlow")
    console.log(error)
    yield put({ type: POST_LOGIN_ERROR, error })
  }
}

export function* watchLogin() {
  yield takeEvery(POST_LOGIN, signInFlow);
}
