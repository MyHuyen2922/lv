<?php 
    include 'connect.php';
    $sql="DELETE FROM `shipper` WHERE `idshipper`= ".$_POST['idshipper'];
    $result =array();
    if($connect->query($sql)){
        $result[]=array(
            "message" => "Sucess",
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