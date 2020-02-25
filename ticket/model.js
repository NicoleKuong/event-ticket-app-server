const Sequelize = require("sequelize");
const db = require("../db");

const Ticket = db.define("ticket", {
  imageUrl: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Ticket;
