<?php
    include 'connect.php';
    $sql="SELECT * FROM `binhluan` b JOIN `khachhang` k ON `b`.`idkh` = `k`.`idkh` WHERE `b`.`idmon`=".$_POST['idmon'];
    $result = $connect->query($sql);
    $res=[];
    while($row=$result->fetch_assoc()){
        $res[] =$row;
    }
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();
?>