import React from "react";
import { Text, StyleSheet } from "react-native";

export function TitleText(props) {
	return <Text style={styles.titleText}>{props.text}</Text>;
}

const styles = StyleSheet.create({
	titleText: {
		fontSize: 20,
		// textDecorationLine: "underline",
	},
});
