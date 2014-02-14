function addConfigModifications(){
 
  $('#config .body_color').change(function() {
    var color = $('#config .body_color').attr('value');
    $("body").css( 'background-color', color );
  });

  $('#config .font_size_range').change(function() {
    var size = $('#config .font_size_range').attr('value');
    $('#config .font_size').attr('value',size);
    $("#clock").css( 'font-size', size+'px' );
  });
  $('#config .font_size').change(function() {
    var size = $('#config .font_size').attr('value');
    $('#config .font_size_range').attr('value',size);
    $("#clock").css( 'font-size', size+'px' );
  });
  $('#config .font_color').change(function() {
    var color = $('#config .font_color').attr('value');
    $("#clock").css( 'color', color );
  });
  $('#config .font_margin_range').change(function() {
    var margin = $('#config .font_margin_range').attr('value');
    $('#config .font_margin').attr('value',margin);
    $("#clock").css( 'margin-top', margin+'px' );
  });
  $('#config .font_margin').change(function() {
    var margin = $('#config .font_margin').attr('value');
    $('#config .font_margin_range').attr('value',margin);
    $("#clock").css( 'margin-top', margin+'px' );
  });
  
  $('#config .check_gradient_1').click(function() {
    var state = ( typeof $('#config .check_gradient_1').attr('checked') != "undefined" );
    $('#config .gradient_1 input').attr('disabled', (!state));
  });
  $('#config .check_gradient_2').click(function() {
    var state = ( typeof $('#config .check_gradient_2').attr('checked') != "undefined" );
    $('#config .gradient_2 input').attr('disabled', (!state));
  });

  $(".config-bkg").mouseover(function() {
    $(".config-bkg").css('opacity','0.5');
    $("#config").css('opacity','1.0');
  }).mouseout(function(){
    $(".config-bkg").css('opacity','0.0');
    $("#config").css('opacity','0.0');
  });
  $("#config").mouseover(function() {
    $(".config-bkg").css('opacity','0.5');
    $("#config").css('opacity','1.0');
  }).mouseout(function(){
    $(".config-bkg").css('opacity','0.0');
    $("#config").css('opacity','0.0');
  });

}