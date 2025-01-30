// Select the form and initialize validation state
const form = document.querySelector('.data-form');

// Function to validate amount inputs
const validateAmount = (value) => {
    const amount = parseFloat(value);
    return !isNaN(amount) && amount >= 0;
};

// Function to validate year input
const validateYear = (value) => {
    const year = parseInt(value);
    return !isNaN(year) && year >= 1900 && year <= 2100;
};

// Function to validate category input
const validateCategory = (value) => {
    return value.trim().length > 0;
};

// Function to get all form inputs that need validation
const getFormInputs = () => {
    return {
        year: {
            input: document.querySelector('#year'),
            lookGood: document.querySelector('#year + .lookGood')
        },
        earnings: Array.from(document.querySelectorAll('.earnDiv, .earning-entry')).map(div => ({
            amount: {
                input: div.querySelector('input[name^="earnings.amount"]'),
                lookGood: div.querySelector('input[name^="earnings.amount"] + .lookGood')
            },
            category: {
                input: div.querySelector('input[name^="earnings.category"]'),
                lookGood: div.querySelector('input[name^="earnings.category"] + .lookGood')
            }
        })),
        expenses: Array.from(document.querySelectorAll('.expDiv, .expense-entry')).map(div => ({
            amount: {
                input: div.querySelector('input[name^="expenses.amount"]'),
                lookGood: div.querySelector('input[name^="expenses.amount"] + .lookGood')
            },
            category: {
                input: div.querySelector('input[name^="expenses.category"]'),
                lookGood: div.querySelector('input[name^="expenses.category"] + .lookGood')
            }
        }))
    };
};

// Function to validate a single input field
const validateField = (input, lookGood, validatorFn) => {
    if (!input || !lookGood) return true; // Skip if elements don't exist

    const isValid = validatorFn(input.value);
    
    input.style.border = isValid ? '3px solid #adffc3' : '3px solid #ff394a';
    lookGood.classList.toggle('visible', isValid);
    
    return isValid;
};

// Function to validate all form fields
const validateForm = () => {
    const inputs = getFormInputs();
    let isValid = true;

    // Validate year
    if (inputs.year.input && inputs.year.lookGood) {
        isValid = validateField(inputs.year.input, inputs.year.lookGood, validateYear) && isValid;
    }

    // Validate earnings
    inputs.earnings.forEach(entry => {
        if (entry.amount.input && entry.amount.lookGood) {
            isValid = validateField(entry.amount.input, entry.amount.lookGood, validateAmount) && isValid;
        }
        if (entry.category.input && entry.category.lookGood) {
            isValid = validateField(entry.category.input, entry.category.lookGood, validateCategory) && isValid;
        }
    });

    // Validate expenses
    inputs.expenses.forEach(entry => {
        if (entry.amount.input && entry.amount.lookGood) {
            isValid = validateField(entry.amount.input, entry.amount.lookGood, validateAmount) && isValid;
        }
        if (entry.category.input && entry.category.lookGood) {
            isValid = validateField(entry.category.input, entry.category.lookGood, validateCategory) && isValid;
        }
    });

    return isValid;
};

// Add input event listeners to all fields
const addInputListeners = () => {
    const inputs = getFormInputs();
    
    // Year input
    if (inputs.year.input) {
        inputs.year.input.addEventListener('input', () => {
            if (form.classList.contains('submitted')) {
                validateField(inputs.year.input, inputs.year.lookGood, validateYear);
            }
        });
    }

    // Earnings inputs
    inputs.earnings.forEach(entry => {
        if (entry.amount.input) {
            entry.amount.input.addEventListener('input', () => {
                if (form.classList.contains('submitted')) {
                    validateField(entry.amount.input, entry.amount.lookGood, validateAmount);
                }
            });
        }
        if (entry.category.input) {
            entry.category.input.addEventListener('input', () => {
                if (form.classList.contains('submitted')) {
                    validateField(entry.category.input, entry.category.lookGood, validateCategory);
                }
            });
        }
    });

    // Expenses inputs
    inputs.expenses.forEach(entry => {
        if (entry.amount.input) {
            entry.amount.input.addEventListener('input', () => {
                if (form.classList.contains('submitted')) {
                    validateField(entry.amount.input, entry.amount.lookGood, validateAmount);
                }
            });
        }
        if (entry.category.input) {
            entry.category.input.addEventListener('input', () => {
                if (form.classList.contains('submitted')) {
                    validateField(entry.category.input, entry.category.lookGood, validateCategory);
                }
            });
        }
    });
};

// Form submission handler
form.addEventListener('submit', (e) => {
    const isValid = validateForm();
    
    if (!isValid) {
        e.preventDefault();
        form.classList.add('submitted');
    }
});

// Add validation to initial fields
addInputListeners();

// Add validation to new fields when categories are added
document.querySelector('.addEarnCat')?.addEventListener('click', () => {
    setTimeout(addInputListeners, 0);
});

document.querySelector('.addExpCat')?.addEventListener('click', () => {
    setTimeout(addInputListeners, 0);
});

// Add validation when fields are removed
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        setTimeout(addInputListeners, 0);
    }
});