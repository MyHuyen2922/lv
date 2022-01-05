<?php
    include 'connect.php';
    //$idmon=$_POST['idmon'];
    $idmon= "";
    $res=[];
    for($i=0; $i < count($_POST['idmon']) ; $i++){
        $idmon = $_POST['idmon'][$i];
        $sql= "SELECT g.*,m.*, k.`km` FROM `giohang` g JOIN `mon` m ON `g`.idmon=`m`.idmon left join `khuyenmai` k on `m`.idmon=`k`.idmon WHERE `idkh`= ".$_POST['idkh']." AND `m`.`idmon`=".$idmon." ";
        $result = $connect->query($sql);
        while($row=$result->fetch_assoc()){
            $res[] =$row;
        }
    }
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close(); 
?>