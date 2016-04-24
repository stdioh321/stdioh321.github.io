//       API Key
//       51cb531a971ca10554a6ae517b90efe6
//       
//       http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=&appid=51cb531a971ca10554a6ae517b90efe6
//       
//       
//       http://api.openweathermap.org/data/2.5/forecast?lat=-23.43&lon=-45.07&appid=51cb531a971ca10554a6ae517b90efe6
//       
//       http://api.openweathermap.org/data/2.5/forecast?id={city ID}
//       
//       
//       http://api.openweathermap.org/data/2.5/weather?lat=-23.4741297&lon=-46.3927326&appid=51cb531a971ca10554a6ae517b90efe6
//       
//       
//       
//       FORECAST.IO
//       3633ce3ab311df404ee0fd9dc979541d
//       https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE
//       
//       https://api.forecast.io/forecast/3633ce3ab311df404ee0fd9dc979541d/37.8267,-122.423
//       
//       
//       
//       WORLD WEATHER ONLINE
//       
//       http://api.worldweatheronline.com/free/v1/marine.ashx?key=d7pesx54engabthjcznhanfa&format=json&q=-25.8685,-48.5589
//       


app.controller("noSurfCtrl", function ($scope, $http, $filter, ngToast, $uibModal, $timeout) {
    /*########## Select Data ########## */
    $scope.locais = locais;
    /*########## Select Data ########## */

    /*########## Is Loadgin ########## */
    $scope.loading = false;
    /*########## Is Loadgin ########## */

    /*########## Chart Data ########## */
    $scope.series = ["Tamanho Onda(m)"];
    $scope.data = [];
    $scope.dataChart = [];
    $scope.labels = [];
    $scope.colours = [{
            fillColor: 'rgba(0, 0, 0, .7)',
            strokeColor: 'rgba(0, 0, 0, .7)'
//            highlightFill: 'rgba(47, 132, 71, 0.8)',
//            highlightStroke: 'rgba(47, 132, 71, 0.8)'
        }];
    /*########## Chart Data ########## */
    $scope.indexDate = 0;

    $scope.indexAtual = new Date().getHours();
    $scope.modalShow = {value: false, modal: "", modalVal: ""};

    window.showMenu = function () {
        bt = document.getElementsByClassName('menu-btn')[0];
        bt.dispatchEvent(new MouseEvent('click'));
    };
    $scope.showMenu = function () {
        window.showMenu();
    };

    $scope.carregaCidade = function (tmpEstado) {
        var tmp = false;
        if (tmpEstado != null) {


            tmp = $scope.cidades.some(function (elem) {
                if (elem.id_estado == tmpEstado.id) {
                    $scope.objCidades = elem.cidades;
                    return true;
                }
            });
        }
        if (tmp == false) {
            $scope.objCidades = {};
        }
    };

    $scope.carregaPraia = function (tmpCidade) {
        var tmp = false;
        if (tmpCidade != null) {
            tmp = $scope.praias.some(function (elem) {
                if (elem.id_cidade == tmpCidade.id) {
                    $scope.objPraias = elem.praias;
                    return true;
                }
            });
        }

        if (tmp == false) {
            $scope.objPraias = {};
        }
    };

    $scope.carregaWeather = function (praia) {
//        if (!window.navigator.onLine) {
//            
//        } else 
        if (praia != null) {

            $scope.loading = true;

            $http({
                method: "GET",
                url: urlMarine + praia.lat + "," + praia.lon
            }).then(function (data) {
                $scope.resultMarine = data.data.data;
                $scope.indexDate = 0;
                $scope.carregaChart($scope.resultMarine);

                console.log($scope.resultMarine);


                initMap(praia.lat, praia.lon);
                window.scrollTo(0, 0);
                $http({
                    method: "GET",
                    url: urlWeather + praia.lat + "," + praia.lon
                }).then(function (data) {
                    toggleMenu();
                    $scope.loading = false;
                    $scope.resultWeather = data.data.data;
                    console.log($scope.resultWeather);
                    $scope.carregaAtual();

                }, function (data) {
                    console.log("ERROR");
                    console.log(data);
                    $scope.loading = false;

                    $scope.showMsgError();
                });

            }, function (data) {
                console.log("ERROR");
                console.log(data);
                $scope.loading = false;
                $scope.showMsgError();


            });



        }
    };

    $scope.showMsgError = function () {
        $scope.loadError = true;
        $timeout(function () {
            $scope.loadError = false;

        }, 3000);
    }
    $scope.carregaChart = function (resultMarine) {
        $scope.dataChart = [];
        $scope.tmpLabel = [];


        resultMarine.weather.forEach(function (elem, index, arr) {
            if (index == $scope.indexDate) {
                $scope.now = elem.date;
                elem.hourly.filter(function (elem2) {

                    if ((elem2.time / 100) % 2 == 0) {
                        $scope.dataChart.push(parseFloat(elem2.swellHeight_m));
                        $scope.tmpLabel.push($filter('toHour')(elem2.time));
                    }

                });
            }
        });



        $scope.labels = $scope.tmpLabel;
        $scope.data[0] = $scope.dataChart;



    };

    $scope.$watch(function (scope) {
        return scope.modalShow.index;
    }, function (newVal, oldVal) {
        if ($scope.resultMarine) {
            $scope.indexDate = newVal;
            $scope.carregaChart($scope.resultMarine);
        }
    });


//    $scope.carregaAtual = function () {
//        var a = [00, 03, 06, 09, 12, 15, 18, 21];
////        var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
//        d = new Date();
//        var atual = 0;
//        a = a.forEach(function (elem, index, arr) {
//            if (d.getHours() >= 21) {
//                atual = index;
//            } else
//            if (d.getHours() < elem) {
//                atual = index - 1;
//            }
//        });
//
//        $scope.atualMarine = $scope.resultMarine.weather[0].hourly[atual];
//        $scope.atualWeather = $scope.resultWeather.weather[0].hourly[atual];
//
//    };
    $scope.carregaAtual = function () {
//        var a = [00, 03, 06, 09, 12, 15, 18, 21];
        var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
        d = new Date();
        var atual = 0;
        a = a.forEach(function (elem, index, arr) {
            if (d.getHours() == elem) {
                atual = elem;
            }
        });

        $scope.atualMarine = $scope.resultMarine.weather[0].hourly[atual];
        $scope.atualWeather = $scope.resultWeather.weather[0].hourly[atual];

    };

    $scope.limpa = function () {
        $scope.atualMarine = null;
        $scope.atualWeather = null;
        $scope.carregaCidade(null);
    }

    $scope.getEstados = function (id) {

    };
    $scope.getCidades = function (id) {
        $scope.locais.forEach(function (el) {
            if (el.id == id) {
                return el.cidades;
            }
        });
    };

    $scope.getPraias = function (id) {
        var stop = false;
        for (i = 0; i < locais.length; i++) {
            for (j = 0; j < locais[i].cidades.length; j++) {
                for (k = 0; k < locais[i].cidades[j].praias.length; k++) {

                    if (stop == true)
                        break;
                }
                if (stop == true)
                    break;
            }
            if (stop == true)
                break;
        }
    };

    $scope.carregaWeatherBusca = function (praia) {

        var tmpEstado = $scope.infPraia(praia);
        $scope.obj_est = tmpEstado.estado;
        $scope.obj_cid = tmpEstado.cidade;
        $scope.obj_pra = tmpEstado.praia;
        $scope.busca = "";
        $scope.carregaWeather(praia);

    };

    $scope.infPraia = function (praia) {
        var result = {"estado": null, "cidade": null, "praia": praia};
        $scope.locais.forEach(function (el) {
            el.cidades.forEach(function (el2) {
                el2.praias.forEach(function (el3) {
                    if (el3.id == praia.id) {
                        result.estado = el;
                        result.cidade = el2;
                    }
                });
            });
        });

        return result;
    }


    $scope.changeCaroulseIndex = function (idx) {
        $scope.carouselIndex += idx;
    }



    $scope.openModal = function (modal, index) {
        $scope.modalShow = {value: true, modal: modal, index: index};

    };
    $scope.closeModal = function () {
        $scope.modalShow.value = false;
    };
    $scope.trocaIndexAtual = function (val) {
        $scope.modalShow.index = $scope.modalShow.index + val;
    };
});