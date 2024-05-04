document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const closebtn = document.querySelector('.closebtn');

    hamburger.addEventListener('click', openNav);
    closebtn.addEventListener('click', closeNav);
});

function openNav() {
    const sidenav = document.getElementById("mySidenav");
    const mainContent = document.querySelector("main");

    sidenav.style.width = "250px";
    if (mainContent) {
        mainContent.style.marginLeft = "250px";
    }
}

function closeNav() {
    const sidenav = document.getElementById("mySidenav");
    const mainContent = document.querySelector("main");

    sidenav.style.width = "0";
    if (mainContent) {
        mainContent.style.marginLeft = "0";
    }
}
