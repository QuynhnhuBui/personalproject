import React, { useState } from 'react'
import {
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback
} from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import Label from './Label'
import Icon from 'react-native-vector-icons/FontAwesome5'

const RadioSelectItem = (props) => {
  const [isSelected, setIsSelected] = useState(props.defaultValue)
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.onSelected(!isSelected)
        setIsSelected(!isSelected)
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icon name={isSelected ? 'check-circle' : 'circle'} color={props.color} size={Sizes.s40} />
        <Text style={{
          fontFamily: 'Roboto-Regular',
          paddingLeft: Sizes.s10,
          fontSize: Sizes.s30,
          paddingVertical: Sizes.s10
        }}>{props.label}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

RadioSelectItem.defaultProps = {
  defaultValue: false
}

export default RadioSelectItem