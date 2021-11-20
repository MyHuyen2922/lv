<?php
    include 'connect.php';
    $password=md5($_POST['password']);
    $sql= "UPDATE `khachhang` set `mk`='".$password."' WHERE `email` ='".$_POST['email']."'  ";
    $result = array();
    if($connect->query($sql)){
        $result[]=array(
            "message" => "Sucess",
            "code" => "200",
        );
    }
    else{
        $result[]=array(
            "message" => "Error",
            "code" => "500"
        );
    }
    echo json_encode($result, JSON_PRETTY_PRINT);
    $connect->close();
?>