const { Router } = require("express");
const commnet = require("./model");
const Sequelize = require("sequelize");

const router = new Router();

//create comment
router.post("/comments", async (request, response, next) => {
  console.log("create comments", request.body);
  try {
    const newComment = await Comment.create(request.body);
    response.send(newComment);
  } catch (error) {
    next(error);
  }
});

//get comments of a ticket
router.get("/comments/:ticketId", async (request, response, next) => {
  console.log("REQUEST RECEIVED:", request.params.ticketId);
  try {
    const comments = await Comment.findAll({
      where: { tickerId: request.params.ticketId }
    });
    response.send(comments);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
