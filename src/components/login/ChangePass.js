


import React from 'react';
import { View, Text, TextInput, Image, ImageBackground, TouchableHighlight, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Dimensions } from 'react-native';
import Images from '../../res/images'
import { Sizes } from '@dungdang/react-native-basic'
import InputBox from './InputBox';
import OTP from './OTP';
import {API_URL} from '../../config/settings'
import CryptoJS from "react-native-crypto-js";
import { arrayIsEmpty } from "@dungdang/react-native-basic/src/Functions";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ModalNotification from "../custom/Modal";
export default class ForgetComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            password: '',
            retryPassword: '',
            buttonTitle: 'Lấy lại mật khẩu',
            opacity: 0,
            status: null,
            alert: null
        }
    }

    componentDidUpdate() {
    }

    validatePassword = (pass) => {
        if(pass.trim(' ').length < 6) return false;
        if(pass.search(' ') != -1) return false;
        return true;
      }

    onBtnPress = () => {
        this.setState({alert: null})
        this.setState({status: null})
        if(arrayIsEmpty(this.state.password) || arrayIsEmpty(this.state.retryPassword)
        || !this.validatePassword(this.state.password) || !this.validatePassword(this.state.retryPassword)){
            this.setState({alert: "Mật khẩu bao gồm ít nhất 6 kí tự, và không chứa khoảng trắng."})
            return
        }
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "6371b3f93f4b4ce0b5be8ece19a4113a");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "SoDienThoai":this.props.phone,
            "Email": this.props.email,
            "Password":this.crypto(this.state.password),
            "RetryPassword":this.crypto(this.state.retryPassword)
        });
        console.log(this.props.email)

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(API_URL + "NguoiDungService.svc/ND/CapNhatMatKhauMoi", requestOptions)
        .then(response => response.json())
        .then(result => {
            this.setState({alert: result.description})
            this.setState({status: result.status})
            } )
        .catch(error => {return error});
    }

    onBack = () => {
    }

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
            <ImageBackground style={styles.background} source={Images.bg_binhdinh}>
                <KeyboardAwareScrollView extraScrollHeight={Sizes.s120}>
                <View style={styles.main}>
                    <View style={{ position: "absolute", left: 0, marginTop: Sizes.s90 }}>
                        <TouchableHighlight onPress={() => this.props.onBack()} underlayColor='transparent' >
                            <Image source={Images.ic_back_white}
                                style={{ width: Sizes.s60, resizeMode: 'contain', marginLeft: Sizes.s50 }} />
                        </TouchableHighlight>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.title}>Khôi phục mật khẩu</Text>
                        <Text style={styles.message}>
                            Vui lòng nhập mật khẩu mới để hoàn tất đổi mật khẩu.
                            </Text>
                    </View>
                    <View style={styles.regisForm}>
                        <InputBox
                            leftIcon={Images.ic_lock}
                            allowSpace = {true}
                            onChangeText={(text) =>
                                this.setState({ password: text })
                            }
                            title="Mật khẩu mới"
                            secureTextEntry={true}
                            onRightIconPress={() => {} }
                        />
                        <InputBox
                            leftIcon={Images.ic_lock}
                            allowSpace = {true}
                            onChangeText={(text) =>
                                this.setState({ retryPassword: text })
                            }
                            title="Xác nhận mật khẩu"
                            secureTextEntry={true}
                            onRightIconPress={() => {} }
                        />
                        {this.state.alert && (<Text style = {{color: 'red', fontSize: Sizes.h32}}>{this.state.alert}</Text>)}
                        {this.state.status == "SUCCESS" && (
                            <ModalNotification
                                type="ok"
                                title="Thông báo"
                                message="Lấy lại mật khẩu thành công"
                                onOk={() => {
                                    this.props.onBack()
                                }}
                            />
                        )}
                    </View>
                    <TouchableHighlight style={styles.button} onPress={() => this.onBtnPress()}>
                        <Text style={styles.buttonTitle}>{this.state.buttonTitle}</Text>
                    </TouchableHighlight>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '80%',
                        opacity: this.state.alert ? 1 : 0
                    }}>
                    </View>
                </View>
                </KeyboardAwareScrollView>
            </ImageBackground>
        );
    }
}

const screen = Dimensions.get('window');
const isPhone = screen.height / screen.width > 1.5 ? true : false

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
    },
    main: {
        flex: 1,
        alignItems: 'center',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        width: isPhone ? '90%' : '80%'
    },
    title: {
        color: '#FFFFFF',
        //fontFamily: 'Roboto',
        fontSize: isPhone ? Sizes.h65 : Sizes.h52,
        fontWeight: 'bold',
        opacity: 1,
        marginBottom: Sizes.s15,
        marginTop: Sizes.s160
    },
    text: {
        //fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontSize: isPhone ? Sizes.h40 : Sizes.h34,
        marginBottom: 5
    },
    message: {
        width: '100%',
        textAlign: 'center',
        //fontFamily: 'Roboto',
        fontSize: isPhone ? Sizes.h32 : Sizes.h28,
        color: 'white',
        marginBottom: Sizes.s50
    },
    regisForm: {
        width: isPhone ? '80%' : '75%',
        height: isPhone ? Sizes.s340 : Sizes.s240,
        justifyContent: 'space-evenly',
        marginTop: Sizes.s80
    },
    input: {
        width: '100%',
        height: Sizes.s90,
        backgroundColor: 'white',
        borderRadius: 5,
        borderBottomWidth: 0,
        marginBottom: 5,
        fontSize: Sizes.h40
    },
    button: {
        width: isPhone ? '80%' : '75%',
        height: Sizes.s100,
        backgroundColor: "rgba(145, 139, 138, 0.8)",
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Sizes.s80
    },
    buttonTitle: {
        color: 'white',
        // fontFamily: 'Roboto',
        fontSize: Sizes.h40,
        fontWeight: 'bold',
    },
    iconCheck: {
        width: Sizes.s200,
        height: Sizes.s100,
        backgroundColor: 'transparent',
        borderRadius: Sizes.s200 / 2,
        alignItems: 'center',
        justifyContent: 'center'
    }
});