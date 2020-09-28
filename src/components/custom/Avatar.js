/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ImageBackground} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {StyleSheet} from 'react-native';
import Images from '../../res/images';
import {Sizes} from '@dungdang/react-native-basic';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { userData } from '../../config/settings';

export default class Avatara extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  onBtnPress = () => {};

  render() {
    return (
      <ImageBackground
      
        source={this.props.uri ? { uri: this.props.uri } : Images.ic_defaultUser}
        style={styles.aBox}
        imageStyle={styles.aCircle}>
        <View />
        {userData.isCitizen===true&&
        <View style={styles.aIcon}>
          <Icon name="camera" size={Sizes.s30} color="#325159" />
        </View>}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  aBox: {
    backgroundColor: 'transparent',
    width: Sizes.s160*0.8,
    height: Sizes.s160*0.8,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  aCircle: {
    width: Sizes.s140*0.8,
    height: Sizes.s140*0.8,
    resizeMode: 'cover',
    borderRadius: Sizes.s70,
  },
  aIcon: {
    backgroundColor: 'white',
    width: Sizes.s60,
    height: Sizes.s60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Sizes.s30,
  },
});
