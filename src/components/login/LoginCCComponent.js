import React from "react";
import {
	View,
	Text,
	ScrollView,
	Image,
	ImageBackground,
	TouchableHighlight,
	BackHandler,
	SafeAreaView,
} from "react-native";
import { StyleSheet, Keyboard, Dimensions } from "react-native";
import Images from "../../res/images";
import { Sizes } from "@dungdang/react-native-basic";
import Icon from "react-native-vector-icons/FontAwesome";
import InputBox from "./InputBox";
import CryptoJS from "react-native-crypto-js";
import {
	arrayIsEmpty,
	stringIsEmpty,
} from "@dungdang/react-native-basic/src/Functions";
import { userData, VERSION_CODE } from "../../config/settings";
import DeviceInfo from "react-native-device-info";
import { AsyncStorage } from "react-native";
import Loading from "../custom/Loading";
import { isPhone, screen } from "../../config/settings";
import { StackActions, NavigationActions } from "react-navigation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ModalNotification from "../custom/Modal";
const resetAction = StackActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: "MyModal" })],
});
const resetLogin = StackActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: "Login" })],
});
export const _storeData = async (user, pass) => {
	try {
		await AsyncStorage.setItem("username", user);
		await AsyncStorage.setItem("password", pass);
	} catch (error) {}
};

export const _clearData = async () => {
	try {
		await AsyncStorage.removeItem("username");
		await AsyncStorage.removeItem("password");
		return true;
	} catch (error) {}
};

export const _clearPass = async () => {
	try {
		// await AsyncStorage.removeItem("username");
		await AsyncStorage.removeItem("password");
		return true;
	} catch (error) {}
};
export default class LoginCCComponent extends React.Component {
	constructor(props) {
		super(props);
		this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
		this._keyboardDidShow = this._keyboardDidShow.bind(this);
		this._keyboardDidHide = this._keyboardDidHide.bind(this);
		this.state = {
			loaded: false,
			loged: false,
			// remember: userData.isCitizen ? false : true,
			remember: true,
			passwordHidden: true,
			username: "", //userData.isCitizen ? "123321123" : "TuanKiet123",
			password: "", //userData.isCitizen ? "123123" : "P@ssw0rd",
			buttonTitle: "Đăng nhập",
			alert: null,
			modalVisible: false,
			keyboardHidden: true,
		};
	}
	_keyboardDidShow() {
		this.setState({ keyboardHidden: false });
		// alert('Keyboard Shown');
	}

	_keyboardDidHide() {
		//alert('Keyboard Hidden');
		this.setState({ keyboardHidden: true });
	}

	componentWillMount() {
		this.keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			this._keyboardDidShow
		);
		this.keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			this._keyboardDidHide
		);
		BackHandler.addEventListener(
			"hardwareBackPress",
			this.handleBackButtonClick
		);
	}
	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
		BackHandler.removeEventListener(
			"hardwareBackPress",
			this.handleBackButtonClick
		);
	}
	handleBackButtonClick() {
		if (this.props.navigation.isFocused()) {
			this.setState({ modalVisible: true });
		} else {
			this.props.clearOtp();
			this.props.clearForget();
			this.props.navigation.dispatch(resetLogin);
		}
		return true;
	}

	__onBack = () => {
		this.props.clearOtp();
		this.props.clearForget();
		this.props.navigation.dispatch(resetAction);
	};

	componentDidMount() {
		this._retrieveData();
	}

	componentDidUpdate() {
		if (!this.state.loged && this.props.result != null) {
			this.props.getProfiles(this.props.result.NguoiDungID);
			this.setState({ loged: true });
			// this.props.navigation.navigate('Home');
			this.props.navigation.dispatch(resetAction);
		}
	}

	_setRemember = async () => {
		try {
			await AsyncStorage.setItem(
				"remember",
				JSON.stringify(this.state.remember)
			);
		} catch (error) {}
	};

	_retrieveData = async () => {
		try {
			const username = await AsyncStorage.getItem("username");
			const password = await AsyncStorage.getItem("password");
			// const remember = await AsyncStorage.getItem("remember");

			if (!stringIsEmpty(password) && !stringIsEmpty(username)) {
				this.setState({ password: password, username: username });
				this.onSummitPress();
			} else {
				if (!stringIsEmpty(username)) {
					this.setState({ username: username });
				}
			}
			this.setState({ loaded: true });
		} catch (error) {
			this.setState({ loaded: true });
		}
	};

	onSummitPress = () => {
		this.props.logoutAction();
		this.setState({ alert: null });
		if (this.state.remember) {
			_storeData(this.state.username, this.state.password);
		} else {
			_clearData();
		}

		this.setState({ loged: false });

		if (
			!arrayIsEmpty(this.state.username) &&
			!arrayIsEmpty(this.state.password)
		) {
			this.props.loginAction(
				this.state.username,
				this.crypto(this.state.password)
			);

			return;
		} else {
			this.setState({
				alert: "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!",
			});
		}
	};

	crypto = (data) => {
		var key = CryptoJS.enc.Utf8.parse("vh83jf73@lf*6&<h");
		var iv = CryptoJS.enc.Utf8.parse("vh83jf73@lf*6&<h");
		var encryptedpassword = CryptoJS.AES.encrypt(data, key, {
			keySize: 128,
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
		}).toString();
		return encryptedpassword;
	};

	render() {
		return (
			<ImageBackground
				style={styles.background}
				source={Images.bg_binhdinh}
			>
				<KeyboardAwareScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					keyboardShouldPersistTaps="handled"
				>
					{this.props.loading ? <Loading></Loading> : null}
					{this.state.modalVisible && !userData.isCitizen ? (
						<ModalNotification
							type="yesno"
							title="Xác nhận"
							message="Bạn có muốn thoát ứng dụng không?"
							onYes={() => {
								this.props.logoutAction();
								this.props.clearProfile();
								this.setState({ modalVisible: false });
								BackHandler.exitApp();
							}}
							onNo={() => {
								this.setState({ modalVisible: false });
							}}
						/>
					) : null}
					<View style={styles.content}>
						{userData.isCitizen ? (
							<View style={{ position: "absolute", left: 0 }}>
								<TouchableHighlight
									onPress={() => this.__onBack()}
									underlayColor="transparent"
								>
									<Image
										source={Images.ic_back_white}
										style={{
											width: Sizes.s60,
											resizeMode: "contain",
											marginLeft: Sizes.s50,
										}}
									/>
								</TouchableHighlight>
							</View>
						) : null}
						<View
							style={{
								justifyContent: "space-between",
								alignItems: "center",
								// height: Sizes.s340,
								marginBottom: Sizes.s20,
							}}
						>
							<Image source={Images.logo} style={styles.logo} />
							<Text style={styles.title}>
								Đô thị thông minh Bình Định
							</Text>
						</View>

						{this.state.loaded ? (
							<View style={styles.loginForm}>
								<View style={styles.input}>
									<InputBox
										value={this.state.username}
										leftIcon={Images.ic_user}
										autoCompleteType="username"
										onChangeText={(text) =>
											this.setState({ username: text })
										}
										title="Tên đăng nhập"
										onRightIconPress={() => {}}
									/>
									<InputBox
										value={this.state.password}
										leftIcon={Images.ic_lock}
										rightIcon={
											this.state.passwordHidden
												? Images.ic_eye_close
												: Images.ic_eye
										}
										autoCompleteType="password"
										onChangeText={(text) =>
											this.setState({ password: text })
										}
										title="Mật khẩu"
										secureTextEntry={
											this.state.passwordHidden
										}
										onRightIconPress={() =>
											this.setState({
												passwordHidden: !this.state
													.passwordHidden,
											})
										}
									/>
								</View>

								{this.props.description ? (
									<Text
										style={{
											marginTop: Sizes.s10,
											fontSize: Sizes.h32,
											color: "red",
										}}
									>
										{this.props.description}
									</Text>
								) : null}
								{this.state.alert ? (
									<Text
										style={{
											marginTop: Sizes.s10,
											fontSize: Sizes.h32,
											color: "red",
										}}
									>
										{this.state.alert}
									</Text>
								) : null}
								<View style={styles.remember}>
									<Icon
										name={
											this.state.remember
												? "check-circle"
												: "circle"
										}
										size={Sizes.s50}
										onPress={() => {
											this.setState({
												remember: !this.state.remember,
											});
										}}
										color="white"
										style={{ marginRight: Sizes.s15 }}
									/>
									<Text
										style={{
											color: "white",
											fontFamily: "Roboto",
											fontSize: Sizes.h32,
										}}
									>
										Ghi nhớ đăng nhập
									</Text>
								</View>

								<TouchableHighlight
									underlayColor="transparent"
									onPress={() => this.onSummitPress()}
								>
									<View style={styles.button}>
										<Text style={styles.buttonTitle}>
											{this.state.buttonTitle}
										</Text>
									</View>
								</TouchableHighlight>

								{userData.isCitizen === true && (
									<TouchableHighlight
										underlayColor="transparent"
										style={{
											alignItems: "center",
											margin: Sizes.h30,
										}}
										onPress={() => {
											this.props.navigation.navigate(
												"Regis"
											);
										}}
									>
										<Text
											style={{
												color: "white",
												fontFamily: "Roboto-Bold",
												fontSize: Sizes.h34,
												fontWeight: "bold",
												opacity: 0.9,
											}}
										>
											Đăng ký tài khoản
										</Text>
									</TouchableHighlight>
								)}
								<TouchableHighlight
									underlayColor="transparent"
									style={{ alignItems: "center" }}
									onPress={() => {
										if (userData.isCitizen) {
											this.props.navigation.navigate(
												"Forget"
											);
										} else {
											this.props.navigation.navigate(
												"ForgetCC"
											);
										}
									}}
								>
									<Text
										style={{
											color: "white",
											fontFamily: "Roboto-Bold",
											fontSize: Sizes.h34,
											fontWeight: "bold",
											opacity: 0.9,
										}}
									>
										Quên mật khẩu
									</Text>
								</TouchableHighlight>
							</View>
						) : (
							<View></View>
						)}
					</View>
				</KeyboardAwareScrollView>
				{this.state.keyboardHidden && (
					<View
						style={{
							position: "absolute",
							left: 0,
							right: 0,
							bottom: Sizes.h40,
							pading: Sizes.h40,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Text style={{ color: "white" }}>
							v{DeviceInfo.getVersion()}.{VERSION_CODE}
						</Text>
					</View>
				)}
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
	},
	logo: {
		width: isPhone ? Sizes.s340 : Sizes.s200,
		height: isPhone ? Sizes.s340 : Sizes.s200,
		resizeMode: "contain",
		marginBottom: isPhone ? "5%" : "3%",
	},
	content: {
		width: "100%",
		height: "100%",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	title: {
		color: "#FFFFFF",
		fontSize: isPhone ? Sizes.h52 : Sizes.h48,
		opacity: 1,
	},
	text: {
		//fontFamily: 'Roboto',
		fontWeight: "bold",
		color: "#FFFFFF",
		fontSize: Sizes.s40,
		marginBottom: Sizes.s10,
	},
	loginForm: {
		width: (screen.width * 3) / 4,
		height: isPhone ? "40%" : "50%",
	},
	boxInput: {
		width: "100%",
		flexDirection: "row",
		backgroundColor: "white",
		borderRadius: Sizes.s10,
		justifyContent: "space-around",
		alignItems: "center",
		marginTop: Sizes.s60,
	},
	input: {
		height: isPhone ? Sizes.s200 : Sizes.s160,
		justifyContent: "space-between",
	},
	button: {
		height: isPhone ? Sizes.s100 : Sizes.s90,
		backgroundColor: "rgba(145, 139, 138, 0.6)",
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: Sizes.s20,
	},
	buttonTitle: {
		color: "white",
		fontFamily: "Roboto-Bold",
		fontSize: Sizes.h40,
	},
	remember: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		marginBottom: Sizes.s20,
		marginTop: Sizes.s20,
	},
});
