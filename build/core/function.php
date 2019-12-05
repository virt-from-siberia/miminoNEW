<?php

// $servername = "localhost";
// $username = "virtyoz777_aleks";
// $password = "%O5HhBc5";
// $dbname = "virtyoz777_aleks";

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "goods";


function connect()
{

    $conn = mysqli_connect("localhost", "root", "", "goods");
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    // mysqli_set_charset($conn, "utf8");
    return $conn;
}

function showMiniCart()
{
    $conn = connect();
    $sql = "SELECT *  FROM goods ";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $out[$row["id"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}


function outCold()
{
    $conn = connect();
    $sql = "SELECT *  FROM goods WHERE category = 'cold' ";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $out[$row["id"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}
