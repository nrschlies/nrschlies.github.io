// Smooth Scroll for In-Page Links
document.addEventListener('DOMContentLoaded', () => {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Call updateYear on load to ensure the footer date is correct
    updateYear();

    // Setup Sidebar Toggle
    setupSidebarToggle();

    // Example usage of toggleVisibility
    const toggleButton = document.querySelector('#toggleAbstractButton');
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            toggleVisibility('#abstractContent');  // Ensure you have an element with id="abstractContent"
        });
    }
});

// Dynamic Date Update
function updateYear() {
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Toggle visibility for an element
function toggleVisibility(selector) {
    const element = document.querySelector(selector);
    if (element) {
        const currentDisplay = getComputedStyle(element).display;
        element.style.display = currentDisplay === 'none' ? 'block' : 'none';
    }
}

// Sidebar toggle functions
function setupSidebarToggle() {
    const openNav = () => {
        document.getElementById("mySidenav").style.width = "250px";
        document.querySelector(".main").style.marginLeft = "250px";
    };

    const closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
        document.querySelector(".main").style.marginLeft = "0";
    };

    // Attach handlers
    document.querySelector('.hamburger').addEventListener('click', openNav);
    document.querySelector('.closebtn').addEventListener('click', closeNav);
}

function handleKeyPress(event) {
    // Check if Enter or Space key is pressed
    if (event.key === "Enter" || event.key === "Spacebar" || event.key === " ") {
        const buttonFunction = event.target.getAttribute('onclick');
        if (buttonFunction) {
            eval(buttonFunction); // Execute the function assigned in the onclick attribute
        }
        event.preventDefault(); // Prevent the default action to stop scrolling when Space is pressed
    }
}