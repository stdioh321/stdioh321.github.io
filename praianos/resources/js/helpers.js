$(document).ready(function () {

    setTimeout(function () {
        $("body").removeClass('splash');
        $("body").remove('.splash-remove');
    }, 1000);
});

$('.tab-content-in').attr("current", 0);
$('.tab-content-in').addClass("tab-content-active");

$('.tab-content-in > div').each(function (index) {
    $(this).css({
        transform: "translate(" + (index * 100) + "%)"
    });
});
$('.tab-menu > ul > li').each(function (index) {
    $(this).click(function (ev) {
        changeTab(index);
    });
});

var cur = Number($('.tab-content-in')[0].getAttribute('current'));
var changeLimit = 20;
var totContent = $('.tab-content-in > div').length;
var indBefore = 0;
var pullAllowed = false;
Hammer.defaults.domEvents = true;
$('.tab-content-in > div ').each(function (ind) {

    mc = new Hammer(this);
    mc.on('panstart', function (ev) {
        prc = ev.changedPointers[0].clientX * 100 / $('.tab-content-in > div').outerWidth();
        console.log(ev);
        if (prc > 7) {
            pullAllowed = true;
        }
    });
    mc.on('panleft panright', function (ev) {
        if (pullAllowed) {
            indBefore = ind;
            $('.tab-content-in').removeClass("tab-content-animate");
            prc = ev.deltaX * 100 / $('.tab-content-in').outerWidth();
            //console.log(prc + " - " + cur);
            //console.log(ev);
            $('.tab-content-in').css({
                transform: "translate(" + (prc + (ind * -100)) + "%)"
            });
            if (prc <= -changeLimit && ind < totContent - 1) {
                cur = ind + 1;
            } else if (prc >= changeLimit && ind > 0) {
                cur = ind - 1;
            } else {
                cur = ind;
            }
        }


    });
    mc.on('panend', function (ev) {
        if (pullAllowed) {
            $('.tab-content-in').addClass("tab-content-animate");
            changeTab(cur);
        }
        pullAllowed = false;

    });
});
function changeTab(idx) {
    tmp = idx;
    tmp = (-idx * 100);
    $('.tab-content-in').css({
        transform: "translate(" + tmp + "%)"
    });
    $('.tab-content-in ').attr('current', idx);
    $('.tab-content-in > div').removeClass("tab-content-active");
    $('.tab-content-in > div')[idx].classList.add("tab-content-active");
    $('.tab-menu > ul > li').removeClass('tab-menu-active');
    $('.tab-menu > ul > li')[idx].classList.add('tab-menu-active');
    if (idx != indBefore) {
        window.scrollTo(0, 0);
    }
}


function toggleMenu() {
    document.getElementsByTagName('html')[0].classList.toggle('menu-show');
    document.getElementsByTagName('html')[0].classList.toggle('menu-hide');
}
document.getElementsByClassName('over-layer')[0].onclick = toggleMenu;
toggleMenu();
var map;
function initMap(lat, lng) {
    if (lat == undefined) {
        lat = 0;
    }
    if (lng == undefined) {
        lng = 0;
    }
    var myLatLng = {lat: lat, lng: lng};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: myLatLng,
        scrollwheel: true
    });
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
    });
}

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-76655658-1', 'auto');
ga('send', 'pageview');


var isOpened = false;
var isClosed = false;
var pullVal = 0;

hcClosed = new Hammer($('html')[0]);
hcOpened = new Hammer($('.menu')[0]);

hcClosed.on('panstart', function (ev) {
    prc = ev.changedPointers[0].clientX * 100 / $('html').outerWidth();
    if (prc < 7 && $("html").hasClass('menu-hide')) {
        isClosed = true;
        $('.menu').removeClass('menu-animate');
    }
});
hcClosed.on('panright panleft', function (ev) {
    prc = ev.deltaX * 100 / $('.menu').outerWidth();
    if (isClosed && prc < 100) {
        pullVal = prc;
        mvMenu(prc);
        console.log('test');
    }
    if (isClosed && prc >= 100) {
        mvMenu(100);
    }


});
hcClosed.on('panend', function (ev) {
    $('.menu').addClass('menu-animate');
    if (isClosed) {
        if (pullVal > 20) {
            toggleMenu();
            mvMenu(0);
        } else {
            mvMenu(0);
        }
    } else {
        mvMenu(0);
    }
    isClosed = false;

});



hcOpened.on('panstart', function (ev) {
    isOpened = $("html").hasClass('menu-show');
    $('.menu').removeClass('menu-animate');

});
hcOpened.on('panleft panright', function (ev) {

    prc = ev.deltaX * 100 / $('.menu').outerWidth();

    if (isOpened && prc < 0) {
        pullVal = prc;
        mvMenu(prc)
        console.log(prc);
    }
    if (prc >= 0) {
        mvMenu(0);
    }
});
hcOpened.on('panend', function (ev) {
    $('.menu').addClass('menu-animate');
    if (isOpened) {
        if (pullVal < -20) {
            toggleMenu();
            mvMenu(0);
        } else {
            mvMenu(0);
        }
    } else {
        mvMenu(0);
    }
    isOpened = false;
});

function mvMenu(val) {
    $('.menu').css({
        transform: "translate(" + val + "%)"
    });
}

changeTab(0);