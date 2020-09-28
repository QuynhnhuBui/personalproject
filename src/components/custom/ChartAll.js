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
import themes from "../../res/themes";
import { Sizes } from "@dungdang/react-native-basic";
import { theme } from "@dungdang/react-native-full";

const aspectRatio =
	Dimensions.get("window").height / Dimensions.get("window").width;

export default class ChartView extends Component {
	render() {
		const { titleInput, valueComplete, valueInComplete } = this.props;
		// console.log("11111",this.props.percentIncomplete)
		return (
			<View
				style={{
					// flex: 1,
					alignItems: "center",
					width: "100%",
					flexDirection: "row",
					justifyContent: "center",
					marginVertical: themes.paddingVer,
				}}
			>
				<AnimatedCircularProgress
					// style={{ backgroundColor: "#ff3333" }}
					size={Sizes.s200 * 1.5}
					// width={Sizes.s200}
					rotation
					width={Sizes.s30}
					fill={this.props.percentIncomplete}
					tintColor="#26AE4A"
					backgroundColor="#144DB6"
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
									fontSize: Sizes.s30 * 2,
									fontWeight: "bold",
									// color: "#26AE4A",
								}}
							>
								{this.props.numbersObject}
							</Text>
							<Text style={{ fontSize: Sizes.s30 }}>
								{!stringIsEmpty(titleInput)
									? titleInput
									: "ĐÚNG HẠN"}
							</Text>
						</View>
					)}
				</AnimatedCircularProgress>

				<View
					style={{
						// flex: 1,
						// backgroundColor: "#ff3ff3",
						marginTop: Sizes.s10,
                        marginBottom: Sizes.s10,
                        marginLeft:Sizes.s50,
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<View
						style={{
							flex: 1,

							// backgroundColor: "#444444",
							alignItems: "center",
                            justifyContent: "center",
							flexDirection: "column",
						}}
					>
						<Text style={{ ...themes.titleNormal }}>
							{this.props.textInComplete}
						</Text>
						<Text
							style={{
								fontSize: Sizes.h40,
								fontWeight: "bold",
								color: "#26AE4A",
								// backgroundColor: "#ff3ff3",
							}}
						>
							{valueInComplete}
						</Text>
					</View>
					<View
						style={{
							flex: 1,
							alignItems: "center",
                            justifyContent: "center",
							flexDirection: "column",
						}}
					>
						<Text style={{ ...themes.titleNormal }}>
							{this.props.textComplete}
						</Text>
						<Text
							style={{
								fontSize: Sizes.h40,
								fontWeight: "bold",
								color: "#144DB6",
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
