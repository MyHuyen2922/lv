<?php
    include 'connect.php';
    $sql = "SELECT * FROM `mon` ";
    $result=$connect->query($sql);
    $response = [];
    while($row=$result->fetch_assoc()){
        $res = new stdClass;
        $res->idmon=$row['idmon'];
        $res->gia=$row['gia'];
        $res->hinhanh=$row['hinhanh'];
        $res->loai=$row['loai'];
        $res->mota=$row['mota'];
        $res->nguyenlieu=$row['nguyenlieu'];
        $res->tpdd=$row['tpdd'];
        $res->tenmon=$row['tenmon'];
        $res->soluong=$row['soluong'];
        $res->trangthai=$row['trangthai'];
        $response[] = $res;
    }
    echo json_encode($response, JSON_PRETTY_PRINT);
    $connect->close();  
?>