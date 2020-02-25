const { Router } = require("express");
const Sequelize = require("sequelize");
const Ticket = require("./model");
const auth = require("../auth/middleware");

const router = new Router();
