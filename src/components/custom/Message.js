
import React, { Component } from 'react'
import {
  View,
  Animated,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Dimensions
} from 'react-native'
import Slide from './Slide'
import { Sizes } from '@dungdang/react-native-basic'
import Button from './Button'
class Message extends Component {

  constructor(props) {
    super(props)
    this.slide = React.createRef()
  }

  componentDidMount() {
    this.slide.current.open()
  }

  render() {
    return (
      <Slide
        ref={this.slide}
        position="center">
        <View style={{
          width: Dimensions.get('window').width * 0.8,
          backgroundColor: '#ffffff',
          alignItems: 'center',
          borderRadius: Sizes.s20
        }}>
          <View style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: "center",
            borderBottomWidth: 1,
            borderBottomColor: '#ccc'
          }}>
            <Text style={{
              fontFamily: 'Roboto-Medium',
              fontSize: Sizes.s40,
              paddingVertical: Sizes.s20,
              color: '#222222'
            }}>Thông báo</Text>
          </View>

          <View style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: "center",
            borderBottomWidth: 1,
            borderBottomColor: '#ccc'
          }}>
            {
              this.props.message !== undefined &&
              <Text style={{
                fontFamily: 'Roboto',
                fontSize: Sizes.s35 * 0.95,
                textAlign: 'center',
                paddingVertical: Sizes.s20,
                paddingHorizontal: Sizes.s60,
                color: '#222222'
              }}>{this.props.message}</Text>
            }

            {this.props.children}
            <Button
              onPress={() => {
                this.props.onClose()
                this.slide.current.close()
              }}
              type='border'
              label='Đóng'
              style={{
                borderWidth: 0,
                marginBottom: Sizes.s20
              }}
              textStyle={{
                color: '#007AFF',
                fontSize: Sizes.s35
              }}
            />
          </View>
        </View>
      </Slide>
    )
  }


}

Message.defaultProps = {

}

export default Message



