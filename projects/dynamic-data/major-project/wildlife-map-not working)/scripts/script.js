/*jslint browser: true*/
/*global $, document, navigator*/
/*global console*/ /* eslint no-console: "off" */

/* Australian Life map | B.Rowe 3114634 */

    
$(document).ready(function () {
     
    //placing date and location in this section//
    
    //create variable for new location information
    var newLocation = '',
        cbrlocation = '-35.28346, 149.12807';

    //now get browser geo location
    if (navigator.geolocation) {

        //retrive current location
        function success(pos) {
            var crd = pos.coords,
                //reverse name call. correct format for OpenCage Api
                latLongName = crd.latitude + '+' + crd.longitude;
            
            //set the newLocation variable to correct format for the darksky api
            newLocation = crd.latitude + ',' + crd.longitude;
            
            //call function to get darksky api data with newLocation variable
            getLocationData(newLocation);
                    
            //function to get location name 
            getLocationName(latLongName);
        }
                
        //error returning the geolocation
        function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
                    
            //default location to Sydney (because everyone thinks it's the capital anyway).
            var cbrlocation = '-35.28346, 149.12807';
            //set location in 'Wet'
            getLocationData(cbrlocation);
        }
                
        //prompts user for their location
        navigator.geolocation.getCurrentPosition(success, error);

    } else {
        //Canberra default
        getLocationData(cbrlocation);
    }
     
    // get location name -- open cage Api
    function getLocationName(latLngCoords) {
       
        // key and Api call for Open Cage 
        var geoKey = '6611973056464cf0a1783f55eaf59f08',
            urlReverse = 'https://api.opencagedata.com/geocode/v1/json?q=' + latLngCoords + '&key=' + geoKey;
         
        //set location results for current position
        $.get(urlReverse, function (locationData) {
            
            var locationComponents = locationData.results[0].components,
                //log the suburb and state code of current location
                llstring = locationComponents.suburb + ', ' + locationComponents.state_code,
                //append suburb name to end of time string
                lcSuburb = locationComponents.suburb,
                // add the name of Suburb and state to header bar
                local = $("<b>").text(llstring);
            
            $("#wet h3").append(' in ' + lcSuburb);
            $("wet b").append(local); // stick it to the header     
        });
    }
    
    // this will load data from Darksky api    
    function getLocationData(nowLocation) {
        
        // key and Api Call
        var key = 'bdd862c92596ff4eb9974ba37ee2e551',
            url = 'https://api.darksky.net/forecast/' + key + '/' + nowLocation + '?units=auto';
    
        //Time//
        $.get(url, function (data) {
            //convert for unix time
            var now = new Date(data.currently.time * 1000),
                // create a Date object, info grabbed from the API
                objToday = new Date(now - (36000000) + (data.offset * 3600000)),
                //create array of week, get API data for date and time
                weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
                dayOfWeek = weekday[objToday.getDay()],
                // array for date ends, loops through formula for current date end
                domEnder = new Array( 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th' ),
                dayOfMonth = today + (objToday.getDate() < 10) ? '0' +
                    objToday.getDate() + domEnder[objToday.getDate()] :
                        objToday.getDate() + domEnder[parseFloat(('' + objToday.getDate()).substr(('' + objToday.getDate()).length - 1))],
                // array and formula for calling current month
                months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
                curMonth = months[objToday.getMonth()],
                // breaks time into 12hours 
                curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() === 0 ? objToday.getHours() + 12 : objToday.getHours()),
                curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
                // adds AM or PM 
                curMeridiem = objToday.getHours() > 12 ? 'PM' : 'AM',

                //final date and time to append in 'Wet'
                today = $("<h3>").text(dayOfWeek + ' ' + dayOfMonth + ' of ' + curMonth + ', ' + curHour + ':' + curMinute + curMeridiem);
            $("#wet").append(today);
        });
    }
         
         
         
     // getSpecies request call function on button click    
    $(".aniSubmit").click(function () {

        // Set animal name query
        var Qu = $('input').val();
        //call the load data function using the input data
        loadData(Qu);
        console.log(Qu);
    });  // aniSubmit click function

        
    //getSpecies download function       
    function loadData(spQuery) {
        console.log('loading search results');
      
        // create spurl to make get request to ALA about query       
        var spurl = 'http://bie.ala.org.au/ws/search.json?q=' + spQuery;
        $.get(spurl, function (data) {
            console.log(data);
            
            //return the information data request from ALA
            $.get(spurl, function () {
                console.log('success');
            }).done(function (data) {
    
                // wait a couple of seconds to return data from ALA
                setTimeout(function () {
                    displaySearchResults(data);
                }, 2000);
            });
        });
        
    } //function loadData spQuery
    
        
    //speciesLookup call - to display the data on screen
    function displaySearchResults(searchResultData) {
        //append to its own section in HTML the top 10 results from search
        $('.results').append("");

        //create a variable for the results
        var results = searchResultData.searchResults.results;

        results.forEach(function (result) {

            //see what is in the data
            console.log(result);

            //create to its own section in HTML the top 10 results from search
            var resultItem = $('<div class="result">');

            //display name
            resultItem.append('<h4>' + result.name + '</h4>');

            //append the main results
            $('.results').append(resultItem);


        });//close foreach

        //select the first result to base information on
        var singleSpeciesGuid = results[0].guid;
        loadSingleSpecies(singleSpeciesGuid);
    
    }//function displaySearchResults  
    
    //species lookup
    function loadSingleSpecies(guid) {
        console.log('loading single species');
        
        //create the api call for species lookup
        var apiCall = 'http://bie.ala.org.au/ws/species/' + guid + ' .json';

        $.get(apiCall, function () {
            console.log('success');
        // load data once it has been returned 
        }).done(function (data) {
    
            //wait a few seconds
            setTimeout(function () {
                // call next function
                displaySpecies(data);
            }, 2000);
        });
    } 
    //load Single Species function
    function displaySpecies(data) {
        console.log('display single (ladies) species');
        console.log(data);
        
        //log single species data to be apppended to 'bio' 
        var commonName1 = data.commonNames[0].nameString,
            imageName1 = data.imageIdentifier,
            realName1 = data.classification.species,
    
            //for animal classification 
            kingName1 = data.classification.kingdom,
            kingLink = data.classification.kingdomGuid,
            phylumName1 = data.classification.phylum,
            phylumLink = data.classification.phylumGuid,
            className1 = data.classification.class,
            classLink = data.classification.classGuid,
            subclassName1 = data.classification.subclass,
            subclassLink = data.classification.subclassGuid,
            orderName1 = data.classification.order,
            orderLink = data.classification.orderGuid,
            familyName1 = data.classification.family,
            familyLink = data.classification.familyGuid,
            speciesName1 = data.classification.species,
            speciesLink = data.classification.speciesGuid;

        
       
        //for name and common name
        $('.bio').append('<H2>' + commonName1 + '</h2><hr>');
        $('.bio').append('<div class="realname">"' + realName1 + '"</div>');
    
        //for animal classification
        $('.bio').append('<div class="desc1"><a href="https://bie.ala.org.au/species/' + kingLink + '"><h4>' + kingName1 +
                         '&nbsp| <a href="https://bie.ala.org.au/species/' + phylumLink + '">' + phylumName1 +
                         '&nbsp| <a href="https://bie.ala.org.au/species/' + classLink + '">' + className1 +
                         '&nbsp| <a href="https://bie.ala.org.au/species/' + subclassLink + '">' + subclassName1 +
                         '&nbsp| <a href="https://bie.ala.org.au/species/' + orderLink + '">' + orderName1 +
                         '&nbsp| <a href="https://bie.ala.org.au/species/' + familyLink + '">' + familyName1 +
                         '&nbsp| <a href="https://bie.ala.org.au/species/' + orderLink + '">' + orderName1 +
                         '&nbsp| <a href="https://bie.ala.org.au/species/' + speciesLink + '">' + speciesName1 +
                         '</h4></div>');
        
        //attach the image of the animal using 'image name' to identify the correct one
        $('.bio').append('<img src= "https://images.ala.org.au/image/proxyImageThumbnailLarge?imageId=' + imageName1 + '" alt ="' + commonName1 + '">');

        //requesting the occurance map api call to show heat map and append it to html
        $('#aniHeat').append('<img src= "http://biocache.ala.org.au/ws/density/map?q=' + commonName1 + '">');

                 
    }
    
    
}); //document ready functiontion