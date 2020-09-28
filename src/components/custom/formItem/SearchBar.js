import React, { Component, useState } from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import Images from '../../../res/images/index'
import Icon from 'react-native-vector-icons/FontAwesome5'

const SearchBar = (props) => {
  const [value, setValue] = useState('')

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F2F2F2',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: Sizes.s10,
      }}
    >
      <Image
        source={Images.ic_search}
        style={{
          height: Sizes.s40,
          width: Sizes.s40,
          marginHorizontal: Sizes.s20
        }}
      />

      <TextInput
        placeholder='Tìm kiếm'
        style={{
          flex: 1,
          fontSize: Sizes.s30,
          paddingVertical: Sizes.s20,
          fontFamily: 'Roboto-Regular',
          width: '100%',
          color: 'F2F2F2'
        }}
        value={value}
        onFocus={() => props.onFocus()}
        onChangeText={(text) => {
          props.onChangeText(text)
          setValue(text)
        }}
      />
      {
        value !== '' &&
        <TouchableOpacity
          onPress={() => {
            props.onChangeText('')
            setValue('')
          }}
          style={{
            marginHorizontal: Sizes.s10
          }}>
          <Icon
            name='times-circle'
            size={Sizes.s40}

            color='#ccc'
            solid
          />
        </TouchableOpacity>
      }
    </View>
  )
}

SearchBar.defaultProps = {
  onTextChange: (text) => { },
  onFocus: () => { }
}

export default SearchBar