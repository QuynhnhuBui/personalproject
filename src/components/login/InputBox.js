import React from 'react';
import { TextInput, Image, View, Text, TouchableHighlight } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native';
import { Sizes } from '@dungdang/react-native-basic';
import { objectIsNull } from '@dungdang/react-native-basic/src/Functions';
import {isPhone} from '../../config/settings'
export default class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: !objectIsNull(this.props.value) ? this.props.value : null,
    };
  }

  componentDidMount() { }

  render() {
    return (
      <View style={styles.boxInput}>
        {this.props.hideicon === true ? (null):(<Image source={this.props.leftIcon} style={styles.iconLeft} />)}
        <TextInput
          style={styles.input}
          placeholder={this.props.title}
          placeholderTextColor='#8A8A8E'
          keyboardType={this.props.keyboardType}
          autoCompleteType={this.props.autoCompleteType}
          onBlur={this.props.onBlur}
          onChangeText={(text) => {
            (text = this.props.allowSpace ? text : text.replace(/\s/g, '')),
              this.props.onChangeText(text),
              this.setState({ value: text });
          }}
          secureTextEntry={this.props.secureTextEntry}
          defaultValue={this.state.value}
        />
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => {
            this.props.onRightIconPress ? this.props.onRightIconPress() : null
          }}>
            <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {this.props.hideicon === true ? (null):(<Image source={this.props.rightIcon} style={styles.iconRight} />)}
          </View>
        </TouchableHighlight>
        {this.props.check != null ? (
          <Icon
            name={this.props.check ? 'checkcircleo' : 'exclamationcircleo'}
            size={isPhone ? Sizes.s45 : Sizes.s35 }
            color={this.props.check ? 'green' : 'red'} style={styles.iconRight} />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxInput: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: Sizes.s10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: isPhone ? Sizes.s90 : Sizes.s70,
    borderBottomWidth: 0,
    fontSize: isPhone ? Sizes.h34 : Sizes.h30,
    color:'black'
  },
  iconRight: {
    width: isPhone ? Sizes.s45 : Sizes.s35,
    height: isPhone ? Sizes.s45 : Sizes.s35,
    marginRight: Sizes.s20,
    resizeMode: 'contain',
  },
  iconLeft: {
    width: isPhone ? Sizes.s45 : Sizes.s35,
    height: isPhone ? Sizes.s45 : Sizes.s35,
    marginLeft: Sizes.s20,
    marginRight: Sizes.s10,
    resizeMode: 'contain',
  },
});
