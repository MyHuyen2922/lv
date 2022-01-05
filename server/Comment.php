<?php
    include 'connect.php';
    $result = array();
    if(isset($_POST['diem'])){
        $sql = "INSERT INTO `binhluan`(`idkh`,`idmon`,`cmt`,`diem`) VALUE (".$_POST['idkh'].",".$_POST['idmon'].",'".$_POST['cmt']."',".$_POST['diem']." ) ";
        $sql1 = "UPDATE `binhluan` SET `diem`=".$_POST['diem']." WHERE `idkh`=".$_POST['idkh']." && `idmon`=".$_POST['idmon'];
        if($connect->query($sql) && $connect->query($sql1)){
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
    }
    else{
        $res=$connect->query("SELECT `diem` FROM `binhluan` WHERE `idkh`=".$_POST['idkh']." && `idmon`=".$_POST['idmon']);
        $point = 0;
        if($res->num_rows > 0){
            $row=$res->fetch_assoc();
            $point = $row['diem'];
        }
        $sql = "INSERT INTO `binhluan`(`idkh`,`idmon`,`cmt`,`diem`) VALUE (".$_POST['idkh'].",".$_POST['idmon'].",'".$_POST['cmt']."',".$point." ) ";
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
    }
    echo json_encode($result, JSON_PRETTY_PRINT);
    $connect->close();
?>