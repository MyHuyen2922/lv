<?php
    include 'connect.php';
    $pass = md5($_POST['pass']);
    $result=$connect->query("select * from `shipper` where `email`='".$_POST['email']."' AND `mk` = '$pass' ") ;
    $myObj = new stdClass();
    if($result->num_rows > 0){
        $myObj->message = 'success';
        $myObj->code = 200;
    }
    else{
        $myObj->message = 'error';
        $myObj->code = 500;
    }
    echo json_encode($myObj, JSON_PRETTY_PRINT);
    $connect->close();
?>