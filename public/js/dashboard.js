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

    const earnCategoryTotals = monthlyData.reduce((acc, [, monthData]) => {
        // If `earnCategoryAmounts` is a Mongoose Map object, convert it to plain object
        if (monthData.earnCategoryAmounts instanceof Map) {
            monthData.earnCategoryAmounts = Object.fromEntries(monthData.earnCategoryAmounts);
        }
        
        if (monthData.earnCategoryAmounts && typeof monthData.earnCategoryAmounts === 'object') {
            // Iterate over the plain object for earnings category totals
            for (const [category, amount] of Object.entries(monthData.earnCategoryAmounts)) {
                acc[category] = (acc[category] || 0) + amount;
            }
        }
        return acc;
    }, {});

    const expCategoryTotals = monthlyData.reduce((acc, [, monthData]) => {
        // If `expCategoryAmounts` is a Mongoose Map object, convert it to plain object
        if (monthData.expCategoryAmounts instanceof Map) {
            monthData.expCategoryAmounts = Object.fromEntries(monthData.expCategoryAmounts);
        }
    
        if (monthData.expCategoryAmounts && typeof monthData.expCategoryAmounts === 'object') {
            // Iterate over the plain object for expenses category totals
            for (const [category, amount] of Object.entries(monthData.expCategoryAmounts)) {
                acc[category] = (acc[category] || 0) + amount;
            }
        }
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