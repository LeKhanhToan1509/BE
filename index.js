const express = require("express");
const app = express();
const Route = require("./routes/client/index.route");
require("dotenv").config();
const port = process.env.PORT;

Route(app);
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
