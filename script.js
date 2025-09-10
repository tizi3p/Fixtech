// Verificar autenticación
function checkAuth() {
    if (localStorage.getItem('fixtech_loggedin') !== 'true') {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('fixtech_loggedin');
    localStorage.removeItem('fixtech_username');
    localStorage.removeItem('fixtech_user');
    window.location.href = 'login.html';
}

// Mostrar fecha actual
function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString('es-ES', options);
}

// Mostrar información del usuario
function showUserInfo() {
    const username = localStorage.getItem('fixtech_username') || 'Usuario';
    document.getElementById('current-user').textContent = `Usuario: ${username}`;
}

// Navegación del menú
function setupNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (this.getAttribute('onclick')) return; // Si ya tiene acción asignada
            
            // Remover clase active de todos los items
            menuItems.forEach(i => i.classList.remove('active'));
            // Agregar clase active al item clickeado
            this.classList.add('active');
            
            // Cargar el contenido correspondiente
            const target = this.getAttribute('data-target');
            loadContent(target);
        });
    });
}

// Cargar contenido dinámicamente
function loadContent(section) {
    const contentSection = document.getElementById('content-section');
    
    // Simular carga de contenido
    setTimeout(() => {
        switch(section) {
            case 'dashboard':
                contentSection.innerHTML = getDashboardContent();
                break;
            case 'clients':
                contentSection.innerHTML = getClientsContent();
                loadClients();
                break;
            case 'repairs':
                contentSection.innerHTML = getRepairsContent();
                loadRepairs();
                break;
            case 'inventory':
                contentSection.innerHTML = getInventoryContent();
                loadInventory();
                break;
            case 'technicians':
                contentSection.innerHTML = getTechniciansContent();
                loadTechnicians();
                break;
            case 'reports':
                contentSection.innerHTML = getReportsContent();
                break;
            default:
                contentSection.innerHTML = getDashboardContent();
        }
    }, 300);
}

// Contenido del Dashboard
function getDashboardContent() {
    return `
        <div class="cards">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Reparaciones Activas</div>
                    <div class="card-icon">🔧</div>
                </div>
                <div class="card-number">12</div>
                <div>+2 desde ayer</div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Clientes Registrados</div>
                    <div class="card-icon">👥</div>
                </div>
                <div class="card-number">84</div>
                <div>+5 esta semana</div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Ingresos Mensuales</div>
                    <div class="card-icon">💰</div>
                </div>
                <div class="card-number">$3,450</div>
                <div>+15% mes anterior</div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Repuestos en Stock</div>
                    <div class="card-icon">📦</div>
                </div>
                <div class="card-number">127</div>
                <div>12 bajos en stock</div>
            </div>
        </div>
        
        <div class="form-section">
            <h3 class="form-title">Reparaciones Recientes</h3>
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Dispositivo</th>
                        <th>Problema</th>
                        <th>Técnico</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#FT1001</td>
                        <td>Juan Pérez</td>
                        <td>Samsung Galaxy S21</td>
                        <td>Pantalla rota</td>
                        <td>Roberto Martínez</td>
                        <td><span class="status status-completed">Completado</span></td>
                        <td>
                            <button class="btn btn-primary">Editar</button>
                        </td>
                    </tr>
                    <tr>
                        <td>#FT1002</td>
                        <td>María García</td>
                        <td>iPhone 12</td>
                        <td>Batería defectuosa</td>
                        <td>Ana Rodríguez</td>
                        <td><span class="status status-in-progress">En Proceso</span></td>
                        <td>
                            <button class="btn btn-primary">Editar</button>
                        </td>
                    </tr>
                    <tr>
                        <td>#FT1003</td>
                        <td>Carlos López</td>
                        <td>Xiaomi Redmi Note 10</td>
                        <td>No enciende</td>
                        <td>Javier Sánchez</td>
                        <td><span class="status status-pending">Pendiente</span></td>
                        <td>
                            <button class="btn btn-primary">Editar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    if (!checkAuth()) return;
    
    updateDate();
    showUserInfo();
    setupNavigation();
    
    // Actualizar la fecha cada minuto
    setInterval(updateDate, 60000);
});