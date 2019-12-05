<?php



//Письмо
$message = '';
$message .= '<h1>Резерв столика</h1>';
$message .= '<p>Клиент имя: ' . $_POST['name'] . '</p>';
$message .= '<p>Телефон: ' . $_POST['phone'] . '</p>';
$message .= '<p>Дата резервирования: ' . $_POST['date'] . '</p>';
$message .= '<p>Время резервирования: ' . $_POST['time'] . '</p>';
$message .= '<p>Количество гостей : ' . $_POST['persones'] . '</p>';
$message .= '<p>Комментарий к заказу: ' . $_POST['comments'] . '</p>';


print_r($message);

$to = 'virtyoz777@gmail.com' . ','; //не забудь поменять!
$to2 = 'alonso85@mail.ru' . ',';

$spectext = '<!DOCTYPE HTML><html><head><title>Заказ</title></head><body>';
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

$m = mail($to, 'Заказ в магазине', $spectext . $message . '</body></html>', $headers);
$m2 = mail($to2, 'Заказ в магазине', $spectext . $message . '</body></html>', $headers);

if ($m) {
    // echo 1;
    print_r($message);
} else {
    echo 0;
}

if ($m2) {
    echo 1;
} else {
    echo 0;
}
