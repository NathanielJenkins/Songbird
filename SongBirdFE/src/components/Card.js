import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { Card } from "react-native-elements";

export function ImageCard(props) {
	return (
		<View>
			<Card imageStyle={styles.cardImage} image={props.image}>
				<Text style={styles.text}>{props.text}</Text>
			</Card>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
	cardImage: { width: 300, height: 200, backgroundColor: "rgba(255,0,0,0.3)" },
	text: { textAlign: "center" },
});
