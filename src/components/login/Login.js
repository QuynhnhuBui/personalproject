

import React from 'react';
import {
  Button,
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TouchableHighlight
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Dimensions, StatusBar } from "react-native";
import {isPhone, screen} from '../../config/settings'

import Icon from "react-native-vector-icons/FontAwesome";
import { Sizes } from "@dungdang/react-native-basic";
import Images from "../../res/images";
import InputBox from "./InputBox";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loged: false,
      remember: true,
      passwordHidden: true,
      username: "",
      password: "",
      buttonTitle: "Đăng nhập",
      alert: null,
      modalVisible: false,
      keyboardHidden: true,
    };
  }
  render() {
    return (
      
        <View style={styles.container}>
          <View style={styles.loginForm}>
            <View style={styles.input}>
              <InputBox
                value={this.state.username}
                leftIcon={Images.ic_user}
                autoCompleteType='username'
                onChangeText={(text) =>
                  this.setState({ username: text })
                }
                title="Tên đăng nhập"
                onRightIconPress={() => { }}
              />
              <InputBox
                value={this.state.password}
                leftIcon={Images.ic_lock}
                rightIcon={
                  this.state.passwordHidden
                    ? Images.ic_eye_close
                    : Images.ic_eye
                }
                autoCompleteType='password'
                onChangeText={(text) =>
                  this.setState({ password: text })
                }
                title="Mật khẩu"
                secureTextEntry={this.state.passwordHidden}
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
                  fontSize: Sizes.h32,
                }}
              >
                Ghi nhớ đăng nhập
								</Text>
            </View>

            <TouchableHighlight
              underlayColor="transparent"
              // onPress={() => this.onSummitPress()}
              onPress={() => this.props.navigation.navigate('MyModal')}
            >
              <View style={styles.button}>
                <Text style={styles.buttonTitle}>
                  {this.state.buttonTitle}
                </Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor="transparent"
              style={{
                alignItems: "center",
                margin: Sizes.h30,
              }}
              onPress={() => {
                this.props.navigation.navigate("Regis");
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: Sizes.h34,
                  fontWeight: "bold",
                  opacity: 0.9,
                }}
              >
                Đăng ký tài khoản
									</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="transparent"
              style={{ alignItems: "center" }}
              onPress={() => {
                this.props.navigation.navigate(
                  "Forget"
                );
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: Sizes.h34,
                  fontWeight: "bold",
                  opacity: 0.9,
                }}
              >
                Quên mật khẩu
								</Text>
            </TouchableHighlight>
          </View>
        </View>
     
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "#eee"
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
		height:  Sizes.s100,
		backgroundColor: "rgba(145, 139, 138, 0.8)",
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: Sizes.s20,
	},
	buttonTitle: {
		color: "white",
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