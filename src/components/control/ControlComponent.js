
import React from 'react';
import { Button, Image, View, Text, SafeAreaView } from 'react-native';

export default class ControlComponent extends React.Component {
  render() {
    return (
      <SafeAreaView>

        <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: "#eee" }}>
          <Text> ControlComponent!</Text>
        </View>

      </SafeAreaView>
    );
  }
}