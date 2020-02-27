const { Router } = require("express");
const Sequelize = require("sequelize");
const Ticket = require("./model");
// const auth = require("../auth/middleware");
const User = require("../user/model");
const Comment = require("../comment/model");

const router = new Router();

//create ticket
//need to add auth middleware
router.post("/tickets", async (request, response, next) => {
  // console.log("create tickets", request.body);
  try {
    const newTicket = await Ticket.create(request.body);
    response.send(newTicket);
  } catch (error) {
    next(error);
  }
});

//get all tickets
router.get("/tickets", async (request, response, next) => {
  try {
    const tickets = await Ticket.findAll({
      include: [{ model: User }, { model: Comment }]
    });
    response.send(tickets);
  } catch (error) {
    next(error);
  }
});

//get tickets for particular event
router.get("/events/:eventId/tickets", async (request, response, next) => {
  // console.log("tickets for one event", request.body);
  try {
    const tickets = await Ticket.findAll({
      where: { eventId: request.params.eventId },
      include: [{ model: User }]
    });
    console.log("including", tickets);
    response.send(tickets);
    // console.log("including user", response.body);
  } catch (error) {
    next(error);
  }
});

// get all tickets of a user
router.get("/user/tickets/:ticketId", async (request, response, next) => {
  try {
    const ticket = await Ticket.findByPk(request.params.ticketId);
    //find all the tickets that has this one ticket's userId
    const tickets = await Ticket.findAll({ where: { userId: ticket.userId } });
    response.send(tickets);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
