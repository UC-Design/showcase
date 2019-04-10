/* Circles app created by Lydia Douglas 2018 */

/*** declare global variables **/
var $currentId = $("#welcome_section");

//calling init function
$(document).ready(function () {

    //AOS.init();

    initVue();
    initSlider();

    //this is the animation for welcome text and cirle/ball switch over
    $(".t-circle-left").fadeIn(2500).delay(1000).slideUp(800, function () {
        $(".t-ball-left").delay(800).fadeIn(2500);
    });
    $(".circle-div").fadeIn(1500).delay(1000).animate({
        "width": "1%",
        "opacity": "0.1",
    }, 3500, function () {
        $(".circle-div").hide();
        $(".jball").fadeIn(800).addClass('animated bounceInDown');
        setTimeout(function() {
            $(".b-slide").removeClass("invisible").addClass('animated rollIn').animate({height:"+=200px"}, 900).animate({height:"-=200px"}, 900);
        }, 1000);
        setTimeout(function(){$(".b-slide").trigger("click");}, 2000);
        setTimeout(function(){
            $("#welcome-section").addClass('animated fadeOutRight');
        }, 4000);

    });



    //  $( "#ball-span" ).slideDown( 600 ).delay( 2000 ).fadeIn( 400 );
});

//initialising document
function initVue() {
    //data to be used in the view for the ball color call
    var data = {
        circleRadius: 800,
        radiusNumber: 400,
        sizeNumber: 400,
        satNumber: 50,
        hueNumber: 300,
        lightNumber: 50
    };
    //new vue 
    new Vue({
        el: '#app',
        data: data
    });

    // $("#colour-section").hide();
    // $("#pictroll").hide();
}

function initSlider() {
    //creating left slid out area fr buttons
    var $marginLefty = $('#slidemarginleft div.inner');
    $marginLefty.css({
        marginLeft: $marginLefty.outerWidth() + 'px',
        display: 'block'
    });

    //slide out or il the bar of buttons animate
    $('.b-slide').click(function () {
        $marginLefty.animate({
            marginLeft: parseInt($marginLefty.css('marginLeft'), 10) == 0 ?
                $marginLefty.outerWidth() : 0
        });
    });

    $("#b-small").click(function () {
        
        

        $("#small-text").toggle(1000);
        $(".ball").toggleClass("shrink");
    });
    $("#b-hole").click(function () {
        // showHideElements("#jball-section", "#colour-section");
        //$(".action-call-text").css("opacity", "0");
        $(".action-call-text").hide(1000);
        //showHideElements("#jball-section", "#colour-section");
        $(".stage-section").hide(1000);
        $("#hole-text").show(1000);
        $("#fall-section").show(1000);
    });
    $("#b-tall").click(function () {
        $(".action-call-text").hide(1000);
        //showHideElements("#jball-section", "#colour-section");
        $(".stage-section").hide(1000);
        $("#tall-text").show(1000);
        $("#tall-section").show(1000);
    });
    $("#b-colour").click(function () {
        $(".action-call-text").hide(1000);
        //showHideElements("#jball-section", "#colour-section");
        $(".stage-section").hide(1000);
        $("#colour-text").show(1000);
        $("#colour-section").show(1000);
    });
    $("#b-black").click(function () {
        $(".action-call-text").hide(1000);
        //showHideElements("#jball-section", "#colour-section");
        $(".stage-section").hide(1000);
        //$("#black-text").show(1000);
        $("#colour-section").show(1000);
        $("div").css("background-color", "rgb( 0 ,0,0)");
        // $( "black-text" ).toggle( "slow", function() {
        //   $("div").css("background-color", "rgb( 0 ,0,0)");
        // });
    });
    $("#b-troll").click(function () {
        $("div").css("background-color", "transparent");
        $(".action-call-text").hide(1000);
        //showHideElements("#jball-section", "#colour-section");
        $(".stage-section").hide(1000);
        $("#troll-text").show(1000);
        $("#jball-section").show(1000);
        //setting up troll section
        $("#jball").hover(
            function () {
                $('#pictroll').fadeIn();
            }, function () {
                $('#pictroll').fadeOut();
            }
        );
    });
    $("#b-hall").click(function () {
        $(".action-call-text").hide(1000);
        //showHideElements("#jball-section", "#colour-section");
        $(".stage-section").hide(1000);
        $("#hall-text").show(1000);
        $("#hall-section").show(1000);
    });
    $("#b-repeat").click(function () {
        $("#repeat-text").slideToggle(1000);
    });





}

function animateWelcome() {






    // // animate the welcome section
    // var welcome = $("#welcome-text");
    // //hide all welcome text prior to animation;
    // var textbits = welcome.children("span");
    // textbits.hide();
    // $("#dots-span").hide();
    // $("#ball-span").css('opacity', '0');
    // //fade in part one 
    // $("#lets-span").fadeIn(3000);
    // $("#jball-wrapper").fadeIn(3000);
    // $("#circle-span").fadeIn(2000, function () {
    //     $("#circle-span").animate({ opacity: 0.25 }, 2000, function () {
    //         $("#ball-span").fadeIn('fast', function () {
    //             $("#circle-span").fadeOut(1000, function () {
    //                 $("#ball-span").animate({ opacity: 1, fontSize: "var(--font-size)", "left": "+=50px", }, 2000, function () {
    //                     $("#jball").addClass("animated shake"); //toggle visibility and bounce
    //                     $("#jball").addClass("ball");
    //                     // $("#dots-span").fadeIn('slow');
    //                     $("#jball").addClass('bounce');
    //                     $("#small-text").css("display", "block");;
    //                 });
    //             });
    //         });
    //     });
    // });
}

