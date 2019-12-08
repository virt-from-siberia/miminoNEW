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

                out += ` <div class="col s12 m4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="0">`;
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
            $('.delete').on('click', delGoods);
            $('.minus').on('click', minusGoods);
            $('.plus').on('click', plusGoods);
            console.log(commonSum);
            $('.generate-content').html(out);
            showCommonSum(commonSum);

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
}

function plusGoods() {
    console.log('done');
    var id = $(this).attr('data-id');
    cart[id]++;
    showCart();
    saveCart();
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
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}



function logicInputs() {

    $('#select').on('change', function () {
        console.log($("#select option:selected").text());

        if ($("#select option:selected").text() == "Самовывоз") {
            console.log('take sam');
            $('.delivery_options_1').slideDown();
            $('.delivery_options_2').slideUp();
        }
        if ($("#select option:selected").text() == "Доставка") {
            console.log('take dostavka');
            $('.delivery_options_2').slideDown();
            $('.delivery_options_1').slideUp();
        }

    });

    $('#delivery_time').on('change', function () {
        if ($('#delivery_time option:selected').text() == 'На определенное время') {
            $('.delivery_time_choose').slideDown();
        }

        if ($('#delivery_time option:selected').text() == 'На текущее время') {
            $('.delivery_time_choose').slideUp();
        }
    });
}


$(document).ready(function () {

    loadCommonCart();

    $('select').formSelect();

    logicInputs();

    $('.modal').modal();

});