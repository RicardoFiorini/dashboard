/* ==========================================================================
   SIDEBAR.JS - GERENCIADOR DE COMPORTAMENTO DA SIDEBAR
   ========================================================================== */

// Seletores dos elementos que vamos manipular
const sidebar = document.getElementById('sidebar');
const toggleButton = document.getElementById('sidebar-toggle');
const mainWrapper = document.querySelector('.main-wrapper');

/**
 * Fecha a sidebar.
 */
const closeSidebar = () => {
    sidebar.classList.remove('is-open');
    toggleButton.setAttribute('aria-expanded', 'false');
};

/**
 * Abre a sidebar.
 */
const openSidebar = () => {
    sidebar.classList.add('is-open');
    toggleButton.setAttribute('aria-expanded', 'true');
};

/**
 * Função de inicialização do módulo da sidebar.
 * Exportada para ser chamada pelo main.js.
 */
export const initSidebar = () => {
    // Se os elementos essenciais não existirem, não faz nada.
    if (!sidebar || !toggleButton || !mainWrapper) {
        return;
    }

    // Adiciona o evento de clique no botão de toggle
    toggleButton.addEventListener('click', (event) => {
        // Impede que o clique no botão seja interpretado como "clique fora"
        event.stopPropagation();
        
        // Verifica se a sidebar já está aberta para decidir se abre ou fecha
        const isOpen = sidebar.classList.contains('is-open');
        if (isOpen) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    // Adiciona evento para fechar a sidebar ao clicar fora (no conteúdo principal)
    mainWrapper.addEventListener('click', () => {
        if (sidebar.classList.contains('is-open')) {
            closeSidebar();
        }
    });

    // Adiciona evento para fechar a sidebar ao pressionar a tecla 'Escape'
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && sidebar.classList.contains('is-open')) {
            closeSidebar();
        }
    });
};