import React from "react";
import { ImageBackground, Text, View, TouchableOpacity } from "react-native";
import { StyleSheet, Dimensions, Image ,Alert} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Sizes } from "@dungdang/react-native-basic";
import Images from "../../res/images";

export default class IconMenu extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		const {title, background, screenNavigate } = this.props
		if ( screenNavigate == "" && title != "" ) {
			return (
				<TouchableOpacity
					style={styles.contentDisable}
					onPress={() => {
							Alert.alert(
								"Thông báo",
								"Chức năng đang được cập nhật!",
								[
									{
										text: "OK",
										onPress: () =>
											console.log(
												"OK Pressed"
											),
									},
								],
								{ cancelable: false }
							);
					}}
					underlayColor="rgb(255, 255, 255)"
				>
						<Image source={background} style={styles.icon} />
						<Text style={styles.text}>{title}</Text>
				</TouchableOpacity>
			);
		} else{
			return (
				<TouchableOpacity
					style={styles.content}
					onPress={() => {
							this.props.navigation.navigate(`${screenNavigate}`);
					}}
					underlayColor="rgb(255, 255, 255)"
				>
						<Image source={background} style={styles.icon} />
						<Text style={styles.text}>{title}</Text>
				</TouchableOpacity>
			);
		}
	}
}

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
	content: {
		width: "33%",
		marginTop: Sizes.s30 ,
		alignItems: "center",
	},
	contentDisable: {
		width: "33%",
		opacity: 0.3,
		marginTop: Sizes.s30 ,
		alignItems: "center",
	},
	touch: {
		marginTop: 5,
	},
	imageStyle: {
		borderRadius: screen.width / 6 / 5,
	},
	icon: {
		width:"100%",
		height: Sizes.s120,
		resizeMode: "contain",
		marginTop: Sizes.s10,
		marginBottom: Sizes.s15,
	},
	text: {
		width: Sizes.s200,
		textAlign: "center",
		color: "black",
		fontFamily: 'Roboto',
		fontSize: Sizes.h30,
	},
});
