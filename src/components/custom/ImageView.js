import React, { Component } from "react";
import {
	View,
	TouchableOpacity,
	Image,
	FlatList,
	PermissionsAndroid,
	Alert,
	Platform,
	Text,
} from "react-native";
import images from "../../res/images";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Sizes } from "@dungdang/react-native-basic";
import { Dimensions } from "react-native";
import themes from "../../res/themes";
import {
	objectIsNull,
	arrayIsEmpty,
	stringIsEmpty,
} from "@dungdang/react-native-basic/src/Functions";
import { theme } from "@dungdang/react-native-full";
import ImageSlide from "./ImageSlide";
const screenWidth = Math.round(Dimensions.get("window").width);
const numOfRow = 4;

class ImagePicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listImage: !objectIsNull(this.props.items)
				? [...this.props.items]
				: [],
			index: 0,
			isShow: false,
		};
		this.imageSlide = React.createRef();
	}
	componentDidUpdate(prevProps) {
		// console.log("ffffff11111", this.props.items);
		if (
			this.props.items !== prevProps.items &&
			!arrayIsEmpty(this.props.items)
		) {
			// console.log("ffffff22222", this.props.items);
			this.state = {
				listImage: !objectIsNull(this.props.items)
					? [...this.props.items]
					: [],
			};
		}
	}

	getValues() {
		return this.state.listImage;
	}
	render() {
		let _listImage = this.state.listImage.filter((item, index) => {
			if (
				this.state.isShow === false &&
				objectIsNull(this.props.isWrite)
			) {
				if (index < 4) return item;
			} else {
				return item;
			}
		});

		const rows = [];
		const columnCount = 4;
		const countRow = Math.floor(_listImage.length / columnCount) + 1;
		for (let iRow = 0; iRow < countRow; iRow++) {
			const curRow = iRow;
			const columns = [];
			for (
				var iColumn = 0 + curRow * columnCount;
				iColumn < columnCount + curRow * columnCount &&
				iColumn < countRow * columnCount;
				iColumn++
			) {
				const cur = iColumn;
				const item = _listImage[iColumn];
				if (iColumn < _listImage.length) {
					columns.push(
						<TouchableOpacity
							onPress={() => {
								let list = [];
								let tmp = 1;
								for (const item of this.state.listImage) {
									if (tmp < this.state.listImage.length) {
										list.push({
											label: "",
											url: !stringIsEmpty(item.FileURL)
												? item.FileURL
												: !objectIsNull(item.node) &&
												  !objectIsNull(item.node.image)
												? item.node.image.uri
												: "",
										});
									}
									++tmp;
								}

				// console.log("dddd",list)
								this.imageSlide.current.open(cur, list);
							}}
							// key={item.FileName}
							style={{
								width:
									(screenWidth -
										themes.paddingHoz * (2) -
										Sizes.s5 * (numOfRow * 2)) /
									numOfRow,
								// aspectRatio: 1,
								height:
									(screenWidth -
										themes.paddingHoz * (numOfRow - 1) -
										Sizes.s5 * (numOfRow * 2)) /
									numOfRow,
								marginHorizontal: Sizes.s5,
								marginVertical: Sizes.s5,
								justifyContent: "center",
								borderColor: themes.colors.grey,
								borderWidth: !item.plusImage ? 0 : Sizes.s2,
								borderRadius: Sizes.s15,
								// backgroundColor: "#ff3333",
							}}
						>
							<Image
								defaultSource={require("../../res/images/ic_no_image.png")}
								style={{
									width: "100%",
									height: "100%",
									borderRadius: Sizes.s20,
								}}
								source={{ uri: item.FileURL }}
							/>
						</TouchableOpacity>
					);
				}
			}
			rows.push(
				<View
					key={curRow}
					style={{
						width: "100%",
						flexDirection: "row",
						// paddingTop: Sizes.s20,
						// backgroundColor:"#ff3343",
					}}
				>
					{columns}
				</View>
			);
		}
		return (
			<View
				style={{ ...this.props.style }}
				onLayout={({ nativeEvent }) => {
					if (!objectIsNull(this.props.onLayout)) {
						this.props.onLayout(nativeEvent.layout.height);
					}
				}}
			>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{!objectIsNull(this.props.isTimeLine) && (
						<View
							style={{
								width: Sizes.s25,
								height: Sizes.s25,
								borderRadius: Sizes.s25,
								backgroundColor: "#f2645d",
								marginRight: Sizes.s30,
								alignSelf: "flex-start",
							}}
						></View>
					)}
					<Text
						style={{
							...themes.titleBig,
							color: themes.colors.black,
							flex: 1,
							...this.props.styleTitle,
						}}
					>
						{this.props.title}
					</Text>
					{objectIsNull(this.props.isWrite) &&
						!arrayIsEmpty(this.state.listImage) &&
						this.state.listImage.length > 4 && (
							<TouchableOpacity
								onPress={() => {
									this.setState({
										isShow: !this.state.isShow,
									});
								}}
							>
								<Text
									style={{
										...themes.titleNormal,
										color: themes.colors.blue,
									}}
								>
									{this.state.isShow === true
										? "Thu gọn"
										: "Tất cả ảnh"}
								</Text>
							</TouchableOpacity>
						)}
				</View>
				{rows}
				{/* <FlatList
					style={{ flex: 1, marginTop: Sizes.s10 }}
					data={_listImage}
					renderItem={({ item, index }) => {
						console.log("dd_listImagedd", item);
						<TouchableOpacity
							onPress={() => {
								let list = [];
								let tmp = 1;
								for (const item of _listImage) {
									if (tmp < _listImage.length) {
										list.push({
											label: "",
											url: !stringIsEmpty(item.FileURL)
												? item.FileURL
												: !objectIsNull(item.node) &&
												  !objectIsNull(item.node.image)
												? item.node.image.uri
												: "",
										});
									}
									++tmp;
								}
								this.imageSlide.current.open(index, list);
							}}
							// key={item.FileName}
							style={{
								width:
									(screenWidth -
										themes.paddingHoz * (numOfRow - 1) -
										Sizes.s5 * (numOfRow * 2)) /
									numOfRow,
								// aspectRatio: 1,
								height:
									(screenWidth -
										themes.paddingHoz * (numOfRow - 1) -
										Sizes.s5 * (numOfRow * 2)) /
									numOfRow,
								marginHorizontal: Sizes.s5,
								marginVertical: Sizes.s5,
								justifyContent: "center",
								borderColor: themes.colors.grey,
								borderWidth: !item.plusImage ? 0 : Sizes.s2,
								borderRadius: Sizes.s15,
								backgroundColor: "#ff3333",
							}}
						>
							<Image
								defaultSource={require("../../res/images/ic_no_image.png")}
								style={{
									width: "100%",
									height: "100%",
									borderRadius: Sizes.s20,
								}}
								source={{ uri: item.FileURL }}
							/>
						</TouchableOpacity>;
					}}
					numColumns={numOfRow}
					keyExtractor={(item, index) => index.toString()}
				/> */}
				<ImageSlide ref={this.imageSlide} />
			</View>
		);
	}
}

ImagePicker.defaultProps = {
	maximumImage: 10,
};

export default ImagePicker;
