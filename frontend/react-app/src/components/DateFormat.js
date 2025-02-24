import React from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat)
const DateFormator = ({ date, format = "MMMM Do, YYYY" }) => {
  return <span>{dayjs(date).format(format)}</span>;
};

export default DateFormator;
