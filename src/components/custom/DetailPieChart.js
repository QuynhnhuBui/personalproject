import React from "react";
import { View, ScrollView, Text, FlatList } from "react-native";
import { SafeAreaView, NavigationActions } from "react-navigation";
import { StyleSheet, Dimensions } from "react-native";
import { Sizes } from "@dungdang/react-native-basic";
import Header from "./Headers";
import { theme } from "@dungdang/react-native-full";
import themes from "../../res/themes";

export default class DetailPieChart extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { data } = this.props;
		const totalValues = data.reduce((total, data) => {
			return (total += data.value);
		}, 0);
		return (
			<SafeAreaView>
				<FlatList
					style={{ flex: 1 }}
					data={this.props.data}
					scrollEnabled={false}
					numColumns={2}
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
		super(props);
	}
	render() {
		const { title, itemColor, value, total } = this.props;
		return (
			<View
				style={{
					flex: 1,
					flexDirection: "row",
					// justifyContent: "center",
					alignItems: "center",
					// backgroundColor: "#ff3333",
					marginRight:Sizes.s5
					// marginHorizontal: Sizes.s5,
				}}
			>
				<View
					style={{
						height: Sizes.s30,
						borderRadius: Sizes.s30,
						width: Sizes.s30,
						margin: Sizes.s10,
						backgroundColor: `${itemColor}`,
					}}
				/>
				{/* <View
					style={{
						flexDirection: "row",
						alignItems: "center",
						
					}}
				> */}
					<Text
						style={{
							...themes.titleSmall,
							color: themes.colors.black,flex: 1,
						}}
					>
						{title}	<Text
						style={{
							...themes.titleSmall,
							color: "#144DB6",
							fontWeight: "bold",
							margin: Sizes.s10,
						}}
					>
						{value}
					</Text>
					</Text>
				
					{/* <Text
						style={{
							...themes.titleNormal,
							margin: Sizes.s10,
						}}
					>
						/{total}
					</Text> */}
				{/* </View> */}
			</View>
		);
	}
}
