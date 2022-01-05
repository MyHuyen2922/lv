<?php
    include 'connect.php';
    $oldpass = md5($_POST['oldpass']);
    $newpass = md5($_POST['newpass']);
    $sql ="SELECT * FROM `shipper` WHERE `idshipper` =  ".$_POST['idshipper'];
    $result=$connect->query($sql);
    $res = new stdClass;
    $row = $result->fetch_assoc();
    if($row['mk'] == $oldpass){
        if($connect->query("UPDATE `shipper` SET `mk` = '".$newpass."' WHERE `idshipper` =  ".$_POST['idshipper'])){
            $res->code=200;
            $res->message='success';
        }
        else{
            $res->code=500;
            $res->message='error';
        }
    }
    else{
        $res->code=400;
        $res->message='error';
    }
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();  
?>