<?php
    include 'connect.php';
    $sql = "SELECT * FROM `mon` ";
    $result=$connect->query($sql);
    $res=[];
    $idmon = [];
    $gia = [];
    while($row=$result->fetch_assoc()){ 
        $idmon[] = $row['idmon'];
        $gia[] = $row['gia'];
    }
    $res['idmon'] = $idmon;
    $res['gia'] = $gia;
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();  
?>