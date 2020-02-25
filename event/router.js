const { Router } = require("express");
const Event = require("./model");
const Sequelize = require("sequelize");

const router = new Router();

//create event
router.post("/event", async (request, response, next) => {
  try {
    const newEvent = await Event.create(request.body);
    response.send(newEvent);
  } catch (error) {
    next(error);
  }
});

//get events that are not finished yet and nine events in a page
router.get("/event", async (request, response, next) => {
  try {
    const limit = request.query.limit || 12;
    const offset = request.query.offset || 0;
    console.log("current date", new Date());
    const events = await Event.findAll({
      limit,
      offset,
      where: { date: { [Sequelize.Op.gte]: new Date() } }
    });
    response.send(events);
  } catch (error) {
    next(error);
  }
});

//
router.put("/event/:id", async (request, response, next) => {
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

router.delete("/event/:id", async (request, response, next) => {
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
