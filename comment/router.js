const { Router } = require("express");
const Comment = require("./model");

const User = require("../user/model");

const router = new Router();

//create comment
//add auth
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
router.get("/tickets/:ticketId/comments", async (request, response, next) => {
  console.log("REQUEST RECEIVED:", request.params.ticketId);
  try {
    const comments = await Comment.findAll({
      where: { ticketId: request.params.ticketId },
      include: [{ User }]
    });
    response.send(comments);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
