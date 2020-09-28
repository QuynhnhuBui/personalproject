import React, { Component } from "react";

import { connect } from "react-redux";
import ForgetCCComponent from "../../components/login/ForgetCCComponent";
import {
	forgetAction,
	clearForget,
	getOTPAction,
	forgetPassCCAction,
	compareOTPAction,
} from "../../redux/actions/login/ForgetActions";

class ForgetCCContainer extends React.Component {
	componentDidMount() {}
	componentWillUnmount() {}
	componentDidUpdate() {}
	render() {
		return <ForgetCCComponent {...this.props} />;
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		forget: (isEmail, input) => {
			dispatch(forgetAction(isEmail, input));
		},
		clearForget: () => {
			dispatch(clearForget());
		},

		getOTPAction: (input) => {
			dispatch(getOTPAction(input));
		},
		forgetPassCCAction: (input) => {
			dispatch(forgetPassCCAction(input));
		},
		compareOTPAction: (input) => {
			dispatch(compareOTPAction(input));
		},
	};
};
const mapStateToProps = (state) => {
	return {
		description: state.forgetReducers.description,
		status: state.forgetReducers.status,
		result: state.forgetReducers.result,
		loading: state.forgetReducers.loading,
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgetCCContainer);
