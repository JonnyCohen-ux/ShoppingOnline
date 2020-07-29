const router = require("express").Router();
const pool = require("../db/db");
const multer = require("multer");
const { auth } = require("./auth/auth");

// Get a product by ID

const storage = multer.diskStorage({
  destination: "./images",
  filename(request, file, callBack) {
    callBack(null, Date.now() + "." + file.originalname);
  },
});

router.get("/category/:id", (req, res) => {
  pool.query(
    "SELECT * FROM products WHERE category_id = ?",
    [req.params.id],
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
});

// Get all products
router.get("/allproducts", (req, res) => {
  pool.query("SELECT * FROM products", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(data);
    }
  });
});

router.get("/catogories", (req, res) => {
  console.log("categories request");
  pool.query("SELECT * FROM categories", (err, data) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).send(data);
    console.log(data);
  });
});

// Add a product

router.post(
  "/addbyadmin",
  multer({ storage: storage }).single("image"),
  auth,
  (req, res) => {
    let fullUrl =
      req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
    console.log(fullUrl);
    console.log(req.body);
    let myProduct = {
      product_name: req.body.name,
      category_id: req.body.category,
      product_price: req.body.price,
      product_img: fullUrl,
    };
    pool.query("INSERT INTO products SET ?", myProduct, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(data);
      }
    });
  }
);

// Edit a product
router.post(
  "/editbyadmin",
  multer({ storage: storage }).single("image"),
  auth,
  (req, res) => {
    console.log("Test from admin Edit");
    let fullUrl =
      req.body.image ||
      req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
    console.log(fullUrl);
    console.log(req.body);
    let myProduct = {
      product_name: req.body.name,
      category_id: req.body.category,
      product_price: req.body.price,
      product_img: fullUrl,
    };
    console.log(myProduct.product_img);
    pool.query(
      `UPDATE products SET ? WHERE product_id = ${req.body.product_id} `,
      myProduct,
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(data);
        }
      }
    );
  }
);

// Find Product By Search
router.post("/search", (req, res) => {
  pool.query(
    `SELECT * FROM products WHERE product_name LIKE '%${req.body.val}%'`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(data);
        console.log(data);
        console.log(req.body);
      }
    }
  );
});

// Count products
router.post("/getall", (req, res) => {
  pool.query(
    `SELECT COUNT(*) from full_cart WHERE cart_identify = ${req.body.user}`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(data[0]);
        console.log(req.body);
      }
    }
  );
});

module.exports = router;
