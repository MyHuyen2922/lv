<?php
    include 'connect.php';
    $res=[];
    if(isset($_POST['insert'])){
        $listitem= "";
        $number = "";
        $size = "";
        $gia = "";
        $result = array();
        for($i=0; $i < count($_POST['idmon']) ; $i++){
            $listitem .= "|".$_POST['idmon'][$i];
            $number .= "|".$_POST['sl'][$i];
            $size .= "|".$_POST['size'][$i];
            $gia .= "|".$_POST['gia'][$i];
            $sql = "INSERT INTO `donhang` (`idmon`,`sl`,`idkh`,`ghichu`,`trangthai`,`ngayban`,`tongtien`,`size`,`giadh`,`hotennhan`,`sdtnhan`,`dcnhan`,`tienship`,`hinhthuc`,`pttt`) VALUES
            ('".$listitem."', '".$number."', ".$_POST['idkh'].",'".$_POST['ghichu']."','Chờ xác nhận','".$_POST['ngayban']."',1, '".$size."', '".$gia."','".$_POST['hotennhan']."','".$_POST['sdtnhan']."','".$_POST['dcnhan']."',".$_POST['tienship'].",'".$_POST['hinhthuc']."','Đã thanh toán')";
        }
        if($connect->query($sql)){
            $result = $connect->query("SELECT * FROM `donhang` ORDER BY `iddh` DESC LIMIT 1");
            $row = $result->fetch_assoc();
            $res['iddh'] = $row['iddh'];
        }
        echo json_encode($res, JSON_PRETTY_PRINT);
    }
    else if(isset($_POST['check'])){
        $sql = " SELECT * FROM `donhang` WHERE `iddh` = ".$_POST['iddh']." AND `tongtien` = 1 ";
        $result1 = $connect->query($sql);
        if($result1->num_rows > 0){
            $connect->query("DELETE FROM `donhang` WHERE `iddh` = ".$_POST['iddh']);
            $res[] = array(
                "message" => "fail",
                "code" => "500",
            );
        }
        else {
            $result2 = $connect->query("SELECT * FROM `donhang` WHERE `iddh` = ".$_POST['iddh']);
            $row2= $result2->fetch_assoc();
            $idmon= explode("|", $row2['idmon']);
            $soluong = explode("|", $row2['sl']);
            for($i = 0 ;$i < count($idmon) ;$i++){
                if($i == 0)
                    continue;
                $connect->query("DELETE FROM `giohang` WHERE `idkh`= ".$_POST['idkh']." && `idmon`=".$idmon[$i]);
                $result3=$connect->query("SELECT * FROM `mon` WHERE `idmon`= ".$idmon[$i]);
                $row3=$result3->fetch_assoc();
                if($row3['loai'] == 'banhngot'){
                    $soluong1 = $row3['soluong'] - $soluong[$i];
                    $connect->query("UPDATE `mon` SET `soluong`= ".$soluong1." WHERE `idmon`=".$idmon[$i]);
            }
            }
            $res[] =array(
                "message" => "Sucess",
                "code" => "200",
            );
        }
        echo json_encode($res, JSON_PRETTY_PRINT);
    }
    else {
        if($_GET['vnp_ResponseCode'] == 00){
            $tongtien = $_GET['vnp_Amount'] / 100;
            $connect->query("UPDATE `donhang` SET `tongtien`= ".$tongtien." WHERE `iddh`=".$_GET['vnp_TxnRef']);
            echo "Thanh toán thành công!";
        }
        else{
            $sql = "DELETE FROM `donhang` WHERE `iddh`=".$_GET['vnp_TxnRef'];
            $connect->query($sql);
            echo "Thanh toán thất bại! Xin thử lại";
        }
    }
    $connect->close();
?>