<?php
    include 'connect.php';
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
            $connect->query("DELETE FROM `giohang` WHERE `idkh`=".$_POST['idkh']." && `idmon`=".$_POST['idmon'][$i]);
            $sl = $_POST['sl'][$i];
            $res = $connect->query("SELECT `loai` FROM `mon` WHERE `idmon` = ".$_POST['idmon'][$i]);
            $row3 = $res->fetch_assoc();
            if($row3['loai'] == 'banhngot'){
                while ($sl > 0){
                    $result3= $connect->query("SELECT min(id_lo) id_lo,soluong FROM `lo` WHERE `idmon`=".$_POST['idmon'][$i]);
                    $row3 = $result3->fetch_assoc();
                    if($sl < $row3['soluong']){
                        $sl1 = $row3['soluong'] - $sl;
                        $connect->query("UPDATE `lo` SET `soluong`= ".$sl1." WHERE `id_lo`=".$row3['id_lo']);
                        $sl = 0;
                    }
                    else{
                        $connect->query("DELETE FROM `lo` WHERE `id_lo`=".$row3['id_lo']);
                        $sl -= $row3['soluong'];
                    }
    
                }
    
                $result1=$connect->query("SELECT * FROM `mon` WHERE `idmon`= ".$_POST['idmon'][$i]);
                $row1=$result1->fetch_assoc();
                if($row1['loai'] == 'banhngot'){
                    $soluong = $row1['soluong'] - $_POST['sl'][$i];
                    $connect->query("UPDATE `mon` SET `soluong`= ".$soluong." WHERE `idmon`=".$_POST['idmon'][$i]);
                }
            }
        }
        $sql = "INSERT INTO `donhang` (`idmon`,`sl`,`idkh`,`ghichu`,`trangthai`,`ngayban`,`tongtien`,`size`,`giadh`,`hotennhan`,`sdtnhan`,`dcnhan`,`tienship`,`hinhthuc`,`pttt`) VALUES
        ('".$listitem."', '".$number."', ".$_POST['idkh'].",'".$_POST['ghichu']."','Chờ xác nhận','".$_POST['ngayban']."',".$_POST['tongtien'].", '".$size."', '".$gia."','".$_POST['hotennhan']."','".$_POST['sdtnhan']."','".$_POST['dcnhan']."',".$_POST['tienship'].",'".$_POST['hinhthuc']."','".$_POST['pttt']."')";
        if($connect ->query($sql)){
            $result[] = array(
                "message" => "Succes",
                "code" => "200"
            );
        }
        else{
            $result[] = array(
                "message" => "Error",
                "code" => "500"
            );
        }
    echo json_encode($result, JSON_PRETTY_PRINT);
    $connect->close();
?>