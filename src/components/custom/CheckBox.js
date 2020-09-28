import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Sizes, Colors } from "@dungdang/react-native-basic";
import Icon from "react-native-vector-icons/FontAwesome5";
import { objectIsNull } from "@dungdang/react-native-basic/src/Functions";

class CheckBok extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: !objectIsNull(this.props.value) ? this.props.value : false,
		};
	}
	getValue() {
		return this.state.value;
	}
	componentDidUpdate(prev) {
    // console.log("dfddd", this.props.value)
		{
			if (prev.value !== this.props.value) {
				this.setState({
					value: !objectIsNull(this.props.value)
						? this.props.value
						: false,
				});
			}
		}
	}
	render() {
		const {
			style,
			onValueChange,
			size,
			color,
			colorText,
			children,
			styleTitle,
			icon,
			iconCheck,
			disabled,
		} = this.props;
		const { value } = this.state;
		return (
			<TouchableOpacity
				disabled={disabled}
				// disabled={!objectIsNull(disabled) ? disabled : false}
				style={{
					marginVertical: Sizes.s10,
					flexDirection: "row",
					alignItems: "center",
					...style,
				}}
				onPress={() => {
					onValueChange(!value);
					this.setState({
						value: !value,
					});
				}}
			>
				<Icon
					light
					color={color}
					name={value ? iconCheck : icon}
					size={size}
				></Icon>
				<Text
					style={{
						color: color,
						marginLeft: Sizes.s15,
						flex: 1,
						...styleTitle,
					}}
				>
					{children}
				</Text>
			</TouchableOpacity>
		);
	}
}

CheckBok.defaultProps = {
	icon: "circle",
	iconCheck: "check-circle",
	value: false,
	styleTitle: {},
	onValueChange: () => {},
	size: Sizes.s50,
	color: Colors.bg_button_highlight,
};
export default CheckBok;
