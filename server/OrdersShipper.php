<?php
    include 'connect.php';
    date_default_timezone_set("Asia/Ho_Chi_Minh");
    $today = getdate();
    $now = ($today['mday'])."/".$today['mon']."/".$today['year'];
    if($_POST['condition'] === 'now'){
        $sql = "SELECT * FROM `donhang` d JOIN `khachhang` k ON `d`.`idkh` = `k`.`idkh` WHERE `d`.`ngayban`='".$now."' AND `d`.`hinhthuc` ='Giao hàng' ";    
 
    }
    else if($_POST['condition'] === 'ninh kieu'){
        $sql = "SELECT * FROM `donhang` d JOIN `khachhang` k ON `d`.`idkh` = `k`.`idkh` WHERE `d`.`dcnhan` LIKE '%Ninh Kiều%' AND `d`.`hinhthuc` ='Giao hàng' AND `hinhthuc` ='Giao hàng' AND `trangthai`='Chờ xác nhận'";    
 
    }
    else if($_POST['condition'] === 'binh thuy'){
        $sql = "SELECT * FROM `donhang` d JOIN `khachhang` k ON `d`.`idkh` = `k`.`idkh` WHERE `d`.`dcnhan` LIKE '%Bình Thủy%' AND `d`.`hinhthuc` ='Giao hàng' AND `hinhthuc` ='Giao hàng' AND `trangthai`='Chờ xác nhận'";    
 
    }
    else if($_POST['condition'] === 'cai rang'){
        $sql = "SELECT * FROM `donhang` d JOIN `khachhang` k ON `d`.`idkh` = `k`.`idkh` WHERE `d`.`dcnhan` LIKE '%Cái Răng%' AND `d`.`hinhthuc` ='Giao hàng' AND `hinhthuc` ='Giao hàng' AND `trangthai`='Chờ xác nhận'";    
 
    }
    else if($_POST['condition'] === 'o mon'){
        $sql = "SELECT * FROM `donhang` d JOIN `khachhang` k ON `d`.`idkh` = `k`.`idkh` WHERE `d`.`dcnhan` LIKE '%Ô Môn%' AND `d`.`hinhthuc` ='Giao hàng' AND `hinhthuc` ='Giao hàng' AND `trangthai`='Chờ xác nhận'";    
 
    }
    else{
        $sql = "SELECT * FROM `donhang` d JOIN `khachhang` k ON `d`.`idkh` = `k`.`idkh` WHERE `trangthai`='".$_POST['condition']."' AND `hinhthuc` ='Giao hàng' ";    
    }
    $result=$connect->query($sql);
    $res=[];
    while($row=$result->fetch_assoc()){
        $res[]=$row;
    }
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();  
?>