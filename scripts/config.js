/* Copyright (c) 2012 Christian Worreschk | github.com/cworreschk/countdown-clock/blob/master/LICENSE.md */

function Config() {
  this.colorpicker = false;
  
  this.addEvents = function() {
    _this = this;
    $("#config").mouseover(function() { $(this).css('opacity','1.0'); }).mouseout(function(){ if (!_this.colorpicker) $(this).css('opacity','0.0'); });

    $("#config .body_color").miniColors({ change: function(hex,rgb) { _this.colorpickerChange(this,hex); }, open: function(hex,rgb) { _this.colorpickerOpen(this,hex); }, close: function(hex,rgb) { _this.colorpickerClose(this,hex); }});
    $("#config .font_color").miniColors({ change: function(hex,rgb) { _this.colorpickerChange(this,hex); }, open: function(hex,rgb) { _this.colorpickerOpen(this,hex); }, close: function(hex,rgb) { _this.colorpickerClose(this,hex); }});
    $('#config .font_size').change(function() { var size = $('#config .font_size').attr('value'); $("#clock").css( 'font-size', size+'px' ); });

    $("#config .timer_font_color_1").miniColors({ change: function(hex,rgb) { _this.colorpickerChange(this,hex); }, open: function(hex,rgb) { _this.colorpickerOpen(this,hex); }, close: function(hex,rgb) { _this.colorpickerClose(this,hex); }});
    $("#config .timer_body_color_1").miniColors({ change: function(hex,rgb) { _this.colorpickerChange(this,hex); }, open: function(hex,rgb) { _this.colorpickerOpen(this,hex); }, close: function(hex,rgb) { _this.colorpickerClose(this,hex); }});
    $("#config .timer_font_color_2").miniColors({ change: function(hex,rgb) { _this.colorpickerChange(this,hex); }, open: function(hex,rgb) { _this.colorpickerOpen(this,hex); }, close: function(hex,rgb) { _this.colorpickerClose(this,hex); }});
    $("#config .timer_body_color_2").miniColors({ change: function(hex,rgb) { _this.colorpickerChange(this,hex); }, open: function(hex,rgb) { _this.colorpickerOpen(this,hex); }, close: function(hex,rgb) { _this.colorpickerClose(this,hex); }});

    $("#config .clock_font_color_1").miniColors({ change: function(hex,rgb) { _this.colorpickerChange(this,hex); }, open: function(hex,rgb) { _this.colorpickerOpen(this,hex); }, close: function(hex,rgb) { _this.colorpickerClose(this,hex); }});
    $("#config .clock_body_color_1").miniColors({ change: function(hex,rgb) { _this.colorpickerChange(this,hex); }, open: function(hex,rgb) { _this.colorpickerOpen(this,hex); }, close: function(hex,rgb) { _this.colorpickerClose(this,hex); }});
    $("#config .clock_font_color_2").miniColors({ change: function(hex,rgb) { _this.colorpickerChange(this,hex); }, open: function(hex,rgb) { _this.colorpickerOpen(this,hex); }, close: function(hex,rgb) { _this.colorpickerClose(this,hex); }});
    $("#config .clock_body_color_2").miniColors({ change: function(hex,rgb) { _this.colorpickerChange(this,hex); }, open: function(hex,rgb) { _this.colorpickerOpen(this,hex); }, close: function(hex,rgb) { _this.colorpickerClose(this,hex); }});

    $('#config .font_size').change(function() { $("#clock").css( 'font-size', $('#config .font_size').attr('value')+'px' ); });

    $('#config .timer_gradient_1').click(function() {
      var state = $('#config .timer_gradient_1').is(':checked');
      $("#config .timer_time_1").attr('disabled', (!state));
      $("#config .timer_body_color_1").attr('disabled', (!state));
      $("#config .timer_font_color_1").attr('disabled', (!state));
    });
    $('#config .timer_gradient_2').click(function() {
      var state = $('#config .timer_gradient_2').is(':checked');
      $("#config .timer_time_2").attr('disabled', (!state));
      $("#config .timer_body_color_2").attr('disabled', (!state));
      $("#config .timer_font_color_2").attr('disabled', (!state));
    });
    $('#config .clock_gradient_1').click(function() {
      var state = $('#config .clock_gradient_1').is(':checked');
      $("#config .clock_time_1").attr('disabled', (!state));
      $("#config .clock_body_color_1").attr('disabled', (!state));
      $("#config .clock_font_color_1").attr('disabled', (!state));
    });
    $('#config .clock_gradient_2').click(function() {
      var state = $('#config .clock_gradient_2').is(':checked');
      $("#config .clock_time_2").attr('disabled', (!state));
      $("#config .clock_body_color_2").attr('disabled', (!state));
      $("#config .clock_font_color_2").attr('disabled', (!state));
    });

    $("html").click(function(e){
      var opacity = parseFloat($("#config").css('opacity'));
      if ((!_this.colorpicker) && (e.pageX > 240) && (opacity == 1.0 )) $("#config").css('opacity','0.0');
    });

  }

  this.colorpickerOpen = function(object,hex) {
    this.colorpicker = true;
  }

  this.colorpickerClose = function(object,hex) {
    this.colorpicker = false;
  }

  this.colorpickerChange = function(object,hex) {
    objectName = $(object).attr('class').split(" ")[0];
    switch(objectName) {
      case "body_color" : $("body").css('background-color',hex); break;
      case "font_color" : $("#clock").css('color',hex); break;
    }
  }

  this.relockAllInputs= function(lock){
    if (lock) {
      $("#config table input").attr('disabled', true);
    } else {
      var stateT1 = $('#config .timer_gradient_1').is(':checked');
      var stateT2 = $('#config .timer_gradient_2').is(':checked');
      var stateC1 = $('#config .clock_gradient_1').is(':checked');
      var stateC2 = $('#config .clock_gradient_2').is(':checked');
      $("#config table input").attr('disabled', false);

      $("#config .timer_time_1").attr('disabled', (!stateT1));
      $("#config .timer_body_color_1").attr('disabled', (!stateT1));
      $("#config .timer_font_color_1").attr('disabled', (!stateT1));

      $("#config .timer_time_2").attr('disabled', (!stateT2));
      $("#config .timer_body_color_2").attr('disabled', (!stateT2));
      $("#config .timer_font_color_2").attr('disabled', (!stateT2));

      $("#config .clock_time_1").attr('disabled', (!stateC1));
      $("#config .clock_body_color_1").attr('disabled', (!stateC1));
      $("#config .clock_font_color_1").attr('disabled', (!stateC1));

      $("#config .clock_time_2").attr('disabled', (!stateC2));
      $("#config .clock_body_color_2").attr('disabled', (!stateC2));
      $("#config .clock_font_color_2").attr('disabled', (!stateC2));
    }
  }

  this.addButtons = function(){
    $("#config .foreground").append(
      '<div class="buttons">' +
        '<input type="button" class="timer_start" value="Timer" />' +
        '<input type="button" class="clock_start" value="Uhr" />' +
        '<input type="button" class="stop" value="Stop" disabled="disabled"/>' +
        '<input type="button" class="reset" value="Reset"/>' +
      '</div>'
    );
  }

  this.addStandardElements = function(){
    $("#config .foreground").append(
      '<table style="margin-bottom:0px;">' +
        '<tr><th colspan="2">Grundeinstellungen</th></tr>' +
      '</table>' +
      '<table class="sub">' +
        '<tr><td style="width:70px">Hintergrund:</td><td><input type="text" class="body_color" value="#000000" /></td></tr>' +
        '<tr><td>Schriftfarbe:</td><td><input type="text" class="font_color" value="#ffffff" /></td></tr>' +
        '<tr><td>Schriftgröße:</td><td><input type="number" class="font_size" min="100" max="800" value="300" style="width:45px" /></td></tr>' +
      '</table>'
    );
  }

  this.addTimerElements = function(){
    $("#config .foreground").append(
      '<table style="margin-bottom:0px;">' +
        '<tr><th colspan="2">Timer</th></tr>' +
      '</table>' +
      '<table class="sub">' +
        '<tr><td style="width:70px">Startzeit:</td><td><input type="text" class="start_time" value="30:00" style="width:45px" /></td></tr>' +
      '</table>' +
      '<table class="sub">' +
        '<tr><th style="width:70px">Übergang 1</th><th><input type="checkbox" class="timer_gradient_1" checked /></th></tr>' +
        '<tr><td>Zeitpunkt:</td><td><input type="text" class="timer_time_1" value="01:00" style="width:45px" /></td></tr>' +
        '<tr><td style="width:70px">Hintergrund:</td><td><input type="text" class="timer_body_color_1" value="#ffff00" /></td></tr>' +
        '<tr><td>Schriftfarbe:</td><td><input type="text" class="timer_font_color_1" value="#000000" /></td></tr>' +
      '</table>' +
      '<table class="sub">' +
        '<tr><th style="width:70px">Übergang 2</th><th><input type="checkbox" class="timer_gradient_2" checked /></th></tr>' +
        '<tr><td>Zeitpunkt:</td><td><input type="text" class="timer_time_2" value="00:00" style="width:45px" /></td></tr>' +
        '<tr><td style="width:70px">Hintergrund:</td><td><input type="text" class="timer_body_color_2" value="#ff0000" /></td></tr>' +
        '<tr><td>Schriftfarbe:</td><td><input type="text" class="timer_font_color_2" value="#ffffff" /></td></tr>' +
      '</table>'
    );
  }

  this.addClockElements = function(){
    $("#config .foreground").append(
      '<table style="margin-bottom:0px;">' +
        '<tr><th colspan="2">Uhrzeit</th></tr>' +
      '</table>' +
      '<table class="sub"">' +
        '<tr><th style="width:70px">Übergang 1</th><th><input type="checkbox" class="clock_gradient_1" checked /></th></tr>' +
        '<tr><td>Zeitpunkt:</td><td><input type="text" class="clock_time_1" value="12:30" style="width:45px" />&nbsp;Uhr</td></tr>' +
        '<tr><td>Hintergrund:</td><td><input type="text" class="clock_body_color_1" value="#ffff00" /></td></tr>' +
        '<tr><td>Schriftfarbe:</td><td><input type="text" class="clock_font_color_1" value="#000000" /></td></tr>' +
      '</table>' +
      '<table class="sub">' +
        '<tr><th style="width:70px">Übergang 2</th><th><input type="checkbox" class="clock_gradient_2" checked /></th></tr>' +
        '<tr><td>Zeitpunkt:</td><td><input type="text" class="clock_time_2" value="12:35" style="width:45px" />&nbsp;Uhr</td></tr>' +
        '<tr><td>Hintergrund:</td><td><input type="text" class="clock_body_color_2" value="#ff0000" /></td></tr>' +
        '<tr><td>Schriftfarbe:</td><td><input type="text" class="clock_font_color_2" value="#ffffff" /></td></tr>' +
      '</table>'
    );
  }

  this.init = function() {
    $("body").append('<div id="config"><div class="background"></div><div class="foreground"><!--<div class="logo"><img src="images/logo.png" /></div>--></div></div>');
    this.addButtons();
    this.addStandardElements();
    this.addTimerElements();
    this.addClockElements();
    this.addEvents();
  }
}
