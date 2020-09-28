import {
	POST_FORGET,
	POST_FORGET_ERROR,
	POST_FORGET_SUCCESS,
	GET_OTP,
	GET_OTP_ERROR,
	GET_OTP_SUCCESS,
	COMPARE_OTP,
	COMPARE_OTP_ERROR,
	COMPARE_OTP_SUCCESS,
	FORGET_PASS_CC,
	FORGET_PASS_CC_ERROR,
	FORGET_PASS_CC_SUCCESS,
} from "../../../actions/login/ForgetActions";

import { call, takeEvery, put } from "redux-saga/effects";

import {
	postRegis,
	getOtpApi,
	compareOtpApi,
	formatPassCCApi,
} from "../../api/login/forget";

function* forgetFlow(action) {
	const { isEmail, input } = action.data;
	try {
		const response = yield postRegis(isEmail, input);
		// console.log(response)
		yield put({ type: POST_FORGET_SUCCESS, response });
	} catch (error) {
		// console.log("signInFlow")
		console.log(error);
		yield put({ type: POST_FORGET_ERROR, error });
	}
}

export function* watchForget() {
	yield takeEvery(POST_FORGET, forgetFlow);
}

function* getOtpFlow(action) {
	const input = action.input;
	try {
		const response = yield getOtpApi(action.input);

		if (response.status !== "FAIL") {
			//  console.log('sssss',response.resultObject)
			const output = response.resultObject;

			yield put({
				type: GET_OTP_SUCCESS,
				input: input,
				output: output,
			});
		} else {
			// console.log('vvvv',response.resultObject)
			const error = response.description;
			// console.log('sssss',error)
			yield put({
				type: GET_OTP_ERROR,
				input: input,
				error: error,
			});
		}
	} catch (error) {
		// console.log('dddd22233',error)
		yield put({
			type: GET_OTP_ERROR,
			input: input,
			error: error,
		});
	}
}
export function* getOtpSaga() {
	yield takeEvery(GET_OTP, getOtpFlow);
}

function* compareOtpFlow(action) {
	const input = action.input;
	try {
		const response = yield compareOtpApi(action.input);

		if (response.status !== "FAIL") {
			//  console.log('sssss',response.resultObject)
			const output = response.resultObject;

			yield put({
				type: COMPARE_OTP_SUCCESS,
				input: input,
				output: output,
			});
		} else {
			// console.log('vvvv',response.resultObject)
			const error = response.description;
			// console.log('sssss',error)
			yield put({
				type: COMPARE_OTP_ERROR,
				input: input,
				error: error,
			});
		}
	} catch (error) {
		// console.log('dddd22233',error)
		yield put({
			type: COMPARE_OTP_ERROR,
			input: input,
			error: error,
		});
	}
}
export function* compareOtpSaga() {
	yield takeEvery(COMPARE_OTP, compareOtpFlow);
}

function* forgetPassCCFlow(action) {
	const input = action.input;
	try {
		const response = yield formatPassCCApi(action.input);

		if (response.status !== "FAIL") {
			//  console.log('sssss',response.resultObject)
			const output = response.resultObject;

			yield put({
				type: FORGET_PASS_CC_SUCCESS,
				input: input,
				output: output,
			});
		} else {
			// console.log('vvvv',response.resultObject)
			const error = response.description;
			// console.log('sssss',error)
			yield put({
				type: FORGET_PASS_CC_ERROR,
				input: input,
				error: error,
			});
		}
	} catch (error) {
		// console.log('dddd22233',error)
		yield put({
			type: FORGET_PASS_CC_ERROR,
			input: input,
			error: error,
		});
	}
}
export function* forgetPassCCSaga() {
	yield takeEvery(FORGET_PASS_CC, forgetPassCCFlow);
}
