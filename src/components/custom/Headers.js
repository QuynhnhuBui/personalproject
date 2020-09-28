import React, { Children } from "react";
import {
	ImageBackground,
	Image,
	View,
	Text,
	TouchableHighlight,
	TextInput,
	TouchableOpacity,
	Modal,
	Platform,
} from "react-native";
import { StyleSheet, Dimensions, StatusBar } from "react-native";
import { Sizes } from "@dungdang/react-native-basic";
import {
	arrayIsEmpty,
	objectIsNull,
} from "@dungdang/react-native-basic/src/Functions";
import Images from "../../res/images";

export default class Headers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			temp: null,
			menu: false,
		};
	}
	renderSwitch() {
		const {
			name,
			content,
			children,
			title,
			...props
		} = this.props;

		const { menu, ...state } = this.state;
		switch (name) {
			case "avatar":
				return (
					<ImageBackground
						resizeMode="stretch"
						style={styles.ImageContainer}
						source={Images.headerbg1}
					>
						<View
							style={{
								width: "100%",
								height: "60%",
								marginTop: isPhone ? Sizes.s100 : Sizes.s70,
								alignItems: "center",
							}}
						>
							<Text
								style={{
									fontFamily: "Roboto-Medium",
									fontSize: isPhone ? Sizes.s45 : Sizes.s40,
									color: "white",
								}}
							>
								{this.props.title}
							</Text>
							<View
								style={{
									width: "90%",
									flexDirection: "row",
									marginTop: isPhone ? Sizes.s90 : Sizes.s70,
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
									}}
								>
									<TouchableHighlight
										underlayColor="transparent"
										onPress={() => this.props.onAvatar()}
									>
										<Avatar uri={this.props.uri} />
									</TouchableHighlight>
									<Text
										style={{
											marginLeft: Sizes.s15,
											fontFamily: "Roboto-Medium",
											fontSize: isPhone
												? Sizes.h30
												: Sizes.h28,
											color: "white",
										}}
									>
										{props.hoten}
									</Text>
								</View>
								<TouchableHighlight
									underlayColor="transparent"
									onPress={() => props.onLogoutPress()}
								>
									<View
										style={{
											// width: isPhone
											// 	? Sizes.s240
											// 	: Sizes.s240 * 0.9,
											paddingHorizontal: Sizes.s20,
											paddingVertical: Sizes.s20,
											// height: isPhone
											// 	? Sizes.s40 * 2.2
											// 	: Sizes.s40 * 2,
											backgroundColor: "gray",
											flexDirection: "row",
											justifyContent: "center",
											alignItems: "center",
											borderRadius: Sizes.s15,
										}}
									>
										<Image
											source={Images.ic_logout}
											style={{
												width: Sizes.s35,
												height: Sizes.s35,
												resizeMode: "contain",
											}}
										/>
										<Text
											style={{
												marginLeft: Sizes.s10,
												fontFamily: "Roboto-Medium",
												fontSize: Sizes.s28,
												color: "white",
											}}
										>
											Đăng xuất
										</Text>
									</View>
								</TouchableHighlight>
							</View>
						</View>
					</ImageBackground>
				);
			case "home":
				return (
					<ImageBackground
						resizeMode="stretch"
						style={styles.ImageContainer}
						source={Images.headerbg}
					>
						<StatusBar />
						<View style={styles.viewHeader}>
							<TouchableOpacity
								style={styles.iconLeftHeader}
								onPress={() => {
									props.onPressBackButton();
								}}
							>
								<Image
									resizeMode="contain"
									source={Images.ic_back_white}
									style={styles.iconBack}
								/>
							</TouchableOpacity>
							<Text numberOfLines={2} style={styles.textHeader}>
								{title}
							</Text>
						</View>
					</ImageBackground>
				);
			case "canhbao":
				return (
					<View
						style={{
							backgroundColor: "#ffffff",
							paddingVertical: Sizes.s30,
						}}
					>
						<StatusBar barStyle="dark-content" />
						<View
							style={{
								alignItems: "center",
								justifyContent: "center",
								flexDirection: "row",
							}}
						>
							<TouchableOpacity
								style={{
									// position: 'absolute',
									left: Sizes.s30,
									width: Sizes.s55,
									height: Sizes.s55,
									justifyContent: "center",
								}}
								onPress={() => {
									props.onPressBackButton();
								}}
							>
								<Image
									resizeMode="contain"
									source={Images.ic_back}
									style={{
										width: Sizes.s45,
										height: Sizes.s45,
									}}
								/>
							</TouchableOpacity>
							<View
								style={{
									flex: 1,
									paddingHorizontal: Sizes.s50,
								}}
							>
								<Text
									numberOfLines={2}
									style={{
										textAlign: "center",
										alignSelf: "center",
										fontSize: Sizes.s35,
										fontFamily: "Roboto-Bold",
										color: "#1A232C",
									}}
								>
									{title}
								</Text>
							</View>
						</View>
						<View style={styles.waringSearch}>{children}</View>
						<View style={styles.line}></View>
					</View>
				);
			default:
				return (
					<View
						style={{
							backgroundColor: "#ffffff",
							paddingVertical: Sizes.s30,
						}}
					>
						<StatusBar barStyle="dark-content" />
						<View
							style={{
								alignItems: "center",
								justifyContent: "space-between",
								flexDirection: "row",
							}}
						>
							<TouchableOpacity
								style={{
									// position: 'absolute',
									left: Sizes.s30,
									width: Sizes.s120,
									height: Sizes.s55,
									justifyContent: "center",
								}}
								onPress={() => {
									props.onPressBackButton();
								}}
							>
								<Image
									resizeMode="contain"
									source={Images.ic_back}
									style={{
										width: Sizes.s45,
										height: Sizes.s45,
									}}
								/>
							</TouchableOpacity>
							<View>
								<Text
									numberOfLines={2}
									style={{
										textAlign: "center",
										alignSelf: "center",
										fontSize: Sizes.s35,
										fontFamily: "Roboto-Bold",
										color: "#1A232C",
									}}
								>
									{title}
								</Text>
							</View>

							<TouchableOpacity
								style={{
									width: Sizes.s120,
									height: Sizes.s55,
									justifyContent: "center",
								}}
								onPress={() => {
									props.onRightPress ? props.onRightPress() : undefined;
								}}
							>
								<Text style={{
									fontSize: Sizes.h32,
									fontFamily: "Roboto-Medium",
									color: "#1A232C",
								}}>{this.props.titleRight}</Text>
							</TouchableOpacity>
						</View>
					</View>
				);
		}
	}

	render() {
		const props = this.props;
		return <View>{this.renderSwitch(props)}</View>;
	}
}
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
	ImageContainer: {
		width: "100%",
		height: isPhone ? Sizes.s340 * 1.2 : Sizes.s340,
		resizeMode: "cover",
	},
	viewTextHomeContent: {
		marginTop: isPhone ? Sizes.s60 : Sizes.s40,
	},
	textTitleHomeContent: {
		fontSize: isPhone ? Sizes.h38 : Sizes.h32,
		marginTop: isPhone ? Sizes.s35 : Sizes.s20,
		color: "white",
	},

	textContentHomeContent: {
		marginTop: Sizes.s10,
		marginBottom: Sizes.s10,
		fontSize: isPhone ? Sizes.s70 : Sizes.s55,
		color: "white",
	},
	boxHomeContent: {
		width: Sizes.s340 + Sizes.s340,
		height: Sizes.s120,
		borderRadius: Sizes.s20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: Sizes.s60,
	},

	leftBox: {
		alignItems: "center",
		marginLeft: Sizes.s50,
	},
	rightBox: {
		flexDirection: "row",
	},
	textDayHomeContent: {
		fontSize: Sizes.s30,
		color: "white",
	},
	lineBoxHomeContent: {
		width: Sizes.s2,
		height: "100%",
		backgroundColor: "#FFFF",
	},
	temp: {
		fontSize: Sizes.h34,
		color: "white",
	},
	textCity: {
		fontSize: Sizes.h34,
		color: "white",
		marginTop: Sizes.s10,
	},
	iconBack: {
		width: Sizes.s50,
		height: Sizes.s40,
		marginRight: Sizes.s20,
		paddingBottom: Sizes.s90,
		resizeMode: "contain",
	},


	viewHeader: {
		marginTop: Sizes.s50,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	iconLeftHeader: {
		position: "absolute",
		left: Sizes.s30,
		width: Sizes.s80,
		height: Sizes.s80,
	},
	textHeader: {
		marginTop: Sizes.s20,
		alignSelf: "center",
		fontSize: Sizes.s40,
		color: "#ffff",
		marginBottom: Sizes.s15,
		fontWeight: "bold",
	},

	DetailIntroImageContainer: {
		width: "100%",
		height: (width - Sizes.s10) * (270 / 640),
	},
	tabViewDetailIntro: {
		flex: 1,
		justifyContent: "flex-end",
	},
	containerDefault: {
		paddingTop: Sizes.s30,
		paddingBottom: Sizes.s30,
	},
	contentDefault: {
		alignItems: "center",
		justifyContent: "center",
	},
	titleDefault: {
		alignSelf: "center",
		fontSize: Sizes.s40,
		fontWeight: "bold",
	},
	viewDefault: {
		position: "absolute",
		left: Sizes.s30,
		width: Sizes.s80,
		height: Sizes.s80,
		justifyContent: "center",
	},
	warningDefault: {
		paddingTop: Sizes.s30,
		paddingBottom: Sizes.s30,
	},

	line: {
		height: Sizes.s2,
		backgroundColor: "#D1D1D1",
		marginTop: Sizes.s10,
	},
	waringSearch: {
		marginTop: Sizes.s20,
	},

	findContainer: {
		paddingTop: Sizes.s30,
		paddingBottom: Sizes.s30,
		borderBottomColor: "#EFEFEF",
	},
	findContent: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	viewHeaderMenu: {
		// backgroundColor: 'black',
		height: Sizes.s200,
		opacity: 0.7,
		alignItems: "center",
		justifyContent: "space-around",
		flexDirection: "row",
		margin: Sizes.s15,
		borderBottomColor: "#EFEFEF",
	},
	touchableItems: {
		height: Sizes.s200,
		width: Sizes.s200,
		justifyContent: "center",
		alignItems: "center",
	},
	box: {
		width: Sizes.s340 + Sizes.s340,
		height: Sizes.s120,
		borderRadius: Sizes.s20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: Sizes.s60,
		backgroundColor: "rgba(196, 187, 171 ,0.5)",
	},
});
