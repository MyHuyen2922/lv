<?php
    include 'connect.php'; 
    $sql = "SELECT * FROM `khuyenmai` k JOIN `mon` m ON `k`.`idmon` =`m`.`idmon`";   
    $result=$connect->query($sql);
    $res=[];
    while($row=$result->fetch_assoc()){
        $res[]=$row;
    }
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();  
?>