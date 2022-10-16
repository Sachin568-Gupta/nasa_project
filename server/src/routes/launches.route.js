const express = require("express");
const {httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch} = require("./launches.controller");

const launchRouter = express.Router();

launchRouter.get("/launches", httpGetAllLaunches);
launchRouter.post("/addNewLaunch", httpAddNewLaunch);
launchRouter.delete("/deleteLaunch/:id", httpAbortLaunch);

module.exports = launchRouter;