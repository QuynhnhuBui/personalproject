import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Button, Sizes} from '@dungdang/react-native-basic';
import {
  arrayIsEmpty,
  objectIsNull,
  stringIsEmpty,
} from '@dungdang/react-native-basic/src/Functions';
import themes from '../../res/themes';
export default class MenuTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: 0,
    };
  }
  render() {
    const {onChangeTab, items} = this.props;
    const {select} = this.state;
    let viewTab = [];
    if (!arrayIsEmpty(items)) {
      items.map((item, index) => {
        viewTab.push(
          <Button
            style={{
              borderColor: themes.colors.blue,
              borderBottomWidth: select === index ? Sizes.s2 : 0,
              marginBottom: -Sizes.s2 / 2,
              paddingVertical: Sizes.s15,
            }}
            styleTitle={{
              ...themes.titleNormal,
              paddingHorizontal: Sizes.s30,
              fontWeight: select === index ? '600' : '400',

              color: select === index ? themes.colors.blue : '#abaaac',
            }}
            onPress={() => {
              if (!objectIsNull(onChangeTab)) {
                
                onChangeTab(index);
              }
              this.setState({
                select: index,
              });
            }}>
            {item.title}
            <Text style={{alignSelf: 'flex-start'}}></Text>
          </Button>,
        );
      });
    }
    if (!arrayIsEmpty(items)) {
      return (
        <View
          style={{
            width: '100%',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            borderColor: themes.colors.grey,
            borderBottomWidth: Sizes.s2 / 2,
            paddingHorizontal: themes.paddingHoz,
          }}>
          {viewTab}
        </View>
      );
    } else {
      return null;
    }
  }
}
MenuTab.defaultProps = {};
const styles = {
  container: {},
  header: {},
  body: {},
  foot: {},
};
