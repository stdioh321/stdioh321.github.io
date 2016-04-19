app.controller("noSurfCtrl", function ($scope, $http, $filter) {
    /*########## Select Data ########## */
    $scope.estados = estados;
    $scope.cidades = cidades;
    $scope.praias = praias;
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
            fillColor: 'rgba(0, 0, 255, 0.7)',
            strokeColor: 'rgba(0, 0, 255, 0.7)'
//            highlightFill: 'rgba(47, 132, 71, 0.8)',
//            highlightStroke: 'rgba(47, 132, 71, 0.8)'
        }];
    /*########## Chart Data ########## */
    $scope.indexDate = 0;

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
        if (praia != null) {

            $scope.loading = true;

            $http({
                method: "GET",
                url: urlBase + "marine.ashx?key=" + key + "&lang=pt&tide=yes&format=json&q=" + praia.lat + "," + praia.lon
            }).then(function (data) {
                $scope.resultMarine = data.data.data;
                $scope.indexDate = 0;
                $scope.carregaChart($scope.resultMarine);

                console.log($scope.resultMarine);
                toggleMenu();

                initMap(praia.lat, praia.lon);
                window.scrollTo(0, 0);
                $http({
                    method: "GET",
                    url: urlBase + "weather.ashx?key=" + key + "&lang=pt&showmap=yes&format=json&q=" + praia.lat + "," + praia.lon
                }).then(function (data) {
                    $scope.loading = false;
                    $scope.resultWeather = data.data.data;
                    $scope.carregaAtual();

                }, function (data) {
                    console.log("ERROR");
                    console.log(data);
                });

            }, function (data) {
                console.log("ERROR");
                console.log(data);
            });



        }
    };


    $scope.carregaChart = function (resultMarine) {
        $scope.dataChart = [];
        $scope.tmpLabel = [];


        resultMarine.weather.forEach(function (elem, index, arr) {
            if (index == $scope.indexDate) {
                $scope.now = elem.date;
                elem.hourly.filter(function (elem2) {
                    $scope.dataChart.push(parseFloat(elem2.swellHeight_m));
                    $scope.tmpLabel.push($filter('toHour')(elem2.time));
                });
            }
        });



        $scope.labels = $scope.tmpLabel;
        $scope.data[0] = $scope.dataChart;



    };

    $scope.$watch(function (scope) {
        return scope.carouselIndex;
    }, function (newVal, oldVal) {
        if ($scope.resultMarine) {
            $scope.indexDate = newVal;
            $scope.carregaChart($scope.resultMarine);
        }
    });


    $scope.carregaAtual = function () {
        var a = [00, 03, 06, 09, 12, 15, 18, 21];
        d = new Date();
        var atual = 0;
        a = a.forEach(function (elem, index, arr) {
            if (d.getHours() >= 21) {
                atual = index;
            } else
            if (d.getHours() < elem) {
                atual = index - 1;
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

});
