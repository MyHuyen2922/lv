<?php
    include 'connect.php';
        $mk=md5($_POST['pass']);
        $sql="select * from `shipper` where `email`='".$_POST['email']."' AND `mk`='".$mk."'  ";
        $result = $connect->query($sql);
        $res = new stdClass;
        if($result->num_rows>0){
            $row = $result->fetch_assoc();
            $res->code=200;
            $res->message='success';
            $res->hoten =$row['hoten'];
            $res->idshipper=$row['idshipper'];
            $res->avatar=$row['avatar'];
        }
        else{
            $res->code=500;
            $res->message='error';
        }
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();      
    
?>