var canva = document.getElementById("canva" + id);
var ctx = canva.getContext('2d');
var xValues = [companyName, "Others"];
console.log(sales2021);
var yValues = [sales2021, total2021];
var barColors = [
  "#b91d47",
  "#00aba9"
];
var config = {
    type: 'pie',
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
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
          text: 'Sales 2021'
        }
      }
    },
  };
new Chart(ctx, config);