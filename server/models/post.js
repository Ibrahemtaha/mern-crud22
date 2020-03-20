var Sequelize = require("sequelize");
// importing connection database
var sequelize = require("./db");

var post = sequelize.define(
  "post",
  {
    post_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [0, 50]
      }
    },
    user: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [20, 500]
      }
    }
  },
  {
    timestamps: true
  }
);

//Employee.belongsTo(Role);

module.exports = post;
