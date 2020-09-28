import React, { useState, forwardRef, useImperativeHandle } from 'react'
import {
  Text,
  TextInput,
  View
} from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import Label from './Label'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native-gesture-handler'
const ErrorView = (props) => {
  return (
    <View>
      <Text style={{
        fontFamily: 'Roboto-Regular',
        fontSize: Sizes.s25,
        color: 'red',
        paddingVertical: Sizes.s15
      }}>{props.error}</Text>
    </View>
  )
}
ErrorView.defaultProps = {
  defaultValue: '',
}
export default ErrorView