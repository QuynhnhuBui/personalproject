import React, { useState, forwardRef, useEffect, useImperativeHandle, useLayoutEffect } from 'react'
import Slide from '../custom/Slide'
import {
  Text,
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Sizes } from '@dungdang/react-native-basic'
import { ScrollView } from 'react-native-gesture-handler'

const Swiper = forwardRef((props, ref) => {
  const [index, setIndex] = useState(props.index)

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      ref={ref => { this.scrollView = ref }}
      onLayout={() => {
        this.scrollView.scrollTo({
          x: props.index * Dimensions.get('window').width,
          y: 0,
          animated: false
        })
      }}
      pagingEnabled={true}
    >
      {props.children}
    </ScrollView>
  )

})

export default Swiper


const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})