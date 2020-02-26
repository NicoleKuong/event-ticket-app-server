const Sequelize = require("sequelize");
const db = require("../db");
const Event = require("../event/model");
const User = require("../user/model");

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

Ticket.belongsTo(User);
User.hasMany(Ticket);

Ticket.belongsTo(Event);
Event.hasMany(Ticket);

module.exports = Ticket;
