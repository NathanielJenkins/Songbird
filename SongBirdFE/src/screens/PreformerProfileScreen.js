import React from "react";
import { AuthContext } from "../context/context";
import {
	Button,
	Text,
	View,
	StyleSheet,
	Image,
	SafeAreaView,
	ScrollView,
} from "react-native";
import { WideButton } from "../components/Form";
import { SubtitleText } from "../components/Text";
import { Card } from "react-native-elements";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import { CardCarousel } from "../components/Card";
import headerscreen from "../assets/images/venueheader.jpg";
import card1 from "../assets/images/card1.jpg";
import card2 from "../assets/images/card2.jpg";
import card3 from "../assets/images/card3.jpg";

export default function VenueExportScreen() {
	const { signOut } = React.useContext(AuthContext);

	return (
		<ScrollView>
			<View style={styles.container}>
				<Image source={headerscreen} style={styles.headerscreen} />
			</View>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 0.5,
		justifyContent: "center",
		alignItems: "center",
	},

	headerscreen: {
		flex: 1,
		resizeMode: "cover",
		width: "100%",
		height: 300,
		borderBottomLeftRadius: 25,
		borderBottomRightRadius: 25,
	},
});
