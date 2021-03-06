"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function getData(url) {
    if (url === void 0) { url = ''; }
    return __awaiter(this, void 0, void 0, function () {
        var response, json, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('url', url);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url, {
                            method: 'GET',
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    json = _a.sent();
                    console.log('Успех:', JSON.stringify(json));
                    return [2 /*return*/, json];
                case 4:
                    error_1 = _a.sent();
                    console.error('Ошибка:', error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
var getFullDate = function (ts) {
    var jsDate = new Date(1000 * ts);
    var options = {
        weekday: "long",
        month: "long",
        day: "numeric",
    };
    return jsDate.toLocaleString('en-US', options);
};
var getFullTime = function (ts) {
    var jsDate = new Date(1000 * ts);
    var options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    };
    return jsDate.toLocaleString('en-US', options);
};
var getShortDate = function (ts) {
    var jsDate = new Date(1000 * ts);
    var options = {
        weekday: "long"
    };
    return jsDate.toLocaleString('en-US', options);
};
var Weather = /** @class */ (function () {
    function Weather(city, data) {
        this.city = city;
        this.currWeather = {
            day: getFullDate(data.current.dt),
            temperature: data.current.temp,
            feelsLike: data.current.feels_like,
            sunrise: data.current.sunrise,
            sunset: data.current.sunset,
            weather: {
                icon: data.current.weather[0].icon,
                description: data.current.weather[0].description
            }
        };
        var weekInfo = data.daily.slice(1);
        this.weekTemp = weekInfo.map(function (item) {
            return {
                day: getShortDate(item.dt),
                dayTemp: item.temp.day,
                nightTemp: item.temp.night,
                weather: {
                    icon: item.weather[0].icon,
                    description: item.weather[0].description
                }
            };
        });
    }
    Weather.prototype.getWeeks = function () {
        return this.weekTemp;
    };
    Weather.prototype.getCurrWeather = function () {
        return this.currWeather;
    };
    return Weather;
}());
var url = "http://api.openweathermap.org/data/2.5/onecall?lat=55.7522&lon=37.6156&exclude=minutely,hourly,alerts&units=metric&appid=4f5ca7bdac6a2274671fce002ad16371";
getData(url).then(function (data) {
    console.log(data);
    var weather = new Weather('moscow', data);
    var week = weather.getWeeks();
    var curr = weather.getCurrWeather();
    var currDateDate = document.querySelector('.weather__info--date > p:nth-child(1)');
    var currDateDescription = document.querySelector('.weather__info--date > p:nth-child(2)');
    currDateDate.textContent = curr.day;
    currDateDescription.textContent = curr.weather.description;
    var currDateInfoFeelsLike = document.querySelector('.weather__info--data > p:nth-child(1)');
    var currDateInfoSunrise = document.querySelector('.weather__info--data > p:nth-child(2)');
    var currDateInfoSunset = document.querySelector('.weather__info--data > p:nth-child(3)');
    currDateInfoFeelsLike.textContent = "Feels like: " + curr.feelsLike + " \u2103";
    currDateInfoSunrise.textContent = "Sunrise: " + getFullTime(curr.sunrise);
    currDateInfoSunset.textContent = "Sunset: " + getFullTime(curr.sunset);
    var currDayIcon = document.querySelector('.weather__info-icon__temp > img');
    var currDayTemp = document.querySelector('.weather__info-icon__temp > p');
    currDayTemp.textContent = curr.temperature + " \u2103";
    currDayIcon.setAttribute('src', "http://openweathermap.org/img/wn/" + curr.weather.icon + "@2x.png");
    var weatherWeek = document.querySelector('.weather__temp').children;
    week.map(function (day, id) {
        var dayElement = document.querySelector(".weather__temp > div:nth-child(" + (id + 1) + ") > p:nth-child(1) ");
        dayElement.textContent = day.day;
        var imgDay = document.querySelector(".weather__temp > div:nth-child(" + (id + 1) + ") > img ");
        imgDay.setAttribute('src', "http://openweathermap.org/img/wn/" + day.weather.icon + "@2x.png");
        var dayTemp = document.querySelector(".weather__temp > div:nth-child(" + (id + 1) + ") > p:nth-child(3) ");
        var nightTemp = document.querySelector(".weather__temp > div:nth-child(" + (id + 1) + ") > p:nth-child(4) ");
        dayTemp.textContent = day.dayTemp + " \u2103";
        nightTemp.textContent = day.nightTemp + " \u2103";
    });
});
// let mockData = {
//     "lat": 55.7522,
//     "lon": 37.6156,
//     "timezone": "Europe/Moscow",
//     "timezone_offset": 10800,
//     "current": {
//         "dt": 1615042192,
//         "sunrise": 1615003695,
//         "sunset": 1615043620,
//         "temp": -5,
//         "feels_like": -10.15,
//         "pressure": 1013,
//         "humidity": 68,
//         "dew_point": -9.44,
//         "uvi": 0,
//         "clouds": 40,
//         "visibility": 10000,
//         "wind_speed": 3,
//         "wind_deg": 280,
//         "weather": [
//             {
//                 "id": 802,
//                 "main": "Clouds",
//                 "description": "scattered clouds",
//                 "icon": "03d"
//             }
//         ]
//     },
//     "daily": [
//         {
//             "dt": 1615021200,
//             "sunrise": 1615003695,
//             "sunset": 1615043620,
//             "temp": {
//                 "day": -5.67,
//                 "min": -12.09,
//                 "max": -4.95,
//                 "night": -10.95,
//                 "eve": -6.49,
//                 "morn": -11.8
//             },
//             "feels_like": {
//                 "day": -10.6,
//                 "night": -16.25,
//                 "eve": -11.3,
//                 "morn": -16.62
//             },
//             "pressure": 1017,
//             "humidity": 94,
//             "dew_point": -8.38,
//             "wind_speed": 3.1,
//             "wind_deg": 294,
//             "weather": [
//                 {
//                     "id": 600,
//                     "main": "Snow",
//                     "description": "light snow",
//                     "icon": "13d"
//                 }
//             ],
//             "clouds": 72,
//             "pop": 0.81,
//             "snow": 0.28,
//             "uvi": 1.27
//         },
//         {
//             "dt": 1615107600,
//             "sunrise": 1615089941,
//             "sunset": 1615130144,
//             "temp": {
//                 "day": -2.62,
//                 "min": -10.55,
//                 "max": -0.84,
//                 "night": -7.32,
//                 "eve": -6.95,
//                 "morn": -6.9
//             },
//             "feels_like": {
//                 "day": -10.57,
//                 "night": -11.68,
//                 "eve": -12.8,
//                 "morn": -14.34
//             },
//             "pressure": 993,
//             "humidity": 97,
//             "dew_point": -3.73,
//             "wind_speed": 7.95,
//             "wind_deg": 232,
//             "weather": [
//                 {
//                     "id": 601,
//                     "main": "Snow",
//                     "description": "snow",
//                     "icon": "13d"
//                 }
//             ],
//             "clouds": 100,
//             "pop": 1,
//             "snow": 5.9,
//             "uvi": 0.89
//         },
//         {
//             "dt": 1615194000,
//             "sunrise": 1615176187,
//             "sunset": 1615216668,
//             "temp": {
//                 "day": -7.07,
//                 "min": -14.47,
//                 "max": -5.9,
//                 "night": -14.47,
//                 "eve": -8.43,
//                 "morn": -10.36
//             },
//             "feels_like": {
//                 "day": -13.96,
//                 "night": -19.44,
//                 "eve": -13.92,
//                 "morn": -14.38
//             },
//             "pressure": 1002,
//             "humidity": 95,
//             "dew_point": -9.32,
//             "wind_speed": 5.74,
//             "wind_deg": 298,
//             "weather": [
//                 {
//                     "id": 601,
//                     "main": "Snow",
//                     "description": "snow",
//                     "icon": "13d"
//                 }
//             ],
//             "clouds": 99,
//             "pop": 0.54,
//             "snow": 1.65,
//             "uvi": 1.34
//         },
//         {
//             "dt": 1615280400,
//             "sunrise": 1615262432,
//             "sunset": 1615303191,
//             "temp": {
//                 "day": -12.43,
//                 "min": -19.13,
//                 "max": -11.05,
//                 "night": -18.55,
//                 "eve": -14.33,
//                 "morn": -18.65
//             },
//             "feels_like": {
//                 "day": -17.44,
//                 "night": -23.3,
//                 "eve": -19.24,
//                 "morn": -23.74
//             },
//             "pressure": 1018,
//             "humidity": 93,
//             "dew_point": -14.98,
//             "wind_speed": 2.47,
//             "wind_deg": 332,
//             "weather": [
//                 {
//                     "id": 803,
//                     "main": "Clouds",
//                     "description": "broken clouds",
//                     "icon": "04d"
//                 }
//             ],
//             "clouds": 77,
//             "pop": 0,
//             "uvi": 1.51
//         },
//         {
//             "dt": 1615366800,
//             "sunrise": 1615348677,
//             "sunset": 1615389714,
//             "temp": {
//                 "day": -14.43,
//                 "min": -21.84,
//                 "max": -11.98,
//                 "night": -16.01,
//                 "eve": -13.15,
//                 "morn": -20.53
//             },
//             "feels_like": {
//                 "day": -20.29,
//                 "night": -21.8,
//                 "eve": -18.67,
//                 "morn": -25.33
//             },
//             "pressure": 1023,
//             "humidity": 94,
//             "dew_point": -16.39,
//             "wind_speed": 3.55,
//             "wind_deg": 114,
//             "weather": [
//                 {
//                     "id": 600,
//                     "main": "Snow",
//                     "description": "light snow",
//                     "icon": "13d"
//                 }
//             ],
//             "clouds": 100,
//             "pop": 0.68,
//             "snow": 0.76,
//             "uvi": 1.32
//         },
//         {
//             "dt": 1615453200,
//             "sunrise": 1615434922,
//             "sunset": 1615476237,
//             "temp": {
//                 "day": -13.18,
//                 "min": -20.12,
//                 "max": -10.33,
//                 "night": -12.43,
//                 "eve": -11.35,
//                 "morn": -20.12
//             },
//             "feels_like": {
//                 "day": -19.13,
//                 "night": -17.97,
//                 "eve": -16.87,
//                 "morn": -25.97
//             },
//             "pressure": 1021,
//             "humidity": 95,
//             "dew_point": -15.01,
//             "wind_speed": 3.78,
//             "wind_deg": 125,
//             "weather": [
//                 {
//                     "id": 804,
//                     "main": "Clouds",
//                     "description": "overcast clouds",
//                     "icon": "04d"
//                 }
//             ],
//             "clouds": 100,
//             "pop": 0,
//             "uvi": 2
//         },
//         {
//             "dt": 1615539600,
//             "sunrise": 1615521166,
//             "sunset": 1615562760,
//             "temp": {
//                 "day": -2.52,
//                 "min": -12.74,
//                 "max": 1.22,
//                 "night": 1.22,
//                 "eve": -0.42,
//                 "morn": -8.67
//             },
//             "feels_like": {
//                 "day": -10.55,
//                 "night": -4.07,
//                 "eve": -6.73,
//                 "morn": -15.18
//             },
//             "pressure": 1004,
//             "humidity": 98,
//             "dew_point": -3.59,
//             "wind_speed": 8.1,
//             "wind_deg": 171,
//             "weather": [
//                 {
//                     "id": 616,
//                     "main": "Snow",
//                     "description": "rain and snow",
//                     "icon": "13d"
//                 }
//             ],
//             "clouds": 100,
//             "pop": 1,
//             "rain": 0.54,
//             "snow": 3.83,
//             "uvi": 2
//         },
//         {
//             "dt": 1615626000,
//             "sunrise": 1615607410,
//             "sunset": 1615649282,
//             "temp": {
//                 "day": 0.87,
//                 "min": -0.02,
//                 "max": 1.33,
//                 "night": 1.26,
//                 "eve": 1.07,
//                 "morn": -0.02
//             },
//             "feels_like": {
//                 "day": -5.38,
//                 "night": -3.79,
//                 "eve": -3.97,
//                 "morn": -5.93
//             },
//             "pressure": 1000,
//             "humidity": 98,
//             "dew_point": 0.71,
//             "wind_speed": 6.22,
//             "wind_deg": 245,
//             "weather": [
//                 {
//                     "id": 600,
//                     "main": "Snow",
//                     "description": "light snow",
//                     "icon": "13d"
//                 }
//             ],
//             "clouds": 100,
//             "pop": 0.62,
//             "snow": 0.25,
//             "uvi": 2
//         }
//     ]
// }
