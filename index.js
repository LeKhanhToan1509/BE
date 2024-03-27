require("dotenv").config();
const path = require("path");
const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const app = express();

// Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Add middleware for parsing application/json
app.use(bodyParser.json());

app.use(methodOverride("_method"));
app.use(cookieParser());
// Your route requires
const Route = require("./routes/client/index.route");
const RouteAdmin = require("./routes/admin/index.route");

// Database and system configuration
const port = process.env.PORT;
const connect = require("./config/database.js");
const systemConfig = require("./config/system.js");
connect.connection();

// Serving static files
app.use(
    "/tinymce",
    express.static(path.join(__dirname, "node_modules", "tinymce"))
);
Route(app);
RouteAdmin(app);

// View engine setup
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/public`));

app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Starting the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
