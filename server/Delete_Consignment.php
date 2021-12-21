<?php 
    include 'connect.php';
    $result1=$connect->query("SELECT * FROM `mon` WHERE `idmon`=".$_POST['idmon']);
        $row=$result1->fetch_assoc();
        $sl_moi= $row['soluong'] - $_POST['sl'];
        $sql="UPDATE `mon` SET `soluong`=".$sl_moi." WHERE `idmon`=".$_POST['idmon'];
        $sql1="DELETE FROM `lo` WHERE `id_lo`= ".$_POST['idlo']." ";
    $result =array(); 
    if($connect ->query($sql1) && $connect ->query($sql)){
        $result[]=array(
            "message" => "Success",
            "code" => "200", 
        );
    }
    else{
        $result[]=array(
            "message" => "Error",
            "code" => "500"
        );
    }
    echo json_encode($result, JSON_PRETTY_PRINT);
    $connect->close(); 
?>