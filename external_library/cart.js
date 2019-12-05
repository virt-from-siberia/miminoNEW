var cart = {}; //КОРЗИНА


function loadCart() {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        console.log(cart);
        showCart();
    } else {
        // alert(' NOT show');
        $('.goods-out-hot').html('корзина пуста');
    }
}





$(document).ready(function () {
    loadCart();
    $('select').formSelect();

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
});