<?php
    include 'connect.php';
    $number='';
    $start = ($_POST['number'] - 1) * 18;
    $result1=$connect->query("SELECT COUNT(idmon) AS number FROM `mon` WHERE `loai`='banhngot' AND `trangthai`='Bình thường'");
    if($result1->num_rows>0){
        $row2=$result1->fetch_assoc();
        $number = ceil($row2['number'] / 18);
    }
    $sql = "SELECT * FROM `mon` WHERE `loai`='banhngot' AND `trangthai`='Bình thường' ORDER BY `idmon` DESC LIMIT ".$start.",18";
    $result=$connect->query($sql);
    $res=[];
    while($row=$result->fetch_assoc()){
        $res[]=$row;
    }
    $res[] = $number;
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();  
?> 