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

import {
	Form,
	LinkText,
	ErrorText,
	PrimaryButton,
	HR,
} from "../components/Form";

//assets
import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { authSchemas, validate } from "../validation/validation";

export default function SignInScreen({ navigation }) {
	const [firstname, setFirstname] = React.useState("");
	const [lastname, setLastname] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [repeat_password, setRepeatPassword] = React.useState("");
	const [error, setError] = React.useState("");

	const { signUp } = React.useContext(AuthContext);

	//call backs for error handling (maybe cleaner way>? )
	React.useEffect(() => {
		const result = validate(authSchemas.firstname, firstname);
		result.error ? setError("Please set valid firstname") : setError("");
	}, [firstname]);

	React.useEffect(() => {
		const result = validate(authSchemas.lastname, lastname);
		result.error ? setError("Please set valid lastname") : setError("");
	}, [lastname]);

	React.useEffect(() => {
		const result = validate(authSchemas.email, email);
		result.error ? setError("Please set valid email") : setError("");
	}, [email]);

	React.useEffect(() => {
		const result = validate(authSchemas.password, password);
		result.error ? setError("Please set valid email") : setError("");
	}, [password]);

	React.useEffect(() => {
		const result = validate(authSchemas.password_schema, {
			password,
			repeat_password,
		});
		console.log(password, repeat_password);
		console.log("error", result.error);
		result.error ? setError("Passwords do not match") : setError("");
	}, [repeat_password]);
	return (
		<View style={styles.container}>
			<Card>
				<Form
					placeholder="Firstname"
					value={firstname}
					onChangeText={setFirstname}
					icon={faUser}
				/>
				<Form
					placeholder="Lastname"
					value={lastname}
					onChangeText={setLastname}
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
					value={repeat_password}
					onChangeText={setRepeatPassword}
					icon={faKey}
					// secureTextEntry
				/>
				<HR />
				<PrimaryButton
					title="Sign Up"
					onPress={() => {
						signUp({ email, firstname, lastname, password });
					}}
				/>
			</Card>

			{error ? (
				<View style={styles.errorTextContainer}>
					<ErrorText value="Error: "></ErrorText>
					<Text>{error}</Text>
				</View>
			) : (
				<></>
			)}

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
	errorTextContainer: {
		marginTop: 10,
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
	},
});
