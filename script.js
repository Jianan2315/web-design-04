const form = document.getElementById('feedbackForm');
const submitBtn = document.getElementById('submitBtn');
const inputs = form.querySelectorAll('input[type="text"], select');
const drinkSelect = document.getElementById('favouriteDrink');
const drinkOptions = document.getElementById('drink-options');
const drinkError = document.getElementById('drink-error');

// Add validation for each input field
inputs.forEach(input => {
    input.addEventListener('input', validateField);
});

drinkSelect.addEventListener('change', validateDrink);

function displayCupOptions() {
    if (drinkSelect.value) {
        drinkOptions.classList.remove('hidden');
    } else {
        drinkOptions.classList.add('hidden');
    }
    validateDrink();
}

function displayML(size) {
    const mediumML = document.getElementById('medium-ml');
    const largeML = document.getElementById('large-ml');
    if (size === 'medium') {
        mediumML.classList.remove('hidden');
        largeML.classList.add('hidden');
    } else if (size === 'large') {
        largeML.classList.remove('hidden');
        mediumML.classList.add('hidden');
    }
    validateDrink();
}

// Function to validate each input field
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    const errorMessage = document.getElementById(`${field.id}-error`);
    let isValid = true;

    if (field.id === 'firstName' || field.id === 'lastName') {
        // Validate name: should only contain alphabetic characters
        isValid = /^[A-Za-z]+$/.test(value);
    } else if (field.id === 'phoneNumber') {
        // Validate phone number: should be exactly 10 digits
        isValid = /^[0-9]{10}$/.test(value);
    } else if (field.id === 'zipcode') {
        // Validate zip code: should be exactly 5 digits
        isValid = /^[0-9]{5}$/.test(value);
    } else if (field.id === 'emailId') {
        // Validate email: should end with @northeastern.edu
        isValid = /^[^\s@]+@northeastern\.edu$/.test(value);
    } else if (field.id === 'street1') {
        // Street Address 1 cannot be empty
        isValid = value.length > 0;
    }

    if (isValid) {
        errorMessage.classList.add('hidden');
    } else {
        errorMessage.classList.remove('hidden');
    }

    toggleSubmitButton();
}

function validateDrink() {
    const selectedDrink = drinkSelect.value;
    const selectedSize = document.querySelector('input[name="cupSize"]:checked');
    let isValid = true;

    if (!selectedDrink || !selectedSize) {
        drinkError.classList.remove('hidden');
        isValid = false;
    } else {
        drinkError.classList.add('hidden');
    }

    toggleSubmitButton();
}

function toggleSubmitButton() {
    let allValid = true;

    inputs.forEach(input => {
        const errorMessage = document.getElementById(`${input.id}-error`);
        if (errorMessage && !errorMessage.classList.contains('hidden')) {
            allValid = false;
        }
    });

    const selectedDrink = drinkSelect.value;
    const selectedSize = document.querySelector('input[name="cupSize"]:checked');

    if (!selectedDrink || !selectedSize) {
        allValid = false;
    }

    submitBtn.disabled = !allValid;
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    displaySubmittedData();
    form.reset();
    drinkOptions.classList.add('hidden');
    document.getElementById('submittedData').classList.remove('hidden');
    toggleSubmitButton();
});

function displaySubmittedData() {
    const dataTable = document.getElementById('dataTable');
    dataTable.innerHTML = '';

    // Add street addresses
    addRowToTable('Street Address 1', form.street1.value);
    addRowToTable('Street Address 2', form.street2.value);

    // Add first name, last name
    addRowToTable('First Name', form.firstName.value);
    addRowToTable('Last Name', form.lastName.value);

    // Add email, phone number, zip code
    addRowToTable('Email', form.emailId.value);
    addRowToTable('Phone Number', form.phoneNumber.value);
    addRowToTable('Zip Code', form.zipcode.value);

    // Add selected drink and cup sizes
    const selectedDrink = drinkSelect.value;
    const selectedSize = document.querySelector('input[name="cupSize"]:checked').value;
    addRowToTable('Favourite Drink', `${selectedDrink} (${selectedSize === 'Medium' ? '550 ml' : '750 ml'})`);
}

function addRowToTable(fieldName, fieldValue) {
    const row = document.createElement('tr');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    cell1.textContent = fieldName;
    cell2.textContent = fieldValue;
    row.appendChild(cell1);
    row.appendChild(cell2);
    document.getElementById('dataTable').appendChild(row);
}