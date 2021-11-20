<?php
    include 'connect.php';
    $result = $connect->query("SELECT * FROM `donhang`");
    $max = [];
    while($row=$result->fetch_assoc()){
        $arrid = explode('|', $row['idmon']);
        $arrid = array_slice($arrid,1,sizeof($arrid));
        $arrsl = explode('|', $row['sl']);
        $arrsl = array_slice($arrsl,1,sizeof($arrsl));
        for($i = 0; $i < sizeof($arrid) ; $i++){
            if(array_key_exists((int)$arrid[$i], $max) == true){
                $max[(int)$arrid[$i]] = (int)$max[(int)$arrid[$i]] + (int)$arrsl[$i];
            }
            else{
                $max[(int)$arrid[$i]] = (int)$arrsl[$i];
            }
        }
    }
    arsort($max);
    echo json_encode($max, JSON_PRETTY_PRINT);
    $connect->close();
?>