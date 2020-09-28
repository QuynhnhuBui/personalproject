import React from 'react';
import { StyleSheet, TextInput, View,} from 'react-native';
import { Sizes } from '@dungdang/react-native-basic';
import { color } from 'react-native-reanimated';

class OtpInputs extends React.Component {

    constructor(props){
        super(props)
        this.state={otp:[]};
    }
    componentDidMount() {
        this.refs.box1.focus();
    }

    componentDidUpdate() {
        console.log(this.state.otp)
    }

    focusPrevious(key, index) {
        if (key === 'Backspace' && index !== 1){
            switch (index) {
                case 2:
                    this.refs.box1.focus();
                  return;
                case 3:
                    this.refs.box2.focus();
                  return;
                case 4:
                    this.refs.box3.focus();
                  return;
                case 5:
                    this.refs.box4.focus();
                  return;
                case 6:
                    this.refs.box5.focus();
                  return;
            }
        }
            
    }

    focusNext(index, value) {
        const otp = this.state.otp;
        otp[index-1] = value;
        this.setState({ otp });
        if (index < 6  && value) {
            switch (index) {
                case 1:
                    this.refs.box2.focus();
                  return;
                case 2:
                    this.refs.box3.focus();
                  return;
                case 3:
                    this.refs.box4.focus();
                  return;
                case 4:
                    this.refs.box5.focus();
                  return;
                case 5:
                    this.refs.box6.focus();
                  return;
            }
        }
        this.props.getOtp(otp.join(''));
    }

    render() {
        return (
            <View style = {styles.content}>
                <TextInput style = {styles.box} ref = 'box1' maxLength = {1}
                    keyboardType = 'numeric'
                    onChangeText = {(text) => {this.focusNext(1,text)}}
                    onKeyPress = {e => this.focusPrevious(e.nativeEvent.key, 1)} />

                <TextInput style = {styles.box} ref = 'box2' maxLength = {1}
                    keyboardType = 'numeric'
                    onChangeText = {(text) => {this.focusNext(2,text)}}
                    onKeyPress = {e => this.focusPrevious(e.nativeEvent.key, 2)} />

                <TextInput style = {styles.box} ref = 'box3' maxLength = {1}
                    keyboardType = 'numeric'
                    onChangeText = {(text) => {this.focusNext(3,text)}}
                    onKeyPress = {e => this.focusPrevious(e.nativeEvent.key, 3)} />

                <TextInput style = {styles.box} ref = 'box4' maxLength = {1}
                    keyboardType = 'numeric'
                    onChangeText = {(text) => {this.focusNext(4,text)}}
                    onKeyPress = {e => this.focusPrevious(e.nativeEvent.key, 4)} />

                <TextInput style = {styles.box} ref = 'box5' maxLength = {1}
                    keyboardType = 'numeric'
                    onChangeText = {(text) => {this.focusNext(5,text)}} 
                    onKeyPress = {e => this.focusPrevious(e.nativeEvent.key, 5)} />

                <TextInput style = {styles.box} ref = 'box6' maxLength = {1}
                    keyboardType = 'numeric'
                    onChangeText = {(text) => {this.focusNext(6,text)}}
                    onKeyPress = {e => this.focusPrevious(e.nativeEvent.key, 6)} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        width: '100%',
        height:Sizes.s100,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    box: {
        width:Sizes.s100,
        height:Sizes.s100,
        backgroundColor:'white',
        borderRadius: Sizes.s10,
        textAlign:'center',
        fontSize:Sizes.h42,
        fontWeight:'bold',
        color: 'black',
    },
});

export default OtpInputs;