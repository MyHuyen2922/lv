<?php
    include 'connect.php';
    $hinhanh="img/".$_FILES['hinhanh']['name'];
    $tpdd ="";
    for($i=0; $i < count($_POST['tpdd']); $i++){
        $tpdd .= $_POST['tpdd'][$i]."|";
    }
    if($_POST['loai']== 'banhngot'){
        $sql="INSERT INTO `mon`(`tenmon`, `gia`, `mota`,`nguyenlieu`,`tpdd`,`loai`,`soluong`,`hinhanh`,`trangthai`) VALUES
        ('".$_POST['tenmon']."',".$_POST['gia'].",'".$_POST['mota']."','".$_POST['nguyenlieu']."','".$tpdd."','".$_POST['loai']."',".$_POST['soluong'].",'".$hinhanh."','Bình thường')";    
        $connect->query($sql);

        $result1=$connect->query("SELECT max(idmon) max_idmon FROM `mon`");
        $row1 = $result1->fetch_assoc();
        $max_idmon=$row1['max_idmon'];

        $sql1 = " INSERT INTO `lo`(`idmon`,`ngaysx`,`hansd`,`soluong`,`ten_lo`) VALUES (".$max_idmon.",'".$_POST['ngaysx']."','".$_POST['hansd']."',".$_POST['soluong'].",1) ";
    }
    else{
        $sql1 = "INSERT INTO `mon`(`tenmon`, `gia`, `mota`,`nguyenlieu`,`tpdd`,`loai`,`hinhanh`,`trangthai`) VALUES
        ('".$_POST['tenmon']."',".$_POST['gia'].",'".$_POST['mota']."','".$_POST['nguyenlieu']."','".$tpdd."','".$_POST['loai']."','".$hinhanh."','Bình thường')";
    }
    $result =array();
    if($connect->query($sql1)){
        move_uploaded_file($_FILES['hinhanh']['tmp_name'],$hinhanh);
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