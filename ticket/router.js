const { Router } = require("express");
const Sequelize = require("sequelize");
const Ticket = require("./model");
// const auth = require("../auth/middleware");
// const User = require("../user/model");

const router = new Router();

//create ticket
//need to add auth middleware
router.post("/tickets", async (request, response, next) => {
  console.log("create tickets", request.body);
  try {
    const newTicket = await Ticket.create(request.body);
    response.send(newTicket);
  } catch (error) {
    next(error);
  }
});

//get tickets for particular event
router.get("/events/:eventId/tickets", async (request, response, next) => {
  console.log("tickets for one event", request.body);
  try {
    const tickets = await Ticket.findAll({
      where: { eventId: request.params.eventId }
      // include: [User]
    });
    response.send(tickets);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
