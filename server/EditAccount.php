<?php
    include 'connect.php';
    $avatar="img/".$_FILES['avatar']['name'];
    $sql = "UPDATE `khachhang` SET `hoten`='".$_POST['hoten']."', `email`='".$_POST['email']."', `sdt`='".$_POST['sdt']."',`dc`='".$_POST['dc']."' WHERE `idkh`='".$_POST['idkh']."' ";
    $result = array();
    if($connect ->query($sql)){
        if($_FILES['avatar']['error'] == 0){
            $avatar="img/".$_FILES['avatar']['name'];
            $connect->query('UPDATE `khachhang` SET `avatar`="'.$avatar.'" WHERE `idkh`="'.$_POST['idkh'].'"');
            move_uploaded_file($_FILES['avatar']['tmp_name'],$avatar);
        }
        $result[] = array(
            "message" => "Success",
            "code" => "200"
        );
    }
    else{
        $result = array(
            "message" => "Error",
            "code" => "500"
        );
    }
    echo json_encode($result, JSON_PRETTY_PRINT);
    $connect ->close();
?>