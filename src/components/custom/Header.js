import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconB from 'react-native-vector-icons/Ionicons';
import Images from '../../res/images';

export default class Header extends Component {
  render() {
    const {title, onPressBackButton, timeWeather, navigation} = this.props;
    return (
      <View>
        {timeWeather == 'true' ? (
          <ImageBackground source={Images.cover} style={styles.header}>
            <Text
              style={{
                color: '#ffff',
                padding: Sizes.s10,
                margin: Sizes.s15,
                fontSize: Sizes.s70,
              }}>
              Smart City Bình Định
            </Text>
            <View style={styles.headerItem}>
              <View
                style={{
                  flex: 1,
                  alignContent: 'center',
                  alignItems: 'center',
                  borderRightColor: '#FFF',
                  borderRightWidth: Sizes.s2,
                }}>
                <Text style={{color: '#FFCE00', fontSize: Sizes.s25}}>
                  THỨ SÁU
                </Text>
                <Text style={{color: '#FFCE00', fontSize: Sizes.s30}}>
                  29/05/2020
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: Sizes.s30, color: '#FFF'}}>30 °C</Text>
                <Text style={{fontSize: Sizes.s30, color: '#FFF'}}>
                  Quy Nhơn
                </Text>
              </View>
            </View>
          </ImageBackground>
        ) : (
          <ImageBackground
            resizeMode="stretch"
            source={Images.bg_introduce}
            style={styles.container}>
            <Text
              numberOfLines={2}
              style={{
                alignSelf: 'center',
                fontSize: Sizes.s40,
                color: '#ffff',
                marginBottom: Sizes.s15,
                fontWeight: 'bold',
              }}>
              {title}
            </Text>

            <TouchableOpacity
              style={{
                position: 'absolute',
                left: Sizes.s30,
                width: Sizes.s60,
                height: Sizes.s60,
                justifyContent: 'center',
              }}
              onPress={() => {
                if (onPressBackButton) {
                  onPressBackButton();
                } else if (navigation) {
                  navigation.goBack();
                }
              }}>
              <IconB
                  name="ios-arrow-round-back"
                  color="white"
                  size={Sizes.s90}
                  style={{ marginRight: Sizes.s20, paddingBottom:Sizes.s100 }}
                />
            </TouchableOpacity>
          </ImageBackground>
        )}
      </View>
    );
  }
}
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    resizeMode: 'center',
    height: Sizes.s160,
    width: '100%',
    padding: 0,
    margin: 0,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  icon: {

    marginLeft: Sizes.s20,
    color: '#fff',
    // fontSize: Sizes.s50,
   //  marginBottom: Sizes.s2,
  },

  cell: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    textAlign: 'center',
    aspectRatio: 1,
    flex: 1,
    margin: 10,
    backgroundColor: '#eaa',
  },

  header: {
    alignItems: 'center',
    backgroundColor: '#153A85',
    resizeMode: 'center',
    height: 250,
    width: '100%',
    padding: 0,
    margin: 0,
    justifyContent: 'center',
    flexDirection: 'column',
  },

  headerItem: {
    color: 'white',
    width: '80%',
    padding: 15,
    margin: 10,
    height: 70,
    borderRadius: 10,
    //opacity: 0.2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    flexDirection: 'row',
  },
});
