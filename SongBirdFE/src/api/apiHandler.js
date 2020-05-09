const axios = require("axios");
import { LOCAL_API } from "../../env";

console.log(LOCAL_API);
const ax = axios.create({
	baseURL: process.env.LIVE_API || LOCAL_API,
	timeout: 1000,
});

export function test() {
	ax.get("/")
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
