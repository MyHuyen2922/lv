<?php
    include 'connect.php';
    $idmon =$_POST['idmon'];
    $sql ="SELECT * FROM `khuyenmai` WHERE `idmon`=".$idmon." ";
    $result=$connect->query($sql);
    if($result->num_rows >0 ){
        $sql="UPDATE `khuyenmai` SET `km`=".$_POST['km'].",`tu`='".$_POST['from']."',`den`='".$_POST['to']."' WHERE `idmon`=".$idmon."";
    }
    else{
        $sql = "INSERT INTO `khuyenmai`(`idmon`,`km`,`tu`,`den`,`loai`) VALUE (".$_POST['idmon'].",".$_POST['km'].",'".$_POST['from']."','".$_POST['to']."','".$_POST['loai']."')";
    }
    $res = array();
    if($connect->query($sql)){
        $res[]=array(
            "message" => "Sucess",
            "code" => "200", 
        );
    }
    else{
        $res[]=array(
            "message" => "Error",
            "code" => "500"
        );
    }
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();
?>