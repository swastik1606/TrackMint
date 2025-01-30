const addForm = document.querySelector('.add-form');
const subForm = document.querySelector('.minus-form');
const ul = document.querySelector('.history');

// Add money form
addForm.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent default form submission behavior
    
    const amount = addForm.querySelector('input[name="amount"]').value; // Get the input value
    
    if (amount) {
        const entry = document.createElement('li');
        entry.innerHTML = `Deposit: ${amount}`;
        ul.appendChild(entry);
        
        // Optionally, send the data to the server
        fetch(addForm.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount }),
        })
        .then(response => response.json())  // Assuming the server sends a JSON response
        .then(data => console.log(data))  // Handle success
        .catch(error => console.error('Error:', error));
    }
});

// Withdraw money form
subForm.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent default form submission behavior
    
    const amount = subForm.querySelector('input[name="amount"]').value; // Get the input value
    
    if (amount) {
        const entry = document.createElement('li');
        entry.innerHTML = `Withdrawn: ${amount}`;
        ul.appendChild(entry);
        
        // Optionally, send the data to the server
        fetch(subForm.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount }),
        })
        .then(response => response.json())  // Assuming the server sends a JSON response
        .then(data => console.log(data))  // Handle success
        .catch(error => console.error('Error:', error));
    }
});
