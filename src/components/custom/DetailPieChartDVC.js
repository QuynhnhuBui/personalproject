import React from 'react';
import { View, ScrollView, Text, FlatList } from 'react-native';
import { SafeAreaView, NavigationActions } from 'react-navigation';
import { StyleSheet, Dimensions } from 'react-native';
import { Sizes } from '@dungdang/react-native-basic';
import Header from './Headers';

export default class DetailPieChartDVC extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data } = this.props;
    const totalValues = data.reduce((total, data) => { return total += data.value }, 0)
    return (
      <SafeAreaView>
        <FlatList style={{ flex: 1, marginLeft: Sizes.s100 }}
          data={this.props.data}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <ItemFlatlist
              title={item.title}
              itemColor={item.color}
              total={totalValues}
              value={item.value}
            />
          )}
        />
      </SafeAreaView>
    );
  }
}
class ItemFlatlist extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { title, itemColor, value, total } = this.props;
    return (
      <View style={{ flex: 1, flexDirection: 'row', }}>
        <View style={{ height: Sizes.h40, borderRadius: Sizes.s20, width: Sizes.s40, margin: Sizes.s15, backgroundColor: `${itemColor}` }} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: Sizes.s40, margin: Sizes.s10 }} >
            {title}</Text>
          <Text style={{ fontSize: Sizes.s40, color: '#144DB6', fontWeight: 'bold', margin: 5 }} >{value}</Text>
          <Text style={{ fontSize: Sizes.s40, margin: Sizes.s10 }} >/{total}</Text>
        </View>
      </View>
    )
  }
}
