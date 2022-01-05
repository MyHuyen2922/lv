<?php
    include 'connect.php';
    date_default_timezone_set("Asia/Ho_Chi_Minh");
    $today = getdate();
    $now = ($today['mday'])."/".$today['mon']."/".$today['year'];
    if($_POST['trangthai'] == 1 ){
        if($_POST['condition'] == 'all'){
            $sql = "SELECT * FROM `donhang` d JOIN `khachhang` k ON `d`.`idkh` = `k`.`idkh` WHERE `d`.`ngayban`='".$now."' AND `d`.`hinhthuc` ='Giao hàng' AND `d`.`trangthai`= 'Chờ xác nhận' ";    
        }
        else if($_POST['condition'] == 'ninhkieu'){
            $sql = "SELECT * FROM `donhang` d JOIN `khachhang` k ON `d`.`idkh` = `k`.`idkh` WHERE `d`.`ngayban`='".$now."' AND `d`.`hinhthuc` ='Giao hàng' AND `d`.`trangthai`= 'Chờ xác nhận' AND `d`.`dcnhan` like '%Ninh Kiều%' ";    
        }
        else if($_POST['condition'] == 'cairang'){
            $sql = "SELECT * FROM `donhang` d JOIN `khachhang` k ON `d`.`idkh` = `k`.`idkh` WHERE `d`.`ngayban`='".$now."' AND `d`.`hinhthuc` ='Giao hàng' AND `d`.`trangthai`= 'Chờ xác nhận' AND `d`.`dcnhan` like '%Cái Răng%' ";    
        }
        else if($_POST['condition'] == 'omon'){
            $sql = "SELECT * FROM `donhang` d JOIN `khachhang` k ON `d`.`idkh` = `k`.`idkh` WHERE `d`.`ngayban`='".$now."' AND `d`.`hinhthuc` ='Giao hàng' AND `d`.`trangthai`= 'Chờ xác nhận' AND `d`.`dcnhan` like '%Ô Môn%' ";    
        }
        else if($_POST['condition'] == 'binhthuy'){
            $sql = "SELECT * FROM `donhang` d JOIN `khachhang` k ON `d`.`idkh` = `k`.`idkh` WHERE `d`.`ngayban`='".$now."' AND `d`.`hinhthuc` ='Giao hàng' AND `d`.`trangthai`= 'Chờ xác nhận' AND `d`.`dcnhan` like '%Bình Thủy%' ";    
        }
        else if($_POST['condition'] == 'thotnot'){
            $sql = "SELECT * FROM `donhang` d JOIN `khachhang` k ON `d`.`idkh` = `k`.`idkh` WHERE `d`.`ngayban`='".$now."' AND `d`.`hinhthuc` ='Giao hàng' AND `d`.`trangthai`= 'Chờ xác nhận' AND `d`.`dcnhan` like '%Thốt Nốt%' ";    
        }
    }
    else if($_POST['trangthai']== 2){
        $sql = "SELECT * FROM `donhang` d JOIN `khachhang` k ON `d`.`idkh` = `k`.`idkh` WHERE `d`.`idshipper`='".$_POST['idshipper']."' AND `d`.`trangthai` = 'Đang giao' ";    
    }
    else if($_POST['trangthai']== 3){
        $sql = "SELECT * FROM `donhang` d JOIN `khachhang` k ON `d`.`idkh` = `k`.`idkh` WHERE `d`.`idshipper`='".$_POST['idshipper']."' AND `d`.`trangthai` = 'Đã giao' ";        
    }
    $result=$connect->query($sql);
    $res=[];
    while($row=$result->fetch_assoc()){
        $resp = new stdClass;
        $resp->iddh=$row['iddh'];
        $resp->ghichu=$row['ghichu'];
        $resp->idmon=$row['idmon'];
        $resp->idshipper=$row['idshipper'];
        $resp->sl=$row['sl'];
        $resp->tongtien=$row['tongtien'];
        $resp->trangthai=$row['trangthai'];
        $resp->size=$row['size'];
        $resp->giadh=$row['giadh'];
        $resp->sdtnhan=$row['sdtnhan'];
        $resp->dcnhan=$row['dcnhan'];
        $resp->hotennhan=$row['hotennhan'];
        $resp->tienship=$row['tienship'];
        $resp->hinhthuc=$row['hinhthuc'];
        $resp->pttt=$row['pttt'];
        $res[]=$resp;
    }
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();  
?>