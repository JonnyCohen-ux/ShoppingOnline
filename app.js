const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

const PORT = process.env.PORT || 3000;

const userRoutes = require("../shopping-online/back-end/routes/users");
const productsRoutes = require("../shopping-online/back-end/routes/products");
const cartRoutes = require("../shopping-online/back-end/routes/cart");

app.use(
  "/images",
  express.static(path.resolve("../shopping-online/back-end/images"))
);
app.use(
  cors({
    origin: ["http://localhost:4200"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/users", userRoutes);
app.use("/products", productsRoutes);
app.use("/cart", cartRoutes);

app.use("/", express.static(path.resolve("./dist/shopping-online")));

app.get("*", (request, response) => {
  response.sendFile(path.resolve("dist/shopping-online/index.html"));
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
