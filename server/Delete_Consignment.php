<?php 
    include 'connect.php';
    $sql="DELETE FROM `lo` WHERE `id_lo`= ".$_POST['idlo']." ";
    $result =array(); 
    if($connect->query($sql)){
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