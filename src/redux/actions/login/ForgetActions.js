export const POST_FORGET = "POST_FORGET";
export const POST_FORGET_SUCCESS = "POST_FORGET_SUCCESS";
export const POST_FORGET_ERROR = "POST_FORGET_ERROR";
export const POST_CLEAR_FORGET = "POST_CLEAR_FORGET";

export const forgetAction = (isEmail, input) => {
	return {
		type: POST_FORGET,
		data: { isEmail, input },
	};
};

export const clearForget = () => {
	return {
		type: POST_CLEAR_FORGET,
		data: null,
	};
};

export const FORGET_PASS_CC = "FORGET_PASS_CC";
export const FORGET_PASS_CC_SUCCESS = "FORGET_PASS_CC_SUCCESS";
export const FORGET_PASS_CC_ERROR = "FORGET_PASS_CC_ERROR";

export const forgetPassCCAction = (input) => {
	return {
		type: FORGET_PASS_CC,
		input: input,
	};
};

export const GET_OTP = "GET_OTP";
export const GET_OTP_SUCCESS = "GET_OTP_SUCCESS";
export const GET_OTP_ERROR = "GET_OTP_ERROR";

export const getOTPAction = (input) => {
	return {
		type: GET_OTP,
		input: input,
	};
};

export const COMPARE_OTP = "COMPARE_OTP";
export const COMPARE_OTP_SUCCESS = "COMPARE_OTP_SUCCESS";
export const COMPARE_OTP_ERROR = "COMPARE_OTP_ERROR";

export const compareOTPAction = (input) => {
	return {
		type: COMPARE_OTP,
		input: input,
	};
};
