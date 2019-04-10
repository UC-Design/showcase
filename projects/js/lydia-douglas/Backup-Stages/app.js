/* Circles app created by Lydia Douglas 2018 */



/*** declare global variables **/

//calling init function
$(document).ready(function () {
    init();
});

//initialising document
function init() {
    // hide and show sections

    new Vue({
        el: '#app',
        data: {
            msg: 'Hello from Vue! Baby!',
            myFontSize: 24,
            
            fancyDiv: {
                backgroundColor: 'lightgrey',
                borderRadius: '10px',
                padding: '10px',
                marginTop: '30px'
            },
            fancierDiv: {
                fontFamily: 'Arial, Helvetica',
                border: 'solid 1px black',
                padding: '30px'
            },

            cold: true,
            hot: false,
            cssClasses: {
                square: true,
                'dashed-border': true,
                blue: false
            },
            squareClass: 'square',
            bgColorClass: 'red',
            selected: true,

            expcircleClass: 'expcircle',
            
            circleRadius: 200,
            radiusNumber:130,
            sizeNumber:260,
            satNumber:50,
            hueNumber:130,
            lightNumber:50

        }
    });

}





