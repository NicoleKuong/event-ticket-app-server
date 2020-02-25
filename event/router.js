const { Router } = require("express");
const Event = require("./model");
const Sequelize = require("sequelize");

const router = new Router();

//create event
//need to add auth middleware
router.post("/events", async (request, response, next) => {
  try {
    const newEvent = await Event.create(request.body);
    response.send(newEvent);
  } catch (error) {
    next(error);
  }
});

//get events that are not finished yet and nine events in a page
router.get("/events", async (request, response, next) => {
  try {
    const limit = request.query.limit || 9;
    const offset = request.query.offset || 0;
    console.log("current date", new Date());
    const events = await Event.findAll({
      limit,
      offset,
      where: { endDate: { [Sequelize.Op.gte]: new Date() } }
    });
    response.send(events);
  } catch (error) {
    next(error);
  }
});

//edit event
router.put("/events/:id", async (request, response, next) => {
  try {
    const eventId = parseInt(request.params.id);
    const event = await Event.findByPk(eventId);
    if (event) {
      const updatedEvent = await event.update(request.body);
      response.send(updatedEvent);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

//delete event
router.delete("/events/:id", async (request, response, next) => {
  try {
    const eventId = parseInt(request.params.id);
    const event = await Event.findByPk(eventId);
    if (event) {
      await event.destory({ where: { id: eventId } });
      response.status(204).end();
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
