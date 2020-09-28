import React, { Component } from 'react';

import { connect } from 'react-redux';
import NotificationComponent from '../../components/notification/NotificationComponent'
// import {loginAction,logoutAction} from '../../redux/actions/login/LoginActions'

class NotificationContainer extends React.Component {
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    componentDidUpdate() {

    }
    render() {
        return <NotificationComponent {...this.props} />;
        }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // loginAction: (user, password) => {
        //     dispatch(loginAction(user,password))
        // },
    };
}
const mapStateToProps = (state) => {
    return {
        
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);