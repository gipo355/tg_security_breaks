'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.define-property.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.number.constructor.js");

require("core-js/modules/es.array.concat.js");

require("dotenv-defaults/config");

var _nodeSchedule = require("node-schedule");

var _telegraf = require("telegraf");

var _app = _interopRequireWildcard(require("./app"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var port = Number(process.env.PORT);
var URL = process.env.URL; // const options: Partial<Options<Context<Update>>> = {
//     webHook: {
//         port: port,
//     },
// };

var bot = new _telegraf.Telegraf(process.env.TG_KEY);
var telegram = new _telegraf.Telegram(process.env.TG_KEY);
var chatID = process.env.CHAT_ID; // BOT

bot.start(function (ctx) {
  ctx.reply("Hello  ".concat(ctx.from.first_name).concat(ctx.from.last_name, "!"));
});
bot.help(function (ctx) {
  ctx.reply('restartDB, start');
});
bot.hears('restartDB', function (ctx) {
  (0, _app.initializeDb)();
  ctx.reply('DB restarted');
}); // const tryDate = new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' });
// console.log(tryDate);
// RECURRENT RULE - SCHEDULED

var rule = new _nodeSchedule.RecurrenceRule();
rule.hour = 7; // rule.minute = 44;

rule.tz = "CET";
var job = (0, _nodeSchedule.scheduleJob)(rule, function () {
  // console.log('Today is recognized by Rebecca Black!');
  // telegram.sendMessage(chatID, `${new Date().toLocaleTimeString()}`);
  telegram.sendMessage(chatID, (0, _app["default"])());
}); // function getDate() {
//     const date = new Date();
//     const str = date.toLocaleTimeString('it-IT');
//     return str;
// }

var job2 = (0, _nodeSchedule.scheduleJob)('*/30 * * * * *', function () {
  // console.log('Today is recognized by Rebecca Black!');
  // console.log(tryDate);
  // telegram.sendMessage(chatID, `${new Date().toLocaleTimeString()}`);
  telegram.sendMessage(chatID, (0, _app["default"])());
}); // ! LAUNCH AND END GRACEFULLY ON NODE STOP

bot.launch(); // bot.launch({
//     webhook: {
//         domain: URL,
//         port: port,
//     },
// });
// Enable graceful stop

process.once('SIGINT', function () {
  return bot.stop('SIGINT');
});
process.once('SIGTERM', function () {
  return bot.stop('SIGTERM');
});