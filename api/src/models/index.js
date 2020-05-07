const mongoose = require("mongoose");
const User = require("./user");

//handing the node js warning
mongoose.set("useCreateIndex", true);

const connectDb = () => {
	return mongoose.connect(process.env.DATABASE_URL, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	});
};

module.exports.connectDb = connectDb;
module.exports.schemas = { User };
