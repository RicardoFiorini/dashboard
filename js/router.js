/* ==========================================================================
   ROUTER.JS - GERENCIADOR DE NAVEGAÇÃO E CARREGAMENTO DE PÁGINAS
   ========================================================================== */

// Seletores dos elementos que vamos manipular
const navLinks = document.querySelectorAll('.nav-link[data-page]');
const mainContent = document.getElementById('main-content');

/**
 * Atualiza o link ativo na navegação da sidebar.
 * @param {string} page - O nome da página que se tornou ativa.
 */
const setActiveLink = (page) => {
    navLinks.forEach(link => {
        if (link.dataset.page === page) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
};

/**
 * Carrega dinamicamente o módulo da página solicitada e o renderiza.
 * @param {string} page - O nome da página a ser carregada (ex: 'dashboard').
 */
const loadPage = async (page) => {
    // Atualiza o link ativo na UI
    setActiveLink(page);

    // Mostra um estado de carregamento
    mainContent.innerHTML = '<div role="status" class="loading-state"><p>Carregando...</p></div>';
    
    try {
        // --- A MÁGICA DO DYNAMIC IMPORT ---
        // Constrói o caminho do arquivo dinamicamente e o importa.
        // O `await` espera o arquivo ser totalmente carregado.
        const module = await import(`./ui/${page}.js`);
        
        // Chama a função default exportada pelo módulo carregado.
        module.default();

    } catch (error) {
        console.error('Erro ao carregar a página:', error);
        mainContent.innerHTML = `<h1>Erro 404</h1><p>Página não encontrada.</p>`;
    } finally {
        // Garante que o foco seja movido para o novo conteúdo por acessibilidade
        mainContent.focus();
    }
};

/**
 * Função de inicialização do módulo do roteador.
 */
export const initRouter = () => {
    // Adiciona o event listener a todos os links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o recarregamento da página
            const page = link.dataset.page;
            loadPage(page);
        });
    });

    // Carrega a página inicial padrão (dashboard) ao iniciar a aplicação
    loadPage('dashboard');
};