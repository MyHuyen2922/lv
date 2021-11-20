<?php
    include 'connect.php';
    $result2 = $connect->query("SELECT max(ten_lo) max_lo FROM `lo` WHERE `idmon`=".$_POST['idmon']);
    if($result2->num_rows>0){
        $row2=$result2->fetch_assoc();
        $max_lo = $row2['max_lo']+1;
    }
    $result1=$connect->query("SELECT * FROM `mon` WHERE `idmon`=".$_POST['idmon']);
        $row=$result1->fetch_assoc();
        $sl_moi= $row['soluong'] + $_POST['sl'];
        $sql="UPDATE `mon` SET `soluong`=".$sl_moi." WHERE `idmon`=".$_POST['idmon'];
        $sql1 = "INSERT INTO `lo` (`idmon`,`soluong`,`ngaysx`,`hansd`,`ten_lo`) VALUES (".$_POST['idmon'].", ".$_POST['sl'].",'".$_POST['ngaysx']."','".$_POST['hansd']."', ".$max_lo.")";
    $result = array();
    if($connect ->query($sql1) && $connect ->query($sql)){
        $result[] = array(
            "message" => "Succes",
            "code" => "200"
        );
    }
    else{
        $result[] = array(
            "message" => "Error",
            "code" => "500"
        );
    }
    echo json_encode($result, JSON_PRETTY_PRINT);
    $connect->close();
?> 