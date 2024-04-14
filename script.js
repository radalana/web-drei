let customers = [];
let filteredCustomers = [];

// Загрузка данных с сервера
fetch('http://127.0.0.1:5000/get_customers')
    .then(response => response.json())
    .then(data => {
        customers = data;
        displayCustomers(customers);
    });

function displayCustomers(data) {
    const container = document.getElementById('customers');
    container.innerHTML = ''; // Очистка предыдущих данных
    data.forEach(customer => {
        const customerElement = document.createElement('div');
        customerElement.textContent = `${customer['First Name']} ${customer['Last Name']} - ${customer['SALES 2021']} / ${customer['SALES 2022']}`;
        container.appendChild(customerElement);
    });
}

function sortData() {
    const sortBy = document.getElementById('sort').value;
    let sortedCustomers = [...customers];
    if (sortBy === 'name') {
        sortedCustomers.sort((a, b) => a['First Name'].localeCompare(b['First Name']));
    } else if (sortBy === 'sales2021') {
        sortedCustomers.sort((a, b) => b['SALES 2021'] - a['SALES 2021']);
    } else {
        sortedCustomers.sort((a, b) => b['SALES 2022'] - a['SALES 2022']);
    }
    displayCustomers(sortedCustomers);
}

function filterData() {
    const filterBy = document.getElementById('filter').value;
    if (filterBy === 'all') {
        filteredCustomers = [...customers];
    } else {
        filteredCustomers = customers.filter(customer => customer.isActive); // Допустим, есть поле isActive
    }
    displayCustomers(filteredCustomers);
}
function createCharts() {
    const ctxPie = document.createElement('canvas');
    const ctxLine = document.createElement('canvas');
    document.body.appendChild(ctxPie);
    document.body.appendChild(ctxLine);

    // Данные для круговой диаграммы
    const pieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: customers.map(customer => `${customer['First Name']} ${customer['Last Name']}`),
            datasets: [{
                label: 'Sales Share 2021',
                data: customers.map(customer => customer['SALES 2021']),
                backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple'],
                hoverOffset: 4
            }]
        }
    });

    // Данные для линейной диаграммы
    const lineChart = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: customers.map(customer => `${customer['First Name']} ${customer['Last Name']}`),
            datasets: [{
                label: 'Sales Development',
                data: customers.map(customer => customer['SALES 2022']),
                borderColor: 'blue',
                backgroundColor: 'lightblue',
            }]
        }
    });
}
// Подразумевается, что данные уже загружены в переменную customers
function createPieChart() {
    // Получение контекста для канваса
    const ctx = document.getElementById('salesPieChart').getContext('2d');

    // Подготовка данных для диаграммы
    const salesData2021 = customers.map(customer => customer['SALES 2021']);
    const salesData2022 = customers.map(customer => customer['SALES 2022']);
    const labels = customers.map(customer => `${customer['First Name']} ${customer['Last Name']}`);

    // Создание круговой диаграммы
    const pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Sales Share 2021 vs 2022',
                data: salesData2021.concat(salesData2022),  // Объединение данных для двух лет
                backgroundColor: [
                    ...Array(salesData2021.length).fill('rgba(255, 99, 132, 0.2)'),  // Красный для 2021
                    ...Array(salesData2022.length).fill('rgba(54, 162, 235, 0.2)')   // Синий для 2022
                ],
                borderColor: [
                    ...Array(salesData2021.length).fill('rgba(255, 99, 132, 1)'),
                    ...Array(salesData2022.length).fill('rgba(54, 162, 235, 1)')
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            let label = tooltipItem.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += tooltipItem.raw;
                            return label;
                        }
                    }
                }
            }
        }
    });
}
document.addEventListener('DOMContentLoaded', function() {
    // Загрузка данных, затем создание диаграммы
    fetch('http://127.0.0.1:5000/get_customers')
        .then(response => response.json())
        .then(data => {
            customers = data;
            createPieChart();  // Создаем диаграмму после загрузки данных
        });
});