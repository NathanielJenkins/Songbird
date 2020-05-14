import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ImageCard } from "../components/Card";
import { TitleText } from "../components/Text";
import { AuthContext } from "../context/context";

export default function ChooseUserType({ navigation }) {
	const { setAccountVenue } = React.useContext(AuthContext);

	return (
		<View style={styles.container}>
			<TitleText text="Choose Account Type" />
			<TouchableOpacity
				onPress={() => {
					setAccountVenue({ type: 1 });
				}}
			>
				<ImageCard
					featuredTitle="Venue"
					image={require("../assets/images/venuebanner.jpg")}
					text="I am looking for performers"
				/>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					setAccountVenue({ type: 0 });
				}}
			>
				<ImageCard
					featuredTitle="Band"
					image={require("../assets/images/musicianbanner.jpg")}
					text="I am a performer"
				/>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
