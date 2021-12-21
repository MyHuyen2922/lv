<?php
    include 'connect.php';
    date_default_timezone_set("Asia/Ho_Chi_Minh");
    $today = getdate();
    $now = ($today['mday']+1)."/".$today['mon']."/".$today['year'];
    if($_POST['trangthai'] == 1){
        if($_POST['condition'] == 'all'){
            $sql = "SELECT * FROM `donhang` WHERE `ngayban`='".$now."' AND `hinhthuc` ='Giao hàng' AND `trangthai`='Chờ xác nhận' "; 
        }
        else if($_POST['condition'] == 'ninhkieu'){
            $sql = "SELECT * FROM `donhang` WHERE `ngayban`='".$now."' AND `dcnhan` LIKE '%Ninh Kiều%' AND `hinhthuc` ='Giao hàng' AND `trangthai`='Chờ xác nhận' "; 
        }
        else if($_POST['condition'] == 'cairang'){
            $sql = "SELECT * FROM `donhang` WHERE `ngayban`='".$now."' AND `dcnhan` LIKE '%Cái Răng%' AND `hinhthuc` ='Giao hàng' AND `trangthai`='Chờ xác nhận' "; 
        }
        else if($_POST['condition'] == 'binhthuy'){
            $sql = "SELECT * FROM `donhang` WHERE `ngayban`='".$now."' AND `dcnhan` LIKE '%Bình Thủy%' AND `hinhthuc` ='Giao hàng' AND `trangthai`='Chờ xác nhận' "; 
        }
        else if($_POST['condition'] == 'omon'){
            $sql = "SELECT * FROM `donhang` WHERE `ngayban`='".$now."' AND `dcnhan` LIKE '%Ô Môn%' AND `hinhthuc` ='Giao hàng' AND `trangthai`='Chờ xác nhận' "; 
        }
        else{
            $sql = "SELECT * FROM `donhang` WHERE `ngayban`='".$now."' AND `dcnhan` LIKE '%Thốt Nốt%' AND `hinhthuc` ='Giao hàng' AND `trangthai`='Chờ xác nhận' "; 
        }
    }
    else if($_POST['trangthai']== 2){
        $sql = "SELECT * FROM `donhang` WHERE  `idshipper` ='".$_POST['idshipper']."' AND `trangthai`='Đang giao' ";
    }
    else if($_POST['trangthai']== 3){
        $sql = "SELECT * FROM `donhang` WHERE  `idshipper` =".$_POST['idshipper']." AND `trangthai`='Đã giao' ";
    }
    $result=$connect->query($sql);
    $response = [];
    while($row=$result->fetch_assoc()){
        $myObj = new stdClass();
        $myObj->iddh = $row['iddh'];
        $myObj->ghichu = $row['ghichu'];
        $myObj->idmon = $row['idmon'];
        $myObj->sl = $row['sl'];
        $myObj->tongtien = $row['tongtien'];
        $myObj->hotennhan = $row['hotennhan'];
        $myObj->dcnhan = $row['dcnhan'];
        $myObj->sdtnhan = $row['sdtnhan'];
        $myObj->size = $row['size'];
        $myObj->giadh = $row['giadh'];
        $myObj->pttt = $row['pttt'];
        $myObj->hinhthuc = $row['hinhthuc'];
        $myObj->tienship = $row['tienship'];
        $myObj->trangthai = $row['trangthai'];
        $response[] = $myObj;
    }
    $res = new stdClass();
    $res->response = $response;
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();  
?>