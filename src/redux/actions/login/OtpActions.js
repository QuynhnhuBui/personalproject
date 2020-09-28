export const POST_OTP = 'POST_OTP';
export const POST_OTP_REGIS = 'POST_OTP_REGIS';
export const POST_OTP_SUCCESS = 'POST_OTP_SUCCESS';
export const POST_OTP_ERROR = 'POST_OTP_ERROR';
export const CLEAR_OTP = 'CLEAR_OTP';

export const postOtp = (data) => {
    return {
        type: POST_OTP,
        data: data
    }
}

export const postOtpRegis = (data) => {
    return {
        type: POST_OTP_REGIS,
        data: data
    }
}

export const clearOtp = () => {
    return {
        type: CLEAR_OTP,
        data: null
    }
}
