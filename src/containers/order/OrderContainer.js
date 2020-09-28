import React, { Component } from 'react';

import { connect } from 'react-redux';
import OrderComponent from '../../components/order/OrderComponent'
// import {loginAction,logoutAction} from '../../redux/actions/login/LoginActions'

class OrderContainer extends React.Component {
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    componentDidUpdate() {

    }
    render() {
        return <OrderComponent {...this.props} />;
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
export default connect(mapStateToProps, mapDispatchToProps)(OrderContainer);