function Counter() {
  this.clock  = false;
  this.minus  = false;
  this.digits = new Array(0,0);
  
  this.revisibleSeperator = function(visible){
    if (visible){
      $("#clock .seperator").css( 'visibility', 'visible' );
    } else {
      $("#clock .seperator").css( 'visibility', 'hidden' );	
    }
  }

  this.revisibleMinus = function(visible){
    if (visible){
      $("#clock .minus").css( 'visibility', 'visible' );
    } else {
      $("#clock .minus").css( 'visibility', 'hidden' );
    }
  }

  this.setDigits = function(){
    if (( this.digits[0] > 9 ) && ( this.digits[0] != 0 )) { s_minutes = this.digits[0].toString(); } else { s_minutes = "0" + this.digits[0].toString(); }
    if (( this.digits[1] > 9 ) && ( this.digits[1] != 0 )) { s_seconds = this.digits[1].toString(); } else { s_seconds = "0" + this.digits[1].toString(); }    
    this.revisibleMinus(this.minus);
    $("#clock .digit-one").text(s_minutes);
    $("#clock .digit-two").text(s_seconds);
  }

  this.setCurrentTime = function(change_seperator) {
    var now = new Date();
    this.minus = false;
    this.digits[0] = parseInt(now.getHours(), 10);
    this.digits[1] = parseInt(now.getMinutes(), 10);
    if (!change_seperator) {
      this.revisibleSeperator(true);
    }else{
      if ($("#clock .seperator").css( 'visibility') == 'visible' ) {
        this.revisibleSeperator(false);
      } else {
        this.revisibleSeperator(true);
      }

    }
    this.setDigits();
  }

  this.modifyTime = function() {
    if (( this.digits[0] == 0 ) && ( this.digits[1] == 0 )) this.minus = true;
    if ( this.minus ) {
      this.digits[1]++;
      if ( this.digits[1] == 60 ) {
        this.digits[1] = 0;
        this.digits[0]++;
      }
    } else {
      this.digits[1]--;
      if ( this.digits[1] == -1 ) {
        this.digits[1] = 59;
        this.digits[0]--;
      }
    }  
    this.setDigits();
  }

  this.init = function(){
    $("body").append('<section id="clock"><div class="minus">-</div><div class="digit-one">00</div><div class="seperator">:</div><div class="digit-two">00</div></section>');
    $( "#clock" ).draggable();
    this.setDigits();
  }
}