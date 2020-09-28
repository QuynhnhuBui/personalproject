import React from 'react';
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
} from 'react-native';

import {Sizes, Button, Colors} from '@dungdang/react-native-basic';

import {
  objectIsNull,
  arrayIsEmpty,
  stringIsEmpty,
} from '@dungdang/react-native-basic/src/Functions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import themes from '../../res/themes';
import { theme } from '@dungdang/react-native-full';

export default class InputEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  getValue() {
    return this.state.value;
  }
  
  render() {
    const {
      title,
      value,
      placeHolder,
      height,
      onChangeText,
      editable,multiline
    } = this.props;
    const {visible, date} = this.state;
    return (
      <View
      // onPress={() => {
      //   this.show();
      // }}
      >
        <Text
          style={{
            ...themes.titleBig2,
          }}>
          {title}
        </Text>
        <TextInput
        
        multiline ={multiline}
          editable={editable}
          onChangeText={(text) => {
            this.setState({value: text});
            onChangeText(text);
          }}
          placeholder={
            !stringIsEmpty(placeHolder) ? placeHolder : 'Nhập ' + title
          }
          // multiline
          style={{
            ...themes.input,
            minHeight: Sizes.s70,
            paddingBottom: Sizes.s10,
            opacity: editable === false ? 0.8 : 1,
            height: !objectIsNull(height) ? height : undefined,
            color:themes.colors.black
          }}>
          {value}
        </TextInput>
      </View>
    );
  }
}

InputEdit.defaultProps = {placeHolder: '', onChangeText: () => {}};
