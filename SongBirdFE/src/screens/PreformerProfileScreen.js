import React, { useState } from "react";
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
import * as ImagePicker from "expo-image-picker";

import { upload } from "../api/apiHandler";

import headerscreen from "../assets/images/venueheader.jpg";

export default function PerformerProfileScreen() {
	const [headerImage, setHeaderImage] = useState(null);

	const handleChoosePhoto = async () => {
		let image = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			quality: 1,
		});

		if (!image.cancelled) {
			//set the state
			setHeaderImage(image.uri);

			//upload the image to the image server and db link
			upload(image);
		}
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				{headerImage && (
					<Image source={{ uri: headerImage }} style={styles.headerscreen} />
				)}
				<Button title="Choose Photo" onPress={handleChoosePhoto}></Button>
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
