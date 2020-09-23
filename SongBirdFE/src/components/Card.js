import React, { Component } from "react";
import {
	Image,
	Text,
	View,
	StyleSheet,
	SafeAreaView,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import Ripple from "react-native-material-ripple";

import Carousel, { Pagination } from "react-native-snap-carousel";

export function ImageCard(props) {
	return (
		<View>
			{/* <Card imageStyle={styles.cardImage} image={props.image}>
				<Text style={styles.text}>{props.text}</Text>
			</Card> */}
		</View>
	);
}

export class CardCarousel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carouselItems: props.carouselItems,
		};
	}

	_renderItem({ item, index }) {
		return (
			<Ripple rippleContainerBorderRadius={15}>
				<Card style={styles.cardStyle}>
					<Card.Cover
						style={styles.cardImageRounded}
						source={item.image}
					></Card.Cover>

					<Card.Content style={styles.cardContent}>
						<Title style={styles.titleText}>{item.title}</Title>
						<Paragraph>{item.text}</Paragraph>
					</Card.Content>
				</Card>
			</Ripple>
		);
	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Carousel
					data={this.state.carouselItems}
					sliderWidth={Math.round(Dimensions.get("window").width)}
					sliderHeight={200}
					itemWidth={300}
					renderItem={this._renderItem}
					layout={"default"}
				/>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	cardImage: { width: 300, height: 200, backgroundColor: "rgba(255,0,0,0.3)" },
	text: { textAlign: "center" },
	titleText: {
		fontWeight: "500",
		fontSize: 20,
	},

	cardImageRounded: {
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
	},

	cardStyle: {
		borderRadius: 15,
		elevation: 0,
	},

	cardContent: {
		backgroundColor: "white",
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
	},
});
