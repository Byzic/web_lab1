<?php
session_start();
if (!isset($_SESSION['data'])) {
    $_SESSION['data'] = array();
}

//Validation

function validation($xVal,$yVal,$rVal){
    return validationX($xVal)&&validationR($rVal)&&validationY($yVal) ;
}
function validationX($xVal){
    return isset($xVal)&&is_numeric($xVal);
}
function validationR($rVal){
    return isset($rVal)&&is_numeric($rVal);
}

function validationY($yVal) {
    $Y_MIN = -5;
    $Y_MAX = 5;

    if (!isset($yVal))
        return false;

    $numY = str_replace(',', '.', $yVal);
    return is_numeric($numY) && $numY >= $Y_MIN && $numY <= $Y_MAX;
}





//Check Area

function checkTriangle($xVal, $yVal, $rVal) {
    return $xVal<=0 && $yVal>=0 && $yVal<=($xVal+$rVal)/2;

}

function checkRectangle($xVal, $yVal, $rVal){
    return $yVal>=0 && $xVal>=0 && $yVal<=$rVal/2 && $xVal<=$rVal;

}
function checkCircle($xVal, $yVal, $rVal) {
    return $xVal>=0 && $yVal<=0 && sqrt($xVal*$xVal + $yVal*$yVal) <= $rVal;

}
function checkArea($xVal, $yVal, $rVal){
    return checkCircle($xVal, $yVal, $rVal) || checkTriangle($xVal, $yVal, $rVal) || checkRectangle($xVal, $yVal, $rVal);
}

$jsonData='{'."\"response\":[";
$xVal = $_GET['x'];
$yVal = $_GET['y'];
foreach ( $_GET['r'] as $rVal){
    $timezoneOffset = $_GET['timezone'];
    $isValid=validation($xVal,$yVal,$rVal);
    $currentTime=date("H:i:s",time()-$timezoneOffset*60);
    $scriptTime=round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 7);
    $response=$isValid?'true':'false';
    $inArea=($isValid && checkArea($xVal, $yVal, $rVal))?'true':'false';
    if ($response){
        $answer = array($response,$xVal, $yVal, $rVal, $currentTime, $scriptTime, $inArea);
        array_push($_SESSION['data'], $answer);
    }
    $jsonData =$jsonData. '{' .
        "\"validate\":$response," .
        "\"xval\":$xVal," .
        "\"yval\":$yVal," .
        "\"rval\":$rVal," .
        "\"curtime\":\"$currentTime\"," .
        "\"scripttime\":\"$scriptTime\"," .
        "\"inarea\":$inArea" .
        "},";

}
$jsonData=substr($jsonData,0,-1);
$jsonData .=']}';
echo $jsonData;





