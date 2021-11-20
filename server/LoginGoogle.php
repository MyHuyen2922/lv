<?php
    include 'connect.php';
    $sql = "SELECT * FROM `khachhang` WHERE `idkh` = ".$_POST['idkh'] ;
    $result = $connect->query($sql);
    $res = [];
    if($result->num_rows > 0){
        $row = $result->fetch_assoc();
        $res[]= $row;
    }
    else{
        $sql1="INSERT INTO `khachhang`(`idkh`,`hoten`,`avatar`) VALUES (".$_POST['idkh'].", '".$_POST['hoten']."','img/chipi.png')";
        if($connect->query($sql1)){
        $sql2 = "SELECT * FROM `khachhang` WHERE `idkh` = ".$_POST['idkh'] ;
        $result1 = $connect->query($sql2);
        $row = $result1->fetch_assoc();
        $res[]= $row;
        }
    }
    echo json_encode($res,JSON_PRETTY_PRINT);
    $connect->close();
?>