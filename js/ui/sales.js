// js/ui/sales.js (Versão Corrigida)
import { getSales } from '../api.js';

const addEventListeners = () => {
    // Seleciona todos os botões de detalhes
    const detailButtons = document.querySelectorAll('.action-btn');
    
    // Adiciona um evento de clique a cada um
    detailButtons.forEach(button => {
        button.addEventListener('click', () => {
            const orderId = button.closest('tr').querySelector('td').innerText;
            alert(`Detalhes do pedido ${orderId} seriam exibidos aqui!`);
        });
    });
};

export default async function renderSales() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '<p>Carregando vendas...</p>';

    const sales = await getSales();

    const tableRows = sales.map(sale => `
        <tr>
            <td>#${sale.orderId}</td>
            <td>${sale.customer.name}</td>
            <td>${new Date(sale.date).toLocaleDateString()}</td>
            <td>R$ ${sale.totalAmount.toFixed(2)}</td>
            <td><span class="status status-${sale.status.toLowerCase()}">${sale.status}</span></td>
            <td><button class="action-btn">Ver Detalhes</button></td>
        </tr>
    `).join('');

    mainContent.innerHTML = `
        <h2>Análise de Vendas</h2>
        <div class="card">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>ID Pedido</th>
                        <th>Cliente</th>
                        <th>Data</th>
                        <th>Valor Total</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </div>
    `;

    // Chama a função para adicionar os eventos DEPOIS que o HTML foi inserido
    addEventListeners();
}