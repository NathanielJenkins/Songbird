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
	const carouselItems = [
		{
			title: "Item 1",
			image: card1,
			text: "akjshskj kskjdhfk skjdfhls kjd ls",
		},
		{
			title: "Item 2",
			image: card2,
			text: "akjshskj kskjdhfk skjdfhls kjd ls",
		},
		{
			title: "Item 3",
			image: card3,
			text: "akjshskj kskjdhfk skjdfhls kjd ls",
		},
	];
	return (
		<ScrollView>
			<View style={styles.container}>
				<Image source={headerscreen} style={styles.headerscreen} />
				<View style={styles.searchButtonContainer}>
					<WideButton icon="search" title="Search" />
				</View>
			</View>
			<View style={{ paddingHorizontal: 30, paddingTop: 20 }}>
				<SubtitleText text="Popular" />
				<View style={{ marginTop: 10 }}>
					<CardCarousel image={headerscreen} carouselItems={carouselItems} />
				</View>
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

	searchButtonContainer: {
		top: 50,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		zIndex: 1,
		width: "100%",
		justifyContent: "center",
	},

	contentD: {
		marginHorizontal: 10,
	},

	titleText: {
		fontWeight: "500",
		fontSize: 20,
	},
	cardStyle: {
		borderRadius: 100,
		backgroundColor: "blue",
	},
});
