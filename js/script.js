document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const closebtn = document.querySelector('.closebtn');

    hamburger.addEventListener('click', openNav);
    closebtn.addEventListener('click', closeNav);

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            openNav();
        }
    }

    hamburger.addEventListener('keydown', handleKeyPress);
});

function openNav() {
    const sidenav = document.getElementById("mySidenav");
    const mainContent = document.querySelector("main");

    sidenav.style.left = "0";
    if (mainContent) {
        mainContent.style.marginLeft = "250px";
    }
}

function closeNav() {
    const sidenav = document.getElementById("mySidenav");
    const mainContent = document.querySelector("main");

    sidenav.style.left = "-250px";
    if (mainContent) {
        mainContent.style.marginLeft = "0";
    }
}

document.querySelector('.contact-btn').addEventListener('click', function() {
    window.location.href = "mailto:nschliesman@sandiego.edu";
});
