// Membuat Server Dengan Express
const express = require("express");
const app = express();
const port = 9001;
const bodyParser = require("body-parser");
const mysql = require("mysql");

// Menggunakan ejs
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("stylesheet"));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Connection
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_warteg",
});
// EndConnection

// Connect to mysql
connection.connect();
// End Connect to mysql

// app.get("/", (req, res) => {
//   res.render("index");
// });

app.get("/", (req, res, next) => {
  const sql =
    "SELECT tb_food.*, tb_categori.name AS category_name FROM tb_food INNER JOIN tb_categori ON (tb_food.categori_id = tb_categori.id) ORDER BY tb_food.id ASC";
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    res.render("food", { data: rows });
  });
});

// TbCategory
app.get("/add-category", (req, res) => {
  res.render("addCategory");
});

app.post("/process-add-category", (req, res) => {
  // InsertVers1
  let data = {
    name: req.body.category_name,
  };
  const sql = "INSERT INTO tb_categori SET ?";
  connection.query(sql, data, function (err, rows) {
    if (err) throw err;
    res.redirect("/");
  });
  // EndInsertVersi1

  // Insertversi2
  // let categoryName = req.body.category_name;
  // const sql = "INSERT INTO tb_categori (name) VALUES ('" + categoryName + "')";
  // connection.query(sql, function (err, rows) {
  //   if (err) throw err;
  //   res.redirect("/");
  // });
  // EndInsertversi2
});

app.get("/delete-category", (req, res, next) => {
  const idGet = req.params.id;
  console.log(idGet);
  res.send("This is Prosces Delete Category", idGet);
});
// EndTbCategory
// ===========================================

// TbFood
app.get("/add-food", (req, res) => {
  const sql = "SELECT * FROM tb_categori ORDER BY id ASC";
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    res.render("addFood", { data: rows });
  });
});

app.post("/process-add-food", (req, res) => {
  // InsertVers1
  let data = {
    name: req.body.name,
    stock: req.body.stok,
    image: req.body.image,
    deskripsi: req.body.description,
    categori_id: req.body.categori_id,
  };
  // console.log(data);
  const sql = "INSERT INTO tb_food SET ?";
  connection.query(sql, data, function (err, rows) {
    if (err) throw err;
    res.redirect("/");
  });
  // EndInsertVersi1
});

app.get("/process-delete-food/:id", (req, res) => {
  let idParams = req.params.id;
  // res.send("this is route delete food, id : " + idParams);
  const sql = "DELETE FROM tb_food WHERE id = '" + idParams + "'";
  connection.query(sql, function (err, rows) {
    if (err) throw err;
    res.redirect("/");
  });
});

app.get("/edit-food/:id", (req, res) => {
  let idParams = req.params.id;
  // res.send("this is route delete food, id : " + idParams);
  console.log("Id Params : ", idParams);
  const sql = "SELECT * FROM tb_food WHERE id = '" + idParams + "'";
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    res.render("editFood", { data: rows });
  });
});

app.post("/process-edit-food/:id", (req, res) => {
  // InsertVers1
  let idParams = req.params.id;
  let data = {
    name: req.body.name,
    stock: req.body.stok,
    image: req.body.image,
    deskripsi: req.body.description,
  };
  console.log("idParams : ", idParams);
  // res.send("This is route Edit food ");
  const sql = "UPDATE tb_food SET ? WHERE id = '" + idParams + "'";
  connection.query(sql, data, function (err, rows) {
    if (err) throw err;
    res.redirect("/");
  });
  // EndInsertVersi1
});

// EndTbFood
// ===========================================

app.use(function (req, res, next) {
  res.status(404);
  res.send("404");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
