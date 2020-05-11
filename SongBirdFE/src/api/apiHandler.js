const axios = require("axios");
import { LOCAL_API } from "../../env";

const ax = axios.create({
	baseURL: process.env.LIVE_API || LOCAL_API,
	timeout: 1000,
});

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
				message: "TO DO ERROR CUSTOM ERROR MESSAGES",
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
			};
		})
		.catch((error) => {
			//To do all error handling
			return {
				success: false,
				message: "TO DO ERROR CUSTOM ERROR MESSAGES",
			};
		});
}
