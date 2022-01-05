<?php
    include 'connect.php';
    $avatar="img/".$_FILES['avatar']['name'];
    $sql = "UPDATE `shipper` SET `hoten`='".$_POST['hoten']."', `email`='".$_POST['email']."', `sdt`='".$_POST['sdt']."',`dc`='".$_POST['dc']."' WHERE `idshipper`='".$_POST['idshipper']."' ";
    $result = array();
    if($connect ->query($sql)){
        if($_FILES['avatar']['error'] == 0){
            $avatar="img/".$_FILES['avatar']['name'];
            $connect->query('UPDATE `shipper` SET `avatar`="'.$avatar.'" WHERE `idshipper`="'.$_POST['idshipper'].'"');
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