<?php
    include 'connect.php';
    $sql= "INSERT INTO `report`(`idbl`,`idkh`,`lido`) VALUES (".$_POST['idbl'].",".$_POST['idkh'].",'".$_POST['lido']."')";
    $res=array();
    if($connect->query($sql)){
        $res[]= array(
            "message" => "success",
            "code" => "200",
        );
    }
    else{
        $res[]= array(
            "message" => "error",
            "code" => "500",
        );
    }
    echo json_encode($res,JSON_PRETTY_PRINT);
    $connect->close();
?>