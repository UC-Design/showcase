var navbar;
var sticky;

window.onload = function () {
    console.log("dom loaded");
    var openNavElement = document.getElementById("open-nav");
    var closeNavElement = document.getElementsByClassName("closebtn")[0];

    closeNavElement.addEventListener("click", closeNav);
    openNavElement.addEventListener("click", openNav);

    document.addEventListener('DOMContentLoaded', function (event) {
        navbar = document.getElementById("navbar");
        sticky = navbar.offsetTop;
        window.onscroll = function () { myFunction() };
    });


    function myFunction() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky")
        } else {
            navbar.classList.remove("sticky");
        }
    }

    function openNav() {
        document.getElementById("myNav").style.width = "100%";
    }

    function closeNav() {
        document.getElementById("myNav").style.width = "0%";
    }

    function myFunction(x) {
        x.classList.toggle("change");
    }

}
