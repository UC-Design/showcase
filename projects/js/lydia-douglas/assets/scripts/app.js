/* Ball Call app created by Lydia Douglas 2018 */



//calling init function
$(document).ready(function () {
    /*** hide  **/
    $(".circle-div").hide(0);
    $(".ball").hide(0);
    $(".mini-panel").hide(0);
    $(".mini-panel2").hide(0);

    // getting ready to scroll
    AOS.init({
        duration: 800,
        easing: 'ease-in-out-back'
    });
    window.addEventListener('load', function () {
        AOS.refresh();
    });

    // setting up vue
    initVue();
    //setting up slider
    initSlider();
    //start animations
    animateWelcome();

});

//initialising document
function initVue() {
    //data to be used in the view for the ball color call
    var data = {
        circleRadius: 800,
        radiusNumber: 400,
        sizeNumber: 400,
        hueNumber: 299,
        satNumber: 55,
        lightNumber: 77
    };
    //new vue 
    new Vue({
        el: '#app',
        data: data
    });
}

function initSlider() {
    //creating left slide out area for buttons
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

    //buttons and their actions
    $("#b-small").click(function () {
        $(this).toggleClass("selected-action");
        $("#size-panel").toggle(800);

    });
    $("#b-colour").click(function () {
        $(this).toggleClass("selected-action");
        $(".mini-panel2").toggle(800);
    });
    $("#b-black").click(function () {
        $(this).toggleClass("selected-action");
        $("body").toggleClass("black-all");
    });
    //troll will apear and disappear on button
    //to play hide and seek the user needs to point at troll first
    $("#b-troll").click(function () {
        $(this).toggleClass("selected-action");
        $("#pictroll").toggleClass("invisible");

        $(".ball").hover(
            function () {
                $('#pictroll').fadeIn(600);
            }, function () {
                $('#pictroll').fadeOut(200);
            }
        );
    });
    //repaet button will restart the app
    $("#b-repeat").click(function () {
        $(".ball").fadeIn(800);
        $("#vue-wrapper").fadeIn(800);
        $("#slider-wrapper").fadeIn(800);
        $("#scroller-wrapper").fadeIn(800);
        window.location.reload();
    });
}

function animateWelcome() {

    //this is the animation for welcome text and cirle/ball switch over
    $(".t-circle-left").fadeIn(1500).delay(1000).animate({
        "width": "0", "opacity": "0.0",
    }, 1000, function () {
        $(".t-ball-left").delay(800).fadeIn(1500);
    });
    $(".circle-div").fadeIn(1500).delay(3500).animate({
        "width": "0", "opacity": "0.0", "height": "0"
    }, 1500, function () {
        $(".ball").fadeIn(1200).addClass('animated bounceInDown');
        $(".circle-div").slideUp(600);
        setTimeout(function () {
            $(".b-slide").removeClass("invisible").addClass('animated rollIn').animate({ height: "+=90px" }, 600).animate({ height: "-=90px" }, 600);
        }, 1000);
        setTimeout(function () { $(".b-slide").trigger("click"); }, 2000);
        setTimeout(function () {
            $("#welcome-section").addClass('animated fadeOutRight').slideUp(1200);

        }, 4000);
        scrollReady();
    });

}
// fixing the ball in levitation position this seperate function as it will be extended later.
function scrollReady() {
    $("#vue-wrapper").addClass("position-fixed");
}

