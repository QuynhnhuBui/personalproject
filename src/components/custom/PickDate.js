import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	Keyboard,
	Platform,
	TextInput,
	ScrollView,
	TouchableWithoutFeedback,
} from "react-native";

import { Sizes, Button, Colors } from "@dungdang/react-native-basic";

import { Picker, DatePicker } from "@dungdang/react-native-full/pickTime";
import moment from "@dungdang/react-native-full/pickTime/moment";
import {
	objectIsNull,
	arrayIsEmpty,
	stringIsEmpty,
} from "@dungdang/react-native-basic/src/Functions";
import Icon from "react-native-vector-icons/FontAwesome5";
import themes from "../../res/themes";
function wait(timeout) {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout);
	});
}

export default class PickDate extends React.Component {
	constructor(props) {
		super(props);
		var date = new Date().getDate();
		var month = new Date().getMonth() + 1;
		var year = new Date().getFullYear();

		//Alert.alert(date + '-' + month + '-' + year);
		// You can turn it in to your desired format
		this.state = {
			visible: false,
			date: !objectIsNull(this.props.currentDate)
				? date + "-" + month + "-" + year
				: "",
		};
	}
	show = () => {
		this.setState({
			visible: true,
		});
	};
	hide = () => {
		this.setState({
			visible: false,
		});
	};
	parseDate(dateString) {
		var dateObj = new Date(dateString);
		var momentObj = moment(dateObj);
		var momentString = momentObj.format("DD-MM-YYYY");

		this.setState({ date: momentString });
		if (!objectIsNull(this.props.onChangeValue)) {
			this.props.onChangeValue(momentString);
		}
		// console.log("------>",momentString)
		// return momentString.toString();
	}
	render() {
		const {
			title,
			titleSub,
			style,
			styleInput,
			styleTitleInput,
			editable,
		} = this.props;
		const { visible, date } = this.state;
		return (
			<View style={{ ...style }}>
				{!objectIsNull(title) && (
					<Text
						style={{
							...themes.titleBig2,
						}}
					>
						{title}
					</Text>
				)}
				<TouchableOpacity
					disabled={!objectIsNull(editable) ? !editable : false}
					onPress={() => {
						this.show();
					}}
					style={{
						...themes.input,
						...styleInput,
						opacity: editable === false ? 0.5 : 1,
					}}
				>
					<Text
						multiline={true}
						style={{
							flex: 1,
							...themes.titleNormal,
							...styleTitleInput,
							color: stringIsEmpty(date)
								? themes.colors.grey3
								: themes.colors.black,
						}}
					>
						{!stringIsEmpty(date) ? date : titleSub}
					</Text>

					<Icon
						size={Sizes.s35}
						color={themes.colors.grey3}
						name="calendar-alt"
					/>
				</TouchableOpacity>
				<Modal
					onRequestClose={() => {}}
					visible={visible}
					transparent
					style={{}}
				>
					<TouchableOpacity
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#00000040",
						}}
						onPress={() => {
							this.hide();
						}}
					>
						<TouchableWithoutFeedback
							// disabled={true}
							onPress={() => {}}
							style={{
								width: "100%",
								marginBottom: this.state.margin,
								paddingHorizontal: Sizes.s20,
								// borderRadius: Sizes.s10,
							}}
						>
							<View
								style={{
									width: "90%",
									// borderRadius: Sizes.s10,
								}}
							>
								<DatePicker
									//  order ={"D/M/YYY"}
									isVN={true}
									style={{
										height: Sizes.s200 * 2,
										width: undefined,
										backgroundColor: "#ffffff",
									}}
									minimumDate={new Date("2000-01-01")}
									maximumDate={new Date("2050-12-31")}
									onDateChange={(date) => {
										// console.log('dddd',_date)
										this.parseDate(date);
									}}
								/>
							</View>
						</TouchableWithoutFeedback>
					</TouchableOpacity>
				</Modal>
			</View>
		);
	}
}

PickDate.defaultProps = {};
