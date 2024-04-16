var canva1 = document.getElementById("canva1_" + id);
var canva2 = document.getElementById("canva2_" + id);
var canva3 = document.getElementById("canva3_" + id);
var ctx1 = canva1.getContext('2d');
var ctx2 = canva2.getContext('2d');
var ctx3 = canva3.getContext('2d');

var barColors = [
  "#b91d47",
  "#00aba9"
];

//calculate min!!! max!!!
var createConfigLine = (sales2021, sales2022, min, max) => {
  var xValues = [2021, 2022];
  yValues = [sales2021, sales2022]
  return {
    type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    
  }
  }
  
}
var createConfigPie = (year, companyName, compnySales, totalYearSales) => {
    xValues = [companyName, "Others"];
    yValues = [compnySales, totalYearSales];
 
  return config = {
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
          text: `Sales ${year}`
        }
      }
    },
  };
};
var config1 = createConfigPie('2021', companyName, sales2021, total2021);
var config2 = createConfigPie('2022', companyName, sales2022, total2022);
var config3 = createConfigLine(sales2021, sales2022);
new Chart(ctx3, config3);
new Chart(ctx1, config1);
new Chart(ctx2, config2);