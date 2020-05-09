import React from "react";
import { AuthContext } from "../context/context";
import {
	StyleSheet,
	Image,
	Button,
	Text,
	TextInput,
	View,
	TouchableHighlight,
} from "react-native";
import { Card } from "react-native-elements";
import { Form, LinkText } from "../components/Form";

//assets
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

export default function SignInScreen({ navigation }) {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const { signIn } = React.useContext(AuthContext);

	return (
		<View style={styles.container}>
			<Card>
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
				<Button
					title="Sign in"
					onPress={() => {
						signIn({ email, password });
					}}
				/>
			</Card>
			<TouchableHighlight
				onPress={() => navigation.navigate("SignUp")}
				style={styles.textContainer}
			>
				<View style={styles.textContainer}>
					<Text>Don't have an Account?</Text>
					<LinkText value="Create an Account" />
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
