const mySql = require("mysql");

const connectMysql = mySql.createConnection({
  host: "localhost",
  user: "root",
  database: "shopping_online",
});

// יש משהו של טיים אווט בוא ננסה אותו xccv
// const pool = mySql.createPool({
//   connectionLimit: 10,
//   host: "localhost",
//   user: "root",
//   database: "shopping_online",
// });
connectMysql.connect((error) => {
  if (error) throw error;
  console.log("CONNECTION TO MYSQL OK");
});

module.exports = connectMysql;
