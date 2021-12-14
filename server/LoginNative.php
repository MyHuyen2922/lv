<?php
    include 'connect.php';
    $pass = md5($_POST['pass']);
    $result=$connect->query("select * from `shipper` where `email`='".$_POST['email']."' AND `mk` = '$pass' ") ;
    $myObj = new stdClass();
    if($result->num_rows > 0){
        $row = $result->fetch_assoc();
        $myObj->message = 'success';
        $myObj->code = 200;
        $myObj->idshipper = $row['idshipper'];
        $myObj->hoten = $row['hoten'];
        $myObj->sdt = $row['sdt'];
        $myObj->avatar = $row['avatar'];
    }
    else{
        $myObj->message = 'error';
        $myObj->code = 500;
    }
    echo json_encode($myObj, JSON_PRETTY_PRINT);
    $connect->close();
?>