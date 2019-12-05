<?php
$action = $_POST['action'];

require_once 'function.php';

switch ($action) {
    case 'outCold':
        outCold();
        break;
    case 'showMiniCart':
        showMiniCart();
        break;
}
