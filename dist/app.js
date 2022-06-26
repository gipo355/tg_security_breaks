'use strict';

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.is-array.js");

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = writeTurns;
exports.initializeDb = initializeDb;

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.number.to-fixed.js");

require("core-js/modules/es.string.pad-start.js");

require("core-js/modules/es.date.to-string.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// ! BUG IF I WANT TO CHANGE AND REMOVE A WORKER IT FUCKS UP EVERYTHING BECAUSE THEY ARE CONST,
// ! got to fix both the interface and the initialize db below
function writeTurns() {
  var data = _fs["default"].readFileSync(_path["default"].join(__dirname, '..', "/api/db.json"), 'utf-8');

  var security = JSON.parse(data); // console.log(sec);
  // const security: Security = {
  //     workers: ['levante1', 'levante2', 'ponente1', 'ponente2'],
  //     levante1: {
  //         torrette: [9, 10, 11, 12, 13, 14],
  //         startingHour: 11,
  //     },
  //     levante2: {
  //         torrette: [15, 16, 17, 18, 19],
  //         startingHour: 12,
  //     },
  //     ponente1: {
  //         torrette: [28, 29, 30, 31, 32, 33],
  //         startingHour: 11,
  //     },
  //     ponente2: {
  //         torrette: [34, 35, 36, 37, 38, 39],
  //         startingHour: 11,
  //     },
  // };
  // ! objective, return a string

  function switchFirstToLast(arr) {
    var lastTurret = arr.shift();
    arr.push(lastTurret);
  }

  function message(_worker, _startingHour) {
    // set useful vars
    var turretsArr = security[_worker].torrette;
    var firstTurret = security[_worker].torrette[0]; // starting string

    var str = "".concat(_worker.slice(0, _worker.length - 1), " ").concat(_worker.slice(_worker.length - 1), " inizia alla torretta ").concat(firstTurret, " alle ").concat(_startingHour.toFixed(2)).toUpperCase(); // turns string

    var startHour = _startingHour;
    var turnsStr = '';

    var _iterator = _createForOfIteratorHelper(turretsArr),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var turret = _step.value;
        // console.log(turret);
        turnsStr += "torretta ".concat(turret, ": ").concat(startHour.toFixed(2), " -> ").concat((startHour + 1).toFixed(2), "\n").padStart(35);
        startHour++;
      } // console.log(str);
      // console.log(turnsStr);

    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    switchFirstToLast(turretsArr); // console.log(turretsArr);
    // return finalStr;

    return "".concat(str, "\n").concat(turnsStr, "\n");
  }

  function allMessage() {
    var date = new Date().toLocaleDateString('it-IT'); // console.log(date, '\n');

    var finalStr = "".concat(date, "\n\n");

    var _iterator2 = _createForOfIteratorHelper(security.workers.entries()),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _step2$value = _slicedToArray(_step2.value, 2),
            i = _step2$value[0],
            worker = _step2$value[1];

        // console.log(security[`levante${i + 1}`].startingHour);
        // console.log(i, worker);
        // const beach = security[worker];
        // console.log(beach.startingHour);
        // console.log(security['levante1']);
        var prop = security[worker]; // console.log(prop);
        // console.log(prop.startingHour);

        finalStr += message(worker, prop.startingHour); // console.log(worker);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    console.log(finalStr);

    _fs["default"].writeFileSync(_path["default"].join(__dirname, '..', '/api/db.json'), JSON.stringify(security));

    return finalStr;
  }

  return allMessage();
}

function initializeDb() {
  var security = {
    workers: ['levante1', 'levante2', 'ponente1', 'ponente2'],
    levante1: {
      torrette: [9, 10, 11, 12, 13, 14],
      startingHour: 11
    },
    levante2: {
      torrette: [15, 16, 17, 18, 19],
      startingHour: 12
    },
    ponente1: {
      torrette: [28, 29, 30, 31, 32, 33],
      startingHour: 11
    },
    ponente2: {
      torrette: [34, 35, 36, 37, 38, 39],
      startingHour: 11
    }
  };

  _fs["default"].writeFileSync(_path["default"].join(__dirname, '..', '/api/db.json'), JSON.stringify(security));
} // writeTurns();
// initializeDb();