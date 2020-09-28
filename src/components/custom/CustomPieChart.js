import React from 'react'
import { View, FlatList, StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import { PieChart } from 'react-native-svg-charts'
import { Text, Circle, G, Line, Mask, Rect, Svg } from 'react-native-svg'
import LinearGradient from 'react-native-linear-gradient';
import DetailPieChartDVC from './DetailPieChartDVC';
import { Sizes } from '@dungdang/react-native-basic';

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height
const aspectRatio = windowHeight / windowWidth

class CustomPieChart extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { data, header } = this.props;
    const totalValues = data.reduce((total, data) => { return total += data.value }, 0)
    const pieData = data
      .filter(data => data.value > 0)
      .map((data, index) => ({
        value: data.value,
        svg: { fill: data.color },
        key: `pie-${index}`,
      }))
    const Labels = ({ slices }) => {
      return slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;
        return (
          <G key={index}>
            <Line
              x1={labelCentroid[0]}
              y1={labelCentroid[1]}
              x2={pieCentroid[0]}
              y2={pieCentroid[1]}
              stroke={data.svg.fill}
            />
            {
              labelCentroid[0] > 0
                ? <Line
                  x1={labelCentroid[0]}
                  y1={labelCentroid[1]}
                  x2={labelCentroid[0] + Sizes.s50}
                  y2={labelCentroid[1]}
                  stroke={data.svg.fill}
                />
                : <Line
                  x1={labelCentroid[0]}
                  y1={labelCentroid[1]}
                  x2={labelCentroid[0] - Sizes.s50}
                  y2={labelCentroid[1]}
                  stroke={data.svg.fill}
                />
            }
            {
              labelCentroid[0] > 0
                ? <Text fill={data.svg.fill}
                  //stroke={data.svg.fill}
                  fontSize="20"
                  fontWeight="bold"
                  x={labelCentroid[0] + Sizes.s50}
                  y={labelCentroid[1]}
                  textAnchor="start">
                  {(Math.round((data.value / totalValues) * 100) / 100 * 100) + "%"}
                </Text>
                : <Text fill={data.svg.fill}
                  //stroke={data.svg.fill}
                  fontSize="20"
                  fontWeight="bold"
                  x={labelCentroid[0] - Sizes.s50}
                  y={labelCentroid[1]}
                  textAnchor="end">
                  {(Math.round((data.value / totalValues) * 100) / 100 * 100) + "%"}
                </Text>
            }
          </G>
        )
      })
    }
    return (
      <View style={{ flex: 1, marginTop: 0 }}>
        {/* <View style={{ backgroundColor: 'blue', flex: 1, marginTop: 0 }}>
          <Text style={styles.textTime}>
          Cập nhật lúc: 12/06/2020 14:34:58
						</Text>
            </View> */}
        <View style={{ flex: 1, marginTop: 0 }}>
          <PieChart
            style={{ height: Sizes.s240 * 2, marginTop: Sizes.s40 }}
            data={pieData}
            valueAccessor={({ item }) => item.value}
            innerRadius={Sizes.s2 / 2}
            outerRadius={
              aspectRatio < 1.6
                ? windowWidth / 4
                : windowHeight / 9}
            padAngle={Sizes.s2 / 200}
            labelRadius={
              aspectRatio < 1.6
                ? windowWidth / 3.7
                : windowHeight / 8
            }
            // spacing={0}
            sort={(a, b) => b - a}
          >
            <Labels />
          </PieChart>
          <DetailPieChartDVC data={data} />
        </View>

      </View>
    )
  }
}
export default CustomPieChart

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    height: Sizes.h50,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textTime: {
    fontSize: Sizes.s25,
    marginLeft: Sizes.s20,
    marginTop: Sizes.s20,
    color: "gray",
  },
  infoContainer: {
    flex: 1,
    height: Sizes.h50,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  infoContainer: {
    flex: 1,
    height: Sizes.h50,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  linearGradient: {
    flex: 1,
    height: Sizes.h45,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center'
  },
  textHeader: {
    fontSize: Sizes.s20,
    marginLeft: Sizes.s20,
    color: "#fff",

  },
  completeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  incompleteContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },

});