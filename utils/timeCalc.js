const moment = require("moment");
const timeCalc = (timestamp, timezone) => {
  const start_date = moment(timestamp, "YYYY-MM-DD HH:mm:ss");
  const end_date = moment().tz(timezone);
  const duration = moment.duration(end_date.diff(start_date));
  const days = duration.asDays().toFixed();
  const hours = duration.asHours().toFixed();
  const minutes = duration.asMinutes().toFixed();
  const seconds = duration.asSeconds().toFixed();

  if (days > 30) return moment.tz(timestamp, timezone).format(`lll`);
  if (days > 0) return `${days} days`;
  if (hours > 0) return `${hours} hours`;
  if (minutes > 0) return `${minutes} minutes`;
  if (seconds > 0) return `${seconds} seconds`;

  return days;
};
module.exports = timeCalc;
