define(["require", "exports", "./Rest"], function (require, exports, Rest_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function greeter(person) {
        return "Hello, " + person;
    }
    var user = "Kaniev Yaroslav";
    var test = document.getElementById('test-ts');
    var p = document.createElement("p");
    p.textContent = "IS it work????";
    console.log(test);
    test === null || test === void 0 ? void 0 : test.appendChild(p);
    var Weather = /** @class */ (function () {
        function Weather() {
            var url = 'https://api.weather.yandex.ru/v2/informers?lat=55.75396&lon=37.620393';
            var out = Rest_1.getData(url);
            this.current = out;
        }
        Weather.prototype.getTemperature = function () {
            console.log(this.current);
            return this.current;
        };
        return Weather;
    }());
    var newWeather = new Weather();
    newWeather.getTemperature();
});
