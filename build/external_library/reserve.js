//  document.addEventListener('DOMContentLoaded', function () {

// });


$(document).ready(function () {

    // DATAPICKER =============

    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {
        showClearBtn: true,
        format: 'dd-mm-yyyy',
        firstDay: 1,
        i18n: {
            months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
            monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
            weekdays: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
            weekdaysShort: ["Вос", "Пон", "Вто", "Сре", "Чет", "Пят", "Суб"],
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
    $('.modal').modal();

    $('#submit').on('click', function (evt) {
        evt.preventDefault();
        checkInputs();
    });

    function sendFormReserve() {
        var name = $('#name').val();
        var phone = $('#telephone').val();
        var date = $('#data').val();
        var time = $('#time').val();
        var persones = $('#persons').val();
        var comments = $('#likes').val();
        console.log(name, phone, date, time, persones, comments);

        $.post(
            "core/reserve.php", {
                "name": name,
                "phone": phone,
                "date": date,
                "time": time,
                "persones": persones,
                "comments": comments
            },
            function (data) {
                console.log(data);
                // window.location.href = 'index.html';
            }
        );
    }

    function checkInputs() {
        if ($('#name').val() !== '' && $('#telephone').val() !== '' && $('#data').val() !== '' && $('#time').val() !== '' && $('#persons').val() !== '') {
            console.log('full');
            sendFormReserve();
            $('#modal2').modal('open');
        } else {
            console.log('empty');
            $('#modal1').modal('open');
        }
    }
});