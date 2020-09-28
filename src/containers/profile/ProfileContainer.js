import React, { Component } from 'react';

import { connect } from 'react-redux';
import ProfileComponent from '../../components/profile/ProfileComponent'
// import {loginAction,logoutAction} from '../../redux/actions/login/LoginActions'

class ProfileContainer extends React.Component {
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    componentDidUpdate() {

    }
    render() {
        return <ProfileComponent {...this.props} />;
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
export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);