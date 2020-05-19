const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 4000;
const userRouter = require("./user/router");
const authRouter = require("./auth/router");
const eventRouter = require("./event/router");
const ticketRouter = require("./ticket/router");
const commentRouter = require("./comment/router");

const bodyParser = require("body-parser");

const app = express();

const corsMiddleware = cors();
app.use(corsMiddleware);

const parserMiddleware = bodyParser.json();
app.use(parserMiddleware);

app.use(userRouter);
app.use(authRouter);
app.use(ticketRouter);
app.use(eventRouter);
app.use(commentRouter);

app.get("/", (request, response, next) => {
  response.send("hello world");
});

console.log("port", process.env.PORT);
app.listen(port, () => console.log(`Listening on port ${port}`));
