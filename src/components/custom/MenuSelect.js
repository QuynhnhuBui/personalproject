import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, Sizes } from "@dungdang/react-native-basic";
import {
	arrayIsEmpty,
	objectIsNull,
	stringIsEmpty,
} from "@dungdang/react-native-basic/src/Functions";
import themes from "../../res/themes";
import { ScrollView } from "react-native-gesture-handler";
export default class MenuSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			select: !objectIsNull(this.props.select) ? this.props.select : 0,
		};
	}
	componentDidUpdate(prev) {
		if (prev.select !== this.props.select) {
			this.state = {
				select: !objectIsNull(this.props.select)
					? this.props.select
					: 0,
			};
		}
	}
	setFocus=()=>{
		this.setState({
			select:0
		})
	}
	render() {
		const { onChangeTab, items } = this.props;
		const { select } = this.state;
		let viewTab = [];
		if (!arrayIsEmpty(items)) {
			items.map((item, index) => {
				viewTab.push(
					<Button
						style={{
							backgroundColor:
								select === index
									? themes.colors.blue
									: "#efefef",
							paddingVertical: Sizes.s15,
							borderRadius: Sizes.s80,
							marginRight: Sizes.s10,
						}}
						styleTitle={{
							...themes.titleNormal,
							paddingHorizontal: Sizes.s30,
							fontWeight: select === index ? "600" : "400",

							color: select === index ? "#ffffff" : "#abaaac",
						}}
						onPress={() => {
							if (!objectIsNull(onChangeTab)) {
								onChangeTab(index);
							}
							this.setState({
								select: index,
							});
						}}
					>
						{item.title}
						<Text style={{ alignSelf: "flex-start" }}></Text>
					</Button>
				);
			});
		}
		if (!arrayIsEmpty(items)) {
			return (
				//   <ScrollView
				//     horizontal
				//     contentContainerStyle={{flexGrow:1, height: Sizes.s60}}
				//     style={{
				//       height: Sizes.s60,
				//     }}>
				<View
					style={{
						// width: '100%',

						justifyContent: "flex-start",
						flexDirection: "row",
						// borderBottomWidth: Sizes.s2 / 2,
						marginTop: Sizes.s20,
					}}
				>
					<ScrollView
						showsHorizontalScrollIndicator={false}
						horizontal
						contentContainerStyle={{
							paddingHorizontal: themes.paddingHoz,
						}}
					>
						{viewTab}
					</ScrollView>
				</View>
				//   </ScrollView>
			);
		} else {
			return null;
		}
	}
}
MenuSelect.defaultProps = {};
const styles = {
	container: {},
	header: {},
	body: {},
	foot: {},
};
