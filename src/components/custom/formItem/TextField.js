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
const TextField = forwardRef((props, ref) => {
  const [isFocus, setIsFocus] = useState(false)
  const [text, setText] = useState(props.defaultValue !== undefined ? props.defaultValue : '')
  const [error, setError] = useState('')
  let borderColor = '#EFEFEF'
  if (isFocus) {
    borderColor = '#007AFF'
  }
  if (error !== '') {
    borderColor = 'red'
  }

  useImperativeHandle(ref, () => ({
    error: (key, content) => {
      // if (key === props.id) {
      setError(content)
      // return false
      // }
    },
    clearError: (key) => {
      // console.log(32423423423, key, props.id)
      // if (key === props.id) {
      setError('')
      // }
    }
  }))
  return (
    <View>
      {props.label && <Label label={props.label} isRequired={props.isRequired} />}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center'
      }}>

        <TextInput
          id={props.id}
          editable={props.editable}
          value={props.value}
          defaultValue={props.defaultValue}
          onChangeText={(text) => {
            setText(text)
            props.onChangeText(text)
            if (text.length > props.textLimit) {
              setError(`Giới hạn ${props.textLimit} ký tự`)
            } else {
              setError('')
            }
          }}
          keyboardType={props.keyboardType}
          onFocus={() => {
            setIsFocus(true)
            props.onFocus(text)
            if (text.length > props.textLimit) {
              setError(`Giới hạn ${props.textLimit} ký tự`)
            }
          }}
          onBlur={() => {
            setIsFocus(false)
            props.onBlur(text)
          }}
          placeholder={props.placeholder}
          placeholderTextColor='#989898'
          style={[{
            flex: 1,
            // height: props.multiline ? Sizes.s200 : undefined,
            justifyContent: 'center',
            fontSize: Sizes.s30,
            paddingVertical: Sizes.s20,
            color: '#222222',
            paddingHorizontal: Sizes.s10,
            borderColor: borderColor,
            borderWidth: 1,
            borderRadius: Sizes.s10,
            textAlignVertical: props.multiline && 'top',
            backgroundColor: !props.editable && '#eee',
            paddingTop: props.multiline && Sizes.s15,
            lineHeight: props.multiline && Sizes.s40
          }, props.style]}
          multiline={props.multiline}
        />
        {
          (props.textLimit !== undefined && isFocus) &&
          <View style={{
            position: 'absolute',
            top: props.icon !== undefined ? 0 : -Sizes.s30,
            right: props.icon !== undefined ? Sizes.s80 : 0
          }}>
            <Text style={{
              color: '#989898'
            }}>{text.length}/{props.textLimit}</Text>
          </View>
        }

        {
          props.icon !== undefined &&
          <TouchableOpacity
            disabled={error === '' ? false : true}
            onPress={() => {
              if (error === '') {
                props.onSubmit(text)
              }
            }}
            style={{
              paddingHorizontal: Sizes.s20
            }}>
            <Icon name='location-arrow' size={Sizes.s40} solid color='#007AFF' />
          </TouchableOpacity>
        }
      </View>
      {
        error !== '' &&
        <View>
          <Text style={{
            fontFamily: 'Roboto-Regular',
            fontSize: Sizes.s25,
            color: 'red',
            paddingVertical: Sizes.s15
          }}>{error}</Text>
        </View>
      }
    </View>

  )
})
TextField.defaultProps = {
  defaultValue: '',
  id: '',
  onFocus: () => { },
  onBlur: () => { },
  editable: true
}
export default TextField