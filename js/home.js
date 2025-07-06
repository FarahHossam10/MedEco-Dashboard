// HTML Elements
window.addEventListener('load', function () {
const lineChart = document.getElementById('line-chart').getContext('2d');
const typeDoughnut = document.getElementById("type-doughnut-chart").getContext('2d');
const medicineDoughnut = document.getElementById("medicine-doughnut-chart").getContext('2d');

// Create a vertical gradient for the line fill
const gradientFill = lineChart.createLinearGradient(0, 0, 0, 400);
gradientFill.addColorStop(0, '#176B87');  // Top color
gradientFill.addColorStop(1, 'rgba(79, 209, 197, 0'); // Bottom color



new Chart(lineChart, {
    type: 'line',
    data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
        label: 'Expired Drug Exchanges',
        data: [150, 200, 230, 120, 300, 360, 400, 480, 430, 310, 260, 410],
        borderColor: "#176B87",     // Line color
        backgroundColor: gradientFill,   // Fill under line
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 0
    }]
    },
    options: {
        scales: {
            x: {
            grid: {
                display: false // hides vertical grid lines
            }
            },
            y: {
            beginAtZero: true,
            grid: {
                display: true,
                drawBorder: false,
                borderDash: [5, 10], // dashed lines
            }
        }
        },
        plugins: {
            legend: {
                display: false
            }
            },
    }
});
// lineChart.setLineDash([5, 15])


let typeDoughnutData = [45, 28, 17, 10];
const colors = ['#1CCAB8', '#4393FF', '#FF8743', '#FFD56D'];
let typeDoughnutLabels = ['Requests for cold and pain medications', 'Requestd for antibiotics', 'Requests for chronic medications', 'Other'];


let typeDoughnutChart = new Chart(typeDoughnut, {
    type: 'doughnut',
    data: {
        labels: typeDoughnutLabels,
        datasets: [{
        // label: '# of Votes',
        data: typeDoughnutData,
        borderWidth: 1,
        backgroundColor : colors,
        }]
    },
    options: {
        cutout: "65%",
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
        legend: {
            display: false
        }
        },
        
    },
    // plugins: [centerTextPlugin]
});

const typeDoughnutSummary = document.getElementById('type-doughnut-summary');
const typeDoughnutTotal = typeDoughnutData.reduce((a, b) => a + b, 0);

typeDoughnutLabels.forEach((label, i) => {
    const percent = ((typeDoughnutData[i] / typeDoughnutTotal) * 100).toFixed(1);
    const item = document.createElement('div');
    item.innerHTML = `
    <h5>${label}</h5>
    <p><span style="width: 15px; height: 15px; background:${colors[i]}; display:inline-block; border-radius:50%; margin-right:3px;"></span>
    ${percent}%</p>`;
    typeDoughnutSummary.appendChild(item);
});



const centerTextPlugin = {
    id: 'centerText',
    beforeDraw(medicineDoughnutChart) {
      const { width } = medicineDoughnutChart;
      const { top, bottom, left, right } = medicineDoughnutChart.chartArea;
      const medicineDoughnut = medicineDoughnutChart.ctx;
  
      medicineDoughnut.save();
      const text = '480'; 
      medicineDoughnut.font = 'bold 48px Roboto';
      medicineDoughnut.fillStyle = '#5D5D5D';
      medicineDoughnut.textAlign = 'center';
      medicineDoughnut.textBaseline = 'middle';
  
      const x = (left + right) / 2;
      const y = (top + bottom) / 2;
  
      medicineDoughnut.fillText(text, x, y);
      medicineDoughnut.restore();
    }
  };
  
const medicineDoughnutLabels = ["Panadol", "Voltarin", "Augmentin", "Other"]
const medicineDoughnutData = [180, 90, 90, 21]
let medicineDoughnutChart = new Chart(medicineDoughnut, {
    type: 'doughnut',
    data: {
        labels: medicineDoughnutLabels,
        datasets: [{
        data: medicineDoughnutData,
        borderWidth: 1,
        backgroundColor : colors,
        }]
    },
    options: {
        cutout: "65%",
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
        legend: {
            display: false
        }
        },
        
    },
    plugins: [centerTextPlugin]

});

const medicineDoughnutSummary = document.getElementById('medicine-doughnut-summary');
// const medicineDoughnutTotal = medicineDoughnutData.reduce((a, b) => a + b, 0);
// console.log(medicineDoughnutTotal)
medicineDoughnutLabels.forEach((label, i) => {
    // const percent = ((medicineDoughnutData[i] / medicineDoughnutTotal) * 100).toFixed(1);
    const item = document.createElement('div');
    item.innerHTML = `
    <h5>${label}</h5>
    <p><span style="width: 15px; height: 15px; background:${colors[i]}; display:inline-block; border-radius:50%; margin-right:3px;"></span>
    ${medicineDoughnutData[i]}</p>`;
    medicineDoughnutSummary.appendChild(item);
});
})



// function toggleMenu(){
//     document.getElementById("sideMenu-container").classList.toggle("open")
// }

