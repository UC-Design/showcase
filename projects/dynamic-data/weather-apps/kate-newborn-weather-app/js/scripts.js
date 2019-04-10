////////////////////////////////
// GLOBAL VARIABLES
////////////////////////////////

var queryNum = 0;
var animationHeight = $("#weatherAnimation").height();
var animationWidth = $("#weatherAnimation").width();
var now;
var tzLatLong;

////////////////////////////////
// 'GO' Button (Submit location query)
////////////////////////////////

$("#locSubmit").click(function(){
    
    // Set location query
    var locQuery = $('#locQuery').val();
    
    // Stay on page if location not entered
    if (locQuery == '') {
        return;
    }
    
    // Show loading screen
    $("#loadScreen").css("display","block");
    
    // Hide intro screen and search box
    $( "#locSearch" ).css("opacity","0");
    $( "#locSearch" ).css("z-index","8");
    $( "#locSearch" ).css("bottom","0");
    $("#intro").css("display","none");
    
    // Prevent button from refreshing the page
    event.preventDefault()
    
    // Reset location query
    $('#locQuery').val("");
    
    // Log start of new query (REFERENCE ONLY)
    queryNum ++;
    console.log("QUERY #" + queryNum);
    console.log("QUERY: " + locQuery)
    
    // Google maps API call
    geocodeApiCall(locQuery);
    
});

////////////////////////////////
// FUNCTIONS
////////////////////////////////

// GOOGLE GEOCODE API CALL
function geocodeApiCall(locQuery) {
    
    var gcKey = "AIzaSyBopfD9nEIL1GB56rp9P6B-W583nFenoaQ";
    var gcUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + locQuery + "&key=" + gcKey;

    $.getJSON(gcUrl, function(gmData) {
        
        // Log geocode data (REFERENCE ONLY)
        console.log(gmData);
        
        // Determine if Google found a match for the location
        status = gmData.status;
        console.log("STATUS: " + status);
        
        // If Google found a match
        if (status == "OK") {
            
            // Hide error messaage
            $("#locError").css("display","none");
            
            // Reset weather animation
            // Remove appended elements from all animation layers
            $('#skyLayer').empty();
            $('#nightFilter').empty();
            $('#cloudLayer').empty();
            $('#precipLayer').empty();
            $('#visFilter').empty();
            $('#moon').empty();
            //Reset css
            $('#sun').css("display","none");
            $("#sun").css( "top", "0" );
            $("#sun").css( "height", "15vh" );
            $("#sun").css( "width", "15vh" );
            $("#sun").css( "z-index", "1" );
            $("#sun").css( "border-radius", "50%" );
            $("#sun").css( "background", "none" );
            $("#sun").css( "background", "radial-gradient(#f6e9b3 0%, #fff 100%)" );
            $("#sun").css( "opacity", "1" );
            $('#moon').css("display","none");
            $("#moonSVG").css("fill","url(#moonShadow)");
            $('#nightFilter').css("background-color", "rgba(0,0,0,0)");
            $("#cloudLayer").css("background","rgba(0,0,0,0)");
            $(".svgCloud").css( "fill", "url(#cloudDay)");
            $("#visFilter").css("background-color","rgba(255,255,255,0");

            // Reset location info display
            $('#time').empty();
            $('#currentLoc').empty();
            $('#currentLocLong').empty(); 
                        
            // Get location data
            locShort = gmData.results[0].address_components[0].long_name;
            locLong = gmData.results[0].formatted_address;
            lat = gmData.results[0].geometry.location.lat;
            long = gmData.results[0].geometry.location.lng;
            
            // Format Lat. and Long. for timezone api call
            tzLatLong = lat + ',' + long
            
            // Display location data
            $("#currentLoc").append(locShort);
            $("#currentLocLong").append(locLong);
            
            // Get Darksky data and display weather animation
            // darkskyApiCall();
            darkskyApiCall();
            
            // Change query placeholder text
            $("#locQuery").attr("placeholder", "Where to next?");
            
        } // END LOCATION STATUS OK
        else {
            // Show error message
            $("#locError").css("display","block");
            // Hide loading screen
             $("#loadScreen").css("display","none");
        };
    });
}

// DARKSKY API CALL
function darkskyApiCall() {

    var dsKey = "5e89f2198653b4fae6ff73094af63ab5";
    var dsUrl = "https://api.darksky.net/forecast/" + dsKey + "/" + lat + "," + long + "?units=si";
    var dsData;

    $.getJSON(dsUrl, function(dsData) {

        // Log Darksky data (REFERENCE ONLY)
        console.log(dsData);

        ////////////////////////////////
        // DARKSKY DATA
        ////////////////////////////////

        // LOCAL TIME DATA
        
        // Get current time
        now = new Date().getTime();
        
        // Use moment.js to format as local time
        var utcDate = moment.utc(now).format();
        var offset = dsData.offset;
        var localDate = moment(utcDate).utcOffset(offset * 60).format();
        var localTime = moment.parseZone(localDate).format("dddd h:mm a");
        
        // Append local time
        $("#time").append(localTime);
        
        // TIME OF DAY DATA

        var time;

        // Get sunrise/sunset data
        var sunriseTime = dsData.daily.data[0].sunriseTime*1000;
        var sunsetTime = dsData.daily.data[0].sunsetTime*1000;

        // Compensate for missing sunrise/sunset data
        // Assign random time of day if data is missing
        if (sunriseTime == undefined || sunsetTime == undefined) {
            var ranTime = randomInt(0,1);
            if (ranTime == 0) {
                time = "Day";
            } else {
                time = "Night";
            }
        }
        // Determine time of day if sunrise/sunset data is available
        else {
            // Set sunrise/sunset time
            // For animation purposes, sunrise and sunset start and end approx 15 minutes before and after
            var sunriseStartTime = sunriseTime - 1000000;
            var sunriseEndTime = sunriseTime + 1000000;
            var sunsetStartTime = sunsetTime - 1000000;
            var sunsetEndTime = sunsetTime + 1000000;

            // Determine time of day based on sunrise/sunset times
            if (now > sunriseEndTime && now < sunsetStartTime) {
                time = "Day";
            } else if (now < sunriseStartTime || now > sunsetEndTime) {
                time = "Night";
            } else if (now >= sunriseStartTime && now <= sunriseEndTime) {
                time = "Sunrise";
            } else if (now >= sunsetStartTime && now <= sunsetEndTime) {
                time = "Sunset";
            };

            // Find and log local sunrise/sunset times (REFERENCE ONLY)
            var utcSunrise = moment.utc(sunriseTime).format();
            var localSunrise = moment(utcSunrise).utcOffset(offset * 60).format();
            console.log("SUNRISE: " + moment.parseZone(localSunrise).format("dddd Do MMMM h:mm a"));
            var utcSunset = moment.utc(sunsetTime).format();
            var localSunset = moment(utcSunset).utcOffset(offset * 60).format();
            console.log("SUNSET: " + moment.parseZone(localSunset).format("dddd Do MMMM h:mm a"));
        };

        // Log time of day data (REFERENCE ONLY)
        console.log("TIME OF DAY: " + time);

        // MOON PHASE DATA

        // If night, determine moon phase
        if (time == "Night") {

            var moon;

            // Get moon data
            var moonData = dsData.daily.data[0].moonPhase;

            // Compensate for missing data
            if (moonData == undefined) {
                moonData = 0.5;
            };
            
            moonData = 0.14;

            // Determine moon phase based on moon data
            // NOTE: Waxing and waning of moon is not determined
            if ( moonData <= 0.02 || moonData >= 0.98 ) {
                moon = "New Moon";
            } else if ( moonData >= 0.23 && moonData <= 0.27 || moonData >= 0.73 && moonData <= 0.77 ) {
                moon = "Half Moon";
            } else if ( moonData >= 0.48 && moonData <= 0.52 ) {
                moon = "Full Moon";
            } else if ( moonData > 0.27 && moonData < 0.48 || moonData > 0.52 && moonData < 0.73 ) {
                moon = "Gibbous Moon";
            } else if ( moonData > 0.02 && moonData < 0.23 || moonData > 0.77 && moonData < 0.98 ) {
                moon = "Crescent Moon";
            };

            // Log moon data (REFERENCE ONLY)
            console.log("  Moon phase: " + moon);
        };

        // APPARENT TEMPERATURE DATA

        var temp;

        // Get temp data
        var tempData = dsData.currently.apparentTemperature;

        // Compensate for missing data
        if (tempData == undefined) {
            tempData = 18;
        };

        // Determine temp based on temp data
        if (tempData <= 10) {
            temp = "Cold";
        } else if (tempData > 10 && tempData <= 25) {
            temp = "Mild";
        } else if (tempData > 25) {
            temp = "Hot";
        };

        // Log temp data (REFERENCE ONLY)
        console.log("TEMP: " + temp);

        // PRECIPITATION DATA

        // Get percip intensity data
        var precipInt = dsData.currently.precipIntensity;

        // Compensate for missing data
        if (precipInt == undefined) {
            precipInt = 0;
        };

        // Set percip type if intensity is significant
        if (precipInt > 0.1) {
            var precipType = dsData.currently.precipType;

            // Compensate for missing data
            if (precipType == undefined) {
                precipType = "rain";
            };

            // Log precip data (REFERENCE ONLY)
            console.log("PRECIPITATION: " + precipInt + " mm/h of " + precipType);

        } else {
            console.log("PRECIPITATION: None");
        };

        // CLOUD DATA

        // Get cloud data
        var cloudData = dsData.currently.cloudCover;

        // Compensate for missing data
        if (cloudData == undefined) {
            cloudData = 0;
        };

        // Log cloud data (REFERENCE ONLY)
        console.log("CLOUDS: " + cloudData*100 + "% of sky covered");

        // WIND DATA

        // Get wind data
        var windData = dsData.currently.windSpeed;

        // Compensate for missing data
        if (windData == undefined) {
            windData = 0;
        };

        // Log wind data (REFERENCE ONLY)
        console.log("WIND: " + windData + "km per hour");

        // VISIBILITY DATA

        // Get visibility data
        var visData = dsData.currently.visibility;

        // Compensate for missing data (darksky caps vis data at 10 miles/~16km)
        if (visData == undefined) {
            visData = 17;
        };

        // Log vis data (REFERENCE ONLY)
        console.log("VISIBILITY: " + visData + " km (max. 17km)");

        ////////////////////////////////
        // WEATHER ANIMATION
        ////////////////////////////////

        // TIME OF DAY ANIMATION

        if (time == "Day") {
            // Display sun
            $("#sun").css( "display", "block" );
            
            // Set day sky
//            $("#skyLayer").css( "background-image", "linear-gradient(rgb(211, 225, 254) 0%, rgb(184, 206, 243) 75%, rgb(151, 169, 199) 100%)" );
            $("#skyLayer").css( "background-image", "linear-gradient(rgb(195, 215, 247) 0%, rgb(155, 191, 247) 75%, rgb(131, 161, 208) 100%)" );

            
        } else if (time == "Night") {
            // Display moon
            $("#moon").css( "display", "block" );

            // Set night Sky
            $("#skyLayer").css( "background-image", "linear-gradient(rgb(20, 25, 34) 0%, rgb(27, 33, 43) 50%, rgb(72, 85, 108) 100%)" );
            $("#nightFilter").css( "background-color", "rgba(0,0,0,.25)" );

            // Generate moon SVG
            var moonArray = [
                // 0 - Half moon
                "M205.022,387.006c-100,0-181.073-81.069-181.073-181.074c0-100.004,81.073-181.073,181.073-181.073V387.006z",
                // 1 - Full moon
                "M204.802,25.858c100.004,0,181.074,80.069,181.074,180.074c0,100.004-81.07,181.073-181.074,181.073 c-100.005,0-181.074-81.069-181.074-181.073C23.728,105.927,104.797,25.858,204.802,25.858z",
                // 2 - Gibbous moon
                "M327.684,205.932c0,100.005-75.93,181.074-122.882,181.074c-100.004,0-181.073-81.069-181.073-181.074 c0-100.004,81.069-181.073,181.073-181.073C254.237,24.858,327.684,105.928,327.684,205.932z",
                // 3 - Crescent moon
                "M102.825,205.932c0,149.776,101.977,181.073,101.977,181.073c-100.004,0-181.073-81.068-181.073-181.073 c0-100.004,81.069-181.073,181.073-181.073C204.802,24.858,102.825,58.305,102.825,205.932z"
            ]; 

            if (moon == "New Moon") {
                moonPath = moonArray[1];
            } else if (moon == "Half Moon") {
                moonPath = moonArray[0];
            } else if (moon == "Full Moon") {
                moonPath = moonArray[1];
            } else if (moon == "Gibbous Moon") {
                moonPath = moonArray[2];
            } else if (moon == "Crescent Moon") {
                moonPath = moonArray[3];
            };

            $('#moon').append(
                '<svg id="moonSVG" viewBox="0 0 406.215 410.734">' +
                    '<defs>' +
                        // Gradient filter for moon shadow
                        '<linearGradient id="moonShadow" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="40%" style="stop-color:#E6E7E8;stop-opacity:1" /><stop offset="100%" style="stop-color:#606161;stop-opacity:1" /></linearGradient>' +
                        // Gradient filter for new moon
                        '<radialGradient id="newMoon" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="85%" style="stop-color:#1b212b;stop-opacity:1" /><stop offset="100%" style="stop-color:#2c3646;stop-opacity:1" /></linearGradient>' +
                        // Blur filter for moon
                        '<filter id="blurmoon" x="0" y="0"><feGaussianBlur in="SourceGraphic" stdDeviation="2" /></filter>' +
                    '</defs>' +
                    '<path d="' + moonPath + '"/>' +
                '</svg>'
            );

            if (moon == "New Moon") {
                $("#moonSVG").css("fill","url(#newMoon)");
            } ;

            // Generate Stars
            makeStars();

        // If sunset/sunrise
        } else {
            // Display sun
            $("#sun").css( "display", "block" );
            // Make sun div fill the whole sky 
            $("#sun").css( "top", "-20vh" );
            $("#sun").css( "height", "80vh" );
            $("#sun").css( "width", "100vw" );
            $("#sun").css( "z-index", "0" );
            $("#sun").css( "border-radius", "0" );
            //  Generate sunset/sunrise gradient
            $("#sun").css( "background", "-webkit-radial-gradient(bottom, circle, rgba(254,255,255,1) 5%,rgba(236,255,0,.9) 10%,rgba(255,150,20,.8) 30%, rgba(243,0,0,.8) 50%,rgba(70,0,35,.75) 100%)" );
            $("#sun").css( "opacity", "0.95" );
        };

        // TEMP ANIMATION
        
        var tempColour;
        
        if ( temp == "Cold" ) {
            tempColour = "255,255,255";
        } else if ( temp == "Mild" ) {
            tempColour = "154,163,180";
        } else if ( temp == "Hot" ) {
            tempColour = "243,144,53";
        }
        
        // Change of Location info to reflect temperature
        $("#currentLoc").css( "color", "rgba(" + tempColour + ", 0.75)" );
        $("#currentLocLong").css( "color", "rgba(" + tempColour + ", 0.75)" );

        // PRECIPITATION ANIMATION

        if (precipType == "rain" || precipType == "sleet") {
            makeItRain( (precipInt*animationWidth)/100, 2.5, windData );
        } else if (precipType == "snow") {
            makeItSnow( (precipInt*animationWidth)/100, 5, windData );
        };

        // CLOUDS ANIMATION

        // Determine number of clouds (cloudCover) based on cloud data
        var cloudCover = (cloudData * animationWidth) / 3;
        // Determine windspeed for clouds based on wind data
        var windSpeed = animationWidth/(windData*windData);

        // Generate clouds
        makeClouds(cloudCover,windSpeed);

        // Make sky gray when cloudy (gray opacity = cloudcover)
        $("#cloudLayer").css("background","rgba(150,150,150," + cloudData + ")");
        // Make sky darker gray at night
        if (time == "Night") {
            $("#cloudLayer").css("background","rgba(50,50,50," + cloudData + ")");
        } ;

        // Make clouds darker at night  
        if (time == "Night") {
            $(".svgCloud").css( "fill", "url(#cloudNight)" );
        } ;

        // VISIBILITY ANIMATION

        // Set visibility screen opacity (Anything more than 10km visibility is clear)
        var visScreen = (10 - visData)/10;
        if (visScreen > 0.5) {
            visScreen = 0.5;
        }
        if (visScreen > 0) {
            $("#visFilter").css("background-color","rgba(255,255,255," + visScreen + ")");
        }
        
        loadComplete();
    });
}

// DARKSKY API CALL COMPLETE
function loadComplete() {
    // Hide loading screen
    $("#loadScreen").css("display","none");
    $( "#locSearch" ).animate({
        opacity: 1,
        bottom: "25vh"
    }, 2000, "swing" );
}

// GENERATE RANDOM NUMBER - WHOLE
function randomInt(minNum,maxNum) {
    return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
};

// GENERATE RANDOM NUMBER - CONTINUOUS
function randomNum(minNum,maxNum) {
    return (Math.random() * (maxNum - minNum + 1));
};

// MAKE STARS
function makeStars() {
    // Rondomise star size and placement
    nStars = ((animationHeight) * animationWidth) / 10000;
    for( i=1;i<nStars;i++) {
        var starLeft = randomInt(0,animationWidth);
        var starTop = randomInt(0,animationHeight);
        var starSize = randomNum(.5,2);
        $('#skyLayer').append('<div class="star" id="star' + i + '"></div>');
        $('#star'+i).css('left',starLeft);
        $('#star'+i).css('top',starTop);
        $('#star'+i).css('width',starSize);
    };
};

// MAKE IT RAIN
function makeItRain(nRaindrops,rainSpeed,rainWind) {
    // Create 'nRaindrops' number of raindrops, randomly distributed across animation
    for( i=1;i<nRaindrops;i++) {
        var dropLeft = randomInt(0,animationWidth);
        var dropTop = "-" + animationHeight/50;
        $('#precipLayer').append('<div class="raindrop" id="raindrop' + i + '"></div>');
        $('#raindrop'+i).css('left',dropLeft);
        $('#raindrop'+i).css('top',dropTop + "px");
    };
    // Change how far the raindrops blow based on the wind speed (rainWind)
    if (rainWind < 1.5) {
        $(".raindrop").css('-webkit-animation', "calmWind " + rainSpeed + "s infinite linear");
    } else if (rainWind >= 1.5 && rainWind < 13.8) {
        $(".raindrop").css('-webkit-animation', "breezeWind " + rainSpeed + "s infinite linear");
    } else if (rainWind >= 13.8 && rainWind < 28.4) {
        $(".raindrop").css('-webkit-animation', "windyWind " + rainSpeed + "s infinite linear");
    } else if (rainWind >= 28.4) {
        $(".raindrop").css('-webkit-animation', "violentWind " + rainSpeed + "s infinite linear");
    };
    // Negatively delay raindrops so they have already started to fall at random intervals
    for( i=1;i<nRaindrops;i++) {
        var delay = "-" + randomNum(0,rainSpeed);
        $('#raindrop'+i).css('-webkit-animation-delay', delay + "s");
        $('#raindrop'+i).css('-moz-animation-delay', delay + "s");
    };
};

// MAKE IT SNOW
function makeItSnow(nSnowdrops,snowSpeed,snowWind) {
    // Create 'nSnowdrops' number of snow particles, randomly distributed across animation
    for( i=1;i<nSnowdrops;i++) {
        var dropLeft = randomInt(0,animationWidth);
        var dropTop = "-" + animationHeight/50;
        console.log(dropTop);
        var dropSize = randomInt(3,5);
        $('#precipLayer').append('<div class="snowdrop" id="snowdrop' + i + '"></div>');
        $('#snowdrop'+i).css('left',dropLeft);
        $('#snowdrop'+i).css('top',dropTop + "px");
        $('#snowdrop'+i).css('height',dropSize + "px");
        $('#snowdrop'+i).css('width',dropSize + "px");
    };
    // Change how far the snowdrops blow based on the wind speed (snowWind)
    if (snowWind < 1.5) {
        $(".snowdrop").css('-webkit-animation', "calmWind " + snowSpeed + "s infinite linear");
    } else if (snowWind >= 1.5 && snowWind < 13.8) {
        $(".snowdrop").css('-webkit-animation', "breezeWind " + snowSpeed + "s infinite linear");
    } else if (snowWind >= 13.8 && snowWind < 28.4) {
        $(".snowdrop").css('-webkit-animation', "windyWind " + snowSpeed + "s infinite linear");
    } else if (snowWind >= 28.4) {
        $(".snowdrop").css('-webkit-animation', "violentWind " + snowSpeed + "s infinite linear");
    };
    // Negatively delay snowdrops so they have already started to fall at random intervals
    for( i=1;i<nSnowdrops;i++) {
        var delay = "-" + randomNum(0,snowSpeed);
        $('#snowdrop'+i).css('-webkit-animation-delay', delay + "s");
        $('#snowdrop'+i).css('-moz-animation-delay', delay + "s");
    };
};

// MAKE CLOUDS
function makeClouds(nClouds,cloudSpeed) {
    // Different cloud SVG shapes
    var cloudArray = [
        { viewbox:"0 0 502 150", path:"M148.753,123.126c-17.899,5.023-34.221,5.339-50.182-2.693 c-1.983,0.174-72.571,1.244-71.11-20.491c0.755-11.241,39.996-13.891,42.684-14.399c-0.207-5.507,2.401-10.899,4.532-14.742 c8.952-16.145,24.365-12.505,27.445-12.724c1.625-2.635,9.987-34.545,47.433-34.306s49.444,39.91,49.889,41.479 c2.224-5.906,7.891-9.24,22.82-10.635c4.468-8.94,12.24-13.708,18.846-16.399c10.17-3.306,18.061-2.028,26.248,1.102 c9.188-11.562,21.523-17.006,35.928-15.081c14.453,1.931,25.074,10.191,31.184,24.517c10.531-4.41,33.865,4.59,37.83,10.251 c2.625-2.203,19.936-10.126,27.59-10.019c25.445,0.357,28.268,26.833,29.99,28.904c1.385-0.26,20.371,6.254,20.764,19.594 c3.166,0.488,27.686,2.526,27.686,9.061c0,19.133-114.213,28.108-146.35,19.838c-28.646-7.372-72.646-8.038-94.172-1.992 C203.593,134,154.667,126.344,148.753,123.126z"},
        { viewbox:"0 0 338 117", path:"M46.145,54.963C52.163,42.855,58.779,35.504,76,34.666 c9.113-0.444,26.333,3.333,33.674,12.446c4.679-7.684,12.599-10.065,21.56-8.751c16.041-26.881,51.673-25.843,68.245-8.983 c17.633-4.392,33.852-2.97,45.946,13.693c15.378-0.082,25.263,7.567,28.991,22.754c8.025,0.512,45.734,0.505,45.735,8.071 c0.001,11.436-17.074,22.687-79.99,22.005c-26.592,5.912-53.021,7.335-79.718-3.106C146.5,93.93,125,92,112.94,88.385 c0,0-26.555,2.027-39.789,1.632C32,90.999,19.064,84.135,17.214,78.385c-2.659-8.262,3.94-12.718,11.544-17.053 C33,58.914,46.145,54.963,46.145,54.963z"},
        { viewbox:"0 0 285 109", path:"M43.225,86.384c-13.891-0.392-21.714-3.595-23.969-9.493 s0-19.172,16.501-16.536c1.343-1.525-0.391-7.649,7.655-17.274s28.332-9.75,38.354,2.156c2.664,0.002,5.788-8.827,14.569-10.244 c10.333-1.667,12.615,2.292,15.231,2.292c2.311-3.192,5.83-14.092,21.015-18.851c15.184-4.759,29.038,7.435,32.319,11.005 c8.754-3.465,14.146-4.702,26.102-0.78c6.887,2.259,10,8.334,10.943,13.579c3.018-0.163,12.439,2.48,16.877,8.13 c4.436,5.649,4.439,12.454,4.439,14.863c2.625,0,11.639-0.323,22.617,1.07c10.977,1.394,21.986,2.271,17.217,11.979 c-5.427,11.046-35.884,9.979-44.737,10.503c-38.689,2.292-69.689,7.21-100.971-0.688C102.235,84.269,57.116,86.775,43.225,86.384z"}
    ];    
    // Generate cloud SVGs with random shapes
    for( i=1;i<=nClouds;i++) {
        var ranCloud = randomInt(0,cloudArray.length-1);
        var cloudPath = cloudArray[ranCloud].path;
        var cloudViewbox = cloudArray[ranCloud].viewbox;
        // Append cloud SVGs with filters
        $('#cloudLayer').append(
            '<svg class="svgCloud" id="cloud' + i + '" viewBox="' + cloudViewbox + '">' +
                '<defs>' +
                    // Gradient filter for clouds during DAY
                    '<linearGradient id="cloudDay" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#FFF;stop-opacity:1" /><stop offset="100%" style="stop-color:#E6E7E8;stop-opacity:1" /></linearGradient>' +
                    // Gradient filter for clouds during NIGHT
                    '<linearGradient id="cloudNight" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="5%"  stop-color="#979798"/><stop offset="95%" stop-color="#494a4a"/></linearGradient>' +           
                    // Blur filter for clouds
                    '<filter id="blurCloud" x="0" y="0"><feGaussianBlur in="SourceGraphic" stdDeviation="6" /></filter>' +
                '</defs>' +
                '<path d="' + cloudPath + '"/>' +
            '</svg>'
        );        
        // Rondomise cloud size and placement
        var cloudSize = animationHeight / randomInt(2,4);
        var cloudLeft = "-" + cloudSize;
        var cloudTop = randomNum(0,animationHeight);
        $('#cloud'+i).css('left',cloudLeft);
        $('#cloud'+i).css('top',cloudTop);
        $('#cloud'+i).css('width',cloudSize);
    };
    // Animate clouds based on cloud speed
    $(".svgCloud").css('-webkit-animation', "cloudMovement " + cloudSpeed + "s infinite linear");
    // Negatively delay clouds so animation has already started (at random intervals)
    for( i=1;i<nClouds;i++) {
        var delay = "-" + randomNum(0,cloudSpeed);
        $('#cloud'+i).css('-webkit-animation-delay', delay + "s");
        $('#cloud'+i).css('-moz-animation-delay', delay + "s");
    };
};