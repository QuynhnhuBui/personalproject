
import React from 'react';
import { Button, Image, View, Text,SafeAreaView } from 'react-native';

export default class CartComponent extends React.Component {
  render() {
    return (
      <SafeAreaView>
      
        <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor:"#eee"}}>
          <Text  > CartComponent!</Text>
        </View>

      </SafeAreaView>
    );
  }
}