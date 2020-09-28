import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import Icon from 'react-native-vector-icons/FontAwesome5'

const Button = (props) => {
  const { icon, iconType, label, iconStyle, iconColor, iconSize, style, type, textStyle } = props
  return (
    <TouchableOpacity
      style={[
        (type === 'normal') ? styles.normal : styles.border
        , style]}
      onPress={props.onPress}
    >
      {
        (icon !== undefined && iconType === 'FontAwesome') &&
        <Icon name={icon} style={[{ paddingHorizontal: Sizes.s15 }, iconStyle]} color={iconColor} size={iconSize} />
      }
      {
        (icon !== undefined && iconType === 'image') &&
        <Image
          resizeMode='contain'
          style={{
            paddingHorizontal: Sizes.s30,
            width: iconSize,
            height: iconSize
          }}
          source={icon}
        />
      }
      <Text
        style={[{
          fontFamily: 'Roboto-Bold',
          fontSize: Sizes.s30,
          paddingVertical: type === 'normal' ? Sizes.s25 : Sizes.s15,
          color: '#ffffff'
        }, textStyle]}
      >{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  normal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FD6E05',
    borderRadius: Sizes.s10
  },
  border: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#FD6E05',
    borderWidth: 1,
    borderColor: '#FD6E05',
    borderRadius: Sizes.s10
  }
})

Button.defaultProps = {
  icon: '',
  iconType: '',
  label: 'Send',
  iconColor: '#ffffff',
  iconSize: Sizes.s45,
  type: 'normal',
  iconStyle: {
  }
}

export default Button