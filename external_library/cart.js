var cart = {}; //КОРЗИНА


function loadCommonCart() {

    console.log('load');
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        console.log(cart);
        showCart();
    }

    //else {
    //     alert(' NOT show');
    //     $('.show-common-sum').html('ваша корзина пуста');
    // }
}

setTimeout(function () {
    if (!isEmpty(cart)) {
        // alert(1);
        $('#modal1').modal('open');
        setTimeout(function () {
            document.location.href = 'menu_delivery.html';
        }, 2000);
    }
}, 2000);



function isEmpty(object) {
    for (key in object)
        if (object.hasOwnProperty(key)) return true;
    return false;
}

function showCart() {

    $.post(
        "core/core.php", {
            "action": "showCart"
        },
        function (data) {
            console.log(data);
            data = JSON.parse(data);
            var goods = data;
            var out = '';
            var commonSum = 0;

            for (var id in cart) {

                out += ` <div class="col s12 m4" >`;
                out += ` <div class="card hoverable">`;
                out += ` <div class="card-image waves-effect waves-block waves-light">`;
                out += ` <img class="activator" src="img/items/10.jpg">`;
                out += ` </div>`;
                out += ` <div class="card-content">`;
                out += ` <div class="card_header">${goods[id].name}</div>`;
                out += ` <div class="card_quantity">`;
                out += ` <i class="material-icons">poll</i>`;
                out += ` <p class="card_quantity_text">Количество</p>`;
                out += ` <p class="card_quantity_sum">${cart[id]}</p>`;
                out += ` </div>`;
                out += ` <div class="card_sum">${goods[id].cost * cart[id]} руб</div>`;
                out += ` <div class="buttons_block">`;

                out += ` <button class="minus yellow darken-1 minus_button card_button waves-effect waves-light btn" data-id="${id}">`;
                out += ` <i class="material-icons left">indeterminate_check_box</i>`;
                out += ` </button>`;

                out += ` <button class="delete red darken-4 delite_button card_button waves-effect waves-light btn" data-id="${id}">`;
                out += ` <i class="material-icons left">cancel</i>`;
                out += ` </button>`;

                out += ` <button class="plus plus_button card_button waves-effect waves-light btn" data-id="${id}">`;
                out += ` <i class="material-icons left">add_box</i>`;
                out += ` </button>`;

                out += ` </div>`;
                out += ` </div>`;
                out += ` </div>`;
                out += ` </div>`;

                // out += `<div class="col-md-3 col-10">`;
                // out += `<div class="background-orders">`;
                // out += ` <div class="name-order">`;
                // out += `<h3 class="text-center ">${goods[id].name}</h3>`;
                // out += `</div>`;
                // out += `<div class="description-order text-center text-white">`;
                // out += `<p>${goods[id].description}</p>`;
                // out += `</div>`;
                // out += `<div class="weight-order text-center text-white">`;
                // out += `<p>${goods[id].weight} гр</p>`;
                // out += `</div>`;
                // out += ` <div class="quantity-order text-center">`;
                // out += `<p>${cart[id]} шт</p>`;
                // out += `</div>`;
                // out += `<div class="cost-order text-center ">`;
                // out += `<p>${goods[id].cost * cart[id]} руб</p>`;
                // out += `</div>`;
                // out += `<div class="buttons">`;
                // out += `<button type="button" class="minus btn btn-outline btn-sm" data-id="${id}"><i class=" far fa-minus-square"></i></button>`;
                // out += `<button type="button" class="delite btn btn-outline btn-sm" data-id="${id}"><i class=" far fa-times-circle"></i></button>`;
                // out += `<button type="button" class="plus btn btn-outline btn-sm" data-id="${id}"><i class=" far fa-plus-square"></i></button>`;
                // out += `</div>`;
                // out += `</div>`;
                // out += `</div>`;


                commonSum = commonSum + (goods[id].cost * cart[id]);
            }

            console.log(commonSum);
            $('.generate-content').html(out);
            showCommonSum(commonSum);
            $('.delete').on('click', delGoods);
            $('.minus').on('click', minusGoods);
            $('.plus').on('click', plusGoods);

        });

}

function showCommonSum(commonSum) {
    $('.show-common-sum').text('Сумма заказа : ' + commonSum);
}

function delGoods() {
    console.log('done');
    var id = $(this).attr('data-id');
    delete cart[id];
    showCart();
    saveCart();
    showMiniCart();
}

function plusGoods() {
    console.log('done');
    var id = $(this).attr('data-id');
    cart[id]++;
    showCart();
    saveCart();
    showMiniCart();
}

function minusGoods() {
    console.log('done');
    var id = $(this).attr('data-id');
    if (cart[id] == 1) {
        delete cart[id];
    } else {
        cart[id]--;
    }
    showCart();
    saveCart();
    showMiniCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function getime() {
    var currentdate = new Date();
    var datetime = "Дата заказа :" + currentdate.getDate() + "." +
        (currentdate.getMonth() + 1) + "." +
        currentdate.getFullYear() + " Время заказа :" +
        currentdate.getHours() + ":" +
        currentdate.getMinutes() + ":" +
        currentdate.getSeconds();
    return datetime;
}


var userInformation = {
    userInputs: {
        deliveryInputs: {
            name: '',
            phone: '',
            comment: ''
        },
        yourSelfInputs: {
            name: '',
            phone: '',
            comment: ''
        }
    },
    yourSelf: false,
    delivery: false,
    deliveryTime: {
        current: false,
        difeneTime: false,
        setDeliveryTime: {
            data: '',
            clock: ''
        }
    },
    deliveryInformation: {
        adress: '',
        domofon: {
            without: true,
            work: false
        },
        shouldCall: {
            without: true,
            should: false
        },
        formPay: {
            without: true,
            nal: false,
            terminal: false,
            sberOnline: false,
            tip: {
                needTip: false,
                withoutTip: false,
                from5000: false,
                fromdEfine: false,
                defineSumOfTip: ''
            }
        }
    }
};



function logicInputs() {


    $('.delivery_options_1').slideUp();
    $('.delivery_options_2').slideUp();
    $('.form-pay_choose').slideUp();
    $('.sdasha-input').slideUp();

    $('#select').on('change', function () {
        console.log($("#select option:selected").text());

        if ($("#select option:selected").text() == "Самовывоз") {

            $('.delivery_options_2').slideDown();
            $('.delivery_options_1').slideUp();

            userInformation.yourSelf = true;
            userInformation.delivery = false

        }
        if ($("#select option:selected").text() == "Доставка") {

            $('.delivery_options_1').slideDown();
            $('.delivery_options_2').slideUp();

            userInformation.yourSelf = false;
            userInformation.delivery = true
        }

        console.log(userInformation);

    });

    $('#delivery_time').on('change', function () {
        if ($('#delivery_time option:selected').text() == 'На определенное время') {
            $('.delivery_time_choose').slideDown();

            userInformation.deliveryTime.difeneTime = true;
            userInformation.deliveryTime.current = false;

            console.log(userInformation);
        }


        if ($('#delivery_time option:selected').text() == 'На текущее время') {
            $('.delivery_time_choose').slideUp();

            userInformation.deliveryTime.difeneTime = false;
            userInformation.deliveryTime.current = true;

            console.log(userInformation);
        }
    });

    $('#form-pay').on('change', function () {

        if ($('#form-pay option:selected').text() == 'Наличными') {
            $('.form-pay_choose').slideDown();
        }
        if ($('#form-pay option:selected').text() != 'Наличными') {
            $('.form-pay_choose').slideUp();
        }

    });

    $('#sdacha-option').on('change', function () {

        if ($('#sdacha-option option:selected').text() == 'Сдача с определенной купюры') {
            $('.sdasha-input').slideDown();
        }
        if ($('#sdacha-option option:selected').text() != 'Сдача с определенной купюры') {
            $('.sdasha-input').slideUp();
        }

    });

    //TODO: CHANGE USE INFORMATION YOURSELF

    $('#sam_name').on('change', function () {
        userInformation.userInputs.yourSelfInputs.name = $('#sam_name').val();

        console.log(userInformation);
    });
    $('#sam_phone').on('change', function () {
        userInformation.userInputs.yourSelfInputs.phone = $('#sam_phone').val();

        console.log(userInformation);
    });
    $('#sam_comment').on('change', function () {
        userInformation.userInputs.yourSelfInputs.comment = $('#sam_comment').val();

        console.log(userInformation);
    });

    //TODO: CHANGE USE INFORMATION DELIVERY

    // NOTE: NAME
    $('#delivery_name').on('change', function () {
        userInformation.userInputs.deliveryInputs.name = $('#delivery_name').val();

        console.log(userInformation);
    });
    // NOTE: PHONE
    $('#delivery_phone').on('change', function () {
        userInformation.userInputs.deliveryInputs.phone = $('#delivery_phone').val();

        console.log(userInformation);
    });
    // NOTE: ADRESS
    $('#delivery_adsress').on('change', function () {
        userInformation.deliveryInformation.adress = $('#delivery_adsress').val();

        console.log(userInformation);
    });
    // NOTE: COMMENT
    $('#delivery_comment').on('change', function () {
        userInformation.userInputs.deliveryInputs.comment = $('#delivery_comment').val();

        console.log(userInformation);
    });


    //TODO: CHANGE DOMOFON

    $('#domofon').on('change', function () {

        if ($('#domofon option:selected').text() != 'домофон работает?') {
            userInformation.deliveryInformation.domofon.without = false;
            console.log(userInformation);
        }

        if ($('#domofon option:selected').text() == 'Работает') {
            userInformation.deliveryInformation.domofon.work = true;
            console.log(userInformation);
        }

        if ($('#domofon option:selected').text() == 'Не работает') {
            userInformation.deliveryInformation.domofon.work = false;
            console.log(userInformation);
        }
    });



    //TODO: DELIVERY BOY SHOULD TO CALL

    $('#should-call').on('change', function () {

        if ($('#should-call option:selected').text() != 'курьеру позвонить по прибытию?') {
            userInformation.deliveryInformation.shouldCall.without = false;
            console.log(userInformation);
        }

        if ($('#should-call option:selected').text() == 'Позвонить') {
            userInformation.deliveryInformation.shouldCall.should = true;
            console.log(userInformation);
        }

        if ($('#should-call option:selected').text() == 'нет необходимости звонить') {
            userInformation.deliveryInformation.shouldCall.should = false;
            console.log(userInformation);
        }
    });


    //TODO: FORM PAY

    $('#form-pay').on('change', function () {

        if ($('#form-pay option:selected').text() != 'Форма расчета') {
            userInformation.deliveryInformation.formPay.without = false;
            console.log(userInformation);
        }

        if ($('#form-pay option:selected').text() == 'Наличными') {
            userInformation.deliveryInformation.formPay.nal = true;
            userInformation.deliveryInformation.formPay.terminal = false;
            userInformation.deliveryInformation.formPay.sberOnline = false;
            console.log(userInformation);
        }
        if ($('#form-pay option:selected').text() == 'Безналичный расчет по карте') {
            userInformation.deliveryInformation.formPay.terminal = true;
            userInformation.deliveryInformation.formPay.sberOnline = false;
            userInformation.deliveryInformation.formPay.nal = false;
            console.log(userInformation);
        }
        if ($('#form-pay option:selected').text() == 'Переводом - сбербанк онлайн') {
            userInformation.deliveryInformation.formPay.sberOnline = true;
            userInformation.deliveryInformation.formPay.nal = false;
            userInformation.deliveryInformation.formPay.terminal = false;
            console.log(userInformation);
        }
    });

    //TODO: TIP
    $('#sdacha-option').on('change', function () {

        if ($('#sdacha-option option:selected').text() != 'Нужна сдача?') {
            userInformation.deliveryInformation.formPay.tip.needTip = true;
            console.log(userInformation);
        }

        if ($('#sdacha-option option:selected').text() == 'без сдачи') {

            userInformation.deliveryInformation.formPay.tip.withoutTip = true;
            userInformation.deliveryInformation.formPay.tip.from5000 = false;
            userInformation.deliveryInformation.formPay.tip.fromdEfine = false;
            console.log(userInformation);
        }

        if ($('#sdacha-option option:selected').text() == 'Сдача с 5000') {

            userInformation.deliveryInformation.formPay.tip.withoutTip = false;
            userInformation.deliveryInformation.formPay.tip.from5000 = true;
            userInformation.deliveryInformation.formPay.tip.fromdEfine = false;
            console.log(userInformation);
        }

        if ($('#sdacha-option option:selected').text() == 'Сдача с определенной купюры') {

            userInformation.deliveryInformation.formPay.tip.withoutTip = false;
            userInformation.deliveryInformation.formPay.tip.from5000 = false;
            userInformation.deliveryInformation.formPay.tip.fromdEfine = true;
            console.log(userInformation);
        }
    });



    //TODO: DEFINE SUM OF TIP
    $('#sdasha-input-text').on('change', function () {
        userInformation.deliveryInformation.formPay.tip.defineSumOfTip = $('#sdasha-input-text').val();
        console.log(userInformation);
    });

    //TODO: GET TIME DELIVERY
    $('#delivery_time_choose-date').on('change', function () {
        userInformation.deliveryTime.setDeliveryTime.data = $('#delivery_time_choose-date').val();
        console.log(userInformation);
    });

    $('#delivery_time_choose-clock').on('change', function () {
        userInformation.deliveryTime.setDeliveryTime.clock = $('#delivery_time_choose-clock').val();
        console.log(userInformation);
    });
    console.log(userInformation);

}


// function checkInputs(...args) {
//     args.forEach(el => console.log(el));

// }

function checkInputs(arg) {
    console.log(arg);
    if (arg != '') {
        return arg;
    }
    return false;
}


$(document).ready(function () {

    loadCommonCart();
    $('select').formSelect();
    logicInputs();
    $('.modal').modal();

    //TODO: SEND

    $('.button-send').on('click', function () {



        if (userInformation.yourSelf == true) {
            console.log('userInformation.yourSelf == true');

            var ename = checkInputs(userInformation.userInputs.yourSelfInputs.name);
            var ephone = checkInputs(userInformation.userInputs.yourSelfInputs.phone);
            var ecomment = userInformation.userInputs.yourSelfInputs.comment;


            console.log(ename);
            console.log(ephone);

            if (ename == false || ephone == false) {
                $('#modal2').modal('open');
            } else {
                $('#modal3').modal('open');
                localStorage.clear();

                setTimeout(function () {
                    window.location.href = 'index.html';
                }, 3000);
            }
        }

        // NOTE: DELIVERY INPUTS

        var modalUserInputs = false;
        var modalFormPay = false;
        var modalDelivery = false;

        if (userInformation.delivery == true) {
            console.log('userInformation.delivery == true');

            var dname = checkInputs(userInformation.userInputs.deliveryInputs.name);
            var dphone = checkInputs(userInformation.userInputs.deliveryInputs.phone);
            var dcomment = userInformation.userInputs.deliveryInputs.comment;
            var dadress = checkInputs(userInformation.deliveryInformation.adress);

            if (dname == false || dphone == false || dadress == false) {
                // $('#modal4').modal('open');
                modalUserInputs = true;
            }
            if (dname != false && dphone != false && dadress != false) {
                modalUserInputs = false;
            }

            // NOTE: DOMOFON
            var ddomofon = '';
            if (userInformation.deliveryInformation.domofon.without == false) {
                if (userInformation.deliveryInformation.domofon.work == true) {
                    ddomofon = 'Домофон работает';
                }
                if (userInformation.deliveryInformation.domofon.work == false) {
                    ddomofon = 'Домофон Не работает';
                }
                console.log(' DOMOFON = : ' + ddomofon);
            }

            // NOTE: CALL
            var dcall = '';
            if (userInformation.deliveryInformation.shouldCall.without == false) {
                if (userInformation.deliveryInformation.shouldCall.should == true) {
                    dcall = 'Курьеру позвонить';
                }
                if (userInformation.deliveryInformation.shouldCall.should == false) {
                    dcall = 'звонок не требуется ';
                }
                console.log(' CALL = : ' + dcall);

            }

            // NOTE: FORM PAY
            var dpay = '';
            if (userInformation.deliveryInformation.formPay.without == true) {
                // $('#modal4').modal('open');
                modalFormPay = true;
            }
            if (userInformation.deliveryInformation.formPay.without != true) {
                // $('#modal4').modal('open');
                modalFormPay = false;
            }

            if (userInformation.deliveryInformation.formPay.without == false) {

                if (userInformation.deliveryInformation.formPay.nal == true) {
                    dpay = 'Наличными';
                }
                if (userInformation.deliveryInformation.formPay.terminal == true) {
                    dpay = 'Безналичный , терминалом';
                }
                if (userInformation.deliveryInformation.formPay.sberOnline == true) {
                    dpay = 'Через Сбербанк онлайн';
                }
                console.log(' PAY  = : ' + dpay);
            }

            // NOTE: NBEED TIPS
            var tips = '';
            if (userInformation.deliveryInformation.formPay.tip.needTip != false) {

                if (userInformation.deliveryInformation.formPay.tip.withoutTip == true) {
                    tips = 'Без сдачи';
                }
                if (userInformation.deliveryInformation.formPay.tip.from5000 == true) {
                    tips = 'Нужна сдача с 5000';
                }
                if (userInformation.deliveryInformation.formPay.tip.fromdEfine == true) {
                    tips = 'Нужна сдача с ' + userInformation.deliveryInformation.formPay.tip.defineSumOfTip;
                }
                console.log(' TIP  = : ' + tips);
            }


            // NOTE: DELIVERY TIME
            var dDeliveryTime = '';
            var dDeliveryTimeCLOCK = '';
            var dDeliveryTimeDATA = '';
            if (userInformation.deliveryTime.current == true) {

                if (modalUserInputs == false && modalFormPay == false) {

                    dDeliveryTime = 'На текущее время';
                    $('#modal3').modal('open');
                    localStorage.clear();

                    setTimeout(function () {
                        window.location.href = 'index.html';
                    }, 3000);
                } else {
                    $('#modal4').modal('open');
                }
            }


            if (userInformation.deliveryTime.difeneTime == true) {
                dDeliveryTime = 'На определенное время : ';
                dDeliveryTimeCLOCK = userInformation.deliveryTime.setDeliveryTime.clock;
                dDeliveryTimeDATA = userInformation.deliveryTime.setDeliveryTime.data;

                if (dDeliveryTimeCLOCK == '' || dDeliveryTimeDATA == '') {
                    modalDelivery = true;
                } else {
                    modalDelivery = false;
                }

                if (modalDelivery == false && modalUserInputs == false && modalFormPay == false) {
                    $('#modal3').modal('open');
                    localStorage.clear();
                    setTimeout(function () {
                        window.location.href = 'index.html';
                    }, 3000);
                } else {
                    $('#modal4').modal('open');
                }
            }

            if (userInformation.deliveryTime.difeneTime != true && userInformation.deliveryTime.current != true) {
                $('#modal4').modal('open');
                console.log('OMG MODALL =(');
            }

            console.log(' DELIVERY TIME  = : ' + dDeliveryTime);
            console.log(' DELIVERY CLOCK  = : ' + dDeliveryTimeCLOCK);
            console.log(' DELIVERY DATA  = : ' + dDeliveryTimeDATA);
        }
    });
});