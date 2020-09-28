import React from "react";
import {
	View,
	Text,
	TextInput,
	Image,
	ImageBackground,
	TouchableHighlight,
	Alert,
	SwitchComponent,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { StyleSheet, Dimensions } from "react-native";
import Images from "../../res/images";
import { Sizes } from "@dungdang/react-native-basic";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconB from "react-native-vector-icons/Ionicons";
import InputBox from "./InputBox";
import SwiperView from "../../components/custom/SwipeView";
import { header } from "../receiveRequest/child/RequestsCustomComponent";
import themes from "../../res/themes";
import { stringIsEmpty } from "@dungdang/react-native-basic/src/Functions";
import BasicComponent from "../receiveRequest/BaseComponent";
import { TouchableOpacity } from "react-native-gesture-handler";
import CryptoJS from "react-native-crypto-js";
export class InputCustom extends React.Component {
	constructor(props) {
		super(props);
		this.state = { secure: true };
	}
	render() {
		const { onChangeText, icon, placeholder, style, isPass } = this.props;
		return (
			<View
				style={{
					height: Sizes.s90,
					backgroundColor: themes.colors.white,
					borderRadius: Sizes.s20,
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "row",
					paddingHorizontal: themes.paddingHoz,
					...style,
				}}
			>
				<Icon name={icon} size={Sizes.s40} color="#5d5e6d"></Icon>

				<TextInput
					secureTextEntry={isPass ? this.state.secure : false}
					style={{
						flex: 1,
						...themes.titleNormal,
						fontSize: Sizes.s30,
						marginLeft: Sizes.s10,
					}}
					clearButtonMode="always"
					placeholder={placeholder}
					placeholderTextColor={"#8a8a8e"}
					onChangeText={onChangeText}
				/>
				{isPass === true && (
					<TouchableOpacity
						style={{ paddingVertical: Sizes.s10 }}
						onPress={() => {
							this.setState({
								secure: !this.state.secure,
							});
						}}
					>
						<Image
							style={{ width: Sizes.s40, height: Sizes.s40 }}
							source={
								this.state.secure
									? Images.ic_eye
									: Images.ic_eye_close
							}
						></Image>
					</TouchableOpacity>
				)}
			</View>
		);
	}
}
const timeMax = 60 * 10;
const textLoading = "loading...";
export default class ForgetCCComponent extends BasicComponent {
	constructor(props) {
		super(props);
		this.state = {
			inputPhone: "",
			inputOTP: "",
			alert: null,
			loading: "",
			index: 0,
			isPhone: true,
			inputPass: "",
			inputAgain: "",
			time: timeMax,
			timeString: "Thời gian hết hạn: 10:00",
		};
	}
	getTime(timeCurrent) {
		let hours = parseInt(timeCurrent / 60);
		// var hours = this.hours;
		var minutes = timeCurrent - hours * 60;
		// var second = this.second;
		// if (hours < 10) {
		//   hours = "0" + hours;
		// }
		let _minutes = minutes;
		let _hours = hours;
		if (minutes < 10) {
			_minutes = "0" + minutes;
		}
		if (hours < 10) {
			_hours = "0" + hours;
		}
		return _hours + ":" + _minutes;
		//   }
	}

	startTimer() {
		this.cancelTimer();
		this.setState({
			time: timeMax,
		});
		this.clockCall = setInterval(() => {
			if (this.state.time > 0) {
				this.setState({
					time: this.state.time - 1,
					timeString:
						"Thời gian hết hạn: " +
						this.getTime(this.state.time - 1),
				});
			} else {
				this.setState({
					timeString: "Mã Qrcode hết hạn",
				});
				this.cancelTimer();
			}
		}, 1000);
	}
	cancelTimer() {
		this.setState({
			timeString: "Thời gian hết hạn: 10:00",
		});
		clearInterval(this.clockCall);
	}
	componentWillUnmount() {
		this.cancelTimer();
	}
	componentDidUpdate() {}
	validateEmail = (email) => {
		const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};

	validatePhone = (phone) => {
		const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
		return re.test(phone);
	};
	showView = (item) => {
		return (
			<View style={styles.main}>
				<View style={styles.content}>
					<Text style={styles.title}>{item.title}</Text>
					<Text style={styles.message}>{item.des}</Text>
				</View>
				<View style={styles.regisForm}>
					<InputCustom
						isPass={item.isPass}
						onChangeText={(text) => {
							switch (this.state.index) {
								case 0:
									this.setState({
										inputPhone: text,
										alert: "",
									});
									break;
								case 1:
									this.setState({
										inputOTP: text,
										alert: "",
									});
									break;
								case 2:
									this.setState({
										inputPass: text,
										alert: "",
									});
									break;
							}
						}}
						icon={item.icon}
						placeholder={item.placeholder}
					></InputCustom>

					{this.state.index === 2 && (
						<InputCustom
							isPass={item.isPass}
							style={{ marginTop: Sizes.s40 }}
							onChangeText={(text) => {
								this.setState({
									inputAgain: text,
									alert: "",
								});
							}}
							icon={item.icon}
							placeholder={"Xác nhận mật khẩu"}
						></InputCustom>
					)}
					{!stringIsEmpty(this.state.alert) ? (
						<Text
							style={{
								marginTop: Sizes.s30,
								color: "red",
								fontSize: Sizes.s30,
							}}
						>
							{this.state.alert}
						</Text>
					) : null}
					{!stringIsEmpty(this.state.loading) ? (
						<Text
							style={{
								marginTop: Sizes.s30,
								color: themes.colors.orange,
								fontSize: Sizes.s30,
							}}
						>
							{this.state.loading}
						</Text>
					) : null}
					{this.state.index === 1 && (
						<View
							style={{
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
								marginTop: Sizes.s20,
								// backgroundColor:"#ff33ff"
							}}
						>
							<TouchableOpacity
								onPress={() => {
									this.actionSendOtp(false);
								}}
								style={{
									paddingVertical: Sizes.s20,
									paddingRight: Sizes.s20,
									// backgroundColor:"#ff3333"
								}}
							>
								<Icon
									size={Sizes.s40}
									color={themes.colors.orange}
									name={"sync"}
								></Icon>
							</TouchableOpacity>
							<Text
								style={{
									flex: 1,
									color: themes.colors.orange,
									fontSize: Sizes.s30,
									// backgroundColor:"#4433ff"
								}}
							>
								{this.state.timeString}
							</Text>
						</View>
					)}
				</View>
				<TouchableHighlight
					disabled={this.state.loading === textLoading ? true : false}
					style={styles.button}
					onPress={() => {
						item.action();
					}}
				>
					<Text style={styles.buttonTitle}>{item.titleButton}</Text>
				</TouchableHighlight>
			</View>
		);
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
	actionSendOtp = (isNext) => {
		this.setState({
			loading: textLoading,
		});
		if (this.validatePhone(this.state.inputPhone)) {
			this.setState({
				isPhone: true,
			});
			this.props.getOTPAction({
				email: "",
				phone: this.state.inputPhone,
				success: (value) => {
					if (isNext === true) {
						this.refs.swiper.scrollToIndex(this.state.index + 1);
						this.setState({
							index: this.state.index + 1,
							loading: "",
						});
					} else {
						this.setState({
							loading: "",
						});
					}
					this.startTimer();
				},
				error: (value) => {
					this.setState({
						alert: value,
						loading: "",
					});
				},
			});
		} else {
			if (this.validateEmail(this.state.inputPhone)) {
				this.setState({
					isPhone: false,
				});
				this.props.getOTPAction({
					phone: "",
					email: this.state.inputPhone,
					success: (value) => {
						if (isNext === true) {
							this.refs.swiper.scrollToIndex(
								this.state.index + 1
							);
							this.setState({
								index: this.state.index + 1,
								loading: "",
							});
						} else {
							this.setState({
								loading: "",
							});
						}
						this.startTimer();
					},
					error: (value) => {
						this.setState({
							alert: value,
							loading: "",
						});
					},
				});
			} else {
				this.setState({
					alert: "Vui lòng nhập chính xác số điện thoại hoặc email!",
					loading: "",
				});
			}
		}
	};
	render() {
		return (
			<ImageBackground
				style={styles.background}
				source={Images.bg_binhdinh}
			>
				{header({
					style: {
						borderBottomWidth: 0,
					},
					left: {
						// icon: "arrow-left",

						navigation: this.props.navigation,
						color: themes.colors.white,
						// size: Sizes.s60,
					},
				})}
				<SwiperView
					ref="swiper"
					swipeSlide={(page) => {}}
					style={{
						flex: 1,
						width: "100%",
					}}
					items={[
						{
							title: "Khôi phục mật khẩu",
							des:
								"Vui lòng nhập chính số điện thoại hoặc email của bạn đã đăng ký ở bên dưới. Hệ thống sẽ gửi mã xác nhận khôi phục lại mật khẩu.",
							titleButton: "Lấy lại mật khẩu",
							placeholder: "Nhập email hoặc số điện thoại",
							icon: "",
							action: () => {
								this.actionSendOtp(true);
							},
						},
						{
							title: "Nhập mã OTP",
							des:
								"Vui lòng nhập mã OTP gồm 6 số  được gửi đên email hoặc điện thoại của bạn. Mã OTP sẽ tự động hết hạn trong 10 phút.",
							titleButton: "Xác nhận",
							placeholder: "Nhập mã OTP",
							icon: "qrcode",
							action: () => {
								this.setState({
									loading: textLoading,
								});
								if (
									!stringIsEmpty(this.state.inputOTP) &&
									this.state.inputOTP.length === 6
								) {
									this.props.compareOTPAction({
										email:
											this.state.isPhone === false
												? this.state.inputPhone
												: "",
										phone:
											this.state.isPhone === true
												? this.state.inputPhone
												: "",
										otp: this.state.inputOTP,
										success: (value) => {
											this.cancelTimer();
											this.refs.swiper.scrollToIndex(
												this.state.index + 1
											);
											this.setState({
												index: this.state.index + 1,
												loading: false,
											});
											// super.showDialog(
											// this.refs.dialog.show(
											// {
											// 	des:
											// 		"Khôi phục mật khẩu thành công",
											// 	button: {
											// 		right: null,
											// 		left: {
											// 			title: "Thoát",
											// 			handle: (data) => {
											// 				this.props.navigation.goBack();
											// 				//   console.warn('data', data);
											// 			},
											// 		},
											// 	},
											// }
											// );
											// console.log("----666",value)
											// this.setState({
											// 	alert: value,
											// });
											// this.refs.swiper.scrollToIndex(
											// 	this.state.index + 1
											// );
											// this.setState({
											// 	index: this.state.index + 1,
											// });
										},
										error: (value) => {
											// console.log("----7777",value)
											this.setState({
												alert: value,
												loading: "",
											});
										},
									});
								} else {
									this.setState({
										alert: "Mã OTP phải đúng 6 ký tự!",
										loading: "",
									});
								}
							},
						},
						{
							isPass: true,
							title: "Nhập mật khẩu mới",
							des: "Vui lòng nhập mật khẩu mới",
							titleButton: "Xác nhận",
							placeholder: "Mật khẩu mới",
							icon: "lock",
							action: () => {
								this.setState({
									loading: textLoading,
								});
								if (
									stringIsEmpty(this.state.inputPass) ||
									stringIsEmpty(this.state.inputAgain)
								) {
									this.setState({
										alert: "Nhập đầy đủ thông tin!",
										loading: "",
									});
								} else {
									if (
										this.state.inputPass.length >= 6 &&
										this.state.inputPass.search(" ") === -1
									) {
										if (
											this.state.inputPass ===
											this.state.inputAgain
										) {
											this.props.forgetPassCCAction({
												MatKhauMoi: this.crypto(
													this.state.inputPass
												),
												MatKhauXacNhan: this.crypto(
													this.state.inputAgain
												),
												IsQuenMatKhau: true,
												Email:
													this.state.isPhone === false
														? this.state.inputPhone
														: "",
												SoDienThoai:
													this.state.isPhone === true
														? this.state.inputPhone
														: "",
												success: (value) => {
													this.setState({
														loading: "",
													});
													super.showDialog({
														des:
															"Khôi phục mật khẩu thành công",
														button: {
															right: null,
															left: {
																title: "Thoát",
																handle: (
																	data
																) => {
																	this.props.navigation.goBack();
																},
															},
														},
													});
												},
												error: (value) => {
													this.setState({
														alert: value,
														loading: "",
													});
												},
											});
										} else {
											this.setState({
												loading: "",
												alert:
													"Mật khẩu không trùng nhau!",
											});
										}
									} else {
										this.setState({
											loading: "",
											alert:
												"Mật khẩu phải có tối thiểu 6 ký tự và không chứa khoảng trắng. Vui lòng kiểm tra lại!",
										});
									}
								}
							},
						},
					]}
					itemView={(item) => {
						return this.showView(item);
					}}
				></SwiperView>

				{/* <Button
          onPress={() => {
            this.refs.swiper.scrollToIndex(2);
          }}>
          {'asdsa'}
        </Button> */}
				{super.render()}
			</ImageBackground>
		);
	}
}

const screen = Dimensions.get("window");
const isPhone = screen.height / screen.width > 1.5 ? true : false;

const styles = StyleSheet.create({
	background: {
		width: "100%",
		height: "100%",
	},
	main: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-evenly",
	},
	content: {
		justifyContent: "center",
		alignItems: "center",
		width: isPhone ? "90%" : "80%",
	},
	title: {
		color: "#FFFFFF",
		//fontFamily: 'Roboto',
		fontSize: isPhone ? Sizes.h65 : Sizes.h52,
		fontWeight: "bold",
		opacity: 1,
		marginBottom: Sizes.s15,
	},
	text: {
		//fontFamily: 'Roboto',
		fontWeight: "bold",
		color: "#FFFFFF",
		fontSize: isPhone ? Sizes.h40 : Sizes.h34,
		marginBottom: 5,
	},
	message: {
		width: "100%",
		textAlign: "center",
		//fontFamily: 'Roboto',
		fontSize: isPhone ? Sizes.h32 : Sizes.h28,
		color: "white",
		marginBottom: Sizes.s50,
	},
	regisForm: {
		width: isPhone ? "80%" : "75%",
		height: isPhone ? Sizes.s260 : Sizes.s200,
	},
	input: {
		width: "100%",
		height: Sizes.s90,
		backgroundColor: "white",
		borderRadius: 5,
		borderBottomWidth: 0,
		marginBottom: 5,
		fontSize: Sizes.h40,
	},
	button: {
		width: isPhone ? "80%" : "75%",
		height: Sizes.s100,
		backgroundColor: "#ffffff40",
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonTitle: {
		color: "white",
		// fontFamily: 'Roboto',
		fontSize: Sizes.h40,
		fontWeight: "bold",
	},
	iconCheck: {
		width: Sizes.s200,
		height: Sizes.s100,
		backgroundColor: "transparent",
		borderRadius: Sizes.s200 / 2,
		alignItems: "center",
		justifyContent: "center",
	},
});
