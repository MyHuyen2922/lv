<?php
    include 'connect.php';
    $mk=md5($_POST['mk']);
    $sql="INSERT INTO `shipper`(`hoten`, `email`, `sdt`, `dc`, `mk`) VALUES
    ('".$_POST['hoten']."','".$_POST['email']."','".$_POST['sdt']."','".$_POST['dc']."','$mk')";
    $result =array();
    if($connect->query($sql)){
        $email =$_POST['email'];
        $mk = $_POST['mk'];
        $to= $email;
        $subject ="Tài khoản Shipper";
        $message ="<p>Chào mừng bạn đã đến gia đình Cherry !!!</p>
        <p>Đây là tài khoản Shipper của bạn</p>
        <h3>Email đăng nhập: $email <br> Mật khẩu:<span style='color:#080; font-size: large;'> $mk</span></h3>" ;
        $headers = "From : myhuyen292271@gmail.com \r\n";
        $headers .= "Content-type: text/html\r\n"; 
        mail($to, $subject, $message, $headers);
        $result[]=array(
            "message" => "Sucess",
            "code" => "200",
            "email" => $email,
            "mk" => $mk
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