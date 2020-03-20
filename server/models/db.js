const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("mern-crud2", "root", "password", {
  host: "localhost",
  dialect: "mysql"
});

//Check connection
sequelize

  .authenticate()
  .then(() => {
    console.log(" connection has been esblished successfuly");
  })
  .catch(err => {
    console.log(" unable to connect");
  });

module.exports = sequelize;
