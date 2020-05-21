import React from "react";
import { Text, StyleSheet } from "react-native";

export function TitleText(props) {
	return (
		<Text {...props} style={styles.titleText}>
			{props.text}
		</Text>
	);
}

const styles = StyleSheet.create({
	titleText: {
		fontSize: 30,
		// textDecorationLine: "underline",
	},
});
