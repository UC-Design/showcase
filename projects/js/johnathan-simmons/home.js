/**
 * @author Jonathan Simmons
 * Student Id: u3141072
 * As a software engineering student, this is definitely not my finest work.
 * I'm also no good at making things look pretty.
 * 
 * NOTE: If not running on a http server, you must run this in firefox as chrome doesn't allow local json files to be opened
 */

var khGames = getKhJSONDetails(); // Array of all KH games
var bundledGames = [] //Array of bundled kh games

$(document).ready(function () {
    // We want these done before the fullpage.js gets set up
    sortGamesByReleaseOrder();
    renderAllGamesTimeline();

    // Vue used for bundled games section to data bind
    var bundleVue = new Vue({
        el: "#bundle-order",
        data: {
            bundledGames
        }
    })
    // To avoid calling jquery all the time
    var khHeading = $('#KH-heading')
    var intro = $('#intro')
    
    // Setup fullpage.js
    $('#fullpage').fullpage({
        navigation: true, // Dots on the side
        keyboardScrolling: true,
        
        // Callback for when it leaves a section (scroll, basically)
        // Adds and removes classes for animation.css
        onLeave: function(index, nextIndex, direction) { // Section index starts at 1 (which is dumb)
            advanceProgressBar(calculateScrollPercentage(nextIndex)); // Update progress bar

            // References to jquery selectors (to avoid jQuery many calls)
            //Info and image of game in upcoming section
            var nextImage = $('#image'+nextIndex)
            var nextInfo = $('#info'+nextIndex)

            // Info and image of game in current section (the one we're leaving)
            var currImage = $('#image'+index)
            var currInfo = $('#info'+index)
            
            // Info and image of bundle games
            var bundleImage = $('.bundle-image')
            var bundleInfo = $('.bundle-info')

            // Stats Heading element
            var statsHeading = $('#stats-heading')

            if (index == 1) {
                khHeading.addClass('slideOutRight')
                intro.addClass('slideOutLeft')
            }
            if (nextIndex == 1) {
                khHeading.removeClass('fadeInDown slideOutRight')
                intro.removeClass('fadeInUp slideOutLeft')
                khHeading.addClass('slideInRight')
                intro.addClass('slideInLeft')
            }

            // Use cross over animations every 2nd section just to spice things up a little
            // Slide out elements on exit
            if (index != 1) {
                if (currImage.hasClass('.left')) { // If current image is on left and info on right
                    currImage.removeClass('slideInRight')
                    currInfo.removeClass('slideInLeft')
                    currImage.addClass('slideOutLeft')
                    currInfo.addClass('slideOutRight')
                } else { // If current image is on right and info on left
                    currImage.removeClass('slideInLeft')
                    currInfo.removeClass('slideInRight')
                    currImage.addClass('slideOutRight')
                    currInfo.addClass('slideOutLeft')
                }
            }

            //Slide in next elements
            if (nextIndex != 1) {
                if (nextImage.hasClass('.left')) { // If next image on left and info on right
                    nextImage.removeClass('slideOutLeft')
                    nextInfo.removeClass('slideOutRight')
                    nextImage.addClass('slideInRight')
                    nextInfo.addClass('slideInLeft')
                } else { // If next image on right and info on left
                    nextImage.removeClass('slideOutRight')
                    nextInfo.removeClass('slideOutLeft')
                    nextImage.addClass('slideInLeft')
                    nextInfo.addClass('slideInRight')
                }
            }

            // Exit animations for bundle section
            if (index == 15) {
                bundleImage.removeClass('zoomIn')
                bundleInfo.removeClass('slideInLeft')
                bundleImage.addClass('zoomOut')
                bundleInfo.addClass('slideOutRight')
            }

            // Entry animations for bundle section
            if (nextIndex == 15) { 
                bundleImage.removeClass('zoomOut')
                bundleInfo.removeClass('slideOutRight')
                bundleImage.addClass('zoomIn')
                bundleInfo.addClass('slideInLeft')
            }

            //Exit animations for stats section
            if (index == 16) {
                statsHeading.removeClass('fadeInUpBig')
                statsHeading.addClass('fadeOutDownBig')
            }

            if (nextIndex == 16) {
                statsHeading.removeClass('fadeOutDownBig')
                statsHeading.addClass('fadeInUpBig')
            }

            console.log(statsHeading)
        },
        // Called once all sections are rendered
        afterRender: function() { 
            advanceProgressBar(calculateScrollPercentage(1)); // Default scroll progress bar
            createPieChart(); // Pie chart at the bottom
            //initial animations
            khHeading.addClass("fadeInDown")
            intro.addClass("fadeInUp")
        }
    });
});

/**
 * Advances the scroll progress bar based on the scroll percentage
 * @param {number} percentage - Scroll percentage
 */
function advanceProgressBar(percentage) {
    $('#progress-indicator').animate({
        width: percentage + "%"
    }, {duration: 700}) // 700 milliseconds, same amount of time as auto-scroll
}

/**
 * Calculate the percentage of how much the page has been scrolled
 * @param {number} sectionIndex what section the viewport is showing, starting from 1 (instead of 0, thanks fullpage /s)
 */
function calculateScrollPercentage(sectionIndex) {
    var totalSections = $('#fp-nav ul li').length;
    return percentage = sectionIndex / totalSections * 100;
}

/**
 * Read the kh-details.json file and returns an array of json objects (games in this case)
 */
function getKhJSONDetails() {
    var khGames = [];

    $.getJSON("kh-details.json", function(json) {
        $.each(json, function(key, value) { // Foreach loop
            khGames.push(value); //Add to games array
        });
    });

    return khGames;
}

/**
 * Didn't actually end up using this, but could be good in the future
 * 
 * Sort the games by the order they should be played
 * @param {array} games the array of game-details objects
 */
function sortGamesByPlayOrder() {
    khGames.sort(function(a, b) { return a.playOrder - b.playOrder }); // Comparator function to tell JS how to compare the items when sorting
    return khGames;
}

/**
 * Didn't actually end up using this, but could be good in the future
 * 
 * Sort the games by chronological order they are set in the KH universe
 */
function sortGamesByChronologicalOrder() {
    khGames.sort(function(a,b) {
        // Comparator function to tell JS how to compare the items when sorting
        // This comparator inlcudes cases where the key doesn't exist
        // a < b = -1, a > b = 1, a==b = 0
        if (!a.chronologicalOrder) {
            return -1;
        } else if (!b.chronologicalOrder) {
            return 1;
        } else if (!a.chronologicalOrder && !b.chronologicalOrder) {
            return 0;
        }
        return a.chronologicalOrder - b.chronologicalOrder;
    }); 
    return khGames;
}

/**
 * Sort the games by the year they were released
 */
function sortGamesByReleaseOrder() {
    khGames.sort(function(a,b) {
        // Comparator function to tell JS how to compare the items when sorting
        // Compare by release year, then if both the same then give bundled game priority (higher up list)
        var order = a.releaseOrder - b.releaseOrder;
        if (order == 0) {
            if (!b.games) {
                return -1;
            } else if (!a.games) {
                return 1;
            } else if (!a.games && !b.games) {
                return 0;
            }
        }
        return order;
    });
    return khGames;
}

/**
 * Creates a html section element for each game so that fullpage.js can reder it.
 * I wouldn't have to do this if Vue.js supported v-for in components that render other elements (in this case, the .section class)
 * Until I realised theres an official fullpage.js vue component at the last minute, but ran out of time to learn how use it (:sadface:)
 *  
 * So this is definitely not the most eloquent solution and I'm aware of that
 */
function renderAllGamesTimeline() {
    var index = 2; // Section number relative to the entire page (1 is the intro so we start with 2)

    khGames.forEach(game => {
        if (!game.games) { // Don't include the bundles - they'll come later
            $('#bundle-order').before( // Using before instead of after so that it's in order (saves another sort)
                '<div class="section" id="index'+index+'">'+
                    '<div class="d-flex align-items-center" id="row'+index+'">' +
                        '<div class="col-md-6 animated" id="image'+index+'">'+
                            '<img class="img-fluid rounded" src="images/'+game.image+'">'+
                        '</div>' +
                        '<div class="col-md-6 animated" id="info'+index+'">'+
                            '<h1 class="display-4">'+game.name+'</h1>'+
                            '<h4>Year: '+game.year+'</h4>'+
                            '<h4>Platform: '+game.platform+'</h4>'+
                        '</div>'+
                    '</div>'+
                '</div>'
            )
        

            var element = $('#info'+ index)

            if (game.score) { // Not all games have scores, so best to check to avoid NaN
                element.append("<h4>Metacritic score: "+game.score+"</h4>")
            }

            if(index % 2 == 0) { // Alternate sides every 2nd section
                $('#row'+index).addClass('flex-row')
                $('#info'+index).addClass('text-right right')
                $('#image'+index).addClass('left')
            } else {
                $('#row'+index).addClass('flex-row-reverse left')
                $('#image'+index).addClass('right')
            }
            
            index++; // Only update index if the element is rendered (i.e. not bundled games)
        }
        // If a game bundle, don't render - we'll use Vue.
        if (game.games && game.platform == 'PlayStation 4') {
            bundledGames.push(game);
        }
    });

}
/**
 * Returns only the games in the series that contain other games.
 */
function getBundledGames() {
    var bundledGames = [];

    sortGamesByPlayOrder(); // Will have to do it anyway, may as well do it here.
    
    khGames.forEach(game => {
        if (game.games || game.games.length > 0) {
            bundledGames.push(game);
        }
    });
    return bundledGames;
}

/**
 * This creates a pie chart based on the number of sales of each game
 */
function createPieChart() {
    var names = [];
    var sales = [];
    var colours = [];

    // RGB for the pie chart sections
    var red = 0;
    var blue = 0;
    var green = 0;

    // Loop over each game in khGames and check if there's a 'sold' value, then add the game name and sold value to arrays  
    khGames.forEach(game => {
        if (game.sold) {
            names.push(game.name)
            sales.push(game.sold)

            // Create random rgb colours (0-255)
            red = Math.floor(Math.random() * 256)
            blue = Math.floor(Math.random() * 256)
            green = Math.floor(Math.random() * 256)
            var rgbString = 'rgb('+red+','+green+','+blue+')'
            colours.push(rgbString)
        }
    });

    var canvas = $('#pie-chart') // Where the graph with be rendered

    // Create a new 
    var chart = new Chart(canvas, {
        type: 'pie',
        data: {
            labels: names,
            datasets: [{
                data: sales, // Sales data
                backgroundColor: colours //Colours for the sections
            }]
        },
        options: {
            legend: {
                labels: {
                    fontColor: '#FFF' //Legend Label white
                }
            }
        }
    })
}