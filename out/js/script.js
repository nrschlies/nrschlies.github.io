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

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            saveContactInfo(name, email, message);
        });
    }
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

function saveContactInfo(name, email, message) {
    db.collection('contacts').add({
        name: name,
        email: email,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        alert('Message sent successfully!');
        document.getElementById('contactForm').reset();
    }).catch((error) => {
        console.error('Error writing document: ', error);
    });
}

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
    window.location.href = "contact.html";
});

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        saveContactInfo(name, email, message);
    });

    function saveContactInfo(name, email, message) {
        db.collection('contacts').add({
            name: name,
            email: email,
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            alert('Message sent successfully!');
            contactForm.reset();
        }).catch((error) => {
            console.error('Error writing document: ', error);
        });
    }
});
