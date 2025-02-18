const addEarnBtn = document.querySelector('.addEarnCat');
const earnDiv = document.querySelector('.earnDiv');
const addExpBtn = document.querySelector('.addExpCat');
const expDiv = document.querySelector('.expDiv');

// Function to handle removal of existing entries
function setupExistingRemoveButtons() {
    const existingRemoveButtons = document.querySelectorAll('.remove-btn');
    existingRemoveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const entryDiv = this.closest('.earning-entry, .expense-entry');
            if (entryDiv) {
                entryDiv.remove();
            }
        });
    });
}

// Set up remove functionality for existing entries
setupExistingRemoveButtons();

addEarnBtn.addEventListener('click', () => {
    const timestamp = Date.now();
    const earnEntryDiv = document.createElement('div');
    earnEntryDiv.className = 'earning-entry';

    const earnLabel = document.createElement('label');
    earnLabel.textContent = 'Earnings:';
    earnLabel.setAttribute('for', `earnings-${timestamp}`);

    const earnInput = document.createElement('input');
    earnInput.type = 'number';
    earnInput.id = `earnings-${timestamp}`;
    earnInput.name = 'earnings.amount[]';

    const lookGoodDiv1 = document.createElement('div');
    lookGoodDiv1.className = 'lookGood';
    lookGoodDiv1.textContent = 'Looks Good';

    const catLabel = document.createElement('label');
    catLabel.textContent = 'Category:';
    catLabel.setAttribute('for', `earnCat-${timestamp}`);

    const catInput = document.createElement('input');
    catInput.type = 'text';
    catInput.id = `earnCat-${timestamp}`;
    catInput.name = 'earnings.category[]';

    const lookGoodDiv2 = document.createElement('div');
    lookGoodDiv2.className = 'lookGood';
    lookGoodDiv2.textContent = 'Looks Good';

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    earnEntryDiv.appendChild(earnLabel);
    earnEntryDiv.appendChild(earnInput);
    earnEntryDiv.appendChild(lookGoodDiv1);
    earnEntryDiv.appendChild(catLabel);
    earnEntryDiv.appendChild(catInput);
    earnEntryDiv.appendChild(lookGoodDiv2);
    earnEntryDiv.appendChild(removeBtn);

    // Insert the new entry before the Add Category button
    addEarnBtn.parentElement.insertBefore(earnEntryDiv, addEarnBtn);

    // Manually trigger input event listeners for new fields
    const form = document.querySelector('.data-form');
    if (form.classList.contains('submitted')) {
        earnInput.dispatchEvent(new Event('input'));
        catInput.dispatchEvent(new Event('input'));
    }
});

addExpBtn.addEventListener('click', () => {
    const timestamp = Date.now();
    const expEntryDiv = document.createElement('div');
    expEntryDiv.className = 'expense-entry';

    const expLabel = document.createElement('label');
    expLabel.textContent = 'Expenses:';
    expLabel.setAttribute('for', `expenses-${timestamp}`);

    const expInput = document.createElement('input');
    expInput.type = 'number';
    expInput.id = `expenses-${timestamp}`;
    expInput.name = 'expenses.amount[]';

    const lookGoodDiv1 = document.createElement('div');
    lookGoodDiv1.className = 'lookGood';
    lookGoodDiv1.textContent = 'Looks Good';

    const catLabel = document.createElement('label');
    catLabel.textContent = 'Category:';
    catLabel.setAttribute('for', `expCat-${timestamp}`);

    const catInput = document.createElement('input');
    catInput.type = 'text';
    catInput.id = `expCat-${timestamp}`;
    catInput.name = 'expenses.category[]';

    const lookGoodDiv2 = document.createElement('div');
    lookGoodDiv2.className = 'lookGood';
    lookGoodDiv2.textContent = 'Looks Good';

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    expEntryDiv.appendChild(expLabel);
    expEntryDiv.appendChild(expInput);
    expEntryDiv.appendChild(lookGoodDiv1);
    expEntryDiv.appendChild(catLabel);
    expEntryDiv.appendChild(catInput);
    expEntryDiv.appendChild(lookGoodDiv2);
    expEntryDiv.appendChild(removeBtn);

    // Insert the new entry before the Add Category button
    addExpBtn.parentElement.insertBefore(expEntryDiv, addExpBtn);

    // Manually trigger input event listeners for new fields
    const form = document.querySelector('.data-form');
    if (form.classList.contains('submitted')) {
        expInput.dispatchEvent(new Event('input'));
        catInput.dispatchEvent(new Event('input'));
    }
});

// Add event delegation for remove buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        const entryDiv = e.target.closest('.earning-entry, .expense-entry');
        if (entryDiv) {
            entryDiv.remove();
        }
    }
});