import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  ImageBackground,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Dimensions } from 'react-native';
import Images from '../../res/images';
import { Sizes } from '@dungdang/react-native-basic';
import IconB from 'react-native-vector-icons/Ionicons';
import InputBox from './InputBox';
import CryptoJS from 'react-native-crypto-js';
import Loading from '../custom/Loading';
import ModalNotification from '../custom/Modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OTP from './OTP'
export default class RegisComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remember: false,
      hoten: '',
      cmnd: '',
      sdt: '',
      email: '',
      password: '',
      confirmPassword: '',
      buttonTitle: 'TIẾP THEO',

      checkname: null,
      checkcmnd: null,
      checksdt: null,
      checkemail: null,
      checkpassword: null,
      checkconfirmpassword: null,
      checknoti: false,

      step: 1,
      isDone: false
    };
  }

  componentDidMount() { }

  componentDidUpdate() {
  }
  onBtnPress = () => {
    if (
      this.state.checkname == true &&
      this.state.checkcmnd == true &&
      this.state.checksdt == true &&
      this.state.checkemail == true &&
      this.state.checkpassword == true &&
      this.state.checkconfirmpassword == true
    ) {
      var data = JSON.stringify({
        HoTen: this.state.hoten,
        SoGiayToTuyThan: this.state.cmnd,
        SoDienThoai: this.state.sdt,
        Email: this.state.email,
        UserName: 'hieutn5',
        Password: this.crypto(this.state.password),
        RetryPassword: this.crypto(this.state.confirmPassword),
      });
      this.props.regisAction(data);
      this.setState({
        checknoti: true,
      });
    } else {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
    }
  };

  crypto = (data) => {
    var key = CryptoJS.enc.Utf8.parse('vh83jf73@lf*6&<h');
    var iv = CryptoJS.enc.Utf8.parse('vh83jf73@lf*6&<h');
    var encryptedpassword = CryptoJS.AES.encrypt(data, key, {
      keySize: 128,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();
    return encryptedpassword;
  };

  isInvalidHoten = (Hoten) => {
    var kt = true;
		var sample = '~!@#$%^&*()_+<>?{}|\/-1234567890';
		for (var i = 0; i < sample.length; i++) {
		  if(Hoten.indexOf(sample.charAt(i)) != -1) kt = false;
		}
		if(Hoten.trim(' ').length == 0) return false;
		if(Hoten.length > 20 || kt == false || Hoten.length == 0) return false;
		return true
  }

  isInvalidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatePhone = (phone) => {
    const re = /^[\+]?[(]?[0]{1}[)]?[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/;
    return re.test(phone);
  }
  validatePassword = (pass) => {
    if(pass.trim(' ').length < 6) return false;
    if(pass.search(' ') != -1) return false;
    return true;
  }
  onBlurChangeHoten = () => {
    this.setState({
      checkname: this.isInvalidHoten(this.state.hoten) ? true : false,
    });
  };
  onBlurChangeCMND = () => {
    if (this.state.cmnd.trim() != '') {
      this.setState({
        checkcmnd:
          this.state.cmnd.length >= 9 && this.state.cmnd.length <= 20
            ? true
            : false,
      });
    } else {
      this.setState({
        checkcmnd: false,
      });
    }
  };
  onBlurChangeSdt = () => {
    this.setState({
      checksdt:
        this.validatePhone(this.state.sdt)
          ? true
          : false,
    });
  };
  onBlurChangeEmail = () => {
    this.setState({
      checkemail: this.isInvalidEmail(this.state.email.trim()),
    });
  };
  onBlurChangePassword = () => {
    this.setState({
      checkpassword: this.validatePassword(this.state.password) ? true : false,
    });
  };
  onBlurChangeConfirmPassword = () => {
    if (this.state.confirmPassword.length >= 6) {
      if (this.state.confirmPassword == this.state.password) {
        this.setState({
          checkconfirmpassword: true,
        });
      } else {
        this.setState({
          checkconfirmpassword: false,
        });
      }
    } else {
      this.setState({
        checkconfirmpassword: false,
      });
    }
  };
  onBack = () => {
    this.setState({step:1})
    this.props.clearOtp();
    this.props.navigation.goBack();
  }
  render() {
    return (
      <SafeAreaView>
        {this.props.loading ? <Loading /> : null}
        {this.state.step === 1 ? (
          <ImageBackground style={styles.background} source={Images.bg_binhdinh}>
            <KeyboardAwareScrollView scrollEnabled={false}>
              <View style={styles.main}>
                <View style={{ position: "absolute", left: 0 }}>
                  <TouchableHighlight onPress={() => this.props.navigation.goBack()} underlayColor='transparent' >
                    <Image source={Images.ic_back_white}
                      style={{ width: Sizes.s60, resizeMode: 'contain', marginTop: Sizes.s100, marginLeft: Sizes.s50 }} />
                  </TouchableHighlight>
                </View>

                <View style={styles.regisForm}>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={styles.title}>Đăng ký tài khoản</Text>
                  </View>
                  <InputBox
                    leftIcon={Images.ic_user}
                    title="Họ tên"
                    allowSpace={true}
                    onBlur={() => this.onBlurChangeHoten()}
                    check={this.state.checkname}
                    onChangeText={(text) => this.setState({ hoten: text })}
                  />
                  {this.state.checkname == false ? (
                    <Text style={{ color: 'red' }}>Vui lòng nhập đúng họ tên, không được bỏ trống và không bao gồm các kí tự đặc biệt.</Text>
                  ) : null}
                  <InputBox
                    leftIcon={Images.ic_credit_card}
                    title="Số giấy tờ tùy thân"
                    keyboardType={'numeric'}
                    onBlur={() => this.onBlurChangeCMND()}
                    check={this.state.checkcmnd}
                    onChangeText={(text) => this.setState({ cmnd: text })}
                  />
                  {this.state.checkcmnd == false ? (
                    <Text style={{ color: 'red' }}>
                      Số giấy tờ tùy thân có 9 đến 20 ký tự và không chứa khoảng
                      trắng
                    </Text>
                  ) : null}
                  <InputBox
                    leftIcon={Images.ic_phone}
                    title="Số điện thoại"
                    keyboardType={'phone-pad'}
                    onBlur={() => this.onBlurChangeSdt()}
                    check={this.state.checksdt}
                    onChangeText={(text) => this.setState({ sdt: text })}
                  />
                  {this.state.checksdt == false ? (
                    <Text style={{ color: 'red' }}>
                      Số điện thoại có 10 ký tự bắt đầu bằng 0 và không chứa
                      khoảng trắng
                    </Text>
                  ) : null}
                  <InputBox
                    leftIcon={Images.ic_mail}
                    title="Email"
                    keyboardType={'email-address'}
                    onBlur={() => this.onBlurChangeEmail()}
                    check={this.state.checkemail}
                    onChangeText={(text) => this.setState({ email: text })}
                  />
                  {this.state.checkemail == false ? (
                    <Text style={{ color: 'red' }}>Email không hợp lệ</Text>
                  ) : null}
                  <InputBox
                    leftIcon={Images.ic_lock}
                    title="Mật khẩu"
                    allowSpace={true}
                    onBlur={() => this.onBlurChangePassword()}
                    check={this.state.checkpassword}
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({ password: text })}
                  />
                  {this.state.checkpassword == false ? (
                    <Text style={{ color: 'red' }}>
                      Mật khẩu tối thiểu 6 kí tự và không chứa khoảng trắng
                    </Text>
                  ) : null}
                  <InputBox
                    leftIcon={Images.ic_lock}
                    title="Xác nhận mật khẩu"
                    allowSpace={true}
                    onBlur={() => this.onBlurChangeConfirmPassword()}
                    check={this.state.checkconfirmpassword}
                    secureTextEntry={true}
                    onChangeText={(text) =>
                      this.setState({ confirmPassword: text })
                    }
                  />
                  {this.state.checkconfirmpassword == false ? (
                    <Text style={{ color: 'red' }}>
                      Xác nhận mật khẩu không khớp
                    </Text>
                  ) : null}
                  {this.props.description && this.state.checknoti ? (
                    <Text
                      style={{
                        marginTop: Sizes.s10,
                        fontSize: Sizes.h32,
                        color: 'red',
                      }}>
                      {this.props.description}
                    </Text>
                  ) : null}
                  {this.props.status == 'SUCCESS' && this.state.checknoti ? (
                    this.setState({step:2})
                  ) : null}
                  <TouchableHighlight
                    underlayColor="transparent"
                    style={styles.button}
                    onPress={() => this.onBtnPress()}>
                    <Text style={styles.buttonTitle}>
                      {this.state.buttonTitle}
                    </Text>
                  </TouchableHighlight>
                </View>
                <View style={styles.content}>
                  <Text style={[styles.messageWhite]}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        textDecorationLine: 'underline',
                      }}>
                      Lưu ý
                  </Text>
                  : Chỉ được đăng ký 1 tài khoản duy nhất và phải điển chính xác
                  thông tin số điện thoại, email.
                </Text>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </ImageBackground>
        ) : (
          <View>
            <OTP onBack={() => { this.onBack() }}
              clearOtp={() => this.props.clearOtp()}
              sendOtp={(otp) => {
                var data = {
                  phone: "",
                  email: this.state.email,
                  otp: otp,
                }
                this.props.postOtpRegis(data)
              }}
              alert={this.props.otpDescription}
            >
            </OTP>
            
              {this.props.otpStatus === "SUCCESS" && (
                <ModalNotification
                type="ok"
                title="Thành công"
                message="Hoàn tất đăng ký, bấm xác nhận để quay trở về màn hình đăng nhập."
                onOk={() => {
                  this.props.clearOtp();
                  this.setState({ step:1 });
                  this.props.navigation.goBack();
                }}
                />
              )}
          </View>
          )}
      </SafeAreaView>
    );
  }
}

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  main: {
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: Dimensions.get('window').height * 0.1,
    // marginBottom: Sizes.s180,
    backgroundColor: '#968B76',
    flexDirection: 'row',
    // padding: Sizes.s50,
    paddingLeft: Sizes.s40,
    paddingRight: Sizes.s40,
    marginTop: Sizes.s40,
  },
  title: {
    color: '#FFFFFF',
    //fontFamily: 'Roboto',
    fontSize: Sizes.s55,
    fontWeight: 'bold',
    marginTop: Sizes.s120,
  },
  text: {
    //fontFamily: 'Roboto',
    // fontWeight: 'bold',
    // color: '#FFFFFF',
    // fontSize: Sizes.s40,
    // marginBottom: 5,
  },
  regisForm: {
    width: '80%',
    height: Dimensions.get('window').height * 0.8,
    // height: Sizes.s340 * 2.5,
    // marginTop: Sizes.s40,
    justifyContent: 'space-between',
  },
  input: {
    width: '100%',
    height: Sizes.s90,
    backgroundColor: 'white',
    borderRadius: 5,
    borderBottomWidth: 0,
    marginBottom: 5,
    fontSize: Sizes.h40,
  },
  button: {
    width: '100%',
    height: Sizes.s100,
    backgroundColor: 'rgba(145, 139, 138, 0.8)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: 'white',
    //fontFamily: 'Roboto',
    fontSize: Sizes.h40,
    fontWeight: 'bold',
  },
  messageWhite: {
    // width: '90%',
    textAlign: 'center',
    color: 'white',
  },
  messageColor: {},
});
