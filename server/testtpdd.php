<?php
    include 'connect.php';
    $sql = 'SELECT `idmon`,`tpdd` FROM `mon` ';
    $result = $connect->query($sql);
    while($row=$result->fetch_assoc()){
        $tpdd = str_replace('.','|', $row['tpdd']);
        $res1=$connect->query("UPDATE `mon` SET `tpdd`='".$tpdd."' WHERE `idmon`=".$row['idmon']);
    }
    $connect->close(); 
?>