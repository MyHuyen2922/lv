<?php
    include 'connect.php'; 
    $number='';
    $start = ($_POST['number'] - 1) * 15;
    $result1=$connect->query("SELECT COUNT(idmon) AS number FROM `mon` WHERE `trangthai`='Bình thường' AND (`gia` BETWEEN ".$_POST['from']." AND ".$_POST['to'].")");
    if($result1->num_rows>0){
        $row2=$result1->fetch_assoc();
        $number = ceil($row2['number'] / 15);
    }
    $sql = "SELECT  m.*, k.`km` FROM `mon` m left join `khuyenmai` k on `m`.idmon=`k`.idmon WHERE `m`.`trangthai`='Bình thường' AND (`m`.`gia` BETWEEN ".$_POST['from']." AND ".$_POST['to'].") ORDER BY `m`.`idmon` DESC LIMIT ".$start.",15";   
    $result=$connect->query($sql);
    $res=[];
    while($row=$result->fetch_assoc()){
        $res1=$connect->query("SELECT ROUND(AVG(`diem`), 0) avg FROM `binhluan` WHERE `idmon`=".$row['idmon']);
        $row1=$res1->fetch_assoc();
        $row['diem'] = $row1['avg'];
        $res[]=$row;
    }
    $res[] = $number;
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();   
?>