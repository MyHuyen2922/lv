<?php 
    include 'connect.php';
    if($_POST['type']== 'all'){
        $sql="DELETE FROM `khuyenmai` ";
    }
    else{
        $sql="DELETE FROM `khuyenmai` WHERE `loai`= '".$_POST['type']."' ";
    }
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