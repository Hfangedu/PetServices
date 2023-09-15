// Function to set a cookie with a name, value, and expiration date
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Function to retrieve all cookies
function getCookies() {
    const cookies = document.cookie.split(';');
    const cookieData = {};
    for (const cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        cookieData[key] = value;
    }
    return cookieData;
}

// Function to retrieve a cookie by name
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null; // Cookie not found
}

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const petName = document.getElementById('pet-name').value;
    const petType = document.getElementById('pet-type').value;
    const appointmentDate = document.getElementById('appointment-date').value;
    const serviceTypes = Array.from(document.querySelectorAll('input[name="service-type"]:checked')).map(checkbox => checkbox.value);
    const customerName = document.getElementById('customer-name').value;
    const customerEmail = document.getElementById('customer-email').value;
    const customerPhone = document.getElementById('customer-phone').value;

    // Create an object to store the form data
    const formData = {
        petName,
        petType,
        appointmentDate,
        serviceTypes,
        customerName,
        customerEmail,
        customerPhone,
    };

    // Convert the form data to a JSON string
    const formDataJson = JSON.stringify(formData);

    // Store the JSON string in a cookie
    setCookie('bookingData', formDataJson, 7); // Cookie expires in 7 days

    // Display a successful booking message using an alert
    alert('Booking successful!');

    // Create a reset button element
    const resetButton = document.createElement('button');
    resetButton.type = 'reset';
    resetButton.textContent = 'Reset';

    // Add the reset button to the form
    bookingForm.appendChild(resetButton);

    // Add an event listener to reset the form when the reset button is clicked
    resetButton.addEventListener('click', function() {
        bookingForm.reset(); // This will reset all form fields to their initial values
    });

    // Open "Booking History.html" in a new tab or window
    window.location.href = 'Booking History.html';
}

// Function to display booking history
function displayBookingHistory() {
    const bookingHistory = document.getElementById('booking-history');
    const historyData = getCookie('bookingData');

    if (bookingHistory && historyData) { // Check if the element exists and data is available
        const bookingData = JSON.parse(historyData);
        let historyHTML = '<div><h1>Booking History</h1></div>';

        // Display booking data with styles
        historyHTML += `<div id="cus2"><strong>Pet Name:</strong> ${bookingData.petName}</div>`;

        // Parse the appointmentDate
        const appointmentDate = new Date(bookingData.appointmentDate);

        // Separate date and time components with spacing
        const formattedDate = `${appointmentDate.toLocaleDateString()} ${appointmentDate.toLocaleTimeString()}`;
        historyHTML += `<div id="cus3"><strong>Appointment Date and Time:</strong> ${formattedDate}</div>`;

        historyHTML += `<div id="cus4"><strong>Services:</strong> ${bookingData.serviceTypes.join(', ')}</div>`;

        historyHTML += '</ul>';
        bookingHistory.innerHTML = historyHTML;
    } else if (bookingHistory) { // Element exists but no data available
        bookingHistory.innerHTML = '<p>No booking history available.</p>';
    }
}


// Add an event listener to the form for form submission
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', handleSubmit);
}

// Add an event listener to the "View Booking History" button for redirection
const viewHistoryButton = document.getElementById('view-history');
if (viewHistoryButton) {
    viewHistoryButton.addEventListener('click', function () {
        // Open "Booking History.html" in a new tab or window
        window.open('Booking History.html', '_blank');
    });
}

// Add an event listener to execute the displayBookingHistory function when the page loads
window.addEventListener('load', displayBookingHistory);

// Add an event listener to the "Go Back to Draft2.html" button
const backButton = document.getElementById('back-to-draft2');
if (backButton) {
    backButton.addEventListener('click', function () {
        window.location.href = 'Draft2.html'; // Replace with the actual URL of Draft2.html
    });
}

// Add click event listeners to the buttons and scroll to the corresponding sections
document.getElementById('learn-more-button').addEventListener('click', function () {
    scrollToSection('services');
});

document.getElementById('book-button').addEventListener('click', function () {
    scrollToSection('book');
});

// Function to scroll to a specific section by its ID
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}
