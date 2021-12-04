<?php
    include 'connect.php';
    if(isset($_POST['email'])){
        $sql="select * from `khachhang` where `email`='".$_POST['email']."'";
        $result = $connect->query($sql);
        if($result->num_rows>0){
            $row = $result->fetch_assoc();
            $res['vaitro'] = 'user';
            $res[]=$row;
        }
        else{
            $result=$connect->query("select * from `shipper` where `email`='".$_POST['email']."'");
            if($result->num_rows >0){
                $row = $result->fetch_assoc();
                $res['vaitro'] = 'shipper'; 
                $res[]=$row;
            }
            else{
                $res[]= 400;
            }
        }
    }
    else if(isset($_POST['idshipper'])){
        $sql="select * from `shipper` where `idshipper`='".$_POST['idshipper']."'";
        $result=$connect->query($sql);
        $res=[];
        while($row=$result->fetch_assoc()){
            $res[]=$row;
        }
    }
    else{
        $sql="select * from `khachhang` where `idkh`='".$_POST['idkh']."'";
        $result=$connect->query($sql);
        $res=[];
        while($row=$result->fetch_assoc()){
            $res[]=$row;
        }
    }
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();      
    
?>