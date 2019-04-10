var meteorsRunning = true; // variable meteors is running 

function startMeteors() { //start meteor function
    var numMeteors = $(".meteor").length; // amount of meteor objects
    meteorsRunning = true; //runs meteors
    for (var i=1; i<=numMeteors; i++) { //loop to animate
        meteorLoop(i);
    }
}

function meteorLoop(m) { //animation loop function
    var dist = 150 + Math.random() * 250; // random start speed
    $("#meteor" + m ).animate({ top:"+=" + dist, left:"-=" + dist, opacity: 0 }, 1000 + Math.random() * 2000, function() { //animate objects
            var t = -50; // start top postion at -50px
            var l = Math.random() * $(window).width(); //change left space randomly
            $(this).css("top", t); //top effect = t
            $(this).css("left", l); //left effect = l
            $(this).css("opacity", 1); //opacity when animating down
            if (meteorsRunning) meteorLoop(m); //if meteor is running play loop
    });
}

function stopMeteors() { //loop stop funtion
    meteorsRunning = false; //meteor is false so it stops
}