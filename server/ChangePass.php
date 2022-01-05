<?php
    include 'connect.php';
    $oldpass = md5($_POST['oldpass']);
    $newpass = md5($_POST['newpass']);
    $sql ="SELECT * FROM `khachhang` WHERE `idkh` =  ".$_POST['idkh'];
    $result=$connect->query($sql);
    $res= array();
    $row = $result->fetch_assoc();
    if($row['mk'] == $oldpass){
        if($connect->query("UPDATE `khachhang` SET `mk` = '".$newpass."' WHERE `idkh` =  ".$_POST['idkh'])){
            $res[] = array(
                "message" => "Success",
                "code" => "200",
            );
        }
        else{
            $res[] = array(
                "message" => "error",
                "code" => "500",
            );
        }
    }
    else{
        $res[] = array(
            "message" => "error",
            "code" => "400",
        );
    }
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();  
?>