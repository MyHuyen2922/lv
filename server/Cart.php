<?php
    include 'connect.php';
    $sql= "SELECT g.*,m.*, k.`km` FROM `giohang` g JOIN `mon` m ON `g`.idmon=`m`.idmon left join `khuyenmai` k on `m`.idmon=`k`.idmon WHERE `idkh`= '".$_POST['idkh']."' ";
    $result = $connect->query($sql);
    $res=[];
    while($row=$result->fetch_assoc()){
        $res[] =$row;
    }
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close(); 
?>