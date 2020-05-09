import React from "react";
import { AuthContext } from "../context/context";
import {
	StyleSheet,
	Image,
	Text,
	View,
	TouchableHighlight,
	Button,
} from "react-native";
import { Card } from "react-native-elements";

import { Form, LinkText, PrimaryButton, HR } from "../components/Form";
//assets
import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";

export default function SignInScreen({ navigation }) {
	const [firstname, setFirstname] = React.useState("");
	const [lastname, setLastname] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const { signUp } = React.useContext(AuthContext);

	return (
		<View style={styles.container}>
			<Card>
				<Form
					placeholder="Firstname"
					value={email}
					onChangeText={setEmail}
					icon={faUser}
				/>
				<Form
					placeholder="Lastname"
					value={email}
					onChangeText={setEmail}
					icon={faUser}
				/>
				<Form
					placeholder="Email"
					value={email}
					onChangeText={setEmail}
					icon={faEnvelope}
				/>
				<Form
					placeholder="Password"
					value={password}
					onChangeText={setPassword}
					icon={faKey}
					secureTextEntry
				/>
				<Form
					placeholder="Confirm Password"
					value={password}
					onChangeText={setPassword}
					icon={faKey}
					secureTextEntry
				/>
				<HR />
				<PrimaryButton
					title="Sign Up"
					onPress={() => signUp({ email, firstname, lastname, password })}
				/>
			</Card>
			<TouchableHighlight
				onPress={() => navigation.navigate("SignIn")}
				style={styles.textContainer}
			>
				<View style={styles.textContainer}>
					<Text>Already have an Account?</Text>
					<LinkText value="Sign In" />
				</View>
			</TouchableHighlight>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	textContainer: {
		marginTop: 30,
		flex: 1,
		alignItems: "center",
	},
});
