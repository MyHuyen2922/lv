<?php
    include 'connect.php';
        $sql = "SELECT * FROM `donhang` WHERE `trangthai`='Đã giao' AND `ngayban` LIKE '%".$_POST['day']."/".$_POST['month']."/".$_POST['year']." %' ";
    $result=$connect->query($sql);
    $res=[];
    while($row=$result->fetch_assoc()){ 
        $res[]=$row;
    }
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();  
?>