<?php
    include 'connect.php';
    $sql = "SELECT * FROM `shipper` ";
    $result=$connect->query($sql);
    $res=[];
    while($row=$result->fetch_assoc()){
        $res[] = $row;
    }
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();
?>

