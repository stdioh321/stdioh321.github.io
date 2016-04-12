app.controller("noSurfCtrl", function ($scope, $http, $filter) {
    /*########## Select Data ########## */
    $scope.estados = estados;
    $scope.cidades = cidades;
    $scope.praias = praias;
    /*########## Select Data ########## */

    /*########## Is Loadgin ########## */
    $scope.loading = false;
    /*########## Is Loadgin ########## */

    /*########## Chart Data ########## */
    $scope.series = ["Tamanho Onda(m)"];
    $scope.data = [];
    $scope.dataChart = [];
    $scope.labels = [];
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

    $scope.modDate = function (val) {
        if ($scope.indexDate + val < 0 || $scope.indexDate + val > 6) {

        } else {
            $scope.indexDate += val;
            $scope.carregaChart($scope.resultMarine);
        }
    };

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
    $scope.isFirst = function (val) {
        if (val == 0) {
            return "active";
        } else {
            return "";
        }
    }
});