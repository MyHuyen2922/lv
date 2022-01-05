<?php
    include 'connect.php';
    if($_POST['loai'] == 'all'){
        $sql ="SELECT * FROM `mon` ";
        $result = $connect->query($sql);
        while($row=$result->fetch_assoc()){
            $result1 = $connect->query("SELECT * FROM `khuyenmai` WHERE `idmon`=".$row['idmon']);
            if($result1->num_rows > 0){
                $connect->query("UPDATE `khuyenmai` SET `km`= '".$_POST['km']."',`tu`='".$_POST['from']."',`den`='".$_POST['to']."' WHERE `idmon`=".$row['idmon']);
            }
            else{
                $connect->query("INSERT `khuyenmai`(`km`,`loai`,`idmon`,`tu`,`den`) VALUES (".$_POST['km'].",'".$row['loai']."',".$row['idmon'].",'".$_POST['from']."','".$_POST['to']."')");
            }
        }
    }
    else{
        $sql ="SELECT * FROM `mon` WHERE `loai` = '".$_POST['loai']."' ";
        $result = $connect->query($sql);
        while($row=$result->fetch_assoc()){
            $result1 = $connect->query("SELECT * FROM `khuyenmai` WHERE `idmon`=".$row['idmon']);
            if($result1->num_rows > 0){
                $connect->query("UPDATE `khuyenmai` SET `km`= '".$_POST['km']."',`tu`='".$_POST['from']."',`den`='".$_POST['to']."' WHERE `idmon`=".$row['idmon']);
            }
            else{
                $connect->query("INSERT `khuyenmai`(`km`,`loai`,`idmon`,`tu`,`den`) VALUES (".$_POST['km'].",'".$row['loai']."',".$row['idmon'].",'".$_POST['from']."','".$_POST['to']."')");
            }
        }
    }
    $res= array();
    $res[]= array(
        'message' => 'success',
        'code' => '200',
    );


    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();
?>