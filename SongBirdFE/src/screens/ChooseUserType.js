import React from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Image,
	ScrollView,
	SafeAreaView,
} from "react-native";
import { ImageCard } from "../components/Card";
import { TitleText } from "../components/Text";
import { AuthContext } from "../context/context";
import { Card, Title, Paragraph } from "react-native-paper";

export default function ChooseUserType({ navigation }) {
	const { setAccountVenue } = React.useContext(AuthContext);

	return (
		<SafeAreaView style={styles.container}>
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
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
