// js/ui/settings.js
export default function renderSettings() {
    const mainContent = document.getElementById('main-content');
    
    mainContent.innerHTML = `
        <h2>Configurações</h2>
        <div class="card">
            <h3>Perfil</h3>
            <form class="settings-form">
                <div class="form-group">
                    <label for="name">Nome</label>
                    <input type="text" id="name" value="Admin">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" value="admin@quantum.com">
                </div>
                <button type="submit" class="btn-primary">Salvar Alterações</button>
            </form>
        </div>
        <div class="card">
            <h3>Aparência</h3>
            <p>A configuração do tema (Claro/Escuro) é controlada pelo botão no canto superior direito do cabeçalho.</p>
        </div>
    `;
}