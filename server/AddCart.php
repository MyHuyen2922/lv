<?php
    include 'connect.php';
    $result1=$connect->query("SELECT * FROM `giohang` WHERE `idkh`=".$_POST['idkh']." && `idmon`=".$_POST['idmon']);
    if($result1->num_rows>0){
        $row=$result1->fetch_assoc();
        $sl_moi= $row['sl'] + $_POST['sl'];
        $sql="UPDATE `giohang` SET `sl`=".$sl_moi." WHERE `idkh`=".$_POST['idkh']." && `idmon`=".$_POST['idmon'];
    }
    else{
        $sql = "INSERT INTO `giohang` (`idmon`,`sl`,`idkh`,`ghichu`,`size`,`giagh`) VALUES (".$_POST['idmon'].", ".$_POST['sl'].", ".$_POST['idkh'].",'".$_POST['ghichu']."','".$_POST['size']."',".$_POST['gia']." )";
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