import React, { useState, useEffect, useContext, s } from "react";
import { Button, Text, View, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { upload, updateProfile } from "../api/apiHandler";
import { ScrollView } from "react-native-gesture-handler";
import { SimpleAlert, SquareForm, RoundButton } from "../components/Form";
import { ProfileContext } from "../context/context";
import Spinner from "react-native-loading-spinner-overlay";

export default function EditProfile({ navigation }) {
	const [profile, setProfile] = useContext(ProfileContext);
	const [localProfile, setLocalProfile] = useState(profile);
	const [editedImage, setEditedImage] = useState(false);
	const [editedText, setEditedText] = useState(false);
	const [spinner, setSpinner] = useState(false);

	const handleChoosePhoto = async () => {
		const image = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			quality: 1,
		});
		if (!image.cancelled) {
			const profile_copy = { ...profile };
			profile_copy.header_screen = image.uri;
			setLocalProfile(profile_copy);
			setEditedImage(image);
		}
	};

	return (
		<>
			<ScrollView>
				<Spinner visible={spinner} textContent={"Loading..."} />
				<View style={styles.container}>
					<Image
						source={{ uri: localProfile.header_screen }}
						style={styles.headerscreen}
					/>
				</View>
				<Text style={styles.editImageText} onPress={handleChoosePhoto}>
					Edit Image
				</Text>
				<View style={styles.textContainer}>
					<Text>Group Name</Text>
					<SquareForm
						defaultValue={localProfile.group_name}
						onChange={(resp) => {
							const text = resp.nativeEvent.text;
							const profile_copy = { ...profile };
							profile_copy.group_name = text;
							setLocalProfile(profile_copy);
							setEditedText(true);
						}}
					/>
					<Text>Description</Text>
					<SquareForm
						defaultValue={localProfile.description}
						onChange={(resp) => {
							console.log(resp);
							const text = resp.nativeEvent.text;
							const profile_copy = { ...profile };
							profile_copy.description = text;
							setLocalProfile(profile_copy);
							setEditedText(true);
						}}
					/>
				</View>
			</ScrollView>
			<View style={styles.floating}>
				<RoundButton
					title="Save Changes"
					onPress={() => {
						const promise1 = new Promise((resolve, reject) => {
							if (!editedText) {
								resolve(true);
								return;
							}

							//set the context
							setProfile(localProfile);
							updateProfile(localProfile).then((resp) => {
								if (!resp.success) resolve(false);
								resolve(true);
							});
						});

						const promise2 = new Promise((resolve, reject) => {
							if (!editedImage) {
								console.log("fuckkk");
								resolve(true);
								return;
							}
							setProfile(localProfile);
							upload(editedImage).then((resp) => {
								//set the state or throw alert
								if (!resp.success) resolve(false);

								resolve(true);
							});
							resolve(true);
						});

						//throw up an alert if all where success or failed
						Promise.all([promise1, promise2]).then((successArray) => {
							if (successArray.every((v) => v === true))
								SimpleAlert(true, "Successfully updated profile");
							else SimpleAlert(false, "Could not update profile");
						});
					}}
				/>
			</View>
		</>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 0.5,
		justifyContent: "center",
		alignItems: "center",
	},
	textContainer: {
		flex: 1,
		padding: 10,
	},
	headerscreen: {
		flex: 1,
		resizeMode: "cover",
		width: "100%",
		height: 300,
		borderBottomLeftRadius: 25,
		borderBottomRightRadius: 25,
	},
	editImageText: {
		color: "grey",
		textAlign: "center",
		textDecorationLine: "underline",
	},
	floating: {
		position: "absolute",
		right: 0,
		left: 0,
		bottom: 20,
		marginHorizontal: 100,
	},
});
