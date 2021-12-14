<?php
    include 'connect.php';
    $sql = "SELECT * FROM `mon` ";
    $result=$connect->query($sql);
    $response = [];
    while($row=$result->fetch_assoc()){
        $myObj = new stdClass();
        $myObj->idmon = $row['idmon'];
        $myObj->hinhanh = $row['hinhanh'];
        $myObj->gia = $row['gia'];
        $myObj->tenmon = $row['tenmon'];
        $response[$row['idmon']] = $myObj;
    }
    $res = new stdClass();
    $res->response = $response;
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();  
?>