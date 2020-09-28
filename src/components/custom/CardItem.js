import React from 'react';
import {View, StyleSheet, Dimensions, Text, Image} from 'react-native';
import Header from '../custom/Header';
import {WebView} from 'react-native-webview';
import {Sizes} from '@dungdang/react-native-basic';
import Images from '../../res/images';
export default class CardItem extends React.Component {
  render() {
    const {title, Content, Time, image} = this.props;
    return (
      <View style={styles.content}>
        {image != null ? (
          <View>
            <Text style={styles.title}>{title}</Text>
            <Image style={styles.image} source={image} />
            <Text style={styles.textContent}>{Content}</Text>
            <View style={styles.time}>
              <Text style={styles.textTime}>{Time}</Text>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.textContent}>{Content}</Text>
            <View style={styles.time}>
              <Text style={styles.textTime}>{Time}</Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  content: {
    marginTop: Sizes.s20,
    paddingHorizontal: Sizes.s30,
    borderBottomWidth: Sizes.s2,
    marginBottom: Sizes.s10,
    borderColor: '#EFEFEF',
  },
  title: {
    fontSize: Sizes.s50,
    fontWeight: 'bold',
  },
  image: {
    marginTop: Sizes.s30,
    width: '100%',
    height: (width - Sizes.s30) * (360 / 640),
    alignItems: 'center',
    marginVertical: Sizes.s20,
  },
  textContent: {
    marginTop: Sizes.s20,
    fontSize: Sizes.s35,
  },
  textTime: {
    marginTop: Sizes.s10,
    fontSize: Sizes.s20,
    color: '#828282',
    marginBottom: Sizes.s10,
  },
});
