const mongoose = require("mongoose");

const connectToDB = async () => {
	try {
		mongoose.set("strictQuery", false);
		const conn = await mongoose.connect(process.env.MONGODB_HOST_URL);
		console.log(`Database Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(error);
	}
};

module.exports = connectToDB;
