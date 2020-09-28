import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import {
  View,
  Text,
  ScrollView,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  Animated
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Sizes } from '@dungdang/react-native-basic'
import Label from './Label'
import ErrorView from './ErrorView'
const Select = forwardRef((props, ref) => {
  let [showSelect, setShowSelect] = useState(false)
  let [selectedItem, setSelectedItem] = useState(
    (props.defaultValue !== undefined) ? props.defaultValue : undefined
  );
  let [error, setError] = useState('')

  useImperativeHandle(ref, () => ({
    error: (key, content) => {
      if (key === props.id) {
        setError(content)
        return false
      }
    },
    clearError: (key) => {
      if (key === props.id) {
        setError('')
      }
    }
  }))

  const { listItem } = props
  _animatedSlideUp = new Animated.Value(showSelect ? 0 : 1);
  useEffect(() => {
    let value = 0
    if (showSelect) {
      value = 1
    }

    Animated.timing(_animatedSlideUp, {
      toValue: value,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [showSelect])


  const renderItem = ({ item, index }) => {

    return (
      <View
        style={{
          borderBottomWidth: 0.5,
          width: Dimensions.get('window').width * 0.9,
          marginHorizontal: 10,
          alignItem: 'center',
          justifyContent: 'center',
          borderColor: '#EFEFEF',
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
          onPress={() => {
            Animated.timing(_animatedSlideUp, {
              toValue: 0,
              duration: 300,
              useNativeDriver: false
            }).start();
            setTimeout(() => {
              setSelectedItem(item)
              setShowSelect(false)
              props.onChooseItem(item)
            }, 300)
          }}>
          <Text
            style={{
              fontSize: selectedItem === item ? props.size * 1.1 : props.size,
              paddingVertical: Sizes.s30,
              fontFamily: selectedItem === item ? 'Roboto-Medium' : 'Roboto-Regular',
              color: selectedItem === item ? '#007AFF' : '#222222',
            }}>
            {item.label !== undefined ? item.label : item}
          </Text>
          <View style={{ flex: 1 }}></View>
          {
            selectedItem === item &&
            <Icon
              solid
              style={{
                paddingHorizontal: Sizes.s10
              }}
              size={Sizes.s35}
              color='#007AFF'
              name='check-circle' />
          }

        </TouchableOpacity>
      </View>
    );
  };


  let borderColor = '#EFEFEF'
  if (showSelect) {
    borderColor = '#007AFF'
  }
  if (error !== '') {
    borderColor = 'red'
  }
  return (
    <View style={[styles.container, props.style]}>
      {props.label && <Label label={props.label} isRequired={props.isRequired} />}
      <TouchableOpacity
        style={{
          borderColor: borderColor,
          borderWidth: 1,
          borderRadius: Sizes.s10,
          flexDirection: 'row',
        }}
        onPress={() => {
          props.onFocus(selectedItem)
          setShowSelect(!showSelect)
        }}
      >
        <Text style={{
          paddingVertical: Sizes.s20,
          paddingRight: Sizes.s50,
          paddingLeft: Sizes.s10,
          color: selectedItem === undefined ? '#8A8A8E' : '#222222',
          fontSize: props.size,
          fontFamily: 'Roboto-Regular'
        }}>
          {selectedItem !== undefined ? selectedItem.label : props.placeholder}
        </Text>
        <Icon
          color='#989898'
          size={Sizes.s30}
          name='chevron-down'
          style={{
            alignSelf: 'center',
            right: 5,
            position: 'absolute'
          }} />
      </TouchableOpacity>
      {error !== '' && <ErrorView error={error} />}
      <Modal animationType='none' transparent={true} visible={showSelect} onRequestClose={() => { setShowSelect(false) }}>
        <TouchableWithoutFeedback
          onPress={() => {
            Animated.timing(_animatedSlideUp, {
              toValue: 0,
              duration: 300,
              useNativeDriver: false
            }).start();
            setTimeout(() => {
              setShowSelect(false)
              props.onBlur(selectedItem)
            }, 300)
          }}
        >
          <View
            style={{
              backgroundColor: '#00000036',
              flex: 1,
              width: '100%',
              justifyContent: 'flex-end',
              alignItem: 'center',
            }}>
            <TouchableWithoutFeedback>

              <Animated.View
                disabled={true}
                style={{
                  transform: [{
                    translateY: _animatedSlideUp.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1000, 0],
                    })
                  }],
                  width: '100%',
                  backgroundColor: '#ffffff',
                  alignSelf: 'center',
                  borderRadius: 15,
                  height: Dimensions.get('window').height * 0.5,
                }}>
                <View
                  style={{
                    borderBottomWidth: 0.5,
                    width: Dimensions.get('window').width,
                    justifyContent: 'center',
                    borderColor: '#EFEFEF',
                    flexDirection: 'row'
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: props.size,
                        paddingVertical: 15,
                        alignSelf: 'center',
                        color: '#222222',
                        fontWeight: 'bold'
                      }}>
                      {props.placeholder}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      position: 'absolute',
                      right: 10,
                      height: '100%'
                    }}
                    onPress={() => { setShowSelect(!showSelect) }}
                  >
                  </TouchableOpacity>
                </View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={listItem}
                  keyExtractor={(item, index) => { index.toString() }}
                  renderItem={(item, index) => renderItem(item, index)}
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    backgroundColor: '#ffffff',
                    height: Dimensions.get('window').height * 0.5,
                  }}
                  contentContainerStyle={{
                    alignItems: 'center',
                  }}
                />
              </Animated.View>
            </TouchableWithoutFeedback>

          </View>
        </TouchableWithoutFeedback>

      </Modal>
    </View>

  )
})
export default Select

Select.defaultProps = {
  placeholder: 'Select an item',
  type: 'normal',
  size: 18,
  onChooseItem: (item) => { },
  onFocus: () => { },
  onBlur: () => { }
}



const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  icon: {
    resizeMode: 'contain',
    height: '40%',
    alignSelf: 'center',
    right: 5,
    position: 'absolute'
  }
})

