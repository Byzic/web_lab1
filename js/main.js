function validateX() {
    if ($('.x.radio').is(':checked')) {
        $('.xbox-label').removeClass('box-error');
        return true;
      } else {
        $('.xbox-label').addClass('box-error');
        return false;
      }
}
$('button').slideUp( 'slow');
$('button').slideDown( 'slow');