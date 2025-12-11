// js/api.js

const API_BASE_PATH = './data';

/**
 * Função genérica para buscar dados de um arquivo JSON.
 * @param {string} endpoint - O nome do arquivo JSON (ex: 'sales.json').
 * @returns {Promise<any>} - A promessa que resolve com os dados do JSON.
 */
const fetchData = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_PATH}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Falha ao buscar dados de ${endpoint}:`, error);
        // Retorna um array vazio em caso de erro para não quebrar a UI
        return [];
    }
};

// Funções específicas para cada tipo de dado
export const getSales = () => fetchData('sales.json');
export const getProducts = () => fetchData('products.json');
export const getCustomers = () => fetchData('customers.json');