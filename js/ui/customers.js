// js/ui/customers.js
import { getCustomers } from '../api.js';

export default async function renderCustomers() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '<p>Carregando clientes...</p>';
    
    const customers = await getCustomers();

    const tableRows = customers.map(cust => `
        <tr>
            <td>${cust.id}</td>
            <td>${cust.name}</td>
            <td>${cust.email}</td>
            <td>${cust.location.city}, ${cust.location.state}</td>
            <td>R$ ${cust.totalSpent.toFixed(2)}</td>
        </tr>
    `).join('');

    mainContent.innerHTML = `
        <h2>Clientes</h2>
        <div class="card">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>ID Cliente</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Localização</th>
                        <th>Total Gasto</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </div>
    `;
}