const moment = require("moment");
const timeCalc = (timestamp, timezone) => {
  const start_date = moment(timestamp, "YYYY-MM-DD HH:mm:ss");
  const end_date = moment().tz(timezone);
  const duration = moment.duration(end_date.diff(start_date));
  const years = duration.asYears().toFixed();
  const months = duration.asMonths().toFixed();
  const days = duration.asDays().toFixed();
  const hours = duration.asHours().toFixed();
  const minutes = duration.asMinutes().toFixed();
  const seconds = duration.asSeconds().toFixed();
  // moment.tz(timestamp, timezone).format(`lll`)
  if (years > 0) return `${years} years ago`;
  if (months > 0) return `${months} months ago`;
  if (days > 0) return `${days} days ago`;
  if (hours > 0) return `${hours} hours ago`;
  if (minutes > 0) return `${minutes} minutes ago`;
  if (seconds > 0) return `${seconds} seconds ago`;

  return days;
};
module.exports = timeCalc;
