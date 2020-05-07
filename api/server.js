const env = require("dotenv").config();
const express = require("express");
const connectDb = require("./src/models/index").connectDb;

app = express();
app.use(express.json());

//add the routes
app.use("/", require("./app/routes/approutes"));
//connect to the database and run the server

connectDb()
	.then(async () => {
		app.listen(process.env.PORT, () =>
			console.log(`jofi listening on port ${process.env.PORT}!`)
		);
	})
	.catch(() => {
		console.log("could not connect to the database");
	});
