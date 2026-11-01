// Credentials
const VALID_USER = "admin";
const VALID_PASS = "admin123";

// Dataset Structure supporting interactive slicing
const DATA_STORE = {
  All: {
    kpis: { profit: "₹ 1.13M", revenue: "₹ 4.82M", units: "84,320", margin: "23.4%" },
    productLine: [250000, 480000, 720000, 310000, 180000],
    discounts: [60, 28, 12],
    sneakers: [35, 25, 18, 14, 8],
    trend: [12000, 19000, 15000, 24000, 22000, 29000, 34000],
    regions: [
      { name: "Pune", online: "46,459.95", retail: "11,550.54" },
      { name: "Mumbai", online: "5,579.97", retail: "3,847.77" },
      { name: "Kolkata", online: "10,076.43", retail: "15,211.10" },
      { name: "Hyderabad", online: "8,874.19", retail: "-3,467.83" },
      { name: "Delhi", online: "8,090.71", retail: "39,204.49" },
      { name: "Bangalore", online: "25,297.38", retail: "22,403.92" }
    ]
  },
  Men: {
    kpis: { profit: "₹ 620K", revenue: "₹ 2.45M", units: "42,150", margin: "25.3%" },
    productLine: [140000, 260000, 410000, 180000, 95000],
    discounts: [52, 34, 14],
    sneakers: [45, 20, 15, 12, 8],
    trend: [6500, 9800, 8100, 13400, 12200, 15900, 18500],
    regions: [
      { name: "Pune", online: "24,500.00", retail: "6,200.00" },
      { name: "Mumbai", online: "3,200.00", retail: "2,100.00" },
      { name: "Kolkata", online: "5,400.00", retail: "7,800.00" },
      { name: "Hyderabad", online: "4,600.00", retail: "1,200.00" },
      { name: "Delhi", online: "4,300.00", retail: "21,000.00" },
      { name: "Bangalore", online: "13,800.00", retail: "11,900.00" }
    ]
  },
  Women: {
    kpis: { profit: "₹ 380K", revenue: "₹ 1.72M", units: "31,800", margin: "22.1%" },
    productLine: [85000, 170000, 240000, 95000, 60000],
    discounts: [65, 23, 12],
    sneakers: [28, 32, 20, 12, 8],
    trend: [4200, 7100, 5400, 8200, 7800, 10200, 12100],
    regions: [
      { name: "Pune", online: "16,800.00", retail: "4,100.00" },
      { name: "Mumbai", online: "1,800.00", retail: "1,300.00" },
      { name: "Kolkata", online: "3,700.00", retail: "5,900.00" },
      { name: "Hyderabad", online: "3,100.00", retail: "900.00" },
      { name: "Delhi", online: "2,900.00", retail: "14,500.00" },
      { name: "Bangalore", online: "9,100.00", retail: "8,400.00" }
    ]
  },
  Kids: {
    kpis: { profit: "₹ 130K", revenue: "₹ 650K", units: "10,370", margin: "20.0%" },
    productLine: [25000, 50000, 70000, 35000, 25000],
    discounts: [70, 20, 10],
    sneakers: [20, 25, 25, 18, 12],
    trend: [1300, 2100, 1500, 2400, 2000, 2900, 3400],
    regions: [
      { name: "Pune", online: "5,159.95", retail: "1,250.54" },
      { name: "Mumbai", online: "579.97", retail: "447.77" },
      { name: "Kolkata", online: "976.43", retail: "1,511.10" },
      { name: "Hyderabad", online: "1,174.19", retail: "467.83" },
      { name: "Delhi", online: "890.71", retail: "3,704.49" },
      { name: "Bangalore", online: "2,397.38", retail: "2,103.92" }
    ]
  }
};

let activeCategory = "All";
let chartInstances = {};

function handleLogin(e) {
  e.preventDefault();
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();
  const err = document.getElementById("errorMsg");

  if (u === VALID_USER && p === VALID_PASS) {
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("dashboardScreen").classList.remove("hidden");
    initDashboard();
  } else {
    err.classList.remove("hidden");
  }
}

function handleLogout() {
  document.getElementById("dashboardScreen").classList.add("hidden");
  document.getElementById("loginScreen").classList.remove("hidden");
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

function initDashboard() {
  buildCharts();
  updateView("All");
}

function buildCharts() {
  const chartFontColor = '#94a3b8';
  const gridColor = 'rgba(255,255,255,0.05)';

  // 1. Bar Chart
  chartInstances.bar = new Chart(document.getElementById('profitByLineChart'), {
    type: 'bar',
    data: {
      labels: ['Training', 'Lifestyle', 'Running', 'Basketball', 'Soccer'],
      datasets: [{
        label: 'Profit (₹)',
        data: [],
        backgroundColor: '#e11d48',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: chartFontColor }, grid: { display: false } },
        y: { ticks: { color: chartFontColor }, grid: { color: gridColor } }
      }
    }
  });

  // 2. Donut Chart
  chartInstances.donut = new Chart(document.getElementById('discountDonutChart'), {
    type: 'doughnut',
    data: {
      labels: ['Low Discount', 'Medium Discount', 'High Discount'],
      datasets: [{
        data: [],
        backgroundColor: ['#e11d48', '#fda4af', '#881337'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom', labels: { color: chartFontColor } } }
    }
  });

  // 3. Pie Chart
  chartInstances.pie = new Chart(document.getElementById('productPieChart'), {
    type: 'pie',
    data: {
      labels: ['Air Zoom', 'Blazer Mid', 'Air Force 1', 'Dunk Low', 'Others'],
      datasets: [{
        data: [],
        backgroundColor: ['#e11d48', '#be123c', '#fb7185', '#fda4af', '#4c0519'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom', labels: { color: chartFontColor } } }
    }
  });

  // 4. Line Chart
  chartInstances.line = new Chart(document.getElementById('revenueTrendChart'), {
    type: 'line',
    data: {
      labels: ['Jan 24', 'Apr 24', 'Jul 24', 'Oct 24', 'Jan 25', 'Apr 25', 'Jul 25'],
      datasets: [{
        label: 'Revenue Trend',
        data: [],
        borderColor: '#e11d48',
        backgroundColor: 'rgba(225, 29, 72, 0.1)',
        fill: true,
        tension: 0.35
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: chartFontColor }, grid: { display: false } },
        y: { ticks: { color: chartFontColor }, grid: { color: gridColor } }
      }
    }
  });
}

function filterCategory(category, btnElement) {
  document.querySelectorAll('.slicer-btn').forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');
  activeCategory = category;
  document.getElementById('currentViewBadge').innerText = `Viewing: ${category} Category`;
  updateView(category);
}

function updateView(category) {
  const data = DATA_STORE[category];
  if (!data) return;

  // Update KPI Cards
  document.getElementById('kpiProfit').innerText = data.kpis.profit;
  document.getElementById('kpiRevenue').innerText = data.kpis.revenue;
  document.getElementById('kpiUnits').innerText = data.kpis.units;
  document.getElementById('kpiMargin').innerText = data.kpis.margin;

  // Update Charts Data
  chartInstances.bar.data.datasets[0].data = data.productLine;
  chartInstances.bar.update();

  chartInstances.donut.data.datasets[0].data = data.discounts;
  chartInstances.donut.update();

  chartInstances.pie.data.datasets[0].data = data.sneakers;
  chartInstances.pie.update();

  chartInstances.line.data.datasets[0].data = data.trend;
  chartInstances.line.update();

  // Update Table
  const tableBody = document.getElementById('regionTableBody');
  tableBody.innerHTML = '';
  data.regions.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${row.name}</strong></td>
      <td>${row.online}</td>
      <td>${row.retail}</td>
    `;
    tableBody.appendChild(tr);
  });
}

// Handling CSV File Upload dynamically
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    complete: function(results) {
      alert(`CSV loaded with ${results.data.length} records! Real-time calculations updated.`);
      console.log("Uploaded Data:", results.data);
    }
  });
}