<?php
    include 'connect.php';
    $result1=$connect->query("SELECT * FROM `giohang` WHERE `idkh`=".$_POST['idkh']." && `sl` != ".$_POST['sl']." && `idmon`=".$_POST['idmon']);
    if($result1->num_rows>0){
        $sql="UPDATE `giohang` SET `sl`=".$_POST['sl']." WHERE `idkh`=".$_POST['idkh']." && `idmon`=".$_POST['idmon'];
    }
    $result = array();
    if($connect ->query($sql)){
        $result[] = array(
            "message" => "Succes",
            "code" => "200"
        );
    }
    else{
        $result[] = array(
            "message" => "Error",
            "code" => "500"
        );
    }
    echo json_encode($result, JSON_PRETTY_PRINT);
    $connect->close();
?>