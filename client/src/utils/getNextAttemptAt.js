import addDate from "date-fns/add";
import formatDate from "date-fns/format";

export default (level, lastAttemptAt) => {
   const levelDuration = {
      1: { minutes: 10 },
      2: { hours: 3 },
      3: { days: 1 },
      4: { days: 3 },
      5: { weeks: 1 },
      6: { weeks: 2 },
      7: { weeks: 5 },
      8: { weeks: 20 },
      9: { years: 1 },
      10: { years: 2 },
      11: { years: 4 },
      12: { years: 8 },
   };
   // return as milliseconds past the epoch
   const nextAttepmtAt = addDate(lastAttemptAt, levelDuration[level]);
   const timeStamp = Number(formatDate(nextAttepmtAt, "T"));

   return timeStamp;
};
