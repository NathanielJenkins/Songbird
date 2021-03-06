import React from "react";
import { AuthContext } from "../context/context";
import { Button, Text, View, StyleSheet } from "react-native";

export default function HomeScreen() {
	const { signOut } = React.useContext(AuthContext);

	return (
		<View>
			<Text>HomeScreen</Text>
		</View>
	);
}

StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
