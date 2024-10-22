const express = require("express");
const usersRouter = require("./Routes/usersRouter");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", usersRouter);

app.listen(3004);
