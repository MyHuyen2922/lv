<?php
    include 'connect.php';
    $number='';
    $start = ($_POST['number'] - 1) * 18;
    if(isset($_POST['condition'])){
        $result1=$connect->query("SELECT COUNT(idmon) AS number FROM `mon` WHERE `loai`='".$_POST['condition']."' AND `trangthai`='Bình thường'");
        if($result1->num_rows>0){
            $row2=$result1->fetch_assoc();
            $number = ceil($row2['number'] / 18);
        }
        $sql = "SELECT  m.*, k.`km` FROM `mon` m left join `khuyenmai` k on `m`.idmon=`k`.idmon WHERE `m`.`loai`='".$_POST['condition']."' AND `m`.`trangthai`='Bình thường' ORDER BY `m`.`idmon`  DESC LIMIT ".$start.",18";        
    }
    else{
        $result1=$connect->query("SELECT COUNT(idmon) AS number FROM `mon` WHERE `trangthai`='Bình thường'");
        if($result1->num_rows>0){
            $row2=$result1->fetch_assoc();
            $number = ceil($row2['number'] / 18);
        }
        $sql = "SELECT  m.*, k.`km` FROM `mon` m left join `khuyenmai` k on `m`.idmon=`k`.idmon WHERE `m`.`trangthai`='Bình thường' ORDER BY `m`.`idmon` DESC LIMIT ".$start.",18";
    }
    $result=$connect->query($sql);
    $res=[];
    while($row=$result->fetch_assoc()){
        $res[]=$row;
    }
    $res[] = $number;
    $result2= $connect->query("SELECT count(*) sl FROM `mon` WHERE `soluong` = 0 AND `loai` = 'banhngot' " );
    $row2 = $result2->fetch_assoc();
    $res[] = $row2['sl'];
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();  
?>