// Membuat Server Dengan Express
const express = require("express");
const app = express();
const port = 9001;
// Menggunakan ejs

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("stylesheet"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/add-category", (req, res) => {
  res.render("addCategory");
});

app.get("/add-food", (req, res) => {
  res.render("addFood");
});

app.use(function (req, res, next) {
  res.status(404);
  res.send("404");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
