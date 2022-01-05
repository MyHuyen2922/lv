<?php
    include 'connect.php';
    if($_POST['trangthai'] = 'Chờ xác nhận'){
        $sql="UPDATE `donhang` SET `idshipper`=".$_POST['idshipper'].",`trangthai`='Đang giao'  WHERE `iddh`=".$_POST['iddh'] ;
    }
    else{
        $sql="UPDATE `donhang` SET `trangthai`='Đã giao'  WHERE `iddh`=".$_POST['iddh'] ;
    }
    $res = new stdClass;
    if($connect ->query($sql)){
        $res->code=200;
        $res->message='success';
    }
    else{
        $res->code=500;
        $res->message='error';
    }
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();
?>