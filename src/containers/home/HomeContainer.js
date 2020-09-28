import React, { Component } from 'react';

import { connect } from 'react-redux';
import Home from '../../components/home/Home'
// import {loginAction,logoutAction} from '../../redux/actions/login/LoginActions'

class HomeContainer extends React.Component {
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    componentDidUpdate() {

    }
    render() {
        return <Home {...this.props} />;
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
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);