import React from "react";
import { AuthContext } from "../context/context";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
	const { signOut } = React.useContext(AuthContext);

	return (
		<View>
			<Text>Signed in!</Text>
			<Button title="Sign out" onPress={signOut} />
		</View>
	);
}
