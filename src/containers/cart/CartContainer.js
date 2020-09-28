import React, { Component } from 'react';

import { connect } from 'react-redux';
import CartComponent from '../../components/cart/CartComponent'
// import {loginAction,logoutAction} from '../../redux/actions/login/LoginActions'

class CartContainer extends React.Component {
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    componentDidUpdate() {

    }
    render() {
        return <CartComponent {...this.props} />;
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
export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);