import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import { HR, PrimaryButton, SecondaryButton } from "../components/Form";
import { useNavigation } from "@react-navigation/native";

import Swiper from "react-native-swiper";

import screen1 from "../assets/images/infoscreen1.png";
import screen2 from "../assets/images/infoscreen2.png";
import screen3 from "../assets/images/infoscreen3.png";

export default function InformationScreen() {
	return (
		<Swiper style={styles.wrapper} loop={false} showsButtons={true}>
			<InformationSection1 />
			<InformationSection2 />
			<InformationSection3 />
		</Swiper>
	);
}

function InformationSection1() {
	return (
		<ImageBackground source={screen1} style={{ width: "100%", height: "100%" }}>
			<TextContainer
				title="Find a band to perform"
				text="Use the venue account to checkout performers near you and book them to
					play"
			/>
		</ImageBackground>
	);
}

function InformationSection2() {
	return (
		<ImageBackground source={screen2} style={{ width: "100%", height: "100%" }}>
			<TextContainer
				title="Find a venue to perform at"
				text="Use the venue account to checkout performers near you and book them to
					play"
			/>
		</ImageBackground>
	);
}

function InformationSection3() {
	return (
		<ImageBackground source={screen3} style={{ width: "100%", height: "100%" }}>
			<TextContainer
				title="Find band members"
				text="Find other musicians to jam with, or to join there band"
				button={true}
			/>
		</ImageBackground>
	);
}

function TextContainer(props) {
	const navigation = useNavigation();

	return (
		<View style={styles.textContainer}>
			<Text style={styles.title}>{props.title}</Text>
			<HR />
			<Text style={{ marginBottom: 20 }}> {props.text}</Text>
			{props.button && (
				<PrimaryButton
					title="Sign Me Up"
					onPress={() => navigation.navigate("SignUp")}
				></PrimaryButton>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {},
	slide1: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	slide2: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	slide3: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	textContainer: {
		width: "100%",
		height: 200,
		justifyContent: "center",
		paddingHorizontal: 20,
		position: "absolute", //Here is the trick
		bottom: 30, //Here is the trick
		marginBottom: 20,
	},
	title: {
		fontSize: 30,
	},
});
