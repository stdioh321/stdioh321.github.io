app.filter('toHour', function () {
    return function (input) {
        if(input == undefined){
            input = "";
        }
        if (input.length == 4) {
            input = input.substring(0, 2) + "h";
        } else if (input.length == 3) {
            input = "0" + input.substring(0, 1) + "h";
        }
        else if (input.length == 1) {
            input = "00" + "h";
        }
        return input;
    };

});