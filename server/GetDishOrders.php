<?php
    include 'connect.php';
    $sql = "SELECT * FROM `donhang` WHERE `trangthai`='Đã giao' ";
    $result=$connect->query($sql);
    $res=[];
    $giaodich = [];
    $tenmon = [];
    while($row=$result->fetch_assoc()){ 
        $giaodich[] = $row;
    }
    $res['giaodich'] = $giaodich;
    $result1 = $connect->query("SELECT tenmon,idmon FROM `mon` ");
    while($row1=$result1->fetch_assoc()){
        $tenmon[$row1['idmon']] = $row1['tenmon'];
    }
    $res['tenmon'] = $tenmon;
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();  
?>