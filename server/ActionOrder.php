<?php
    include 'connect.php';
    if($_POST['trangthai'] == 'Chờ xác nhận'){
        $sql="UPDATE `donhang` SET `idshipper`=".$_POST['idshipper'].",`trangthai`='Đang giao'  WHERE `iddh`=".$_POST['iddh'] ;
    }
    else{
        $sql="UPDATE `donhang` SET `trangthai`='Đã giao'  WHERE `iddh`=".$_POST['iddh'] ;
    }
    $myObj = new stdClass();
    if($connect->query($sql)){
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