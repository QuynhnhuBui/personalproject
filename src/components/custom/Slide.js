import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import {
  View,
  Animated,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal
} from 'react-native'

const Slide = React.forwardRef((props, ref) => {
  const time = props.time
  const [onSlide, setOnSlide] = useState(false)
  _animatedSlide = new Animated.Value(onSlide ? 1 : 0)
  let slideData = {}

  if (props.type === 'down') {
    Object.assign(slideData, {
      from: -1000,
      to: 0
    })
  } else {
    Object.assign(slideData, {
      from: 1000,
      to: 0
    })
  }

  useEffect(() => {
    let value = 0
    if (onSlide) {
      value = 1
    }

    // onChangeSlide(value)
  }, [onSlide])

  onChangeSlide = (value) => {
    Animated.timing(_animatedSlide, {
      toValue: value,
      duration: time,
      useNativeDriver: false
    }).start()
  }

  useImperativeHandle(ref, () => ({
    open: () => {
      setOnSlide(true)
      // onChangeSlide(1)
    },
    close: () => {
      onChangeSlide(0)
      setTimeout(() => setOnSlide(false), time)
    }
  }))

  return (
    <Modal animationType='none' transparent={true} visible={onSlide} onRequestClose={() => { setOnSlide(false) }}>
      <TouchableWithoutFeedback
        disabled={props.disabledOutSidePress}
        onPress={() => {
          onChangeSlide(0)
          setTimeout(() => setOnSlide(false), time)
        }}
      >
        <View style={{
          backgroundColor: '#00000036',
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          alignItem: 'center',
        }}>
          <Animated.View
            style={{
              transform: [{
                translateY: _animatedSlide.interpolate({
                  inputRange: [0, 1],
                  outputRange: [slideData.from, slideData.to],
                })
              }],
              alignSelf: 'center',
              borderRadius: 10,
              flex: 1,
              justifyContent: props.position
            }}>
            <TouchableWithoutFeedback disabled={true}>
              {props.children}

            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )

})

Slide.defaultProps = {
  position: 'center',
  type: 'up',
  time: 300,
  disabledOutSidePress: false
}

export default Slide



