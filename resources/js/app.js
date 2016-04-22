var urlBase = "http://api.worldweatheronline.com/premium/v1/";
var url = "http://api.worldweatheronline.com/premium/v1/marine.ashx?key=f2ae69adff674902a3c13610160504&format=json&q=";
var key = "f2ae69adff674902a3c13610160504";

var urlBaseMarine = "marine.ashx?key=" + key + "&format=json&tp=1&q=";
var urlBaseWeather = "weather.ashx?key=" + key + "&lang=pt&showmap=yes&format=json&tp=1&q="


var urlMarine = urlBase + urlBaseMarine;
var urlWeather = urlBase + urlBaseWeather;


var app = angular.module("noSurf", ['chart.js', 'angular-carousel', 'ngToast', 'ui.bootstrap']);