import React from "react";
import {
	StyleSheet,
	TextInput,
	View,
	Text,
	Button,
	TouchableOpacity,
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

export function PrimaryButton(props) {
	return (
		<TouchableOpacity style={styles.buttonStyle} {...props}>
			<Text style={{ color: "white" }}>{props.title}</Text>
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
		color: "crimson",
	},
	buttonStyle: {
		alignItems: "center",
		backgroundColor: "crimson",
		padding: 10,
		borderRadius: 10,
	},
});
