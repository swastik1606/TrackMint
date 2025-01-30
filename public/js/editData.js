const addEarnBtn = document.querySelector('.addEarnCat');
const earnDiv = document.querySelector('.earnDiv');
const addExpBtn = document.querySelector('.addExpCat');
const expDiv = document.querySelector('.expDiv');

// Function to handle removal of existing entries
function setupExistingRemoveButtons() {
    const existingRemoveButtons = document.querySelectorAll('.remove-btn');
    existingRemoveButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the parent entry div and remove it
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
    const earnInput = document.createElement('input');
    const catLabel = document.createElement('label');
    const catInput = document.createElement('input');
    const lookGoodDiv1 = document.createElement('div');
    const lookGoodDiv2 = document.createElement('div');

    earnLabel.textContent = 'Earnings:';
    earnLabel.setAttribute('for', `earnings-${timestamp}`);

    earnInput.id = `earnings-${timestamp}`;
    earnInput.type = 'number';
    earnInput.name = 'earnings.amount[]';

    lookGoodDiv1.className = 'lookGood';
    lookGoodDiv1.textContent = 'Looks Good';

    catLabel.textContent = 'Category:';
    catLabel.setAttribute('for', `earnCat-${timestamp}`);

    catInput.id = `earnCat-${timestamp}`;
    catInput.type = 'text';
    catInput.name = 'earnings.category[]';

    lookGoodDiv2.className = 'lookGood';
    lookGoodDiv2.textContent = 'Looks Good';

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';
    
    removeBtn.addEventListener('click', function() {
        earnEntryDiv.remove();
    });

    earnEntryDiv.appendChild(earnLabel);
    earnEntryDiv.appendChild(earnInput);
    earnEntryDiv.appendChild(lookGoodDiv1);
    earnEntryDiv.appendChild(catLabel);
    earnEntryDiv.appendChild(catInput);
    earnEntryDiv.appendChild(lookGoodDiv2);
    earnEntryDiv.appendChild(removeBtn);

    addEarnBtn.insertAdjacentElement('beforebegin', earnEntryDiv);
});

addExpBtn.addEventListener('click', () => {
    const timestamp = Date.now();
    const expEntryDiv = document.createElement('div');
    expEntryDiv.className = 'expense-entry';

    const expLabel = document.createElement('label');
    const expInput = document.createElement('input');
    const catLabel = document.createElement('label');
    const catInput = document.createElement('input');
    const lookGoodDiv1 = document.createElement('div');
    const lookGoodDiv2 = document.createElement('div');

    expLabel.textContent = 'Expenses:';
    expLabel.setAttribute('for', `expenses-${timestamp}`);

    expInput.id = `expenses-${timestamp}`;
    expInput.type = 'number';
    expInput.name = 'expenses.amount[]';

    lookGoodDiv1.className = 'lookGood';
    lookGoodDiv1.textContent = 'Looks Good';

    catLabel.textContent = 'Category:';
    catLabel.setAttribute('for', `expCat-${timestamp}`);

    catInput.id = `expCat-${timestamp}`;
    catInput.type = 'text';
    catInput.name = 'expenses.category[]';

    lookGoodDiv2.className = 'lookGood';
    lookGoodDiv2.textContent = 'Looks Good';

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';
    
    removeBtn.addEventListener('click', function() {
        expEntryDiv.remove();
    });

    expEntryDiv.appendChild(expLabel);
    expEntryDiv.appendChild(expInput);
    expEntryDiv.appendChild(lookGoodDiv1);
    expEntryDiv.appendChild(catLabel);
    expEntryDiv.appendChild(catInput);
    expEntryDiv.appendChild(lookGoodDiv2);
    expEntryDiv.appendChild(removeBtn);

    addExpBtn.insertAdjacentElement('beforebegin', expEntryDiv);
});