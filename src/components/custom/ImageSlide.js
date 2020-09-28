import React, { useState, forwardRef, useEffect, useImperativeHandle } from 'react'
import Slide from '../custom/Slide'
import {
  Text,
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  BackHandler
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Sizes } from '@dungdang/react-native-basic'
import Swiper from './Swiper'

const ImageSlide = forwardRef((props, ref) => {
  const [isShowSlide, setIsShowSlide] = useState(false)
  const [currentImage, setCurrentImage] = useState(-1)
  const [listImage, setListImage] = useState(new Array)

  useImperativeHandle(ref, () => ({
    open: (currentImage, listImage) => {
      setCurrentImage(currentImage)
      setListImage(listImage)
      setIsShowSlide(true)
    },
    close: () => {
      setIsShowSlide(false)
    }
  }))

  return (
    <Modal animationType='none'
      transparent={true}
      visible={isShowSlide}
      onRequestClose={() => { setIsShowSlide(false) }}>
      <View style={{
        backgroundColor: props.backgroundColor,
        flex: 1,
        height: Dimensions.get('window').height
      }}>
        <Swiper
          index={currentImage}
          style={styles.wrapper}
          dotStyle={{
            borderWidth: 1,
            borderColor: '#007AFF',
            backgroundColor: '#ffffff'
          }}
        >
          {
            listImage.map(item =>
              <View style={styles.slide}>
                <Image
                  defaultSource={require('../../res/images/ic_default.jpg')}
                  resizeMode='contain'
                  source={{ uri: item.url }}
                  style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                  }}
                />
              </View>
            )
          }
        </Swiper>

        <TouchableWithoutFeedback onPress={() => { setIsShowSlide(false) }}>
          <View style={{
            position: 'absolute',
            right: Sizes.s50,
            top: Sizes.s80,
            backgroundColor: '#8A899999',
            aspectRatio: 1,
            width: Sizes.s70,
            height: Sizes.s70,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: Sizes.s50
            // borderRadius: Sizes.s70
          }}>
            <Icon
              name='times'
              size={Sizes.s50}
              color='#ffffff' />
          </View>
        </TouchableWithoutFeedback>
      </View>

    </Modal>

  )

})

ImageSlide.defaultProps = {
  backgroundColor: '#ffffff'
}

export default ImageSlide


const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})