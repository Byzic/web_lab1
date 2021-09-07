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
  if ($('.r-checkbox').is(':checked')) {

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
  if (!validateForm()) return;
  else{
      let data=$(this).serialize() + '&timezone=' + new Date().getTimezoneOffset();
      $.get(url('php/main.php'),
          data,
          function(data){
              if (data.validate) {
                  newRow = '<tr>';
                  newRow += '<td>' + data.xval + '</td>';
                  newRow += '<td>' + data.yval + '</td>';
                  newRow += '<td>' + data.rval + '</td>';
                  newRow += '<td>' + data.curtime + '</td>';
                  newRow += '<td>' + data.exectime + '</td>';
                  newRow += '<td>' + data.hitres + '</td>';
                  $('#result-table').append(newRow);
              }
          },
          'json');
  }
})