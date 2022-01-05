<?php 
    include 'connect.php';
    $sql="UPDATE `mon` SET `soluong`= 0 ,`trangthai`='Ngừng bán' WHERE `idmon`= ".$_POST['idmon']." ";
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