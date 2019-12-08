var cart = {};
// console.log(111);

function loadCart() {
    // console.log(localStorage.getItem('cart'));
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        // console.log(cart);
        showMiniCart();
    }
}


function showMiniCart() {
    // console.log('show');
    $.post(
        "core/core.php", {
            "action": "showMiniCart"
        },
        function (dataMinCart) {
            dataMinCart = JSON.parse(dataMinCart);
            // console.log(dataMinCart);
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

$(document).ready(function () {
    loadCart();
});