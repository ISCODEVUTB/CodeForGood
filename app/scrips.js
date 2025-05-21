// Script para manejar el menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.md\\:hidden');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            // Crear el menú móvil
            const mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu-overlay';
            mobileMenu.innerHTML = `
                <div class="mobile-menu">
                    <div class="mobile-menu-header">
                        <span class="font-bold">Menú</span>
                        <button class="close-menu"><i class="fas fa-times"></i></button>
                    </div>
                    <nav class="mobile-nav">
                        <a href="#" class="mobile-nav-link">Inicio</a>
                        <a href="#" class="mobile-nav-link">Donantes</a>
                        <a href="#" class="mobile-nav-link">Voluntarios</a>
                        <a href="#" class="mobile-nav-link">Programas</a>
                        <a href="#" class="mobile-donate-button">Haz una donación</a>
                    </nav>
                </div>
            `;
            
            document.body.appendChild(mobileMenu);
            document.body.style.overflow = 'hidden';
            
            // Agregar estilos para el menú móvil
            const style = document.createElement('style');
            style.textContent = `
                .mobile-menu-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 100;
                    display: flex;
                    justify-content: flex-end;
                }
                
                .mobile-menu {
                    background-color: white;
                    width: 80%;
                    max-width: 300px;
                    height: 100%;
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                }
                
                .mobile-menu-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }
                
                .close-menu {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                }
                
                .mobile-nav {
                    display: flex;
                    flex-direction: column;
                }
                
                .mobile-nav-link {
                    text-decoration: none;
                    color: #111827;
                    font-weight: 500;
                    padding: 0.75rem 0;
                    border-bottom: 1px solid #e5e7eb;
                }
                
                .mobile-donate-button {
                    background-color: #1e2c5f;
                    color: white;
                    text-decoration: none;
                    padding: 0.75rem;
                    font-weight: 500;
                    text-align: center;
                    margin-top: 1rem;
                }
            `;
            
            document.head.appendChild(style);
            
            // Cerrar el menú al hacer clic en el botón de cerrar
            const closeButton = mobileMenu.querySelector('.close-menu');
            closeButton.addEventListener('click', function() {
                document.body.removeChild(mobileMenu);
                document.body.style.overflow = '';
                document.head.removeChild(style);
            });
            
            // Cerrar el menú al hacer clic fuera de él
            mobileMenu.addEventListener('click', function(e) {
                if (e.target === mobileMenu) {
                    document.body.removeChild(mobileMenu);
                    document.body.style.overflow = '';
                    document.head.removeChild(style);
                }
            });
        });
    }
});