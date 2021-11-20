<?php
    include 'connect.php';
    $sql="SELECT * FROM `binhluan` b JOIN `mon` m ON b.`idmon`=m.`idmon` JOIN `khachhang` k ON b.`idkh`=k.`idkh`";
    $result=$connect->query($sql);
    $response=[];
    while($row = $result->fetch_assoc()){
        $result1=$connect->query("SELECT COUNT(*) co FROM `report` WHERE `idbl`=".$row['idbl']);
        $row1=$result1->fetch_assoc();
        $row['report'] = $row1['co'];
        $response[] = $row;
    }
    echo json_encode($response, JSON_PRETTY_PRINT);
    $connect->close();
?>