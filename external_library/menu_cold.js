var cart = {};

function init() {
    console.log('init');
    $.post(
        "/core/core.php", {
            "action": "outCold"
        },
        out
    );
}


function out(data) {
    data = JSON.parse(data);
    console.log(data);
    let out = '';

    for (var key in data) {
        out += ``;
        out += ` <div class="col l3 m6 s12 " data-aos="fade-up" data-aos-duration="1000" data-aos-delay="0">`;
        out += `<div class="card hoverable">`;
        out += `<div class="card-image waves-effect waves-block waves-light">`;
        out += `<img class="activator" src="img/items/1.jpg">`;
        out += ` </div>`;
        out += `<div class="card-content">`;
        out += `<span class="card-title activator grey-text text-darken-4">${data[key].name}`;
        out += `<i class="material-icons right">arrow_drop_down_circle</i>`;
        out += `</span>`;
        out += `<div class="card-descr">`;
        out += `<div class="card-info">`;
        out += `<img class="card-info-wight" src="img/icons/weight.png" alt="">`;
        out += `<p>${data[key].weight} гр.</p>`;
        out += `</div>`;
        out += `<p class="card-price">${data[key].cost} р.</p>`;
        out += ` </div>`;
        out += `<div class="card-buttons">`;
        out += ` <a class="minus-cart btn-floating btn-medium waves-effect waves-light red" data-id="${key}">`;
        out += ` <i class="material-icons">highlight_off</i>`;
        out += `</a>`;
        out += `<div class="card-counter">${cart[key] }</div>`;
        out += `<a class="add-to-cart btn-floating btn-medium waves-effect light-green darken-1" data-id="${key}">`;
        out += `<i class="material-icons">add</i>`;
        out += `</a>`;
        out += `</div>`;
        out += `</div>`;
        out += `<div class="card-reveal">`;
        out += `<span class="card-title dark-text text-darken-4">${data[key].name}`;
        out += `<i class="material-icons right">close</i>`;
        out += `</span>`;
        out += `<p class="card-reveal-about">${data[key].desct}`;
        out += `</p>`;
        out += `</div>`;
        out += `</div>`;
        out += `</div>`;
    }
    $('#generate_content').html(out);
    $('.add-to-cart').on('click', addToCart);
    $('.minus-cart').on('click', minusCart);
}

function addToCart() {

    var id = $(this).attr('data-id');
    if (cart[id] == undefined) {
        cart[id] = 1;
    } else {
        cart[id]++;
    }
    var toastHTML = '<button class="btn-flat toast-action">Товар добавлен в корзину</button>';
    M.toast({
        html: toastHTML,
        classes: 'rounded'
    });
    var counterElement = this.parentNode.querySelector('.card-counter');
    // this.parentNode.querySelector('.card-counter').innerHTML = cart[id];
    showConuter(counterElement, id);
    showMiniCart();
    saveCart();
}

function minusCart() {
    var id = $(this).attr('data-id');
    if (cart[id] == undefined || cart[id] == 0 || cart[id] == null) {
        delete cart[id];
    } else {
        cart[id]--;
        var toastHTML = '<button class="btn-flat toast-action">Товар удален из корзины</button>';
        M.toast({
            html: toastHTML,
            classes: 'rounded'
        });
    }
    var counterElement = this.parentNode.querySelector('.card-counter');
    // this.parentNode.querySelector('.card-counter').innerHTML = cart[id];
    if (cart[id] >= 0) {
        showConuter(counterElement, id);
    } else {
        cart[id] = 0;
    }

    showMiniCart();
    saveCart();
}

function showConuter(counterElement, id) {
    counterElement.innerHTML = cart[id];
}

function showMiniCart() {
    $.post(
        "core/core.php", {
            "action": "showMiniCart"
        },
        function (dataMinCart) {
            dataMinCart = JSON.parse(dataMinCart);
            var goodsMinCart = dataMinCart;
            var commonSummmMinCart = 0;
            var out = '';
            for (var key in cart) {
                commonSummmMinCart = commonSummmMinCart + (goodsMinCart[key].cost * cart[key]);
            }

            $('.cart-common-sum').html(commonSummmMinCart);
            $('.cart_mobile_sum').html(commonSummmMinCart);
        }
    );
}


function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}



function loadCart() {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
    }
}

$(document).ready(function () {
    init();
    loadCart();
});