import React from "react";
import {
	StyleSheet,
	TextInput,
	View,
	Text,
	Button,
	TouchableOpacity,
	Alert,
} from "react-native";

// img assets
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export function Form(props) {
	return (
		<View style={styles.passwordContainer}>
			<FontAwesomeIcon style={styles.inputStyle} icon={props.icon} />
			<TextInput style={styles.inputStyle} {...props} />
		</View>
	);
}

export function LinkText(props) {
	return (
		<Text style={styles.linkText} {...props}>
			{props.value}
		</Text>
	);
}

export function ErrorText(props) {
	return (
		<Text style={styles.errorText} {...props}>
			{props.value}
		</Text>
	);
}

export function PrimaryButton(props) {
	return (
		<TouchableOpacity style={styles.buttonStyle} {...props}>
			<Text style={{ color: "white" }}>{props.title}</Text>
		</TouchableOpacity>
	);
}

export function SecondaryButton(props) {
	return (
		<TouchableOpacity style={styles.secondaryButtonStyle} {...props}>
			<Text>{props.title}</Text>
		</TouchableOpacity>
	);
}

export function HR() {
	return (
		<View
			style={{
				alignItems: "center",
				borderBottomColor: "lightgrey",
				borderBottomWidth: 1,
				marginVertical: 20,
			}}
		/>
	);
}
export function HRFeature() {
	return (
		<View
			style={{
				alignItems: "center",
				borderBottomColor: "#d93c64",
				borderBottomWidth: 1,
				marginVertical: 20,
			}}
		/>
	);
}

export function SimpleAlert(title, msg) {
	title == true ? (title = "Success") : (title = "Error");
	console.log(title);
	Alert.alert(
		title,
		msg,
		[
			{
				text: "Cancel",
				style: "cancel",
			},
			{ text: "OK" },
		],
		{ cancelable: false }
	);
}

const styles = StyleSheet.create({
	form: {},
	passwordContainer: {
		flexDirection: "row",
		paddingBottom: 10,
		borderWidth: 1,
		marginVertical: 5,
		padding: 5,
		paddingLeft: 15,
		borderRadius: 20,
		borderColor: "lightgrey",
		alignItems: "center",
	},
	inputStyle: {
		color: "grey",
		flex: 1,
		paddingLeft: 10,
	},
	linkText: {
		color: "#d93c64",
	},
	errorText: {
		color: "red",
	},
	buttonStyle: {
		alignItems: "center",
		backgroundColor: "#d93c64",
		padding: 10,
		borderRadius: 10,
	},

	secondaryButtonStyle: {
		alignItems: "center",
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
	},
});
