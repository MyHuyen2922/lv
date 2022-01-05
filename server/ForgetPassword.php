<?php
    include 'connect.php';
    $sql="SELECT * FROM `khachhang` where `email` ='". $_POST['email']."'";
    $result=$connect->query($sql);
    $res=[];
    if($result->num_rows > 0){
        $row=$result->fetch_assoc();
        $fetch_email= $row['email'];
        $content = mt_rand(100000, 999999);
        $to= $fetch_email;
        $subject = "Mã xác thực";
        $message = "Mã xác thực của quý khách là: <h4 style='color:#080;'> $content </h4>" ;
        $headers = "From: myhuyen292271@gmail.com \r\n";
        $headers .= "Content-type: text/html; charset=utf-8' \r\n"; 
        mail($to, $subject, $message, $headers);
        $res[] = array(
            "code" => 200,
            "confirm_code" => $content,
            "fetch_email" => $fetch_email
        );
    }
    else{
        $res[] = array(
            "code" => 500,
        );
    }
    echo json_encode($res, JSON_PRETTY_PRINT);
    $connect->close();      
?>