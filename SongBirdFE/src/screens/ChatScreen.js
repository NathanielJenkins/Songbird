import React from "react";
import { AuthContext } from "../context/context";
import { Button, Text, View, StyleSheet } from "react-native";

export default function ChatScreen() {
	const { signOut } = React.useContext(AuthContext);

	return (
		<View style={styles.container}>
			<Text>Chat Screen</Text>
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
