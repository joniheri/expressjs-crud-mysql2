// Membuat Server Dengan Express
const express = require("express");
const app = express();
const port = 9001;

// Menggunakan ejs
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("stylesheet"));

const mysql = require("mysql");
const myconnection = require("express-myconnection");

// connection to database MySQL
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  port: "3306",
  database: "db_warteg",
};
// End connection to database MySQL

// Cara menggunakan koneksi antara database dengan server
app.use(myconnection(mysql, dbConfig, "pool"));
// End Cara menggunakan koneksi antara database dengan server

// app.get("/", (req, res) => {
//   res.render("index");
// });

app.get("/", (req, res, next) => {
  // res.render("Book");
  req.getConnection(function (err, conn) {
    if (err) throw err;
    conn.query(
      "SELECT tb_food.*, tb_categori.name AS category_name FROM tb_food INNER JOIN tb_categori ON (tb_food.categori_id = tb_categori.id) WHERE tb_categori.name='Makanan Kering'",
      function (err, rows) {
        if (err) throw err;
        res.render("index", { data: rows });
      }
    );
  });
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
