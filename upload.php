<?php

// $_POST["upsrv"] адрес, полученный через photos.getUploadServer 
//$_POST["upsl"] имя картинки, которую надо загрузить 

if (isset($_POST["upsrv"]) && (isset($_POST["upsl"]))) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_VERBOSE, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//    curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible;)");
    curl_setopt($ch, CURLOPT_URL, $_POST["upsrv"]);
    curl_setopt($ch, CURLOPT_POST, true);
    $post = array(
        "file1" => $_SERVER['DOCUMENT_ROOT'].'/upload/'.$_POST["upsl"],
        "file2" => $_SERVER['DOCUMENT_ROOT'].'/upload/'.$_POST["upsl"],
    );
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
    $response = curl_exec($ch);
    die((string) $response);
} else {
    die("Wrong req");
}
?>