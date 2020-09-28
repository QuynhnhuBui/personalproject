import React, { Component } from 'react';

import { connect } from 'react-redux';
import ForgetComponent from '../../components/login/ForgetComponent'
import {forgetAction,clearForget} from '../../redux/actions/login/ForgetActions'
import {postOtp,clearOtp} from '../../redux/actions/login/OtpActions'

class ForgetContainer extends React.Component {
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    componentDidUpdate() {

    }
    render() {
        return <ForgetComponent {...this.props} />;
        }
}

const mapDispatchToProps = (dispatch) => {
    return {
        forget: (isEmail, input) => {
            dispatch(forgetAction(isEmail,input))
        },
        clearForget: () => {
            dispatch(clearForget())
        },
        postOtp: (data) => {
            dispatch(postOtp(data))
        },
        clearOtp: () => {
            dispatch(clearOtp())
        }
    };
}
const mapStateToProps = (state) => {
    return {
        description: state.forgetReducers.description,
        status: state.forgetReducers.status,
        result: state.forgetReducers.result,
        loading: state.forgetReducers.loading,
        otpStatus: state.otpReducers.status,
        otpDescription: state.otpReducers.description,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgetContainer);