//http://api.worldweatheronline.com/free/v1/marine.ashx?key=d7pesx54engabthjcznhanfa&format=json&q=-25.8685,-48.5589
//d7pesx54engabthjcznhanfa
//kxz3zwcq55a7rkb48tqxjh9e
//a71c81ee86b5409d9f331200160504
var urlBase = "https://api.worldweatheronline.com/premium/v1/";

var url = "http://api.worldweatheronline.com/premium/v1/marine.ashx?key=f2ae69adff674902a3c13610160504&format=json&q=";
//Premium Eterna var key = "f2ae69adff674902a3c13610160504";
var key = "kxz3zwcq55a7rkb48tqxjh9e";

var urlBaseMarine = "marine.ashx?key=" + key + "&lang=pt&format=json&tp=1&q=";
var urlBaseWeather = "weather.ashx?key=" + key + "&lang=pt&showmap=yes&format=json&tp=1&q="


var urlMarine = urlBase + urlBaseMarine;
var urlWeather = urlBase + urlBaseWeather;


var app = angular.module("noSurf", ['chart.js', 'angular-carousel', 'ngToast', 'ui.bootstrap']);