import React from "react";
import { AsyncStorage } from "react-native";

const axios = require("axios");
import { API } from "../../env";
console.log("api", API);

const ax = axios.create({
	baseURL: API,
	timeout: 1000,
});

function setConfig(token) {
	return { headers: { Authorization: `Bearer ${token}` } };
}

export async function register(user) {
	return ax
		.post("/register", user)
		.then((response) => {
			return {
				success: true,
				message: "Please verify your email before logging in",
			};
		})
		.catch((error) => {
			//To do all error handling
			return {
				success: false,
				message: "Error, could not sign up.",
			};
		});
}

export async function login(user) {
	return ax
		.post("/login", user)
		.then((response) => {
			return {
				success: true,
				token: response.data.token,
				user: response.data,
			};
		})
		.catch((error) => {
			console.log(error);
			//To do all error handling
			return {
				success: false,
				message: "Could not login",
			};
		});
}

export async function updateUser(user) {
	console.log(setConfig(await AsyncStorage.getItem("userToken")));
	return ax.patch(
		"/update_user",
		user,
		setConfig(await AsyncStorage.getItem("userToken"))
	);
}

export async function upload(image) {
	const form = new FormData();
	form.append("fileData", {
		uri:
			Platform.OS === "android" ? image.uri : image.uri.replace("file://", ""),
		type: "image/jpeg",
		name: "header",
	});

	return ax
		.post("/upload", form, setConfig(await AsyncStorage.getItem("userToken")))
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return {
				success: false,
				message: "Unable to generate upload image",
			};
		});
}

export async function generateDefaultProfile() {
	return ax
		.post(
			"/generate_default_profile",
			{},
			setConfig(await AsyncStorage.getItem("userToken"))
		)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return {
				success: false,
				message: "Unable to generate default profile",
			};
		});
}

export async function getProfile() {
	return ax
		.get("/get_profile", setConfig(await AsyncStorage.getItem("userToken")))
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return {
				success: false,
				message: "Unable to get profile",
			};
		});
}

export async function updateProfile(profile) {
	return ax
		.post(
			"/update_profile",
			profile,
			setConfig(await AsyncStorage.getItem("userToken"))
		)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return {
				success: false,
				message: "Unable to update profile",
			};
		});
}
