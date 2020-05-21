import React from "react";
import { Text, View, ImageBackground, StyleSheet } from "react-native";
import { HR, SecondaryButton } from "../components/Form";
import pianobg from "../assets/images/pianoguybg.png";

export default function WelcomeScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<ImageBackground
				source={pianobg}
				style={{ width: "100%", height: "100%" }}
			>
				<View style={styles.textContainer}>
					<Text style={styles.titleText}>
						Welcome to <Text style={styles.bold}>Songbird</Text>
					</Text>
					<HR />
					<Text style={styles.bodyText}>Connect with venues or artists</Text>
					<View style={styles.margin}>
						<SecondaryButton
							title="Let's Begin"
							onPress={() => navigation.navigate("Information")}
						/>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	textContainer: {
		width: "100%",
		height: 200,
		justifyContent: "center",
		paddingHorizontal: 20,
		position: "absolute", //Here is the trick
		bottom: 0, //Here is the trick
	},

	titleText: {
		fontSize: 30,
		color: "white",
	},

	bold: {
		color: "#d93c64",
		fontWeight: "bold",
	},

	bodyText: {
		color: "white",
	},

	margin: {
		marginVertical: 30,
	},
});
