<?php
    include 'connect.php';
    if(isset($_POST['condition'])){
        $sql = "SELECT * FROM `donhang` WHERE `trangthai`='".$_POST['condition']."' && `idkh`='".$_POST['idkh']."' ORDER BY `iddh` DESC";    
    }
    else{
        $sql = "SELECT * FROM `donhang`  WHERE `idkh`='".$_POST['idkh']."' ORDER BY `iddh` DESC";
    }
    $result=$connect->query($sql);
    $res=[];
    while($row=$result->fetch_assoc()){
        $res[]=$row;
    }
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();  
?>