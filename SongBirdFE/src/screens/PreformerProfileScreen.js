import React, { useState, useEffect, useContext } from "react";
import { ProfileContext } from "../context/context";
import {
	Button,
	Text,
	View,
	StyleSheet,
	Image,
	SafeAreaView,
	ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import { TitleText } from "../components/Text";

export default function PerformerProfileScreen({ navigation }) {
	const [profile, setProfile] = useContext(ProfileContext);
	return (
		<>
			<ScrollView>
				<View style={styles.container}>
					<Image
						source={{ uri: profile.header_screen }}
						style={styles.headerscreen}
					/>

					<TitleText text={profile.group_name} />
					<Text>{profile.description}</Text>
				</View>
			</ScrollView>
			<View style={styles.editProfile}>
				<Icon
					size={30}
					reverse
					raised
					name="create"
					type="material"
					color="#d93c64"
					onPress={() => navigation.navigate("EditProfile")}
				/>
			</View>
		</>
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

	editProfile: {
		elevation: 5,
		position: "absolute",
		bottom: 10,
		right: 10,
	},
});
