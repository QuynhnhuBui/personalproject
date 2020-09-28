import React from "react";
import {
	View,
	Image,
	TouchableOpacity,
	StyleSheet,
	Text,
	ScrollView,Alert
} from "react-native";

import {
	elevationShadowStyle,
	objectIsNull,
} from "@dungdang/react-native-basic/src/Functions";
import { Sizes } from "@dungdang/react-native-basic";
import themes from "../../res/themes";
import Icon from "react-native-vector-icons/FontAwesome5";
export default class GridView extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const {
			items,
			columnCount,
			style,
			styleItem,
			onClickItem,
			onScroll,
			styleScrollView,
		} = this.props;
		// console.log('LLLL',items)
		const rows = [];
		const countRow = Math.floor(items.length / columnCount) + 1;
		for (var iRow = 0; iRow < countRow; iRow++) {
			const curRow = iRow;
			const columns = [];
			for (
				var iColumn = 0 + iRow * columnCount;
				iColumn < columnCount + iRow * columnCount &&
				iColumn < countRow * columnCount;
				iColumn++
			) {
				const cur = iColumn;

				if (iColumn < items.length) {
					columns.push(
						<TouchableOpacity
							// disabled={items[cur].ban}
							key={cur}
							onPress={() => {
								if (items[cur].ban === true) {
									Alert.alert(
										"Thông báo",
										"Chức năng đang được cập nhật!",
										[
											{
												text: "OK",
												onPress: () =>
													console.log("OK Pressed"),
											},
										],
										{ cancelable: false }
									);
								} else {
									onClickItem(items[cur]);
								}
							}}
							style={{
								aspectRatio: 0.85,
								backgroundColor: themes.colors.white,
								justifyContent: "center",
								alignItems: "center",
								marginTop: Sizes.s10,

								marginHorizontal: Sizes.s25,
								borderRadius: Sizes.s50,
								flexDirection: "column",
								...elevationShadowStyle(Sizes.s10),
								flex: 1 / columnCount,
								...styleItem,
							}}
						>
							<Image
								style={{
									width: Sizes.s100,
									height: Sizes.s100,
									resizeMode: "contain",
									marginBottom: Sizes.s30,
								}}
								source={items[cur].icon}
							></Image>
							<Text
								// numberOfLines={2}
								style={{
									...themes.titleNormal,
									height: Sizes.s80,
									fontWeight: "bold",
									textAlign: "center",
									// backgroundColor:"#ff3343",
									textAlignVertical: "top",
								}}
							>
								{items[cur].title}
							</Text>
							{/* {items[cur].ban === true && (
								<View
									style={{
										position: "absolute",
										top: 0,
										bottom: 0,
										left: 0,
										right: 0,
										backgroundColor: "#00000040",
										borderRadius: Sizes.s50,
										justifyContent: "center",
										alignItems: "center",
										// opacity: 0.4,
									}}
								>
									<Icon
										name="ban"
										size={Sizes.s100}
										color={themes.colors.grey3}
									></Icon>
								</View>
							)} */}
						</TouchableOpacity>
					);
				}
				 else {
				  columns.push(
				    <View
				      style={{
				        // marginHorizontal: Sizes.s80,
						// marginVertical: Sizes.s20,
						
						marginHorizontal: Sizes.s25,
				        backgroundColor: 'transparent',
				        flex: 1 / columnCount,
				      }}></View>,
				  );
				}
			}
			rows.push(
				<View
					key={curRow}
					style={{
						width: "100%",
						flexDirection: "row",
						paddingTop: Sizes.s50,
						// backgroundColor:"#ff3343",
					}}
				>
					{columns}
				</View>
			);
		}

		return (
			<View
				style={{
					// backgroundColor: '#f44333',
					justifyContent: "center",
					flexDirection: "column",
					flex: 1,
					alignItems: "center",
					...style,
				}}
			>
				{/* <ScrollView
          style={styleScrollView}
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}> */}
				{rows}
				{/* </ScrollView> */}
			</View>
		);
	}
}
GridView.defaultProps = {
	onScroll: () => {},
	onClickItem: () => {},
	items: [],
	columnCount: 1,
	style: {
		// flex: 1,
		// width: '100%',
	},
	styleRow: {},
	styleItem: {},
	styleInput: {
		marginHorizontal: Sizes.s10,
		fontWeight: "bold",
		color: themes.colors.grey,
		textAlign: "center",
	},
};
const styles = StyleSheet.create({
	style: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: themes.colors.grey,
		paddingVertical: Sizes.s5,
		paddingHorizontal: Sizes.s10,
	},
	styleInput: {
		color: themes.colors.grey,
		fontWeight: "bold",
	},
});
