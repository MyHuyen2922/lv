<?php
    include 'connect.php';
    $number='';
    $start = ($_POST['number'] - 1) * 18;
    if(isset($_POST['condition'])){
        $result1=$connect->query("SELECT COUNT(iddh) AS number FROM `donhang` WHERE `trangthai`='".$_POST['condition']."' ");
        if($result1->num_rows>0){
            $row2=$result1->fetch_assoc();
            $number = ceil($row2['number'] / 18);
        }
        $sql = "SELECT * FROM `donhang` WHERE `trangthai`='".$_POST['condition']."' ORDER BY `iddh`  DESC LIMIT ".$start.",18";    
    }
    else{
        $result1=$connect->query("SELECT COUNT(iddh) AS number FROM `donhang` ");
        if($result1->num_rows>0){
            $row2=$result1->fetch_assoc();
            $number = ceil($row2['number'] / 18);
        }
        $sql = "SELECT * FROM `donhang` ORDER BY `iddh`  DESC LIMIT ".$start.",18";
    }
    $result=$connect->query($sql);
    $res=[];
    while($row=$result->fetch_assoc()){
        $res[]=$row;
    }
    $res[] = $number;
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();  
?> 