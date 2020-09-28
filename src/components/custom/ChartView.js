import React, { Component } from "react";
import {
	View,
	Text,
	Dimensions,
	TouchableOpacity,
	ScrollView,
	Platform,
	StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/dist/FontAwesome5";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import LinearGradient from "react-native-linear-gradient";
import { stringIsEmpty } from "@dungdang/react-native-basic/src/Functions";
import { Sizes } from '@dungdang/react-native-basic';

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height
const aspectRatio = windowHeight / windowWidth
export default class ChartView extends Component {
	render() {
		const {
			titleInput,
			valueComplete,
			valueInComplete,
			hideHeader,
		} = this.props;
		return (
			<View style={{ flex: 1 }}>
				{hideHeader !== true && (
					<LinearGradient
						colors={["#2E69C6", "#144DB6"]}
						style={styles.linearGradient}
					>
						<Text style={styles.textHeader}>
							{this.props.header}
						</Text>
					</LinearGradient>
				)}
				<Text style={styles.textTime}>
					Cập nhật lúc: 12/06/2020 14:34:58
						</Text>
				<View style={{ margin: 20, alignItems: "center" }}>
					<AnimatedCircularProgress
						size={
							aspectRatio < 1.6
								? windowWidth / 2
								: windowHeight / 4.3
						}
						rotation
						width={hp("3%")}
						fill={this.props.percentIncomplete}
						tintColor="#26AE4A"
						backgroundColor="#C8EBD1"
					>
						{(fill) => (
							<View
								style={{
									flexDirection: "column",
									alignContent: "center",
									alignItems: "center",
								}}
							>
								<Text
									style={{
										fontSize: Sizes.s70,
										fontWeight: "bold",
										color: "#26AE4A",
									}}
								>
									{this.props.numbersObject}
								</Text>
								<Text style={{
									fontSize:
										aspectRatio > 1.6
											? windowWidth / 22
											: windowHeight / 40
								}}>
									{!stringIsEmpty(titleInput)
										? titleInput
										: "ĐÚNG HẠN"}
								</Text>
							</View>
						)}
					</AnimatedCircularProgress>
				</View>
				<View style={styles.infoContainer}>
					<View style={styles.completeContainer}>
						<Text>{this.props.textInComplete}</Text>
						<Text
							style={{
								fontSize: Sizes.s60,
								fontWeight: "bold",
								color: "#144DB6",
							}}
						>
							{valueInComplete}
						</Text>
					</View>

					<View style={styles.incompleteContainer}>
						<Text>{this.props.textComplete}</Text>
						<Text
							style={{
								fontSize: Sizes.s60,
								fontWeight: "bold",
								color: "#26AE4A",
							}}
						>
							{valueComplete}
						</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	infoContainer: {
		flex: 1,
		height: Sizes.h50,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	textHeader: {
		fontSize: Sizes.s40,
		marginLeft: Sizes.s40,
		color: "#fff",
	},
	textTime: {
		fontSize: Sizes.s25,
		marginLeft: Sizes.s20,
		marginTop: Sizes.s20,
		color: "gray",
	},
	completeContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		alignContent: "center"
	},
	incompleteContainer: {
		flex: 1,
		alignItems: "center",
		flexDirection: "column",
	},
	linearGradient: {
		flex: 1,
		height: Sizes.h80,
		width: "100%",
		alignContent: "center",
		justifyContent: "center",
	},
});
