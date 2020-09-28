import React, { Component } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions
} from "react-native";
import {
  elevationShadowStyle,
  objectIsNull,
} from "@dungdang/react-native-basic/src/Functions";
import { Sizes } from "@dungdang/react-native-basic";
import Images from '../../res/images';
import themes from "../../res/themes";
import Icon from "react-native-vector-icons/FontAwesome5";
import Swiper from 'react-native-swiper'

export default class SwiperImages extends Component {
  constructor(props) {
    super(props)
    // this.onCloseFullScreen = this.onCloseFullScreen.bind(this)
    this.props.onClose = this.props.onClose.bind(this)
  }
  render() {
    const { imgData } = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.close} onPress={()=> this.props.onClose()}>
          <Image
            style={{ flex: 1 }}
            resizeMode="contain"
            source={Images.ic_close}
          />
        </TouchableOpacity>
        <View style={styles.containerWrap}>
          <Swiper
            style={styles.wrapper}
            height={240}
            showsButtons
            onMomentumScrollEnd={(e, state, context) =>
              console.log('index:', state.index)
            }
            // paginationStyle={{
            //   bottom: -23,
            //   left: null,
            //   right: 10
            // }}
            loop
          >
            {imgData.map((item) => (
              <View
                style={styles.slide}
              // title={
              //   <Text numberOfLines={1}>Ahihi</Text>
              // }
              >
                <Image
                  resizeMode="contain"
                  style={styles.image}
                  source={{ uri: item.FileID }}
                />
              </View>
            ))}
          </Swiper>
        </View>
      </View>
    )
  }
}
const { width, height } = Dimensions.get('window')
const styles = {
  container: {
    position: "absolute",
    backgroundColor: 'rgba(25,55,55,0.9)',
    zIndex: 1,
    flex: 1,
  },
  close: {
    marginLeft: Sizes.s10,
    marginTop: Sizes.s70,
    height: Sizes.s100,
    width: Sizes.s100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: Sizes.s100,
  },
  containerWrap: {
    height: (height * 5 / 6),
    width: width,
  },
  wrapper: {
    // backgroundColor: "red",
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  titleIntro: {
    fontSize: Sizes.s30 + Sizes.s2,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Sizes.s20,
    marginBottom: Sizes.s20,
  },
  imgItem: {
    marginRight: Sizes.s40,
    marginBottom: Sizes.s80,
  },
  image: {
    width,
    flex: 1
  }
}