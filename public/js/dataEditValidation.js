const form = document.querySelector('.data-form');

// Function to get all current input fields
const getCurrentInputs = () => {
    const inputs = [];
    const lookGoods = [];

    // Get all earning entries
    document.querySelectorAll('.earning-entry').forEach(entry => {
        const earnInput = entry.querySelector('input[name="earnings.amount[]"]');
        const earnCatInput = entry.querySelector('input[name="earnings.category[]"]');
        
        if (earnInput) {
            inputs.push(earnInput);
            lookGoods.push(earnInput.nextElementSibling);
        }
        if (earnCatInput) {
            inputs.push(earnCatInput);
            lookGoods.push(earnCatInput.nextElementSibling);
        }
    });

    // Get all expense entries
    document.querySelectorAll('.expense-entry').forEach(entry => {
        const expInput = entry.querySelector('input[name="expenses.amount[]"]');
        const expCatInput = entry.querySelector('input[name="expenses.category[]"]');
        
        if (expInput) {
            inputs.push(expInput);
            lookGoods.push(expInput.nextElementSibling);
        }
        if (expCatInput) {
            inputs.push(expCatInput);
            lookGoods.push(expCatInput.nextElementSibling);
        }
    });

    // Add year input
    const yearInput = document.querySelector('#year');
    if (yearInput) {
        inputs.push(yearInput);
        lookGoods.push(yearInput.nextElementSibling);
    }

    return { inputs, lookGoods };
};

// Function to validate a single input
const validateInput = (input, lookGood) => {
    if (!input.value) {
        input.style.border = '3px solid #ff394a';
        lookGood.classList.remove('visible');
        return false;
    } else {
        // Additional validation for number inputs
        if (input.type === 'number') {
            const value = parseFloat(input.value);
            if (isNaN(value) || value < 0) {
                input.style.border = '3px solid #ff394a';
                lookGood.classList.remove('visible');
                return false;
            }
            // Special validation for year
            if (input.id === 'year' && (value < 1900 || value > 2100)) {
                input.style.border = '3px solid #ff394a';
                lookGood.classList.remove('visible');
                return false;
            }
        }
        input.style.border = '3px solid #adffc3';
        lookGood.classList.add('visible');
        return true;
    }
};

// Add validation to new fields when they're created
const addValidationToNewFields = (container) => {
    const { inputs, lookGoods } = getCurrentInputs();
    inputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (form.classList.contains('submitted')) {
                validateInput(input, lookGoods[index]);
            }
        });
    });
};

// Set up form submission validation
form.addEventListener('submit', (e) => {
    const { inputs, lookGoods } = getCurrentInputs();
    let hasErrors = false;

    inputs.forEach((input, index) => {
        if (!validateInput(input, lookGoods[index])) {
            hasErrors = true;
        }
    });

    if (hasErrors) {
        e.preventDefault();
        form.classList.add('submitted');
    }
});

// Add validation to initial fields
addValidationToNewFields();

// Add validation to new fields when add buttons are clicked
document.querySelector('.addEarnCat')?.addEventListener('click', () => {
    setTimeout(addValidationToNewFields, 0);
});

document.querySelector('.addExpCat')?.addEventListener('click', () => {
    setTimeout(addValidationToNewFields, 0);
});

// Add validation when remove buttons are clicked
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        setTimeout(addValidationToNewFields, 0);
    }
});