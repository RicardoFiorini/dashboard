/* ==========================================================================
   THEME.JS - GERENCIADOR DE TEMA (LIGHT/DARK)
   ========================================================================== */

// Seletores dos elementos que vamos manipular
const themeToggleButton = document.getElementById('theme-toggle');
const htmlElement = document.documentElement; // A tag <html>

/**
 * Aplica o tema na aplicação e atualiza a UI (ícone e ARIA label).
 * @param {string} theme - O nome do tema a ser aplicado ('light' or 'dark').
 */
const applyTheme = (theme) => {
    // Aplica o tema trocando o atributo data-theme no <html>
    htmlElement.setAttribute('data-theme', theme);

    // Atualiza o ícone dentro do botão
    const icon = themeToggleButton.querySelector('i');
    if (icon) {
        icon.classList.toggle('fa-sun', theme === 'light');
        icon.classList.toggle('fa-moon', theme === 'dark');
    }

    // Atualiza a acessibilidade do botão
    const newLabel = theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro';
    themeToggleButton.setAttribute('aria-label', newLabel);

    // Guarda a preferência do usuário no localStorage
    localStorage.setItem('theme', theme);
};

/**
 * Função de inicialização do módulo de tema.
 * Exportada para ser chamada pelo main.js.
 */
export const initTheme = () => {
    // Se o botão de tema não existir na página, não faz nada.
    if (!themeToggleButton) {
        return;
    }

    // --- Lógica para definir o tema inicial ---

    // 1. Verifica se há uma preferência salva no localStorage.
    const savedTheme = localStorage.getItem('theme');
    
    // 2. Se não houver, verifica a preferência do sistema operacional.
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Define o tema inicial baseado na hierarquia: preferência salva > preferência do SO > padrão ('light')
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    // Aplica o tema inicial ao carregar a página
    applyTheme(initialTheme);

    // --- Adiciona o Event Listener para o clique no botão ---
    
    themeToggleButton.addEventListener('click', () => {
        // Verifica qual é o tema atual lendo o atributo do <html>
        const currentTheme = htmlElement.getAttribute('data-theme');
        
        // Define o novo tema como o oposto do atual
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Aplica o novo tema
        applyTheme(newTheme);
    });
};