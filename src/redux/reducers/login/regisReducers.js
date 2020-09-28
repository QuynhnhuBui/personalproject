
import { POST_REGIS,POST_REGIS_SUCCESS,POST_REGIS_ERROR } from '../../actions/login/RegisActions';

const initialState = {
    description : null,
    status: null,
    loading: false
}

const regisReducers = (regis = initialState, action) => {

    switch (action.type) {
        case POST_REGIS:
            return {
                description: null,
                status: null,
                result: null,
                loading: true
            }
        case POST_REGIS_SUCCESS:
            return {
                description: action.response.description,
                status: action.response.status,
                loading: false
            }

        case POST_REGIS_ERROR:
            return {
                description: 'Vui lòng kiểm tra kết nối',
                status: "FAIL",
                loading: false
            }

        default:
            return regis;
    }
}

export default regisReducers;
