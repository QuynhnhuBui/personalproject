import React, { useImperativeHandle, useState, useEffect, forwardRef } from 'react'
import {
  View,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Sizes } from '@dungdang/react-native-basic'

const Rate = forwardRef((props, ref) => {
  const [value, setValue] = useState(parseInt(props.value))

  useImperativeHandle(ref, () => ({
    changeData: (value) => {
      setValue(value)
    }
  }))

  renderItem = () => {
    let list = []
    for (let i = 1; i <= props.maxValue; i++) {
      list.push(
        <TouchableOpacity
          onPress={() => {
            // setValue(i)
            props.setRate(i)
          }}
          disabled={props.disabled}
        >
          <Icon name='star' size={props.size} color={i <= value ? '#FF6969' : '#ABAAAC'} solid />
        </TouchableOpacity>
      )
    }
    return list
  }

  return (
    <View style={[{
      flexDirection: 'row',
    }, props.style]}>
      {renderItem()}
    </View>
  )

})

Rate.defaultProps = {
  defaultValue: 0,
  maxValue: 5,
  size: 20,
  disabled: false,
  setRate: () => { }
}

export default Rate