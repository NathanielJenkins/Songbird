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
				<TextInput placeholder="Email" value={email} onChangeText={setEmail} />
				<TextInput
					placeholder="Password"
					value={password}
					onChangeText={setPassword}
					secureTextEntry
				/>
				<Button
					title="Sign in"
					onPress={() => signIn({ username, password })}
				/>
			</Card>
			<Button title="Sign up" onPress={() => navigation.navigate("SignUp")} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
