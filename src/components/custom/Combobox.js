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
import { searchBar } from "../receiveRequest/child/RequestsCustomComponent";
import { Sizes, Button, Colors } from "@dungdang/react-native-basic";
import {
	objectIsNull,
	arrayIsEmpty,
	stringIsEmpty,
} from "@dungdang/react-native-basic/src/Functions";
import Icon from "react-native-vector-icons/FontAwesome5";
import CheckBox from "./CheckBox";
import themes from "../../res/themes";
function wait(timeout) {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout);
	});
}

export default class ComboBox extends React.Component {
	constructor(props) {
		super(props);
		// console.log("kdkd", this.props.data);
		this.state = {
			visible: this.props.visible,
			margin: 0,
			select: !objectIsNull(this.props.select)
				? this.props.select
				: !objectIsNull(this.props.titleSub) ||
				  !objectIsNull(this.props.value)
				? -1
				: 0,
			data: !arrayIsEmpty(this.props.data)
				? this.props.data.filter((item, index) => {
						return index < 100;
				  })
				: [],
		};
	}

	componentDidUpdate(prev) {
		console.log("dddd1111", this.props.data);
		if (prev.select !== this.props.select) {
			this.setState({
				select: !objectIsNull(this.props.select)
					? this.props.select
					: !objectIsNull(this.props.titleSub) ||
					  !objectIsNull(this.props.value)
					? -1
					: 0,
			})
		}
		if (prev.data !== this.props.data && !arrayIsEmpty(this.props.data)) {

		// console.log("dddd12222", this.props.data);
		this.setState({
			data: this.props.data,
		})
			// this.state = {
			// 	data: this.props.data,
			// 	// ? this.props.data.filter((item, index) => {
			// 	// 		return index < 20;
			// 	//   })
			// 	// : [],
			// };
		}
	}
	_keyboardDidHide = (e) => {
		this.setState({
			margin: 0,
		});
	};
	_keyboardDidShow = (e) => {
		this.setState({
			margin: e.endCoordinates.height,
		});
	};
	componentWillUnmount() {
		if (Platform.OS === "ios") {
			this.keyboardDidHideListener.remove();
			this.keyboardDidShowListener.remove();
		}
	}

	componentDidMount() {
		if (Platform.OS === "ios") {
			this.keyboardDidShowListener = Keyboard.addListener(
				"keyboardDidShow",
				this._keyboardDidShow
			);
			this.keyboardDidHideListener = Keyboard.addListener(
				"keyboardDidHide",
				this._keyboardDidHide
			);
		}
	}
	show = (data) => {
		if (!arrayIsEmpty(data))
			this.setState({
				visible: true,
				data: data,
			});
	};
	hide = () => {
		this.setState({
			visible: false,
		});
	};
	getValue() {
		if (!arrayIsEmpty(this.state.data)) {
			return this.state.data[this.state.select];
		} else {
			return null;
		}
	}
	render() {
		const { visible, data, values } = this.state;
		const {
			styleTitleInput,
			styleModal,
			title,
			style,
			onChangeValues,
			styleInput,
			disable,
			styleItem,
		} = this.props;
		const { select } = this.state;
		var itemViews = [];
		console.log("daa",data)
		if (!arrayIsEmpty(data)) {
			for (var i = 0; i < data.length; i++) {
				const index = i;
				if (!stringIsEmpty(data[index].value)) {
					itemViews.push(
						<TouchableOpacity
							style={{
								borderTopWidth: index !== 0 ? Sizes.s2 : 0,
								borderTopColor: themes.line.backgroundColor,
								paddingVertical: Sizes.s20,
								alignItems: "center",
								...styleItem,
							}}
							onPress={() => {
								this.hide();
								this.setState({
									select: index,
								});
								onChangeValues(data[index], index);
							}}
						>
							<Text style={{ ...themes.titleNormal }}>
								{data[index].value}
							</Text>
						</TouchableOpacity>
					);
				}
			}
		}
		return (
			<View style={{ ...style }}>
				{!stringIsEmpty(title) && (
					<Text
						style={{
							...themes.titleBig2,
						}}
					>
						{title}
					</Text>
				)}
				<TouchableOpacity
					disabled={disable}
					onPress={() => {

		// console.log("daa2222",data)
						this.show(data);
					}}
					style={{
						...themes.input,
						...styleInput,
						opacity: disable === true ? 0.4 : 1,
					}}
				>
					<Text
						multiline={true}
						style={{
							flex: 1,
							...themes.titleNormal,
							...styleTitleInput,
							color:
								select === -1 && stringIsEmpty(this.props.value)
									? themes.colors.grey3
									: themes.colors.black,
						}}
					>
						{select !== -1 && data.length > select
							? data[select].value
							: !stringIsEmpty(this.props.value)
							? this.props.value
							: this.props.titleSub}
					</Text>

					<Icon
						size={Sizes.s35}
						color={"#989898"}
						name="chevron-down"
					/>
				</TouchableOpacity>
				<Modal
					onShow={() => {}}
					onDismiss={() => {}}
					animationType={
						!objectIsNull(this.props.animation) ? "slide" : "none"
					}
					// animationIn={'slideInUp'}
					// animationOut={'slideOutDown'}
					onRequestClose={() => {}}
					visible={visible}
					transparent
				>
					<TouchableWithoutFeedback
					// disabled={tru}
						
						onPress={() => {
							this.hide();
						}}
					>
						<View style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#00000040",
						}}>
						<TouchableOpacity
							onPress={() => {}}
							style={{
								width: "90%",
								marginBottom: this.state.margin,
							}}
						>
							<View
								style={{
									backgroundColor: Colors.white,
									width: "100%",
									maxHeight: Sizes.s340 * 3,
									color: Colors.white,
									borderRadius: Sizes.s10,
									...styleModal,
								}}
							>
								<View
									style={{
										maxHeight: Sizes.s340 * 2,
									}}
								>
									<View
										style={{
											flexDirection: "row",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										{/* {this.props.data.length > 20 &&
											searchBar((text) => {
												let dataSearch = this.props
													.data;
												if (!stringIsEmpty(text)) {
													dataSearch = dataSearch.filter(
														(item, index) => {
															if (
																!stringIsEmpty(
																	item.value
																)
															)
																return (
																	item.value
																		.toLowerCase()
																		.indexOf(
																			text.toLowerCase()
																		) > -1
																);
														}
													);
												}
												this.setState({
													data: !arrayIsEmpty(
														dataSearch
													)
														? dataSearch.filter(
																(
																	item,
																	index
																) => {
																	return (
																		index <
																		20
																	);
																}
														  )
														: [],
												});
											})} */}
									</View>
									{/* <Input></Input> */}
									<ScrollView
										showsVerticalScrollIndicator={false}
										style={{
											width: "100%",
										}}
										contentContainerStyle={{ flexGrow: 1 }}
									>
										{itemViews}
									</ScrollView>
								</View>
							</View>
						</TouchableOpacity>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			</View>
		);
	}
}

ComboBox.defaultProps = {
	styleTitleInputNew: {
		fontSize: Sizes.h28,
		textAlignVertical: "center",
		color: Colors.title,
	},

	styleModal: {
		paddingHorizontal: Sizes.s20,
		paddingVertical: Sizes.s20,
	},
	onChangeValues: () => {},
	onPressItemModal: () => {},
	onPressItemsModal: () => {},
	visible: false,
	items: [],
	placeholder: "Tìm kiếm",
	placeholderTextColor: Colors.title_fuzzy,
	onBlur: () => {},
	onFocus: () => {},
	onPress: () => {},
	action: () => {},
	data: [],
};
