import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Sizes, Colors } from '@dungdang/react-native-basic';
import { objectIsNull } from '@dungdang/react-native-basic/src/Functions';

const CustomButton = (props) => {
  return (
    <TouchableOpacity
      disabled={!objectIsNull(props.disabled) ? true : false}
      style={[
        {
          backgroundColor: !objectIsNull(props.disabled)
            ? Colors.bg_button_fuzzy
            : 'rgba(255,255,255,0.3)',
          paddingVertical: Sizes.s20,
          alignItems: 'center',
          alignContent: 'center',
          height: 50,
          width: 300,
          borderRadius: Sizes.s70,
        },
        { ...props.buttonStyles },
      ]}
      onPress={() => {
        props.onPress();
      }}>
      <Text
        style={{
          color: '#ffffff',
          //fontFamily: 'SourceSansPro-SemiBold',
          fontSize: Sizes.s35,
          ...props.titleStyles,
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};
export default CustomButton;
