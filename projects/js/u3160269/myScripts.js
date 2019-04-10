//howl sound effect
var sound = new Howl({
      src: ['audio/Borrtex.mp3'] // mp3 soundtrack (sometimes will not work due to chrome removing auto play audio, but most of the time it works)
    });
sound.play(); // play sound

//detects scroll to fade intro title and fade in 
// code from http://jsfiddle.net/jakecigar/uMKr5/1/
//code for intro section and troposphere section

/******************* troposphere *********************/
$(window).scroll(function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop; //scroll function
    //50 change titles
    if (scrollTop >50 && scrollTop < 599) { //50 to begin change and stop at 599
        $('div.knockout').css('opacity',0); //hide first title
        $('div.knockout2').fadeIn("fast"); //show next title
        $('p.intro').css('opacity',0); //hide intro text
        $('p.tropintro').fadeIn("fast"); //show troposphere intro
        
    }
    else {
        $('div.knockout').css('opacity',1-scrollTop/100); //show title
        $('div.knockout2').fadeOut('fast'); //hide next title         
        $('p.intro').css('opacity',1-scrollTop/100);//show intro
        $('p.tropintro').hide(); //hide troposphere intro
        $('.human').hide(); //hide homer
        $('.bird').hide(); //hide bird flock
        $('.cloud').hide(); //hide clouds
        $('.ballon').hide(); //hide hot air ballon
		$('.measure1').hide(); //hide measure1

    }
    
    
    
    
    //200 show homer
    if (scrollTop > 200 && scrollTop < 599) { //200 to begin change
        $('.human').show(); // show image animation
        $('.measure1').show(); // show measure
    }
    else {
        $('.human').hide(); //hide homer
		$('.measure1').hide(); //hide measure1

    }
    
    //300 show birds
    if (scrollTop > 300 && scrollTop < 599) { //300 to begin change
        
        $('.bird').show();// show flock of birds
        

    }
    else {
        $('.bird').hide(); //hide bird flock

    }
    
    
    //400 show cloud animation
    if (scrollTop > 400 && scrollTop < 599) { //400 to begin change
        $('.cloud').show(); //hide clouds
      
        for (var i = 0; i < scrollTop; i++) { //loop for the cloud to keep animating when scrolling
            $( ".cloud" ).animate({ "left": "+20px" }, "slow" );// animate to the right
            $( ".cloud" ).animate({ "left": "-20px" }, "slow" );//animate to the left
            $( ".cloud" ).animate({ "top": "+40px" }, "slow" ); //animate to the top
            $( ".cloud" ).animate({ "left": "+20px" }, "slow" );
            //animate to the right
            $( ".cloud" ).animate({ "left": "-20px" }, "slow" );//animate to the left
            $( ".cloud" ).animate({ "top": "-40px" }, "slow" ); //animate down
        }

    }
    else {
        $('.cloud').hide(); //hide clouds
    }
    
    //500 show hot air ballon
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 500 && scrollTop < 599) { //500 to begin change
    
        $('.ballon'). show(); // show
        for (var i = 0; i < scrollTop; i++) { //loop for the ballon to keep animating when scrolling
            $( ".ballon" ).animate({ "top": "+20px" }, "slow" ); //animate up
            $( ".ballon" ).animate({ "top": "-20px" }, "slow" ); //animate down
        }
        
        

    }
    else {
        $('.ballon'). hide(); // hide hot air ballon		
    }
	
}).scroll()


/************** change to another layer *******************/

// 600 go to Straosphere
$(window).scroll(function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    //show text and ozone layer at 600
    if (scrollTop > 600 && scrollTop < 799) { //600 to begin change and stop at 799
		$('.measure2').show(); //show measure2
		$('.knockout3').show(); //show stratosphere title
		$('.sintro').show(); // show stratosphere intro
		$('.ozone').show(); //show ozone image
    }
    else {
        $('.knockout3').hide(); //hide stratosphere title
		$('.sintro').hide(); // hide stratosphere intro   
        $('.ozone').hide(); //hide ozone image
		$('.measure2').hide(); //hide maesure2
    }
    
    //show plane at 700
     if (scrollTop > 699 && scrollTop <799) { //700  to begin change
        $('.plane').show(); //show plane image
    }
    else {
        $('.plane').hide(); //hide plane image
    }
}).scroll()


/************** change to another layer *******************/

// 800 go to metosphere
$(window).scroll(function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    //show text and animated mesosphere at 600
    if (scrollTop > 800 && scrollTop < 899) { //800 to begin change and stop at 899
        $('.knockout4').show(); //show title
        $('.mintro').show(); // show metosphere intro
        $('.measure3').show(); //show measure 3
        $('.meteor').show();
        startMeteors(); // start meteor animation
        $(document).click( function(){ // click to stop does not work
           stopMeteors(); //end meteor animation
        });
    }
    else {
        $('.knockout4').hide(); //hide title
        $('.mintro').hide(); // hide intro
        $('.measure3').hide(); // hide measure 3
        $('.meteor').hide(); //hide meteor
    }
    
    
}).scroll()


/************** change to another layer *******************/

// 900 go to Thermosphere
$(window).scroll(function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    //show text and satellite at 600
    if (scrollTop > 900 & scrollTop < 999) { //800 to begin change
        $('.knockout5').show(); //show title
        $('.tintro').show(); //show intro text
        $('.measure4').show(); //show measure 4
        $('#sat').show(); //show satellite
        for (var i = 0; i < scrollTop; i++) { //loop for the satelite to keep animating when scrolling
            $( "#sat" ).animate({ "left": "+20px" }, "slow" ); //animate up
            $( "#sat" ).animate({ "left": "-20px" }, "slow" ); //animate down
        }


    }
    else {
        $('.knockout5').hide(); //hide title
        $('.tintro').hide(); //hide intro text
        $('.measure4').hide(); // hide measure 3
        $('#sat').hide(); // hide satelite

    }
    
    
}).scroll()

/************** change to another layer *******************/

// 1000 go to exosphere
$(window).scroll(function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    //show text and ozone layer at 600
    if (scrollTop > 1000 & scrollTop < 1099) { //800 to begin change
        $('.knockout6').show(); //show title
        $('.eintro').show(); //show intro text
        $('.measure5').show(); //show measure 4
        $('.ufo').show(); // show ufo
        $('.ast').show(); //show astronaut
    }
    
    else {
        $('.knockout6').hide(); //hide title
        $('.eintro').hide(); //hide intro text
        $('.measure5').hide(); // hide measure 3
        $('.ufo').hide(); // hide ufo
        $('.ast').hide(); //hide astronaut
    }
    
    
}).scroll()

//end of code from http://jsfiddle.net/jakecigar/uMKr5/1/



//code to show popup on each object
// code taken from https://jsfiddle.net/Dr_Sam/xg4gefxt/

/******** homer object popup *********/

$(".human").mouseenter( function() {
  $(".popup").addClass("show");	// add the "show" class to make it appear
  $(".popup").removeClass("hide");	// remove the "hide" class
  $(".popup").offset( $(this).offset() );	// move the popup to cover the em element
	
});

// we'll detect a mouseleave event to hide the popup
$(".human").mouseleave( function() {
	$(".popup").addClass("hide"); // add hide class to make the element disappear
	$(".popup").removeClass("show"); // remove the show class - we don't need it now
});

/******* bird object popup **********/

$(".bird").mouseenter( function() {
  $(".popup2").addClass("show"); // add the "show" class to make it appear
  $(".popup2").removeClass("hide");	// remove the "hide" class
  $(".popup2").offset( $(this).offset() );	// move the popup to cover the em element
	
});

// we'll detect a mouseleave event to hide the popup
$(".bird").mouseleave( function() {
	$(".popup2").addClass("hide");	// add hide class to make the element disappear
	$(".popup2").removeClass("show");	// remove the show class - we don't need it now
});

/******* cloud object popup **********/

$(".cloud").mouseenter( function() {
  $(".popup3").addClass("show"); // add the "show" class to make it appear
  $(".popup3").removeClass("hide");	// remove the "hide" class
  $(".popup3").offset( $(this).offset() );	// move the popup to cover the em element
	
});

// we'll detect a mouseleave event to hide the popup
$(".cloud").mouseleave( function() {
	$(".popup3").addClass("hide");	// add hide class to make the element disappear
	$(".popup3").removeClass("show");	// remove the show class - we don't need it now
});

/******* hot air ballon object popup **********/

$(".ballon").mouseenter( function() {
  $(".popup4").addClass("show"); // add the "show" class to make it appear
  $(".popup4").removeClass("hide");	// remove the "hide" class
  $(".popup4").offset( $(this).offset() );	// move the popup to cover the em element
	
});

// we'll detect a mouseleave event to hide the popup
$(".ballon").mouseleave( function() {
	$(".popup4").addClass("hide");	// add hide class to make the element disappear
	$(".popup4").removeClass("show");	// remove the show class - we don't need it now
});

/******* ozone ballon object popup **********/

$(".ozone").mouseenter( function() {
  $(".popup5").addClass("show"); // add the "show" class to make it appear
  $(".popup5").removeClass("hide");	// remove the "hide" class
  $(".popup5").offset( $(this).offset() );	// move the popup to cover the em element
	
});

// we'll detect a mouseleave event to hide the popup
$(".ozone").mouseleave( function() {
	$(".popup5").addClass("hide");	// add hide class to make the element disappear
	$(".popup5").removeClass("show");	// remove the show class - we don't need it now
});

/******* plane object popup **********/

$(".plane").mouseenter( function() {
  $(".popup6").addClass("show"); // add the "show" class to make it appear
  $(".popup6").removeClass("hide");	// remove the "hide" class
  $(".popup6").offset( $(this).offset() );	// move the popup to cover the em element
	
});

// we'll detect a mouseleave event to hide the popup
$(".plane").mouseleave( function() {
	$(".popup6").addClass("hide");	// add hide class to make the element disappear
	$(".popup6").removeClass("show");	// remove the show class - we don't need it now
});

/******* satelite object popup **********/

$("#sat").mouseenter( function() {
  $(".popup7").addClass("show"); // add the "show" class to make it appear
  $(".popup7").removeClass("hide");	// remove the "hide" class
  $(".popup7").offset( $(this).offset() );	// move the popup to cover the em element
	
});

// we'll detect a mouseleave event to hide the popup
$("#sat").mouseleave( function() {
	$(".popup7").addClass("hide");	// add hide class to make the element disappear
	$(".popup7").removeClass("show");	// remove the show class - we don't need it now
});

/******* ufo object popup **********/

$(".ufo").mouseenter( function() {
  $(".popup8").addClass("show"); // add the "show" class to make it appear
  $(".popup8").removeClass("hide");	// remove the "hide" class
  $(".popup8").offset( $(this).offset() );	// move the popup to cover the em element
	
});

// we'll detect a mouseleave event to hide the popup
$(".ufo").mouseleave( function() {
	$(".popup8").addClass("hide");	// add hide class to make the element disappear
	$(".popup8").removeClass("show");	// remove the show class - we don't need it now
});

/******* ufo object popup **********/

$(".ast").mouseenter( function() {
  $(".popup9").addClass("show"); // add the "show" class to make it appear
  $(".popup9").removeClass("hide");	// remove the "hide" class
  $(".popup9").offset( $(this).offset() );	// move the popup to cover the em element
	
});

// we'll detect a mouseleave event to hide the popup
$(".ast").mouseleave( function() {
	$(".popup9").addClass("hide");	// add hide class to make the element disappear
	$(".popup9").removeClass("show");	// remove the show class - we don't need it now
});

// end of code taken from https://jsfiddle.net/Dr_Sam/xg4gefxt/


