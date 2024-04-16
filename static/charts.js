
var xValues = [companyName, "Others"];
var yValues = [sales2021, total_sales_2021];
var barColors = [
  "#b91d47",
  "#00aba9"
];
const config = {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Sales 2021'
        }
      }
    },
  };
