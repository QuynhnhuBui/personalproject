import React, { Component } from 'react';

import { connect } from 'react-redux';
import ControlComponent from '../../components/control/ControlComponent'
// import {loginAction,logoutAction} from '../../redux/actions/login/LoginActions'

class ControlContainer extends React.Component {
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    componentDidUpdate() {

    }
    render() {
        return <ControlComponent {...this.props} />;
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
export default connect(mapStateToProps, mapDispatchToProps)(ControlContainer);