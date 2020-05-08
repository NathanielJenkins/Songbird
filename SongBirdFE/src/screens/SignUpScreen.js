import React from "react";
import { AuthContext } from "../context/context";
import { StyleSheet, Image, Button, Text, TextInput, View } from "react-native";
import { Card } from "react-native-elements";

export default function SignInScreen({ navigation }) {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const { signIn } = React.useContext(AuthContext);

	return (
		<View style={styles.container}>
			<Card>
				<Text>Sign up</Text>
			</Card>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
