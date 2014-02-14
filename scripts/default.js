$(function() {

  //---------------------------------------------------------------------------
  // Initialisierungen
  //---------------------------------------------------------------------------

  var interval = null;
  var config  = new Config();
  var counter = new Counter();

  counter.init();
  config.init();
  counter.setCurrentTime(false);


  //---------------------------------------------------------------------------
  //Funktionen
  //---------------------------------------------------------------------------

  function getDigits(element){
    var digits = null;
    try{
      var time = $(element).attr('value').split(":");
      var minutes = parseInt( time[0], 10);
      var seconds = parseInt( time[1], 10);
      digits = new Array(minutes,seconds);
    } catch(e){
      digits = null;
    }
    return digits;
  }

  function checkAndStartGradient(type, suffix_nr) {  // type => clock/timer

    var elementName = "#config ." + type + "_time_" +suffix_nr;
    var digits = getDigits($(elementName));
    if (digits == null) return;

    var digitOne = digits[0];
    var digitTwo = digits[1];

    var counterOne = counter.digits[0];
    var counterTwo = counter.digits[1];

    if ( type != "clock") {
      digitTwo+=10;
      if ( digitTwo >= 60 ){
        digitOne+=1;
        digitTwo-=60;
      }
    }

    var active = $("#config ."+ type +"_gradient_"+suffix_nr).attr('data-active');
    if (( digitOne == counterOne ) && ( digitTwo == counterTwo ) && (active == 'false')) {
      var bg_color = $("#config ."+type+"_body_color_"+suffix_nr).attr('value');
      var fg_color = $("#config ."+type+"_font_color_"+suffix_nr).attr('value');

      $("#config ."+ type +"_gradient_"+suffix_nr).attr('data-active', 'true');

      $("body").animate({ backgroundColor: bg_color }, 10000 );
      $("#clock").animate({ color: fg_color }, 5000 );
    }
  }

  function checkForGradients(type){
    var grad_1 = ( typeof $("#config ." + type + "_gradient_1").attr('checked') != "undefined" );
    var grad_2 = ( typeof $("#config ." + type + "_gradient_2").attr('checked') != "undefined" );
    if (grad_1) checkAndStartGradient(type, "1");
    if (grad_2) checkAndStartGradient(type, "2");
  }

  function update() {
    if ( counter.clock ) {
      counter.setCurrentTime(true);
      checkForGradients("clock");
    }else{
      counter.modifyTime();
      checkForGradients("timer");
    }
  }

  function reset() {
    var bg_color = $("#config .body_color").attr('value');
    var fg_color = $("#config .font_color").attr('value');
    var font_size = $("#config .font_size").attr('value')+"px";

    $("body").css("background-color", bg_color);
    $("#clock").css('color', fg_color);
    $("#clock").css('font-size', font_size);
    $("#clock").css('left', '0px');
    $("#clock").css('top', '0px');
    counter.setCurrentTime(false);
  }

  function stopTimer(){
    if ( interval != null ){
      window.clearInterval(interval);
      interval = null;
    }
    counter.revisibleSeperator(true);
    $('#config .timer_gradient_1').attr('data-active', 'false' );
    $('#config .timer_gradient_2').attr('data-active', 'false' );
    $('#config .clock_gradient_1').attr('data-active', 'false' );
    $('#config .clock_gradient_2').attr('data-active', 'false' );
  }

  function startTimer(){
    stopTimer();
    counter.clock = false;
    counter.digits = getDigits($("#config .start_time"));
    if (counter.digits == null ) return;
    counter.minus = ( counter.digits[0] < 0 );
    counter.setDigits();
    interval = window.setInterval(update, 1000 );
  }

  function startClock(){
    stopTimer();
    counter.setCurrentTime(false)
    counter.clock = true;
    interval = window.setInterval(update, 500 );
  }

  //---------------------------------------------------------------------------
  // Events
  //---------------------------------------------------------------------------

  $("#config .timer_start").click(function(e){
    $("#config .timer_start").attr('disabled', true);
    $("#config .clock_start").attr('disabled', true);
    $("#config .stop").attr('disabled', false);
    $("#config .reset").attr('disabled', true);
    startTimer();
    config.relockAllInputs(true);
  })

  $("#config .clock_start").click(function(e){
    $("#config .timer_start").attr('disabled', true);
    $("#config .clock_start").attr('disabled', true);
    $("#config .stop").attr('disabled', false);
    $("#config .reset").attr('disabled', true);
    startClock();
    config.relockAllInputs(true);
  })

  $("#config .stop").click(function(e){
    $("#config .timer_start").attr('disabled', false);
    $("#config .clock_start").attr('disabled', false);
    $("#config .stop").attr('disabled', true);
    $("#config .reset").attr('disabled', false);
    stopTimer();
    config.relockAllInputs(false);
  })

  $("#config .reset").click(function(e){ reset(); })

});
