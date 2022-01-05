<?php 
    include 'connect.php';
    $sql="DELETE FROM `giohang` WHERE `idmon`= ".$_POST['idmon']." && `idkh`= '".$_POST['idkh']."' ";
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