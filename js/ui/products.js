// js/ui/products.js (Versão Corrigida)

import { getProducts } from '../api.js';

export default async function renderProducts() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '<p>Carregando produtos...</p>';
    
    const products = await getProducts();

    if (!products || products.length === 0) {
        mainContent.innerHTML = '<h2>Gerenciamento de Produtos</h2><p>Nenhum produto encontrado.</p>';
        return;
    }

    const tableRows = products.map(prod => `
        <tr>
            <td>${prod.id}</td>
            <td>${prod.name}</td>
            <td>${prod.category}</td>
            <td>R$ ${prod.price.toFixed(2)}</td>
            <td>${prod.stock}</td>
            <td><button class="action-btn" data-product-id="${prod.id}">Editar</button></td>
        </tr>
    `).join('');

    mainContent.innerHTML = `
        <h2>Gerenciamento de Produtos</h2>
        <div class="card">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>ID Produto</th>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Preço</th>
                        <th>Estoque</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </div>
    `;
}