import React, { Component } from 'react';

import { connect } from 'react-redux';
import LoginComponent from '../../components/login/Login'
import {loginAction,logoutAction} from '../../redux/actions/login/LoginActions'
import {getProfiles, clearProfile} from '../../redux/actions/profiles/profilesActions'
import {clearForget} from '../../redux/actions/login/ForgetActions'
import {clearOtp} from '../../redux/actions/login/OtpActions'

class LoginContainer extends React.Component {
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    componentDidUpdate() {

    }
    render() {
        return <LoginComponent {...this.props} />;
        }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginAction: (user, password) => {
            dispatch(loginAction(user,password))
        },
        logoutAction: () => {
            dispatch(logoutAction())
        },
        getProfiles: (id) => {
            dispatch(getProfiles(id))
        },
        clearOtp: () => {
            dispatch(clearOtp())
        },
        clearForget: () => {
            dispatch(clearForget())
        },
        clearProfile: () => {
            dispatch(clearProfile())
        }
    };
}
const mapStateToProps = (state) => {
    return {
        description: state.loginReducers.description,
        status: state.loginReducers.status,
        result: state.loginReducers.result,
        loading: state.loginReducers.loading,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);