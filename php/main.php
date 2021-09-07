<?php

function checkTriangle($xVal, $yVal, $rVal) {

}

function checkRectangle($xVal, $yVal, $rVal){

}
function checkCircle($xVal, $yVal, $rVal) {

}
function checkArea($xVal, $yVal, $rVal){
    return checkCircle($xVal, $yVal, $rVal) || checkTriangle($xVal, $yVal, $rVal) || checkRectangle($xVal, $yVal, $rVal);
}
