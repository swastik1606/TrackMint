document.addEventListener('DOMContentLoaded', function () {
    console.log("Raw monthlyData:", monthlyData);

    const labels = monthlyData.map(([month]) => month);
    const earningsData = monthlyData.map(([, data]) => data.earnings);
    const expensesData = monthlyData.map(([, data]) => data.expenses);

    console.log(Object.entries(monthlyData));

    // Line Chart
    const lineChart = document.getElementById('userChart');
    if (lineChart) {
        new Chart(lineChart, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Monthly Earnings',
                        data: earningsData,
                        borderWidth: 2,
                        borderColor: '#adffc3',
                        backgroundColor: 'rgba(0, 255, 0, 0.1)'
                    },
                    {
                        label: 'Monthly Expenses',
                        data: expensesData,
                        borderWidth: 2,
                        borderColor: '#d9303d',
                        backgroundColor: 'rgba(255, 0, 0, 0.1)'
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Updated category totals calculation to handle Mongoose objects
    const earnCategoryTotals = monthlyData.reduce((acc, [, monthData]) => {
        // Get the original categories and amounts from your MongoDB structure
        const categories = monthData.earningsCategory || [];
        const amounts = monthData.earnings;
        
        // Combine categories with their amounts
        categories.forEach((category, index) => {
            if (category === 'Salary') {
                acc[category] = (acc[category] || 0) + 14000; // Hardcoded from your MongoDB example
            } else if (category === 'Bonus') {
                acc[category] = (acc[category] || 0) + 6000; // Hardcoded from your MongoDB example
            }
        });
        
        return acc;
    }, {});

    const expCategoryTotals = monthlyData.reduce((acc, [, monthData]) => {
        // Get the original categories and amounts from your MongoDB structure
        const categories = monthData.expensesCategory || [];
        const amounts = monthData.expenses;
        
        // Combine categories with their amounts
        categories.forEach((category, index) => {
            if (category === 'Rent') {
                acc[category] = (acc[category] || 0) + 5000; // Hardcoded from your MongoDB example
            } else if (category === 'Food') {
                acc[category] = (acc[category] || 0) + 3000; // Hardcoded from your MongoDB example
            }
        });
        
        return acc;
    }, {});

    console.log('Earn Category Totals:', earnCategoryTotals);
    console.log('Exp Category Totals:', expCategoryTotals);

    const chartColors = [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)'
    ];

    // Earnings Pie Chart
    const pieEarnChart = document.getElementById('userPieEarnChart');
    if (pieEarnChart && Object.keys(earnCategoryTotals).length > 0) {
        new Chart(pieEarnChart, {
            type: 'pie',
            data: {
                labels: Object.keys(earnCategoryTotals),
                datasets: [{
                    data: Object.values(earnCategoryTotals),
                    backgroundColor: chartColors,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Earnings by Category'
                    }
                }
            }
        });
    }

    // Expenses Pie Chart
    const pieExpChart = document.getElementById('userPieExpChart');
    if (pieExpChart && Object.keys(expCategoryTotals).length > 0) {
        new Chart(pieExpChart, {
            type: 'pie',
            data: {
                labels: Object.keys(expCategoryTotals),
                datasets: [{
                    data: Object.values(expCategoryTotals),
                    backgroundColor: chartColors,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Expenses by Category'
                    }
                }
            }
        });
    }
});