function validateX() {
  if ($('.x-radio').is(':checked')) {
      return true;
  } else {
    alert("Необходимо ввести значение X")
    return false;
  }
}
function validateY() {
  const Y_MIN = -5;
  const Y_MAX = 5;

  let yField = $('#y-textfield');
  let numY = yField.val().replace(',', '.');
  
  if (!(new RegExp("/[^0-9]||[^.]/").test(numY))){
      alert("Значение Y не является числом");
      return false;
  }else{

      if (numY >= Y_MIN && numY <= Y_MAX){
        
          return true;
      }else{
          alert("Значение Y не входит в интервал (-5,5)")
          return false;
      }
  }
  
}
function validateR() {
    let checkboxes=document.getElementsByName('r');
    let counter=0;
    if ($('.r-checkbox').is(':checked')) {
        checkboxes.forEach(checkbox=> {
            if (checkbox.checked){
                counter++;
            }
        });
        if (counter!=1){
            alert("Необходимо выбрать только одно значение R");
            return false;
        }else{
            return true;
        }

        return true;
    } else {
        alert("Значение R  не выбрано")
        return false;
  }
}
function validateForm() {
    return validateX() & validateY() & validateR();
}

$('button').slideUp( 'slow');
$('button').slideDown( 'slow');

$('#main-form').on('submit', function(event) {
    event.preventDefault();
    if (!validateForm()) {
        return;
    } else {

        let data = $(this).serialize() + '&timezone=' + new Date().getTimezoneOffset();
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://se.ifmo.ru/~s311701/php/main.php'+'?'+data,true);
        xhr.send();
        xhr.onload = function () {
            if (xhr.status != 200) {
                alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            } else {
                console.log(xhr.responseText);
                let result = JSON.parse(xhr.responseText);
                if (result.validate) {
                    newRow = '<tr>';
                    newRow += '<td>' + result.xval + '</td>';
                    newRow += '<td>' + result.yval + '</td>';
                    newRow += '<td>' + result.rval + '</td>';
                    newRow += '<td>' + result.curtime + '</td>';
                    newRow += '<td>' + result.scripttime + '</td>';
                    newRow += '<td>' + result.inarea + '</td>';
                    $('#result-table').append(newRow);
                }
            }
            ;
        }
        $('#main-form').trigger('reset');
    }
});