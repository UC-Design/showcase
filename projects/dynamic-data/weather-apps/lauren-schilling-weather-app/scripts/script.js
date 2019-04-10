$(document).ready(function() {
	
	// global variables	
	var timeOfDay = '';
	var icon = '';
	
	// set up opencage api key
	var geoKey = "a7a638c1081a4a1aa20718b48362e237";

	
	// ----- GET CURRENT COORDINATES -----
    if (navigator.geolocation) {
        console.log(navigator.geolocation);
        
        function success(pos) {           
            // store the current coordinates
            var crds = pos.coords;
			
			// log coordinates to console
			console.log(crds);
			console.log('My current position is: ');
            console.log('Latitude: ' + crds.latitude);
            console.log('Longitude: ' + crds.longitude);
            console.log('More or less: ' + crds.accuracy + ' metres.');
			
			// add current coordinates to newLocation variable
            var newLocation = crds.latitude + ',' + crds.longitude;
			getWeatherData(newLocation);
			
			// add coordinates to locationName variable
			var locationName = crds.latitude + '+' + crds.longitude;
			getLocationName(locationName);
        }
        
        function error(err) {
			// log error to console
            console.log(err);
            
            // set default location to Canberra
			var defaultLocation = '-35.28346,149.12807';
			getWeatherData(defaultLocation);
        }
        
        // prompt the user for their location
        navigator.geolocation.getCurrentPosition(success, error);
    };


	// ----- GET LOCATION NAME : USING OPENCAGE API ----- 
    function getLocationName(locationName) {
    	
		var geoUrl = "http://api.opencagedata.com/geocode/v1/json?q=" + locationName + "&key=" + geoKey;

    	$.getJSON(geoUrl, function(locationData) {
        	
        	// store location name
        	var cityString = locationData.results[0].components.city;
        	var subString = locationData.results[0].components.suburb;
        	var townString = locationData.results[0].components.town;
        	var cntryString = locationData.results[0].components.country;

        	// store location names together
        	var cityLocString = cityString + ", " + cntryString;
        	var subLocString = subString + ", " + cntryString;
          	var townLocString = townString + ", " + cntryString;
      	
        	// check that location is a city, suburb or town
 	        // append location name to page       	
        	if (cityString === undefined && subString === undefined && townString === undefined) {
				$('label').empty().append("Oops, we couldn't find the place you're looking for. Please search for a city.");
        	} else if (cityString === undefined && subString === undefined) {
	        	$('.loc-name').append(townLocString);
	        	$('.city-name').append(townString);      	
        	} else if (cityString === undefined) {
	        	$('.loc-name').append(subLocString);
	        	$('.city-name').append(subString);      		        	
        	} else {
	        	$('.loc-name').append(cityLocString);
	        	$('.city-name').append(cityString);
        	}
    	})
    };


	// ----- SEARCH FOR LOCATION : USING OPENCAGE API ----- 

	// if submit is clicked, call submitNewLoc()
	$('#submit').on('click', submitNewLoc);

	// if enter key is pressed, call submitNewLoc()
	$('#search-city').keypress(function(e) {
    	if(e.which == 13) {
			event.preventDefault();
			submitNewLoc();   	
	    }
	});
	
	// find and display new location
	function submitNewLoc() {	
				
		// get variables from form input		
		var searchName = $('#search-city').val();	
		console.log('Searching for ' + searchName + '...');
		
		// check if search has a value
		if (!searchName) {
			$('label').empty().append("We can't search for a place with no name! Please search for a city.");
		} else {
			
			// prevent page from reloading
			event.preventDefault();
			
			// set up opencage api url
			var geoUrl = "http://api.opencagedata.com/geocode/v1/json?q=" + searchName + "&key=" + geoKey;
			
			$.getJSON(geoUrl, function(data) {
				
				// store location name
	        	var cityString = data.results[0].components.city;
	        	var subString = data.results[0].components.suburb;
	        	var townString = data.results[0].components.town;
	
	        	// check that location is a city, suburb or town
	 	        // if location isn't found, return error    	
	 	        // else, show location data
	        	if (cityString === undefined && subString === undefined && townString === undefined) {
					$('label').empty().append("Oops, we couldn't find the place you're looking for. Please search for a city.");
					console.log(searchName + ' cannot not be found');
	        	} else {			
					var lat = data.results[0].geometry.lat;
					var lng = data.results[0].geometry.lng;			
					var currLoc = lat + ',' + lng;
					
					emptyAll();	
					getLocationName(currLoc);
					getWeatherData(currLoc);
				
					// show location success screen
					$('#submit').hide();
					$('form').hide();
					$('#location').show();
					$('.loc-intro').empty().append("Welcome to");
					$('.go-btn').fadeIn();	
					$('.go-btn a').on('click', showStart);
				}
			})
		}
	}; 
	
	// ----- GET WEATHER DATA : USING DARK SKY API ----- 
	function getWeatherData(currentLocation) {
	       
		// set up dark sky api
		var key = "0296160b50e9235d8d95608658d07c7c";
		var url = "https://api.darksky.net/forecast/" + key + "/" + currentLocation + "?units=si&callback=?";
	         
		// get data
		$.getJSON(url, function(data) {
			
			// ----- DATA BASED ON CURRENT FORECAST ----- 
								
				// get variables
				var summary = data.currently.summary;
				var temp = (Math.round(data.currently.temperature) + "&deg;");
				var now = moment.tz(data.currently.time*1000, data.timezone);
				var time = now.format("hh:mm A");	
				var date = now.format("dddd, D MMMM");
				var location = '';
								
				// append variables to page
				$(".summary").append(summary);
				$("#temp").append(temp);	
				$(".time").append(time);
				$(".date").append(date);
	
			// ----- DATA BASED ON DAILY FORECAST ----- 
			// loop through data and add to page
			for (var i = 0; i < data.daily.data.length; i++) {
				
				// get variables - daily data for week
				var f = data.daily.data[i]; // daily data for week
				var row = $("<tr>");
				var dayDaily = moment(f.time*1000).format("dddd");
				var dateDaily = moment(f.time*1000).format("D MMMM");
				var max = Math.round(f.temperatureMax);
				var iconImage = '';
				var iconDaily = f.icon;
				
				// get variables - daily data for current day
				var c = data.daily.data[0]; // daily data for current day
				var currMin = Math.round(c.temperatureMin);
				var currMax = Math.round(c.temperatureMax);
				var rise = moment.tz(c.sunriseTime*1000, data.timezone).format("hh:mm A");		
				var set = moment.tz(c.sunsetTime*1000, data.timezone).format("hh:mm A");			
				var rainChance = Math.round(c.precipProbability*100); // convert to %
				var rainAmount = Math.round(c.precipIntensity/0.039370); // convert from inch to mm

				// find icon files
				var clearDay = 'images/sun.svg';
				var clearNight = 'images/Moon.svg';
				var partlyCloudyDay = 'images/Cloud-Sun.svg';
				var partlyCloudyNight = 'images/Cloud-Moon.svg';
				var cloudyDay = 'images/Cloud.svg';
				var rain = 'images/Cloud-Rain.svg';
				var snow = 'images/Cloud-Snow.svg';
				var sleet = 'images/Cloud-Hail.svg';
				var wind = 'images/Cloud-Wind.svg';
				var fog = 'images/Cloud-Fog.svg';
				
				// load icons into iconImage variable
				switch (iconDaily) {
					case 'clear-day':
						iconImage = clearDay;
						break;
					case 'clear-night':
						iconImage = clearNight;
						break;
					case 'partly-cloudy-day':
						iconImage = partlyCloudyDay;
						break;
					case 'partly-cloudy-night':
						iconImage = partlyCloudyNight;
						break;
					case 'cloudy-day':
						iconImage = cloudyDay;
						break;
					case 'rain':
						iconImage = rain;
						break;
					case 'snow':
						iconImage = snow;
						break;
					case 'sleet':
						iconImage = sleet;
						break;
					case 'wind':
						iconImage = wind;
						break;
					case 'fog':
						iconImage = fog;
						break;
					default:
						iconImage = cloudyDay;
						break;
				}
	
			// ----- APPEND VALUES TO PAGE ----- 
				// min and max temperature
				$("#min-temp").html(currMin + "&deg;");
				$("#max-temp").html(currMax + "&deg;");
				
				// sunrise and sunset times
				$("#rise").text(rise);
				$("#set").text(set);

				// chance of rain and amount of rain
				if (rainAmount === 0) {
					$("#rain-chance").html("There's a <span class='bigger'>" + rainChance + "</span><span class='lil-big'>%</span> chance that it will rain today.");
				} else if (rainChance === 0) {
					$("#rain-chance").html("There's a <span class='bigger'>" + rainChance + "</span><span class='lil-big'>%</span> chance that it will rain today.");
				} else {
					$("#rain-chance").html("There's a <span class='bigger'>" + rainChance + "</span><span class='lil-big'>%</span> chance that it will rain <span class='bigger'>" + rainAmount + "</span><span class='lil-big'>mm</span> today.");
				}
	
				// add values to each row in weekly forecast table
				row.append("<td class='left caps'>" + dayDaily + "</td>");
				row.append("<td class='left weekday'>" + dateDaily + "</td>");
				row.append("<td class='temp right'>" + max + "&deg;</td>");
				row.append("<td class='right'><img src='" + iconImage + "' class='weekly-icons'>");
				
				// append rows to the table
				$("#forecast").append(row);
			};

			// ----- GET VALUE OF ICON ----- 
	 		icon = data.currently.icon;
// 			icon = 'partly-cloudy-night';
			console.log('Initial icon is ' + icon);
			
			// switch statement based on icon value
				// 1. change background gradient for day or night
				// 2. show css shapes (sun, moon, clouds, rain)
	
			switch (icon) {
				case 'clear-day': 
					timeOfDay = 'day';
					$('html').removeClass( 'night' );
					$('html').removeClass( 'rain-bg' );					
					$('html').addClass( 'day' );				
					$('.sun').fadeIn();
					break;
				case 'cloudy':
				case 'partly-cloudy-day':			
					timeOfDay = 'day';
					$('html').removeClass( 'night' );
					$('html').removeClass( 'rain-bg' );
					$('html').addClass( 'day' );
					$('.clouds').fadeIn();
					break;
				case 'clear-night':
					timeOfDay = 'night';
					$('html').removeClass( 'day' );
					$('html').removeClass( 'rain-bg' );
					$('html').addClass( 'night' );
					$('.moon').fadeIn();
					break;
				case 'partly-cloudy-night':
					timeOfDay = 'night';
					$('html').removeClass( 'day' );
					$('html').removeClass( 'rain-bg' );
					$('html').addClass( 'night' );
					$('.clouds').fadeIn();
					break;
				case 'rain':
				case 'snow':
				case 'sleet':
				case 'wind':
				case 'fog':			
					timeOfDay = 'rain';
					$('html').removeClass( 'day' );
					$('html').removeClass( 'night' );
					$('html').addClass( 'rain-bg' );
					$('.clouds').fadeIn();
					$('.rain').fadeIn();
					break;
				default:
					timeOfDay = 'day';
					$('html').removeClass( 'night' );
					$('html').removeClass( 'rain-bg' );
					$('html').addClass( 'day' );
					$('.clouds').fadeIn();
					break;
			}	
			
			console.log('Current time of day is: ' + timeOfDay);

			// ----- CLICK EVENTS ----- 					
			// when any link is clicked
			$('.nav-link').click(function(event) {    
				var current = $(this).attr('data-link');
				
				// hide all screens
				$("div[data-link='rain-forecast']").hide();	
				$("div[data-link='sunrise']").hide();
				$("div[data-link='week']").hide();
				$("div[data-link='location']").hide();
				
				// show current screen
				$('div[data-link=' + current + ']').fadeIn(400);
						
				// if current screen is location
				// hide current weather info
				// change compass icon to close icon
				if (current === 'location') {
					$('#section1').hide();
					$('#section2').hide();
					$('form').show();
					$('.compass-icon').hide();
					$('.close-icon').show();
					$('#submit').show();
					
					// when close icon is clicked
					// return to beginning
					$('.close-icon').on('click', showStart);
				}
				
				// if current screen isn't the beginning				
				// animate css shapes
				if (current !== 'beginning') {
					switch (icon) {
						case 'clear-day':
							$('.anim').addClass('sun-move');
							break;
						case 'clear-night':	
							$('.anim').addClass('moon-move');
							break;
						case 'cloudy':
						case 'partly-cloudy-day':
						case 'partly-cloudy-night':
							$('.clouds-left').addClass('clouds-move-left');	
							$('.clouds-right').addClass('clouds-move-right');
							$('.cloud2').addClass('cloud2-move');
							break;
						case 'rain':
						case 'snow':
						case 'sleet':
						case 'wind':
						case 'fog':				
							$('.rain-left').addClass('rain-move-left');
							$('.rain-right').addClass('rain-move-right');					
							$('.clouds-left').addClass('clouds-move-left');	
							$('.clouds-right').addClass('clouds-move-right');
							$('.cloud2').addClass('cloud2-move');
							break;
						default: 
							$('.clouds-left').addClass('clouds-move-left');	
							$('.clouds-right').addClass('clouds-move-right');
							$('.cloud2').addClass('cloud2-move');
							break;
					}
				}
						
				// prevent page from reloading
				event.preventDefault();
					
			// when a menu item is clicked
				// 1. toggle .icon-active class
				$('.nav-link').removeClass('icon-active');
				$(this).addClass('icon-active');
			
				// 2. if sunrise icon is clicked		
					// 2a. show sunrise and sunset times
					// 2b. change background gradient
					// 2c. switch gradient back when something else is clicked
					
				if ($(this).attr('id')  === 'sun-icon') {
					if (timeOfDay === 'day') {
						$('html').addClass( 'day-sunset' );
						console.log('day-sunset');
					} else {
						$('html').addClass( 'night-sunset' );
						$('.moon2').addClass( 'night-sunset-moon' );
						console.log('night-sunset');
					} 
				} else {
					if (timeOfDay === 'day') {
						$('html').removeClass( 'day-sunset' ).addClass( 'day' );
					} else if (timeOfDay === 'night') {
						$('html').removeClass( 'night-sunset' ).addClass( 'night' );
						$('.moon2').removeClass( 'night-sunset-moon' ).addClass( 'moon2' );
					} else {
						$('html').removeClass( 'night-sunset' ).addClass( 'rain-bg' );		
					}
				}
			}); // close click event function
		}); // close get data function
	}; // close getWeatherData()
	
	
	// ----- HELPER FUNCTIONS ----- 

	function showStart() {
		$('.close-icon').hide();
		$('.compass-icon').show();
		$("div[data-link='location']").hide();	
		$('#section1').fadeIn();
		$('#section2').fadeIn();
		$('.anim').removeClass('sun-move');
		$('.anim').removeClass('moon-move');
		$('.clouds-left').removeClass('clouds-move-left');
		$('.clouds-right').removeClass('clouds-move-right');
		$('.cloud2').removeClass('cloud2-move');
		$('.rain-left').removeClass('rain-move-left');
		$('.rain-right').removeClass('rain-move-right');					
		$('#submit').hide();
		$('.go-btn').hide();
	}
	
	function emptyAll() {
		$(".summary").empty();
		$("#temp").empty();	
		$(".time").empty();
		$(".date").empty();		
		$("#min-temp").empty();
		$("#max-temp").empty();
		$("#rise").empty();
		$("#set").empty();
		$("#forecast").empty();
		$('.loc-name').empty();
		$('.city-name').empty();
		$('.sun').hide();
		$('.moon').hide();
		$('.clouds').hide();
		$('.rain').hide();		
		$('.anim').removeClass('sun-move');
		$('.anim').removeClass('moon-move');
		$('.clouds-left').removeClass('clouds-move-left');
		$('.clouds-right').removeClass('clouds-move-right');
		$('.cloud2').removeClass('cloud2-move');
		$('.rain-left').removeClass('rain-move-left');
		$('.rain-right').removeClass('rain-move-right');
		$('#search-city').val('');
		$('label').empty().append("Search for another city");
	}
});