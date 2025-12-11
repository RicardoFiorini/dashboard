// Importa as funções de inicialização de cada módulo.
import { initTheme } from './theme.js';
import { initSidebar } from './sidebar.js';
import { initRouter } from './router.js';

/**
 * Aguarda o DOM carregar completamente e então inicializa 
 * os módulos principais da aplicação.
 */
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSidebar();
    initRouter();
});