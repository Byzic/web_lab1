let elemWithErrors=document.getElementById('button_and_errors')
let errorY1= document.createElement("p");
errorY1.textContent = "Значение Y не является числом";
let errorY2= document.createElement("p");
errorY2.textContent = "Значение Y не входит в интервал (-5,5)";
let errorY3= document.createElement("p");
errorY3.textContent = "Введите значение Y";
let errorX=document.createElement("p");
errorX.textContent = "Значение X не выбрано";
let errorR= document.createElement("p");
errorR.textContent = "Значение R  не выбрано";
//$('#button_and_errors').append(errorX,errorY1,errorY2,errorR);
let inputY;
let inputX;

$('button').slideUp( 'slow');
$('button').slideDown( 'slow');

function validateX() {
    if ($('.x-radio').is(':checked')) {
        inputX=document.querySelector('input[name="x"]:checked').value;
        errorX.remove();
        removeError($('#x'));
        //document.getElementById('x').classList.remove('red');
        return true;
    } else {
        $('#errors').append(errorX);
        error($('#x'));
        //document.getElementById('x').classList.add('red');
        return false;
    }
}
function validateY() {
    const Y_MIN = -5;
    const Y_MAX = 5;

    let yField = $('#y-textfield');
    inputY = yField.val().replace(',', '.');
    if(inputY==""){
        errorY1.remove();
        errorY2.remove();
        $('#errors').append(errorY3);
        error($('#y'));
        //document.getElementById('y').classList.add('red');
        return false;
    }else{
        if ((/[^0-9.-]/i.test(inputY))){
            errorY2.remove();
            errorY3.remove();
            $('#errors').append(errorY1);
            error($('#y'));
            //document.getElementById('y').classList.add('red');
            return false;
        }else{

            if (inputY > Y_MIN && inputY < Y_MAX){
                errorY1.remove();
                errorY2.remove();
                errorY3.remove();
                removeError($('#y'));
                //document.getElementById('y').classList.remove('red');
                return true;
            }else{
                errorY1.remove();
                errorY3.remove();
                $('#errors').append(errorY2);
                error($('#y'));
                //document.getElementById('y').classList.add('red');
                return false;
            }
        }

    }


}
let massivWithR;
function validateR() {
    let checkboxes=document.getElementsByName('r');
    massivWithR=[];
    if ($('.r-checkbox').is(':checked')) {
        checkboxes.forEach(checkbox=> {
            if (checkbox.checked){
                massivWithR.push(checkbox.value);
            }
        });
        errorR.remove();
        removeError($('#r'));
        //document.getElementById('r').classList.remove('red');
        return true;
    } else {
        error($('#r'));
        //document.getElementById('r').classList.add('red');
        $('#errors').append(errorR);
        return false;
    }
}
function validateForm() {
    if (validateX() & validateY() & validateR()){
        removeError($('#errors'));
        //document.getElementById('errors').classList.remove("red");
        window.scrollBy(0,-400);
        return true;
    }else{
        $('#errors p').css("text-align","center");
        error($('#errors'));
        window.scrollTo(window.innerHeight,window.innerWidth);
        return false;
    }

}
function error(elem){
    elem.css("border","5px solid #e38585");
    elem.css("box-shadow", "inset 0px 0 5px 3px #e38585");
}
function removeError(elem){
    elem.css("border","");
    elem.css("box-shadow", "");
}




$('#main-form').on('submit', function(event) {
    event.preventDefault();
    if (!validateForm()) {
        return;
    } else {
        let data= 'x='+inputX+'&y='+inputY;
        for (let i=0;i<massivWithR.length;i++){
            data+='&r[]='+massivWithR[i];

        }
        data += '&timezone=' + new Date().getTimezoneOffset();
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://se.ifmo.ru/~s311701/php/main.php'+'?'+data,true);
        xhr.send();
        xhr.onload = function () {
            if (xhr.status != 200) {
                alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
                alert(xhr.responseText);
            } else {
                console.log(xhr.responseText);
                let result = JSON.parse(xhr.responseText);
                for (let i in result.response){
                    if (result.response[i].validate) {
                        let newRow = '<tr>';
                        newRow += '<td>' + result.response[i].xval + '</td>';
                        newRow += '<td>' + result.response[i].yval + '</td>';
                        newRow += '<td>' + result.response[i].rval + '</td>';
                        newRow += '<td>' + result.response[i].curtime + '</td>';
                        newRow += '<td>' + result.response[i].scripttime + '</td>';
                        newRow += '<td>' + result.response[i].inarea + '</td>';
                        $('#result-table').append(newRow);
                    }
                }

            }
        };

    }
    $('#main-form').trigger('reset');
});