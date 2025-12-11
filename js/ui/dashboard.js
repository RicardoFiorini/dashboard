// js/ui/dashboard.js
import { getSales, getCustomers } from '../api.js';

/**
 * Cria o HTML para um card de KPI.
 * @param {object} kpi - Objeto com título, valor, ícone e cor.
 * @returns {string} - O HTML do card.
 */
const createKpiCard = ({ title, value, icon, color }) => `
    <div class="card kpi-card" style="border-left: 4px solid ${color};">
        <div class="card-icon" style="background-color: ${color};">
            <i class="${icon}"></i>
        </div>
        <div class="card-content">
            <h3>${title}</h3>
            <p>${value}</p>
        </div>
    </div>
`;

/**
 * Renderiza o gráfico de vendas usando Chart.js.
 * @param {Array} salesData - Os dados de vendas.
 */
const renderSalesChart = (salesData) => {
    const ctx = document.getElementById('salesChart').getContext('2d');
    
    // Processa os dados para o gráfico
    const salesByMonth = salesData.reduce((acc, sale) => {
        const month = new Date(sale.date).toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + sale.totalAmount;
        return acc;
    }, {});

    const labels = Object.keys(salesByMonth).reverse();
    const data = Object.values(salesByMonth).reverse();

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Receita Mensal',
                data: data,
                backgroundColor: 'rgba(49, 130, 206, 0.2)',
                borderColor: 'rgba(49, 130, 206, 1)',
                borderWidth: 2,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

export default async function renderDashboard() {
    const mainContent = document.getElementById('main-content');
    
    const [sales, customers] = await Promise.all([getSales(), getCustomers()]);

    // Calcula KPIs
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalSales = sales.length;
    const newCustomers = customers.filter(c => new Date(c.dateJoined) > new Date().setMonth(new Date().getMonth() - 1)).length;

    const kpis = [
        { title: 'Receita Total', value: `R$ ${totalRevenue.toFixed(2)}`, icon: 'fa-solid fa-dollar-sign', color: '#3182ce' },
        { title: 'Total de Vendas', value: totalSales, icon: 'fa-solid fa-shopping-cart', color: '#38a169' },
        { title: 'Novos Clientes (Mês)', value: newCustomers, icon: 'fa-solid fa-user-plus', color: '#dd6b20' },
        { title: 'Taxa de Conversão', value: '2.5%', icon: 'fa-solid fa-chart-line', color: '#805ad5' },
    ];

    mainContent.innerHTML = `
        <h2>Dashboard Principal</h2>
        <div class="kpi-grid">
            ${kpis.map(createKpiCard).join('')}
        </div>
        <div class="card chart-container">
            <h3>Visão Geral de Vendas</h3>
            <div class="chart-wrapper">
                <canvas id="salesChart"></canvas>
            </div>
        </div>
    `;

    // Renderiza o gráfico após o HTML estar no DOM
    renderSalesChart(sales);
}