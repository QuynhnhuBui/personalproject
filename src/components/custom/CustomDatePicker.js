import React, { Component } from 'react'
import { Picker, DatePicker } from '@dungdang/react-native-full/pickTime'

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  SafeAreaView
} from 'react-native'
import Slide from './Slide'
import { Sizes } from '@dungdang/react-native-basic'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Label from './formItem/Label'
import moment from '@dungdang/react-native-full/pickTime/moment'
import {
  objectIsNull,
  arrayIsEmpty,
  stringIsEmpty,
} from '@dungdang/react-native-basic/src/Functions'
import Button from './Button'

class CustomDatePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDatePicker: false,
      selectedDate: undefined,
      date: ''
    }
    this.slide = React.createRef()
  }
  parseDate(dateString) {
    var dateObj = new Date(dateString);
    var momentObj = moment(dateObj);
    var momentString = momentObj.format('DD-MM-YYYY');

    this.setState({ date: momentString })
    if (!objectIsNull(this.props.onChangeValue)) {
      this.props.onChangeValue(momentString)
    }
    // console.log("------>",momentString)
    // return momentString.toString();
  }
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.props.label && <Label label={this.props.label} />}
        <TouchableOpacity
          style={{
            borderColor: this.state.showDatePicker ? '#007AFF' : '#EFEFEF',
            borderWidth: 1,
            borderRadius: Sizes.s10,
            flexDirection: 'row',
          }}
          onPress={() => {
            this.setState({ showDatePicker: !this.state.showDatePicker })
          }}
        >
          <Text style={{
            paddingVertical: Sizes.s20,
            paddingRight: Sizes.s50,
            paddingLeft: Sizes.s10,
            color: this.state.selectedDate === undefined ? '#8A8A8E' : '#222222',
            fontSize: this.props.size,

          }}>
            {this.state.selectedDate !== undefined ? this.state.selectedDate.label : this.props.placeholder}
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
        {
          this.state.showDatePicker &&
          <Slide
            onClose={() => this.setState({ showDatePicker: false })}
            ref={this.slide}
            position='flex-end'
          >
            <View
              disabled={true}
              style={{
                width: Dimensions.get('window').width,
                backgroundColor: '#ffffff',
                borderRadius: Sizes.s25,
                height: Dimensions.get('window').height * 0.5,
              }}
            >
              <View
                style={{
                  borderBottomWidth: 0.5,
                  width: '100%',
                  justifyContent: 'center',
                  borderColor: '#EFEFEF',
                  flexDirection: 'row'
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: Sizes.s30,
                      paddingVertical: Sizes.s25,
                      alignSelf: 'center',
                      color: '#222222',
                      fontWeight: 'bold'
                    }}>
                    {this.props.placeholder}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => { this.slide.current.close() }}
                  style={{
                    justifyContent: 'center',
                    position: 'absolute',
                    right: Sizes.s30,
                    height: '100%'
                  }}
                >
                  <Image
                    style={{
                    }}
                    source={require('../../res/images/ic_close.png')}
                  />
                </TouchableOpacity>
              </View>
              <DatePicker
                //  order ={"D/M/YYY"}
                isVN={true}
                style={{
                  height: Sizes.s200 * 2,
                  width: undefined,
                  backgroundColor: '#ffffff',
                }}
                minimumDate={new Date('2000-01-01')}
                maximumDate={new Date('2050-12-31')}
                onDateChange={(date) => {
                  // console.log('dddd',_date)
                  this.parseDate(date);
                }}
              />

              <SafeAreaView
                style={{
                  marginHorizontal: Sizes.s30,
                  bottom: 0,
                  flex: 1,
                  justifyContent: "flex-end"
                }}
              >
                <Button
                  icon=''
                  label='Chọn'
                  iconSize={Sizes.s40}
                  onPress={() => {
                    console.log(this.state.date)
                  }}
                />
              </SafeAreaView>
            </View>

          </Slide>
        }

      </View>
    )
  }
}

CustomDatePicker.defaultProps = {
  placeholder: 'Chọn ngày'
}
export default CustomDatePicker
const styles = StyleSheet.create({
  container: {
    // width: '100%',
  },
})