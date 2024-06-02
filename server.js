const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnect");
const errorHandle = require("./errors/ErrorHandler");
const app = express();

const port = process.env.PORT || 5000;

connectDB();
app.use(express.json()); //middleware
app.use("/api/contacts", require("./routes/ContactRoute"));
app.use("/api/users", require("./routes/UserRoute")); // Changed route path
app.use(errorHandle);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
