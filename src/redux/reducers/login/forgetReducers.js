import {
	POST_FORGET,
	POST_FORGET_SUCCESS,
	POST_FORGET_ERROR,
	POST_CLEAR_FORGET,
	GET_OTP_SUCCESS,
	GET_OTP_ERROR,
	GET_OTP,
	COMPARE_OTP_SUCCESS,
	COMPARE_OTP_ERROR,
	COMPARE_OTP,
	FORGET_PASS_CC_SUCCESS,
	FORGET_PASS_CC_ERROR,
	FORGET_PASS_CC,
} from "../../actions/login/ForgetActions";
import { objectIsNull } from "@dungdang/react-native-basic/src/Functions";

const initialState = {
	description: null,
	status: null,
	result: null,
	loading: false,
	note: null,
	error: null,
};

const forgetReducers = (forget = initialState, action) => {
	switch (action.type) {
		case POST_FORGET:
			return {
				description: null,
				status: null,
				result: null,
				loading: true,
			};
		case POST_FORGET_SUCCESS:
			return {
				description: action.response.description,
				result: action.response.resultObject,
				status: action.response.status,
				loading: false,
			};

		case POST_FORGET_ERROR:
			return {
				description: "Vui lòng kiểm tra kết nối",
				status: "FAIL",
				result: null,
				loading: false,
			};

		case POST_CLEAR_FORGET:
			return {
				description: null,
				status: null,
				result: null,
				loading: false,
			};

		case GET_OTP:
			return {
				...forget,
				loading: true,
			};
		case GET_OTP_SUCCESS:
			if (
				!objectIsNull(action.input) &&
				!objectIsNull(action.input.success)
			) {
				action.input.success(action.output);
			}
			return {
				...forget,
				loading: false,
			};
		case GET_OTP_ERROR:
			if (
				!objectIsNull(action.input) &&
				!objectIsNull(action.input.error)
			) {
				action.input.error(action.error);
			}
			return {
				...forget,
				loading: false,
			};
		case COMPARE_OTP:
			return {
				...forget,
				loading: true,
			};
		case COMPARE_OTP_SUCCESS:
			if (
				!objectIsNull(action.input) &&
				!objectIsNull(action.input.success)
			) {
				action.input.success(action.output);
			}
			return {
				...forget,
				loading: false,
			};
		case COMPARE_OTP_ERROR:
			if (
				!objectIsNull(action.input) &&
				!objectIsNull(action.input.error)
			) {
				action.input.error(action.error);
			}
			return {
				...forget,
				loading: false,
			};
		case FORGET_PASS_CC:
			return {
				...forget,
				loading: true,
			};
		case FORGET_PASS_CC_SUCCESS:
			if (
				!objectIsNull(action.input) &&
				!objectIsNull(action.input.success)
			) {
				action.input.success(action.output);
			}
			return {
				...forget,
				loading: false,
			};
		case FORGET_PASS_CC_ERROR:
			if (
				!objectIsNull(action.input) &&
				!objectIsNull(action.input.error)
			) {
				action.input.error(action.error);
			}
			return {
				...forget,
				loading: false,
			};

		default:
			return forget;
	}
};

export default forgetReducers;
