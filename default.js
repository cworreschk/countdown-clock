function modifyTime(){
  if (( minutes == 0 ) && ( seconds == 0 )) minus = true;
  if ( minus ) {
    seconds = seconds + 1;
    if ( seconds == 60 ) {
      seconds = 0;
      minutes = minutes + 1;
    }
  } else {
    seconds = seconds - 1;
    if ( seconds == -1 ) {
      seconds = 59;
      minutes = minutes - 1;
    }
  }
}

function setCurrentTime() {
  var now = new Date();
  minutes = parseInt(now.getHours(), 10);
  seconds = parseInt(now.getMinutes(), 10);
  if ( $("#clock .seperator").css( 'visibility' ) == "hidden" ) {
    $("#clock .seperator").css( 'visibility', 'visible' );	
  }else{
    $("#clock .seperator").css( 'visibility', 'hidden' );
  }
}

function setDigits(){
  if (( minutes > 9 ) && ( minutes != 0 )) { s_minutes = minutes.toString(); } else { s_minutes = "0" + minutes.toString(); }
  if (( seconds > 9 ) && ( seconds != 0 )) { s_seconds = seconds.toString(); } else { s_seconds = "0" + seconds.toString(); }

  if ( minus ) {
   $("#clock .minus").css( 'visibility', 'visible' );
  } else {
    $("#clock .minus").css( 'visibility', 'hidden' );
  }

  var text = s_minutes + ":" + s_seconds;
  if (minus) text = "-" + text;
  document.title = "Die Basis | " + text;

  $("#clock .minute").text(s_minutes);
  $("#clock .second").text(s_seconds);
}

function update(){
  if ( clock ) {
    setCurrentTime();
  }else{
    modifyTime();
	checkForGradients();
  }
  setDigits();
}

function startTimer(){
  clock = false;
  stopTimer();
  interval = window.setInterval('update()', 1000 );
}

function stopTimer(){
  if ( interval != null ){
    window.clearInterval(interval);
    intervall = null;
  }
  $("#clock .seperator").css( 'visibility', 'visible' );
  $('#config .check_gradient_1').attr('data-active', 'false' );
  $('#config .check_gradient_2').attr('data-active', 'false' );
}

function resetTimer(){
  stopTimer();
  var time = $('#config .start_time').attr('value').split(":");
  minutes = parseInt( time[0], 10);
  seconds = parseInt( time[1], 10);
  if ( minutes >= 0 ) minus = false;
  resetDisplay();
  setDigits();
}

function startClock(){
  stopTimer();
  resetDisplay();
  clock = true; 
  setCurrentTime();
  setDigits();
  interval = window.setInterval('update()', 500 );
}

function resetDisplay(){
  var bgColor = $('#config .body_color').attr('value');
  var fgColor = $('#config .font_color').attr('value');
  
  $("body").stop();
  $("body").css( 'background-color', bgColor );
  $("#clock").css( 'color', fgColor );
}

function ButtonClicked(button) {
  var name = $(button).attr('value').toLowerCase();

  if (( name == "start" ) || ( name == "uhr" )) {
    $("#timer_stop").removeAttr("readonly");
	$("#timer_start").attr("readonly","readonly");	
	$("#timer_reset").attr("readonly","readonly");
	$("#timer_clock").attr("readonly","readonly");
	$("#config .options").css("opacity","0.0");
  }else {
	if( name =="stop" ){
 	  $("#timer_stop").attr("readonly","readonly");
	  $("#timer_start").removeAttr("readonly");
	  $("#timer_reset").removeAttr("readonly");
	  $("#timer_clock").removeAttr("readonly");
      $("#config .options").css("opacity","1.0");
    }
  }

  switch(name) {
    case "start": startTimer(); break;
    case "stop" : stopTimer(); break;
    case "reset": resetTimer(); break;
    case "uhr"  : startClock(); break;
  }
}

function checkAndStartGradient( suffix_nr ) {
  var time = $('#config .time_'+suffix_nr).attr('value');
  if ( time == "") return;  
  time = time.split(":");
  
  var min = parseInt( time[0], 10);
  var sec = parseInt( time[1], 10);

  sec+=10;
  if ( sec >= 60 ){
	min+=1;
    sec-=60; 
  }
  
  var active = $('#config .check_gradient_'+suffix_nr).attr('data-active');

  if (( minutes == min ) && ( seconds == sec ) && (active == 'false')) {
	var bg_color = $('#config .bg_color_'+suffix_nr).attr('value');
	var fg_color = $('#config .fg_color_'+suffix_nr).attr('value');

	$('#config .check_gradient_'+suffix_nr).attr('data-active', 'true');

    $("body").animate({ backgroundColor: bg_color }, 10000 );
	$("#clock").animate({ color: fg_color }, 5000 );
  }
}

function checkForGradients(){
  var grad_1 = ( typeof $('#config .check_gradient_1').attr('checked') != "undefined" );
  var grad_2 = ( typeof $('#config .check_gradient_1').attr('checked') != "undefined" );

  if ( grad_1 ) checkAndStartGradient("1");
  if ( grad_2 ) checkAndStartGradient("2");
}

$(document).ready(function(){

  $('#config .start_time').change(function() {
    var time = $('#config .start_time').attr('value').split(":");
    minutes = parseInt( time[0], 10);
    seconds = parseInt( time[1], 10);
    if (( minutes == 0 ) && ( seconds == 0 )) minus = false;
    setDigits();
  });
  
  $("#timer_start").click( function(){ ButtonClicked($(this)); });
  $("#timer_stop").click( function(){ ButtonClicked($(this)); });
  $("#timer_reset").click( function(){ ButtonClicked($(this)); });
  $("#timer_clock").click( function(){ ButtonClicked($(this)); });

  addConfigModifications();
});