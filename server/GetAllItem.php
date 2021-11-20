<?php
    include 'connect.php';
    $sql = "SELECT m.*, k.`km` FROM `mon` m left join `khuyenmai` k on `m`.`idmon`=`k`.`idmon`";
    $result=$connect->query($sql);
    $res=[];
    while($row=$result->fetch_assoc()){
        $res1=$connect->query("SELECT ROUND(AVG(`diem`), 0) avg FROM `binhluan` WHERE `idmon`=".$row['idmon']);
        $row1=$res1->fetch_assoc();
        $row['diem'] = $row1['avg'];
        $res[$row['idmon']]=$row;
    }
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();  
?>