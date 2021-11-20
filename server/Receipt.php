<?php
    include 'connect.php';
    $sql="UPDATE `donhang` SET `idshipper`=".$_POST['idshipper'].",`trangthai`='Đang giao'  WHERE `iddh`=".$_POST['iddh'] ;
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