<?php
    include 'connect.php';
    $oldpass = md5($_POST['oldpass']);
    $newpass = md5($_POST['newpass']);
    $sql ="SELECT * FROM `shipper` WHERE `idshipper` =  '".$_POST['idshipper']."' ";
    $result=$connect->query($sql);
    $row = $result->fetch_assoc();
    $myObj = new stdClass();
    if($row['mk'] == $oldpass){
        if($connect->query("UPDATE `shipper` SET `mk` = '".$newpass."' WHERE `idshipper` =  ".$_POST['idshipper'])){
            $myObj->message = 'success';
            $myObj->code = 200;
        }
        else{
            $myObj->message = 'error';
            $myObj->code = 500;
        }
    }
    else{
        $myObj->message = 'error';
        $myObj->code = 400;
    }
    echo json_encode($myObj, JSON_PRETTY_PRINT);
    $connect->close();  
?>