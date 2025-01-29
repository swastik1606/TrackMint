const addEarnBtn = document.querySelector('.addEarnCat');
const earnDiv = document.querySelector('.earnDiv');

addEarnBtn.addEventListener('click', () => {
    const earnLabel = document.createElement('label');
    const earnInput = document.createElement('input');

    const catLabel = document.createElement('label');
    const catInput = document.createElement('input');

    earnLabel.textContent = 'Earnings:';
    earnLabel.setAttribute('for', `earnings-${Date.now()}`);

    earnInput.id = `earnings-${Date.now()}`;
    earnInput.type = 'number';
    earnInput.name = 'earnings.amount[]';

    catLabel.textContent = 'Category:';
    catLabel.setAttribute('for', `category-${Date.now()}`);

    catInput.id = `category-${Date.now()}`;
    catInput.type = 'text';
    catInput.name = 'earnings.category[]';

    // Add a remove button
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'Remove';
    removeBtn.id='remove-btn'
    removeBtn.onclick = function() {
        earnLabel.remove();
        earnInput.remove();
        catLabel.remove();
        catInput.remove();
        removeBtn.remove();
    };

    addEarnBtn.insertAdjacentElement('beforebegin', earnLabel);
    addEarnBtn.insertAdjacentElement('beforebegin', earnInput);
    addEarnBtn.insertAdjacentElement('beforebegin', catLabel);
    addEarnBtn.insertAdjacentElement('beforebegin', catInput);
    addEarnBtn.insertAdjacentElement('beforebegin', removeBtn);
});

const addExpBtn = document.querySelector('.addExpCat');
const expDiv = document.querySelector('.expDiv');

addExpBtn.addEventListener('click', () => {
    const expLabel = document.createElement('label');
    const expInput = document.createElement('input');

    const catLabel = document.createElement('label');
    const catInput = document.createElement('input');

    expLabel.textContent = 'Expenses:';
    expLabel.setAttribute('for', `expenses-${Date.now()}`);

    expInput.id = `expenses-${Date.now()}`; // Fixed from 'earnings' to 'expenses'
    expInput.type = 'number';
    expInput.name = 'expenses.amount[]';

    catLabel.textContent = 'Category:';
    catLabel.setAttribute('for', `category-${Date.now()}`);

    catInput.id = `category-${Date.now()}`;
    catInput.type = 'text';
    catInput.name = 'expenses.category[]';

    // Add a remove button
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'Remove';
    removeBtn.id='remove-btn'
    removeBtn.onclick = function() {
        expLabel.remove();
        expInput.remove();
        catLabel.remove();
        catInput.remove();
        removeBtn.remove();
    };

    addExpBtn.insertAdjacentElement('beforebegin', expLabel);
    addExpBtn.insertAdjacentElement('beforebegin', expInput);
    addExpBtn.insertAdjacentElement('beforebegin', catLabel);
    addExpBtn.insertAdjacentElement('beforebegin', catInput);
    addExpBtn.insertAdjacentElement('beforebegin', removeBtn);
});