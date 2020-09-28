
import {CLEAR_OTP,POST_OTP,POST_OTP_ERROR,POST_OTP_SUCCESS, POST_OTP_REGIS} from '../../actions/login/OtpActions';

const initialState = {
    description : null,
    status: null,
    loading: false
}

const optReducers = (regis = initialState, action) => {

    switch (action.type) {
        case POST_OTP:
            return {
                description: null,
                status: null,
                result: null,
                loading: true
            }
        case POST_OTP_REGIS:
            return {
                description: null,
                status: null,
                result: null,
                loading: true
            }
        case POST_OTP_SUCCESS:
            return {
                description: action.response.description,
                status: action.response.status,
                loading: false
            }

        case POST_OTP_ERROR:
            return {
                description: 'Vui lòng kiểm tra kết nối',
                status: "FAIL",
                loading: false
            }
        case CLEAR_OTP:
            return {
                description: null,
                status: null,
                loading: false
            }

        default:
            return regis;
    }
}

export default optReducers;
