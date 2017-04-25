var moment = require("moment");
var now = moment();
/*
console.log(now.format());
console.log(now.format("HH:mm"));
console.log(now.subtract(1, "year").format("YYYY-MM-DD HH:mm"));
console.log(now.format("MMM Do YYYY, HH:mma"));
// sec cinsinden unixtimestamp verir.
console.log(now.format("X"));
// milisec cinsinden unixtimestamp verir.
console.log(now.format("x"));
*/

var timestamp = now.valueOf();

var timestampMoment = moment.utc(timestamp);

console.log(timestampMoment.local().format("H:mm"));


