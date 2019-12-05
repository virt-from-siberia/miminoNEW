//  document.addEventListener('DOMContentLoaded', function () {

// });


$(document).ready(function () {
    $('.sidenav').sidenav();



    $('.owel-gallery').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 2000,
        responsive: {
            0: {
                items: 1
            }
        }
    });

    $('.owel-menu').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoWidth: true,
        loop: true,
        smartSpeed: 2000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 3,
                nav: false
            },
            600: {
                items: 5,
                nav: false
            },
            1000: {
                items: 10,
                nav: false,
                loop: true
            }
        }
    });


    // DATAPICKER =============

    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {
        showClearBtn: true,
        format: 'dd-mm-yyyy',
        firstDay: 1,
        i18n: {
            months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
            weekdays: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            weekdaysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
            weekdaysAbbrev: ['В', 'П', 'В', 'С', 'Ч', 'П', 'С']
        }
    });
    // TIMEPICKER =============

    var elems = document.querySelectorAll('.timepicker');
    var instances = M.Timepicker.init(elems, {

        twelveHour: false,
        autoClose: true
    });

    //RESERVE MODAL

    var elems = document.querySelectorAll('.modal');
    var modal = M.Modal.init(elems, {});




});