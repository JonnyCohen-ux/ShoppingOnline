const router = require("express").Router();
const pool = require("../db/db");

// auth user
router.get("/auth/user", (req, res) => {
  console.log(req.session.info);
  if (req.session.info.isLog) {
    return res.status(200).send(req.session.info);
  }
  res.status(403).send({
    message: "Auth fail",
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    console.log("db Log", error);
  });
  res.status(200).send({
    mesage: "User log out",
  });
  console.log(res);
});
// יאללה תריץ תבקשה

// תרשום אדמין חדש דרך POSTMEN לא דרך phpmydamin? אין לך הצפנה? סיסימא
// צריל לעשות 1 נכון?
//user log in
router.post("/login", (req, res) => {
  console.log(req.body, "USER ROUTES WOTK!!!");
  pool.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [req.body.email, req.body.password],
    (err, data) => {
      if (err) {
        return res.status(500).send(err);
      } else if (data.length == 0) {
        return res.status(403).send({
          message: "wrong user or password",
        });
      }
      const user = data[0];
      console.log(user);
      if (!!user.role) {
        req.session.info = {
          id: user.id,
          isLog: true,
          isAdmin: !!user.role,
          username: user.first_name,
        };
        return res.status(200).send({
          message: "Admin log",
        });
      }
      pool.query(
        `SELECT * FROM cart WHERE user_cart = ${user.id}`,
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
            req.session.info = {
              id: user.id,
              isLog: true,
              isAdmin: !!user.role,
              username: user.first_name + " " + user.last_name,
              cart_id: data[0].cart_id,
              city: user.city,
              street: user.street,
            };
            console.log(req.session.info);

            res.send({
              message: "User is log",
            });
          }
        }
      );
    }
  );
});

// user register
router.post("/register", (req, res) => {
  const {
    user_id,
    first_name,
    last_name,
    email,
    password,
    confirm_password,
    city,
    street,
  } = req.body;
  pool.query(
    "INSERT INTO users SET ? ",
    {
      user_id,
      first_name,
      last_name,
      email,
      password,
      confirm_password,
      city,
      street,
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        pool.query(`INSERT INTO cart SET user_cart = ${data.insertId}`);
        res.status(200).send(data);
      }
    }
  );
});

router.post("/userexist", (request, response) => {
  const { email, userId } = request.body;
  console.log(email, userId);
  pool.query(
    "SELECT * FROM users WHERE email = ? OR user_id = ?",
    [email, userId],
    (error, result) => {
      console.log(result);
      if (error) {
        return response.status(500).send(error);
      } else if (result.length == 0) {
        return response.status(200).send({
          message: "User not exsit",
        });
      }
      response.status(403).send({
        message: "User exsit",
      });
    }
  );
});

module.exports = router;
