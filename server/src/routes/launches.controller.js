const {
  getAllLaunches,
  scheduleNewLaunch,
} = require("../models/launches.model");
const launchesMongo = require("../models/launches.mongo");

const httpGetAllLaunches = async (req, res) => {
  return res.status(200).json(await getAllLaunches());
};

async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.target ||
    !launch.launchDate
  ) {
    return res.status(400).json({
      error: "Missing required Data",
    });
  }
  //   launch.launchDate = new Date(launch.launchDate);
  //   if(isNaN(launch.launchDate)){
  //     return res.status(400).json({
  //         error: "Invalid launch date"
  //     })
  //   }
  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  const isLaunch = await launchesMongo.findOne({ flightNumber: launchId });
  if (!isLaunch) {
    return res.status(400).json({
      error: "Launch not found",
    });
  }

  const aborted = await launchesMongo.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );
  if (!aborted)
    return res.status(400).json({
      error: "Something went wrong, try again",
    });
  return res.status(200).json(aborted);
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
