import React from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    ImageBackground,
    TouchableHighlight,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { StyleSheet, Dimensions } from "react-native";
import Images from "../../res/images";
import { Sizes } from "@dungdang/react-native-basic";
import OtpInputs from "../custom/Otp";
import moment from "moment";
export default class ForgetComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            isEmail: null,
            input: "",
            buttonTitle: "Xác nhận",
            opacity: 0,
            alert: null,
            otp: null,
            eventDate: moment.duration().add({ minutes: 9, seconds: 59 }), // add 9 full days, 3 hours, 40 minutes and 50 seconds
            mins: 0,
            secs: 0,
        };
    }
    updateTimer = () => {
        const x = setInterval(() => {
            let { eventDate } = this.state;
            if (eventDate <= 0) {
                clearInterval(x);
            } else {
                eventDate = eventDate.subtract(1, "s");
                const mins = eventDate.minutes();
                const secs = eventDate.seconds();
                this.setState({
                    mins,
                    secs,
                    eventDate,
                });
            }
        }, 1000);
    };
    componentDidMount() {
        this.updateTimer();
    }
    onBtnPress = async () => {
        this.props.clearOtp();
        if (this.state.otp == null) {
            this.setState({ alert: "Vui lòng nhập đầy đủ mã otp!" });
        } else {
            this.setState({ alert: null });
            await this.props.sendOtp(this.state.otp);
        }
    };

    render() {
        const { mins, secs } = this.state;
        return (
            <ImageBackground
                style={styles.background}
                source={Images.bg_binhdinh}
            >
                <View style={styles.main}>
                    <View
                        style={{
                            position: "absolute",
                            left: 0,
                            marginTop: Sizes.s90,
                        }}
                    >
                        <TouchableHighlight
                            onPress={() => this.props.onBack()}
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
                    <View style={styles.content}>
                        <Text style={styles.title}>Nhập mã OTP</Text>
                        <Text style={styles.message}>
                            Vui lòng nhập mã OTP bao gồm 6 số được gửi đến email
                            hoặc điện thoại của bạn. Mã OTP sẽ tự động hết hạn
							trong {` ${mins} : ${secs} `}
						</Text>
                    </View>
                    <View style={styles.regisForm}>
                        <OtpInputs
                            getOtp={(value) => {
                                this.setState({ otp: value });
                            }}
                        />
                        <Text style={{ color: "red", marginTop: Sizes.s20 }}>
                            {this.state.alert}
                            {this.props.alert}
                        </Text>
                    </View>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => this.onBtnPress()}
                    >
                        <Text style={styles.buttonTitle}>
                            {this.state.buttonTitle}
                        </Text>
                    </TouchableHighlight>
                    <View></View>
                </View>
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
    },
    content: {
        justifyContent: "center",
        alignItems: "center",
        width: isPhone ? "80%" : "75%",
        marginTop: Sizes.s160,
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
        width: isPhone ? "85%" : "80%",
        marginTop: Sizes.s100,
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
        backgroundColor: "rgba(145, 139, 138, 0.8)",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginTop: Sizes.s80,
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
