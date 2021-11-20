<?php
    include 'connect.php';
    $email=$_POST['email'];
    $mk=md5($_POST['mk']);
    $sql ="SELECT * FROM `khachhang` ";
    $result=$connect->query($sql);
    $res= array();
    $row = $result->fetch_assoc();
    $result1 = $connect->query("SELECT max(`idkh`+1) idkh FROM `khachhang` WHERE `idkh`< 10000000 ");
    $row1 = $result1->fetch_assoc();
    if($row['email'] != $email){
        if(isset($_FILES['avatar'])){
            $avatar="img/".$_FILES['avatar']['name'];
            if($connect->query("INSERT INTO `khachhang`(`idkh`,`hoten`, `email`, `sdt`, `dc`, `mk`,`avatar`) VALUES
                (".$row1['idkh'].",'".$_POST['hoten']."','".$_POST['email']."','".$_POST['sdt']."','".$_POST['dc']."','$mk','".$avatar."')")){
                move_uploaded_file($_FILES['avatar']['tmp_name'],$avatar);
                $res[] = array(
                    "message" => "Success",
                    "code" => "200",
                );
            }
            else{ 
                $res[] = array(
                    "message" => "error",
                    "code" => "500",
                );
            }
        }
        else{
            if( $connect->query("INSERT INTO `khachhang`(`idkh`,`hoten`, `email`, `sdt`, `dc`, `mk`,`avatar`) VALUES
            (".$row1['idkh'].",'".$_POST['hoten']."','".$_POST['email']."','".$_POST['sdt']."','".$_POST['dc']."','$mk','img/chipi.png')")){
                  $res[] = array(
                    "message" => "Success",
                    "code" => "200",
                );
            }
            else{
                $res[] = array(
                    "message" => "error",
                    "code" => "500",
                );
            }
        }
    }
    else{
        $res[] = array(
            "message" => "error",
            "code" => "400",
        );
    }
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();  
?>