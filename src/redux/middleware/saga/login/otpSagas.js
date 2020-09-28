import {POST_OTP_SUCCESS,POST_OTP_ERROR,POST_OTP, POST_OTP_REGIS } from '../../../actions/login/OtpActions';


import { call, takeEvery, put } from 'redux-saga/effects';

import { postOtp, postOtpRegis } from '../../api/login/otp'



function* otpFlow(action) {
  const data = action.data
  try {
    const response = yield postOtp(data)
    // console.log(response)
    yield put({ type: POST_OTP_SUCCESS, response })
  } catch (error) {
    // console.log("signInFlow")
    console.log(error)
    yield put({ type: POST_OTP_ERROR, error })
  }
}

function* otpRegisFlow(action) {
  const data = action.data
  try {
    const response = yield postOtpRegis(data)
    // console.log(response)
    yield put({ type: POST_OTP_SUCCESS, response })
  } catch (error) {
    // console.log("signInFlow")
    console.log(error)
    yield put({ type: POST_OTP_ERROR, error })
  }
}

export function* watchOtp() {
  yield takeEvery(POST_OTP, otpFlow);
}

export function* watchOtpRegis() {
  yield takeEvery(POST_OTP_REGIS, otpRegisFlow);
}
