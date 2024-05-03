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

// Call updateYear on load to ensure the footer date is correct
updateYear();

// Example of how to use toggleVisibility
// You can tie this function to a button click to show/hide elements like an abstract or additional details
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('#toggleAbstractButton');
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            toggleVisibility('#abstractContent');  // Ensure you have an element with id="abstractContent"
        });
    }
});
