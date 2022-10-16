const Launch = require("./launches.mongo");
const planetsMongo = require("./planets.mongo");


const getAllLaunches = async () => {
  return await Launch.find({}, { __v: 0 });
};

const scheduleNewLaunch = async (launch) => {
  const latestFlightNumber = await getLatestFlightNum() + 1;
  console.log(latestFlightNumber)
  const newLaunch = Object.assign(launch, {
    flightNumber: latestFlightNumber,
    customers: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
  });
  await saveLaunch(newLaunch);
};

// function abourtLaunchById(launchId) {
//   const abourted = launches.get(launchId);
//   abourted.upcoming = false;
//   abourted.success = false;
//   return abourted;
// }

async function saveLaunch(launch) {
  const planet = planetsMongo.findOne({
    KeplerName: launch.target,
  });
  if (!planet) {
    throw new Error("Invalid target");
  }
  await Launch.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function getLatestFlightNum() {
  const latestLaunch = await Launch.findOne().sort("-flightNumber");
  if (!latestLaunch) return 100;
  return latestLaunch.flightNumber;
}
module.exports = {
  getAllLaunches,
  scheduleNewLaunch
};
