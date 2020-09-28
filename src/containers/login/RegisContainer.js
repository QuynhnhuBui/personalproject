import React, { Component } from 'react';

import { connect } from 'react-redux';
import RegisComponent from '../../components/login/RegisComponent'
import { regisAction } from '../../redux/actions/login/RegisActions';
import {postOtpRegis,clearOtp} from '../../redux/actions/login/OtpActions'
class RegisContainer extends React.Component {
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    componentDidUpdate() {

    }
    render() {
        return <RegisComponent {...this.props} />;
        }
}

const mapDispatchToProps = (dispatch) => {
    return {
        regisAction: (data) => {
            dispatch(regisAction(data))
        },
        postOtpRegis: (data) => {
            dispatch(postOtpRegis(data))
        },
        clearOtp: () => {
            dispatch(clearOtp())
        },
    };
}
const mapStateToProps = (state) => {
    return {
        description: state.regisReducers.description,
        status: state.regisReducers.status,
        loading: state.regisReducers.loading,
        otpStatus: state.otpReducers.status,
        otpDescription: state.otpReducers.description,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisContainer);