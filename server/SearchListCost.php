<?php
    include 'connect.php'; 
    $number='';
    $start = ($_POST['number'] - 1) * 15;
    if($_POST['cost'] =='thap'){
        $result1=$connect->query("SELECT COUNT(idmon) AS number FROM `mon`WHERE `trangthai`='Bình thường' AND (`gia` BETWEEN 0 AND 30000)");
        if($result1->num_rows>0){
            $row2=$result1->fetch_assoc();
            $number = ceil($row2['number'] / 15);
        }
        $sql = "SELECT  m.*, k.`km` FROM `mon` m left join `khuyenmai` k on `m`.idmon=`k`.idmon WHERE `m`.`trangthai`='Bình thường' AND (`m`.`gia` BETWEEN 0 AND 30000) ORDER BY `m`.`idmon` DESC LIMIT ".$start.",15";  
    }
    else if($_POST['cost'] =='tbthap'){
        $result1=$connect->query("SELECT COUNT(idmon) AS number FROM `mon`WHERE `trangthai`='Bình thường' AND (`gia` BETWEEN 30000 AND 60000)");
        if($result1->num_rows>0){
            $row2=$result1->fetch_assoc();
            $number = ceil($row2['number'] / 15);
        }
        $sql = "SELECT  m.*, k.`km` FROM `mon` m left join `khuyenmai` k on `m`.idmon=`k`.idmon WHERE `m`.`trangthai`='Bình thường' AND (`m`.`gia` BETWEEN 30000 AND 60000) ORDER BY `m`.`idmon` DESC LIMIT ".$start.",15";  

    }
    else if($_POST['cost'] =='tb'){
        $result1=$connect->query("SELECT COUNT(idmon) AS number FROM `mon`WHERE `trangthai`='Bình thường' AND (`gia` BETWEEN 60000 AND 90000)");
        if($result1->num_rows>0){
            $row2=$result1->fetch_assoc();
            $number = ceil($row2['number'] / 15);
        }
        $sql = "SELECT  m.*, k.`km` FROM `mon` m left join `khuyenmai` k on `m`.idmon=`k`.idmon WHERE `m`.`trangthai`='Bình thường' AND (`m`.`gia` BETWEEN 60000 AND 90000) ORDER BY `m`.`idmon` DESC LIMIT ".$start.",15";  

    }
    else if($_POST['cost'] =='asc'){
        $result1=$connect->query("SELECT COUNT(idmon) AS number FROM `mon`WHERE `trangthai`='Bình thường' ORDER BY `gia` ASC");
        if($result1->num_rows>0){
            $row2=$result1->fetch_assoc();
            $number = ceil($row2['number'] / 15);
        }
        $sql = "SELECT  m.*, k.`km` FROM `mon` m left join `khuyenmai` k on `m`.idmon=`k`.idmon WHERE `m`.`trangthai`='Bình thường' ORDER BY `m`.gia ASC LIMIT ".$start.",15";  

    }
    else if($_POST['cost'] =='desc'){
        $result1=$connect->query("SELECT COUNT(idmon) AS number FROM `mon`WHERE `trangthai`='Bình thường' ORDER BY `gia` DESC");
        if($result1->num_rows>0){
            $row2=$result1->fetch_assoc();
            $number = ceil($row2['number'] / 15);
        }
        $sql = "SELECT  m.*, k.`km` FROM `mon` m left join `khuyenmai` k on `m`.idmon=`k`.idmon WHERE `m`.`trangthai`='Bình thường' ORDER BY `m`.gia DESC LIMIT ".$start.",15";  

    }
    else{
        $result1=$connect->query("SELECT COUNT(idmon) AS number FROM `mon`WHERE `trangthai`='Bình thường' AND (`gia` BETWEEN 90000 AND 150000)");
        if($result1->num_rows>0){
            $row2=$result1->fetch_assoc();
            $number = ceil($row2['number'] / 15);
        }
        $sql = "SELECT  m.*, k.`km` FROM `mon` m left join `khuyenmai` k on `m`.idmon=`k`.idmon WHERE `m`.`trangthai`='Bình thường' AND (`m`.`gia` BETWEEN 90000 AND 120000) ";  
    }
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