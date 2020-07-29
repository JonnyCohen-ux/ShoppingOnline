const router = require("express").Router();
const pool = require("../db/db");
const { auth } = require("./auth/auth");

router.post("/delete", auth, (req, res) => {
  pool.query(
    `DELETE FROM full_cart WHERE full_cart.id = ${req.body.id}`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(req.body);
        res.status(200).send(data);
      }
    }
  );
});

router.get("/deleteDeliveredCart", auth, (req, res) => {
  pool.query(
    `DELETE FROM full_cart WHERE cart_identify = ${req.session.info.cart_id}`,
    (err, data) => {
      if (err) {
        res.status(400).send({ message: err + "Delete error" });
      } else {
        res.status(200).send(data);
      }
    }
  );
});

router.get("/getproducts", auth, (req, res) => {
  if (req.session.info.cart_id) {
    pool.query(
      "SELECT fc.id, p.product_name, fc.quantity, p.product_price,  p.product_price, fc.total_price , fc.c_product_image FROM full_cart fc INNER JOIN products p ON fc.product_identify = p.product_id WHERE cart_identify = ?",
      req.session.info.cart_id,
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(data);
        }
      }
    );
  }
});

// Get cart poructs by search
router.post("/productsearch", auth, (req, res) => {
  console.log(req.session.info);
  console.log(req.body.val);

  pool.query(
    `SELECT products.product_name, products.product_price, full_cart.c_product_image, full_cart.total_price, full_cart.quantity
     FROM full_cart
     INNER JOIN products ON full_cart.product_identify = products.product_id
     WHERE cart_identify = ${req.session.info.cart_id} AND products.product_name LIKE '%${req.body.val}%'`,
    (err, data) => {
      console.log("order", data);
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
});

// רגע
// Add product To user cart
router.post("/addproduct", auth, (req, res) => {
  let addedProduct = {
    product_identify: req.body.product_identify,
    quantity: req.body.quantity,
    total_price: req.body.total_price,
    c_product_image: req.body.c_product_image,
    cart_identify: req.session.info.cart_id,
  };
  pool.query("INSERT INTO full_cart SET ?", addedProduct, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(data);
      console.log(data);
    }
  });
});

// Sent order POST
router.post("/setorder", auth, (req, res) => {
  const {
    user_identify,
    cart_identify,
    final_price,
    shipping_city,
    shipping_street,
    shipping_date,
    payment,
  } = req.body;
  pool.query(
    "INSERT INTO orders SET ?",
    {
      user_identify,
      cart_identify,
      final_price,
      shipping_city,
      shipping_street,
      shipping_date,
      payment,
    },
    (err, data) => {
      if (err) {
        console.log(err);
        res.send({
          massage: "Cart Error",
        });
      } else {
        res.status(200).send(data);
      }
    }
  );
});

// Get all orders
router.get("/getorders", auth, (req, res) => {
  pool.query("SELECT * FROM orders", (err, data) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.status(200).send(data);
    }
  });
});

module.exports = router;
