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

export function test() {
	ax.post("/")
		.then((response) => {
			console.log(response.data);
		})
		.catch(function (error) {
			// handle error
			console.log("err", error);
		})
		.then(function () {
			// always executed
		});
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
		name: "avatar",
	});

	console.log(form);
	return ax
		.post("/upload", form, setConfig(await AsyncStorage.getItem("userToken")))
		.then((response) => {
			return {
				success: true,
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
