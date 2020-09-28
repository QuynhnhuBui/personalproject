import React, { Component } from "react";
import {
	View,
	StyleSheet,
	Text,
	TouchableHighlight,
	Dimensions,
	Modal,
} from "react-native";
import { Sizes } from "@dungdang/react-native-basic";
class ModalNotification extends React.Component {
	render() {
		return (
			<View
				style={
					{
						// position: "absolute",
						// top: 0,
						// bottom: 0,
						// left: 0,
						// right: 0,
						// backgroundColor: "#00000066",
						// justifyContent: "center",
						// alignItems: "center",
						// zIndex: 1,
					}
				}
			>
				{/* <View style={[styles.container]}>
                <View style = {styles.header}>
                    <Text style = {styles.title}>{this.props.title}</Text>
                </View>
                <View style = {styles.body}>
                    <Text style = {styles.message}>{this.props.message}</Text>
                </View>
                    {this.props.type === 'yesno' ? (
                      <View style = {styles.bottom}>
                          <TouchableHighlight style = {styles.leftBtn} onPress = {() => this.props.onNo()} underlayColor = 'transparent'>
                              <Text style = {styles.noTitle}>Không</Text>
                          </TouchableHighlight>
                          <TouchableHighlight style = {styles.rightBtn} onPress = {() => this.props.onYes()} underlayColor = 'transparent'>
                              <Text style = {styles.yesTitle}>Có</Text>
                          </TouchableHighlight>
                      </View>
                      ):(
                      <View style = {styles.bottom}>
                        <TouchableHighlight style = {styles.centerBtn} onPress = {() => this.props.onOk()} underlayColor = 'transparent'>
                            <Text style = {styles.okTitle}>Xác Nhận</Text>
                        </TouchableHighlight>
                      </View>
                      )}
            </View> */}
            {/* ThienVh4 */}
				<Modal
					animationType={"none"}
					transparent={true}
					hardwareAccelerated={true}
					presentationStyle={"fullScreen"}
					visible={this.props.isVisible}
				>
					<View
						style={{
							flex: 1,
							backgroundColor: "#00000066",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<View style={[styles.container]}>
							<View style={styles.header}>
								<Text style={styles.title}>
									{this.props.title}
								</Text>
							</View>
							<View style={styles.body}>
								<Text style={styles.message}>
									{this.props.message}
								</Text>
							</View>
							{this.props.type === "yesno" ? (
								<View style={styles.bottom}>
									<TouchableHighlight
										style={styles.leftBtn}
										onPress={() => this.props.onNo()}
										underlayColor="transparent"
									>
										<Text style={styles.noTitle}>
											Không
										</Text>
									</TouchableHighlight>
									<TouchableHighlight
										style={styles.rightBtn}
										onPress={() => this.props.onYes()}
										underlayColor="transparent"
									>
										<Text style={styles.yesTitle}>Có</Text>
									</TouchableHighlight>
								</View>
							) : (
								<View style={styles.bottom}>
									<TouchableHighlight
										style={styles.centerBtn}
										onPress={() => this.props.onOk()}
										underlayColor="transparent"
									>
										<Text style={styles.okTitle}>
											Xác Nhận
										</Text>
									</TouchableHighlight>
								</View>
							)}
						</View>
					</View>
				</Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: Sizes.s340 * 2,
		height: Sizes.s340 * 1,
		backgroundColor: "#f7f7f7",
		borderRadius: Sizes.s10,
		borderWidth: Sizes.s2 / 2,
		borderColor: "grey",
	},
	header: {
		height: Sizes.s120,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		// fontWeight:'bold',
		fontSize: Sizes.s45,
		color: "#3d3d3d",
	},
	body: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
	},
	message: {
		fontSize: Sizes.h28,
		textAlign: "center",
		color: "#292929",
		width: "80%",
	},
	bottom: {
		width: "100%",
		height: Sizes.s100,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
	},
	leftBtn: {
		width: "40%",
		height: "80%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: Sizes.s100,
		backgroundColor: "#ededed",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: Sizes.s5,
		},
		shadowOpacity: Sizes.s1,
		shadowRadius: Sizes.s10,

		elevation: Sizes.s2,
		marginBottom: Sizes.s20,
	},
	rightBtn: {
		width: "40%",
		height: "80%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: Sizes.s100,
		backgroundColor: "#FD6E05",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: Sizes.s5,
		},
		shadowOpacity: Sizes.s1,
		shadowRadius: Sizes.s10,

		elevation: Sizes.s5,
		marginBottom: Sizes.s20,
	},
	centerBtn: {
		justifyContent: "center",
		alignItems: "center",
		borderWidth: Sizes.s5,
		borderRadius: Sizes.s100,
		borderColor: "#FD6E05",
		backgroundColor: "#FD6E05",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: Sizes.s5,
		},
		shadowOpacity: Sizes.s1,
		shadowRadius: Sizes.s10,

		elevation: Sizes.s10,
		marginBottom: Sizes.s20,
	},
	yesTitle: {
		fontSize: Sizes.h36,
		color: "white",
	},
	noTitle: {
		fontSize: Sizes.h36,
		color: "#636363",
	},
	okTitle: {
		// fontWeight:'bold',
		fontSize: Sizes.h36,
		// color: '#00b9e3',
		color: "white",
		marginHorizontal: Sizes.s40,
		marginVertical: Sizes.s10,
	},
});

export default ModalNotification;
