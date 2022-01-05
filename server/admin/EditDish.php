<?php
    include 'connect.php';
    $sql= "UPDATE `mon` SET `tenmon`='".$_POST['tenmon']."',`gia`=".$_POST['gia'].",`mota`='".$_POST['mota']."',`nguyenlieu`='".$_POST['nguyenlieu']."',`trangthai`='Bình thường' WHERE `idmon`=".$_POST['idmon'];
    $result = [];
    if($connect->query($sql)){
        if($_FILES['hinhanh']['error'] == 0){
            $hinhanh="../img/".$_FILES['hinhanh']['name'];
            $connect->query('UPDATE `mon` SET `hinhanh`="'.$hinhanh.'" WHERE `idmon`="'.$_POST['idmon'].'"');
            move_uploaded_file($_FILES['hinhanh']['tmp_name'], $hinhanh);
        }
        $result[]=array(
            "message" => "Success",
            "code" => "200",
        );
    }
    else{
        $result[]=array(
            "message" => "Error",
            "code" => "500",
        );
    }
    echo json_encode($result, JSON_PRETTY_PRINT);
    $connect->close();
?>