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

    // Pie Chart
    const categoryTotals = monthlyData.reduce((acc, [, monthData]) => {
        if (monthData.categoryAmounts) {
            Object.entries(monthData.categoryAmounts).forEach(([category, amount]) => {
                if (!acc[category]) {
                    acc[category] = 0;
                }
                acc[category] += amount;
            });
        }
        return acc;
    }, {});

    console.log('Category Totals:', categoryTotals);

    const pieEarnChart = document.getElementById('userPieEarnChart')

    pieEarnChart.width = 450;
    pieEarnChart.height = 450;

    // Generate the pie chart
    if (Object.keys(categoryTotals).length > 0) {
        new Chart(pieEarnChart, {
            type: 'pie',
            data: {
                labels: Object.keys(categoryTotals),
                datasets: [{
                    label: 'Earnings by Category',
                    data: Object.values(categoryTotals),
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)'
                    ],
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


    const pieExpChart = document.querySelector('userPieExpChart')

    if (Object.keys(categoryTotals).length > 0) {
        new Chart(pieExpChart, {
            type: 'pie',
            data: {
                labels: Object.keys(categoryTotals),
                datasets: [{
                    label: 'Earnings by Category',
                    data: Object.values(categoryTotals),
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)'
                    ],
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