// Stephanie Brink 3072445
// get the user's location when ready
$(document).ready(function(){
    
    var newLocation = ''; // to hold location data
    // browsers using HTML5 have in built geolocation
    if (navigator.geolocation) {   
        // if successful in getting location
        function success(pos) {         
            var crds = pos.coords;
            // get the longitude and latitude
            newLocation = crds.latitude + ', ' + crds.longitude;
            getWeatherData(newLocation);
            // feed separate coords to new function
            getLocationName(crds.latitude, crds.longitude);
        };
            
        // if there's an error getting location, use Canberra and update
        function error(err) {
            alert("Contempo can't get your location – Canberra it is.");
            var defaultLocation = '-35.28346,149.12807';
            var locationCanberra = $('<h2>').text('Canberra');
            $('#location').append(locationCanberra);
            getWeatherData(defaultLocation);
        };
        
        navigator.geolocation.getCurrentPosition(success,error);
    };
});

// reverse geocoding to get location name
function getLocationName(lat, long) {
                
    var geoApi = '9aebdd2fd11041c9bfe5604e053cf484'; // my OpenCage Geocoder API key
                
    var geocodeUrl = 'http://api.opencagedata.com/geocode/v1/json?q=' + lat + '+' + long + '&key=' + geoApi;
                
    $.getJSON(geocodeUrl, function(locationData) {
        // get the location string - only suburb
        var locationString = locationData.results[0].components.suburb;
        // append to HTML
        var location = $('<h2>').html(locationString);
        $('#location').append(location);    
    });
};
            
// to get weather API data for current location
function getWeatherData(currentLocation) {
                
    var key = '0a6009db83bbd52d398c4469e8b12292'; // my DarkSky API key
                
    // Canberra is the default location
    var defaultLocation = '-35.28346,149.12807';
                    
    var weatherUrl = 'https://api.darksky.net/forecast/' + key + '/' + defaultLocation + '?units=auto';
    
    $.getJSON(weatherUrl, function(data) {
        
        // get current temperature data, round to nearest whole number and append to HTML
        var currentTemp = Math.round(data.currently.temperature);
        var temp = $('<h1>').html(currentTemp + '&deg;c');
        $('#current-temp').append(temp);
        
        // get 'feels like' temperature data, round to nearest whole number and append to HTML
        var feelsLike = Math.round(data.currently.apparentTemperature);
        var feels = $('<h2>').html('Feels like ' + feelsLike + '&deg;');
        $('#feels-like').append(feels);
        
        // get the icon and append to HTML
        var icon = data.currently.icon;
        var iconImage = ''; // to input icon weather image
            
            if (icon === 'clear-day') {
                iconImage = 'class="xl-icon" src="images/clear-day.svg"';
                addIcon();}
            if (icon === 'clear-night') {
                iconImage = 'class="m-icon" src="images/clear-night.svg"';
                addIcon();}
            if (icon === 'rain' || icon === 'sleet') {
                iconImage = 'class="l-icon" src="images/rain.svg"';
                addIcon();}
            if (icon === 'snow') {
                iconImage = 'class="l-icon" src="images/snow.svg"';
                addIcon();}
            if (icon === 'wind') {
                iconImage = 'class="s-icon" src="images/wind.svg"';
                addIcon();}
            if (icon === 'fog') {
                iconImage = 'class="l-icon" src="images/fog.svg"';
                addIcon();}
            if (icon === 'cloudy') {
                iconImage = 'class="m-icon" src="images/cloud.svg"';
                addIcon();}
            if (icon === 'partly-cloudy-day') {
                iconImage = 'class="m-icon" src="images/partly-cloudy-day.svg"';
                addIcon();}
            if (icon === 'partly-cloudy-night') {
                iconImage = 'class="s-icon" src="images/partly-cloudy-night.svg"';
                addIcon();}
                
            function addIcon() {
                $('#icon').html('<img ' + iconImage + 'alt="">');
            };
        
        // get the current summary (string) and append to HTML
        var currentSummary = data.currently.summary;
        var summary = $('<p>').text(currentSummary);
        $('#icon').append(summary);
        
        // get the current time and change marker on the clock
        var time = new Date(data.currently.time*1000);
        var timeInHours = time.getHours(); // to get only the hours (accuracy not needed for the marker)
           
            var timeMarker = $('#time-container');
        
            // for 6am (to 6.59am)
            if (timeInHours == 6) {rotateTime(0);}
            // for 7am (to 7.59am)
            if (timeInHours == 7) {rotateTime(15);}
            // for 8am (to 8.59am)
            if (timeInHours == 8) {rotateTime(30);}
            // for 9am (to 9.59am)
            if (timeInHours == 9) {rotateTime(45);}
            // for 10am (to 10.59am)
            if (timeInHours == 10) {rotateTime(60);}
            // for 11am (to 11.59am)
            if (timeInHours == 11) {rotateTime(75);}
            // for 12pm (to 12.59pm)
            if (timeInHours == 12) {rotateTime(90);}
            // for 1pm (to 1.59pm)
            if (timeInHours == 13) {rotateTime(105);}
            // for 2pm (to 2.59pm)
            if (timeInHours == 14) {rotateTime(120);}
            // for 3pm (to 3.59pm)
            if (timeInHours == 15) {rotateTime(135);}
            // for 4pm (to 4.59pm)
            if (timeInHours == 16) {rotateTime(150);}
            // for 5pm (to 5.59pm)
            if (timeInHours == 17) {rotateTime(165);}
            // for 6pm (to 6.59pm)
            if (timeInHours == 18) {rotateTime(180);}
            // for 7pm (to 7.59pm)
            if (timeInHours == 19) {rotateTime(195);}
            // for 8pm (to 8.59pm)
            if (timeInHours == 20) {rotateTime(210);}
            // for 9pm (to 9.59pm)
            if (timeInHours == 21) {rotateTime(225);}
            // for 10pm (to 10.59pm)
            if (timeInHours == 22) {rotateTime(240);}
            // for 11pm (to 11.59pm)
            if (timeInHours == 23) {rotateTime(255);}
            // for 12am (to 12.59am)
            if (timeInHours == 0) {rotateTime(270);}
            // for 1am (to 1.59am)
            if (timeInHours == 1) {rotateTime(285);}
            // for 2am (to 2.59am)
            if (timeInHours == 2) {rotateTime(300);}
            // for 3am (to 3.59am)
            if (timeInHours == 3) {rotateTime(315);}
            // for 4am (to 4.59am)
            if (timeInHours == 4) {rotateTime(330);}
            // for 5am (to 5.59am)
            if (timeInHours == 5) {rotateTime(345);}
            
            // function for rotating the timeMarker based on the time
            function rotateTime(t) {
                timeMarker.css({'transform':'rotate(' + t + 'deg)'});
            }
        
        // get max temp and append to HTML
        var maxTemp = Math.round(data.daily.data[0].temperatureHigh);
        var max = $('<p>').html(maxTemp + '&deg;');
        $('#max-temp').append(max);
        
        // get the time the max temp occurs and change marker on clock
        var maxTempTime = new Date(data.daily.data[0].temperatureHighTime*1000);
        var highTime = maxTempTime.getHours(); // to get only the hours
        
            var maxMarker = $('#max-temp-container'); // to position the marker on the clock
            var maxStraighten = $('#max-temp'); // to straighten the square marker
            
            // for max temp at 10am (to 10.59am)
            if (highTime == 10) {rotateMaxTemp(60);}
            // for max temp at 11am (to 11.59am)
            if (highTime == 11) {rotateMaxTemp(75);}
            // for max temp at 12pm (to 12.59pm)
            if (highTime == 12) {rotateMaxTemp(90);}
            // for max temp at 1pm (to 1.59pm)
            if (highTime == 13) {rotateMaxTemp(105);}
            // for max temp at 2pm (to 2.59pm)
            if (highTime == 14) {rotateMaxTemp(120);}
            // for max temp at 3pm (to 3.59pm)
            if (highTime == 15) {rotateMaxTemp(135);}
            // for max temp at 4pm (to 4.59pm)
            if (highTime == 16) {rotateMaxTemp(150);}
            // for max temp at 5pm (to 5.59pm)
            if (highTime == 17) {rotateMaxTemp(165);}
            // for max temp at 6pm (to 6.59pm)
            if (highTime == 18) {rotateMaxTemp(180);}
            // for max temp at 7pm (to 7.59pm)
            if (highTime == 19) {rotateMaxTemp(195);}
            // for max temp at 8pm (to 8.59pm)
            if (highTime == 20) {rotateMaxTemp(210);}
            // for max temp at 9pm (to 9.59pm)
            if (highTime == 21) {rotateMaxTemp(225);}
            
            // function for rotating the maxMarker and maxStraighten based on the time it occurs
            function rotateMaxTemp(x) {
                maxMarker.css({'transform':'rotate(' + x + 'deg)'});
                maxStraighten.css({'transform':'rotate(' + (360-x) + 'deg)'});
            }
        
        // get min temp and append to HTML
        var minTemp = Math.round(data.daily.data[0].temperatureLow);
        var min = $('<p>').html(minTemp + '&deg;');
        $('#min-temp').append(min);
        
        // get the time the min temp occurs and change marker on clock
        var minTempTime = new Date(data.daily.data[0].temperatureLowTime*1000);
        var lowTime = minTempTime.getHours(); // to get only the hours
        
            var minMarker = $('#min-temp-container'); // to position the marker on the clock
            var minStraighten = $('#min-temp'); // to straighten the square marker
            
            // for min temp at 10pm (to 10.59pm)
            if (lowTime == 22) {rotateMinTemp(240);}
            // for min temp at 11pm (to 11.59pm)
            if (lowTime == 23) {rotateMinTemp(255);}
            // for min temp at 12am (to 12.59am)
            if (lowTime == 0) {rotateMinTemp(270);}
            // for min temp at 1am (to 1.59am)
            if (lowTime == 1) {rotateMinTemp(285);}
            // for min temp at 2am (to 2.59am)
            if (lowTime == 2) {rotateMinTemp(300);}
            // for min temp at 3am (to 3.59am)
            if (lowTime == 3) {rotateMinTemp(315);}
            // for min temp at 4am (to 4.59am)
            if (lowTime == 4) {rotateMinTemp(330);}
            // for min temp at 5am (to 5.59am)
            if (lowTime == 5) {rotateMinTemp(345);}
            // for min temp at 6am (to 6.59am)
            if (lowTime == 6) {rotateMinTemp(0);}
            // for min temp at 7am (to 7.59am)
            if (lowTime == 7) {rotateMinTemp(15);}
            // for min temp at 8am (to 8.59am)
            if (lowTime == 8) {rotateMinTemp(30);}
            // for min temp at 9am (to 9.59am)
            if (lowTime == 9) {rotateMinTemp(45);}
        
            // function for rotating the minMarker and minStraighten based on the time it occurs
            function rotateMinTemp(y) {
                minMarker.css({'transform':'rotate(' + y + 'deg)'});
                minStraighten.css({'transform':'rotate(' + (360-y) + 'deg)'});
            }
        
        // get sunrise time and change fill indicator behind clock
        var sunriseTime = new Date(data.daily.data[0].sunriseTime*1000);
        var sunrise = sunriseTime.getHours(); // to get only the hours

            var sunriseMarker = $('#sunrise-fill, #sunrise-fill-extend');
        
            // for sunrise at 3am (to 3.59am)
            if (sunrise == 3) {
                $('#remainder-fill').css({'background-size': '50% 10%'});
                $('#sunrise-fill-extend').css({'height':'0em'});
                rotateSunrise(-45);}
            // for sunrise at 4am (to 4.59am)
            if (sunrise == 4) {
                $('#sunrise-fill-extend').css({'height':'5em'});
                $('#sunrise-fill').addClass('no-after-element');
                rotateSunrise(-30);}
            // for sunrise at 5am (to 5.59am)
            if (sunrise == 5) {rotateSunrise(-15);}
            // for sunrise at 6am (to 6.59am)
            if (sunrise == 6) {rotateSunrise(0);}
            // for sunrise at 7am (to 7.59am)
            if (sunrise == 7) {rotateSunrise(15);}
            // for sunrise at 8am (to 8.59am)
            if (sunrise == 8) {
                $('#sunrise-fill-extend').css({'height':'15em'});
                rotateSunrise(30);}
            // for sunrise at 9am (to 9.59am)
            if (sunrise == 9) {
                $('#remainder-fill').css({'background-size':'100% 50%'});
                $('#sunrise-fill-extend').css({'height':'15em'});
                rotateSunrise(45);}
            // for sunrise at 10am (to 10.59am)
            if (sunrise == 10) {
                $('#remainder-fill').css({'background-size':'100% 50%'});
                $('#sunrise-fill-extend').css({'height':'20em'});
                rotateSunrise(60);}
            
            function rotateSunrise(sr) {
                sunriseMarker.css({'transform':'rotate(' + sr + 'deg)'});
            }
        
        // get sunset time and change fill indicator behind clock
        var sunsetTime = new Date(data.daily.data[0].sunsetTime*1000);
        var sunset = sunsetTime.getHours(); // to get only the hours
        
            var sunsetMarker = $('#sunset-fill, #sunset-fill-extend');
        
            // for sunset at 3pm (to 3.59pm)
            if (sunset == 15) {
                $('#remainder-fill').css({'background-size':'50% 60%'});
                $('#sunset-fill-extend').css({'height':'20em'});
                rotateSunset(-45);}
            // for sunset at 4pm (to 4.59pm)
            if (sunset == 16) {
                $('#sunset-fill-extend').css({'height':'15em'});
                rotateSunset(-30);}
            // for sunset at 5pm (to 5.59pm)
            if (sunset == 17) {rotateSunset(-15);}
            // for sunset at 6pm (to 6.59pm)
            if (sunset == 18) {rotateSunset(0);}
            // for sunset at 7pm (to 7.59pm)
            if (sunset == 19) {rotateSunset(15);}
            // for sunset at 8pm (to 8.59pm)
            if (sunset == 20) {
                $('#sunset-fill-extend').css({'height':'5em'});
                rotateSunset(30);}
            // for sunset at 9pm (to 9.59pm)
            if (sunset == 21) {
                $('#sunset-fill-extend').css({'height':'1em'});
                rotateSunset(45);}
            // for sunset at 10pm (to 10.59pm)
            if (sunset == 22) {
                $('#remainder-fill').css({'background-size':'50% 10%'});
                $('#sunset-fill-extend').css({'height':'0em'});
                $('#sunset-fill').css({'background-size':'37% 50%'}).addClass('no-after-element');
                rotateSunset(60);}
            
            function rotateSunset(st) {
                sunsetMarker.css({'transform':'rotate(' + st + 'deg)'});
            }
        
        // counting for ALL POSSIBILITIES within sunrise times of 3am to 10am (10.59am) and sunset times of 3pm to 10pm (10.59pm) and adjusting so dark blue 'night time' fill works
        if (sunrise == 3 && sunset == 22) {
            $('#sunrise-fill').css({'background-size': '37% 50%'}).addClass('no-after-element');
            $('div#ring > p').addClass('adjust-left-05em-after');}
        if (sunrise == 8 && sunset == 22) {
            $('#sunset-fill').removeClass('no-after-element');
            $('#remainder-fill').css({'background-size':'100% 33%'});}
        if (sunrise == 9 && sunset == 15) {
            $('#remainder-fill').css({'background-size':'60% 60%'});}
        if (sunrise == 9 && sunset == 22) {
            $('#sunset-fill').removeClass('no-after-element');
            $('#remainder-fill').css({'background-size':'100% 34%'});}
        if (sunrise == 10 && sunset == 15) {
            $('#remainder-fill').css({'background-size':'70% 60%'});
            $('#sunset-fill-extend').addClass('no-before-element');
            $('div#bottom').css({'z-index':'-1'});}
        if (sunrise == 10 && sunset == 16 || 17 || 18 || 19) {
            $('div#bottom').css({'z-index':'-1','height':'52%'});}
        if (sunrise == 10 && sunset == 20) {
            $('#sunrise-fill-extend').addClass('adjust-width30em');
            $('div#bottom').css({'z-index':'-2'})}
        if (sunrise == 10 && sunset == 21) {
            $('#sunrise-fill-extend').addClass('adjust-width20em');
            $('div#bottom').css({'z-index':'-2'});}
        if (sunrise == 10 && sunset == 22) {
            $('#sunrise-fill-extend').addClass('adjust-width20em');
            $('div#bottom').css({'z-index':'-2'});
            $('#remainder-fill').css({'background-size':'90% 37%'});}
        if (sunset == 15 && sunrise == 3 || 4) {
            $('div#bottom').css({'z-index':'-2'});}
        if (sunset == 15 && sunrise == 9 || 10) {
            $('div#bottom').css({'z-index':'-1'});}
        if (sunset == 16 && sunrise == 3 || 4) {
            $('div#bottom').css({'z-index':'-2'});}
        if (sunset == 16 && sunrise == 10) {
            $('div#bottom').css({'z-index':'-1'});}
        if (sunset == 17 && sunrise == 9 || 10) {
            $('div#bottom').css({'z-index':'-1'});}
        if (sunset == 18 && sunrise == 3 || 4) {
            $('div#bottom').css({'z-index':'-2'});}
        if (sunset == 18 && sunrise == 10) {
            $('div#bottom').css({'z-index':'-1'});}
        if (sunset == 19 && sunrise == 10) {
            $('div#bottom').css({'z-index':'-1','height':'49%'});}
        if (sunset == 21 && sunrise == 3) {
            $('div.blue-fill').addClass('no-after-element');}
        
        // make time marker yellow for daytime and dark blue for night time
        if (timeInHours < sunset && timeInHours >= sunrise) {
            $('div#time').addClass('daytime');
        } else {
            $('div#time').addClass('nightime');
        }
   
        // get wind speed and append to HTML
        var windSpeed = data.currently.windSpeed;
        var windRounded = parseFloat(Math.round(windSpeed*100)/100).toFixed(1); // round to nearest single decimal, but must show one decimal, so 3 = 3.0
        
        var wind = $('<p>').html(windRounded + '<span><br>km/h</span>');
        $('#wind').append(wind);
        
        // get current rain probabability and append to HTML
        var rainChance = data.currently.precipProbability;
        var rainPercentage = Math.round(rainChance*100);
        
        // for mobile rain (positioned as middle list item)
        var rain = $('<p>').text(rainPercentage + '%');
        $('#rain').append(rain);
        
        // for desktop (positioned as last list item)
        var desktopRain =$('<p>').html(rainPercentage + '%' + '<img id="rain-down" src="images/down-arrow.svg" alt="">');
        $('#rain-desktop').append(desktopRain);
        
        // get humidity and append to HTML
        var humidityDecimal = data.currently.humidity;
        var humidityPercentage = Math.round(humidityDecimal*100);
        
        var humidity = $('<p>').text(humidityPercentage + '%');
        $('#humidity').append(humidity);
        
        // get hourly rain probability (so 12 hours including current shown in total) and append to HTML
        for (var i = 1; i < 12; i++) {
            var rainHourly = moment.unix(data.hourly.data[i].time).format('ha');
            var rainChanceHr = data.hourly.data[i].precipProbability;
            var rainPercentageHr = Math.round(rainChanceHr*100);
            var rainPrediction = $('<li>').html('<img class="mobile" src="images/white-rain-drop.svg" alt="rain">' + '<br>' + '<span>' + rainHourly + '</span>' + '<br>' + rainPercentageHr + '%');
            $('#inner-rain ul').append(rainPrediction);
        }
        
        // get daily weather forecast for the next 7 days - day, icon, min temp & max temp
        for (var i = 1; i <= 7; i++) {
            var day = moment.unix(data.daily.data[i].time).format('dddd'),
            dailyIcon = data.daily.data[i].icon,
            dailyLow = Math.round(data.daily.data[i].temperatureMin),
            dailyHigh = Math.round(data.daily.data[i].temperatureMax);
            
            displayWeekly(day, dailyIcon, dailyLow, dailyHigh);
        };
        
        
        function displayWeekly(day, dailyIcon, dailyLow, dailyHigh) {
            var iconDaily, iconDailyDesktop; // get white icons (mobile) and blue icons (desktop)
            if (dailyIcon === 'clear-day') {iconDaily = 'images/white-clear-day.svg'; iconDailyDesktop = 'images/blue-clear-day.svg';}
            if (dailyIcon === 'rain' || dailyIcon === 'sleet') {iconDaily = 'images/white-rain.svg'; iconDailyDesktop = 'images/blue-rain.svg';}
            if (dailyIcon === 'snow') {iconDaily = 'images/white-snow.svg'; iconDailyDesktop = 'images/blue-snow.svg';}
            if (dailyIcon === 'wind') {iconDaily = 'images/white-wind.svg'; iconDailyDesktop = 'images/blue-wind.svg';}
            if (dailyIcon === 'fog') {iconDaily = 'images/white-fog.svg'; iconDailyDesktop = 'images/blue-fog.svg';}
            if (dailyIcon === 'cloudy') {iconDaily = 'images/white-cloud.svg'; iconDailyDesktop = 'images/blue-cloud.svg';}
            if (dailyIcon === 'partly-cloudy-day' || dailyIcon === 'partly-cloudy-night') {iconDaily = 'images/white-partly-cloudy-day.svg'; iconDailyDesktop = 'images/blue-partly-cloudy-day.svg';}
            // append the values to each cell of a row
            var row = $('<tr>');
            row.append('<td>' + day + '</td>');
            row.append('<td class="centre">' + '<img class="mobile" src="' + iconDaily + '">' + '<img class="desktop" src="' + iconDailyDesktop + '">' + '</td>');
            row.append('<td class="right">' + dailyLow + '&nbsp;</td>');
            row.append('<td class="right">' + '/ ' + dailyHigh + '&deg;</td>');

            // append the tr info to the table
            $('#daily-forecast').append(row);
        };

    });
};

// on change of screen dimensions
$(window).resize(function () {
    var isMobile = false; // set to false
    // detect the device again
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
    // for width less than 750px (design breakpoint) and if landscape orientation and mobile device
    //console.log('Mobile? ' + isMobile + ': detected on window resize');
    var height = $(window).height();
    var width = $(window).width();
    if ((width < 750) && (width > height) && isMobile) {
        $('div#change-to-portrait').show(); // show the div alerting the user to change device orientation to portrait
    } else {
       $('div#change-to-portrait').hide();
    }
});

// show hourly rain predictions when the rain icon (+) is touched/clicked, also ensures click/touch events don't bubble up to the document.body
$('#rain').on('click', function(e) {
    $('#rain-chance').show('slide', { direction: 'right' }, 600);
    e.stopPropagation();
});

// ensures click/touch events for the rain div don't bubble up to the document.body
$('#rain-chance').on('click', function(e) {
    e.stopPropagation();
});

// can use the 'x' to hide the rain div
$('#close').on('click', function() {
    $('#rain-chance').hide('slide', {direction: 'right'}, 600);
});

// to show daily forecast for the week
$('#more').on('click', function() {
    $('#forecast').show('slide', {direction: 'down'}, 600);
});

// to hide the daily forecast for the week
$('#close-forecast').on('click', function() {
    $('#forecast').hide('slide', {direction: 'down'}, 600);
});

// click/touch the body and the rain div will hide (for usability), only on mobile design (less than 750px)
$(document.body).click(function() {
    if (($('#rain-chance').is(':visible') == true) && ($(window).width() < 750)) {
		$('#rain-chance').hide('slide', { direction: 'right' }, 600);
	}
});    